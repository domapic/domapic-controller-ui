import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import isEqual from "lodash.isequal";

import { READ_METHOD } from "../bases/helpers";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const reactConnect = mapDataSourcesToProps => {
  return WrappedComponent => {
    class DataSourceConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this._unmounted = false;
        this.dataSourcePropsListeners = {};
        this.dataSourcePropsReaders = {};
        this.getDataSourcesProps();
        this.state = {
          dataSourceProps: this.getDataSourcesPropsValues()
        };
      }

      componentDidMount() {
        this.resetDataSources();
      }

      componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
          this.resetDataSources();
        }
      }

      componentWillUnmount() {
        this._unmounted = true;
        this.removeDataSourceListeners();
      }

      resetDataSources() {
        this.removeDataSourceListeners();
        this.getDataSourcesProps();
        this.updateState();
        this.addDataSourceListeners();
        this.dispatchAllReads();
      }

      cleanDataSourceProps(dataSourceProps) {
        return {
          dispatch: data =>
            dataSourceProps.dispatch(data).catch(error => {
              this.logError(dataSourceProps._source._id, error.message);
            }),
          error: dataSourceProps.error,
          loading: dataSourceProps.loading,
          value: dataSourceProps.value
        };
      }

      getDataSourcesProps() {
        this.dataSourceProps = mapDataSourcesToProps(this.props);
        this.dataSourcePropsKeys = Object.keys(this.dataSourceProps);
      }

      getDataSourcesPropsValues() {
        const dataSourcesProps = {};
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          dataSourcesProps[dataSourceKey] = this.cleanDataSourceProps(
            this.dataSourceProps[dataSourceKey]
          );
        });
        return dataSourcesProps;
      }

      updateState() {
        this.setState({
          dataSourceProps: this.getDataSourcesPropsValues()
        });
      }

      logError(id, message) {
        console.error(`Error "${message}" in ${id}`);
      }

      dispatchAllReads() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          if (this.dataSourceProps[dataSourceKey]._methodName === READ_METHOD) {
            this.dataSourceProps[dataSourceKey].dispatch().catch(error => {
              this.logError(this.dataSourceProps[dataSourceKey]._source._id, error.message);
            });
          }
        });
      }

      addDataSourceListeners() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          this.dataSourcePropsReaders[dataSourceKey] = () => {
            if (this.dataSourceProps[dataSourceKey]._methodName === READ_METHOD) {
              this.dataSourceProps[dataSourceKey]._source.read.dispatch().catch(error => {
                this.logError(this.dataSourceProps[dataSourceKey]._source._id, error.message);
              });
            }
          };

          this.dataSourcePropsListeners[dataSourceKey] = methodName => {
            if (methodName === this.dataSourceProps[dataSourceKey]._methodName) {
              if (!this._unmounted) {
                this.updateState();
              }
            }
          };

          this.dataSourceProps[dataSourceKey]._source.onClean(
            this.dataSourcePropsReaders[dataSourceKey]
          );

          this.dataSourceProps[dataSourceKey]._source.onChange(
            this.dataSourcePropsListeners[dataSourceKey]
          );
        });
      }

      removeDataSourceListeners() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          this.dataSourceProps[dataSourceKey]._source.removeCleanListener(
            this.dataSourcePropsReaders[dataSourceKey]
          );
          this.dataSourceProps[dataSourceKey]._source.removeChangeListener(
            this.dataSourcePropsListeners[dataSourceKey]
          );
        });
      }

      render() {
        return <WrappedComponent {...this.state.dataSourceProps} {...this.props} />;
      }
    }

    DataSourceConnectedComponent.displayName = `DataSourceConnectedComponent(${getDisplayName(
      WrappedComponent
    )})`;

    hoistNonReactStatics(DataSourceConnectedComponent, WrappedComponent);

    return DataSourceConnectedComponent;
  };
};
