import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import isEqual from "lodash.isequal";

import { READ_METHOD } from "../bases/helpers";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name;
}

export const reactConnect = mapDataSourcesToProps => {
  return WrappedComponent => {
    class DataSourceConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this._unmounted = false;
        this.dataSourcePropsListeners = {};
        this.dataSourcePropsReaders = {};
        this.dataSourcePropsKeys = [];
        this.dataSourcePropsGetters = {};
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

      cleanDataSourceProps(dataSourceProps, propName) {
        const dispatch = data =>
          dataSourceProps.dispatch(data).catch(error => {
            this.logError(dataSourceProps._source._id, error.message);
          });
        if (!propName) {
          return {
            dispatch,
            error: dataSourceProps.error,
            loading: dataSourceProps.loading,
            value: dataSourceProps.value
          };
        }
        return propName === "dispatch" ? dispatch : dataSourceProps[propName];
      }

      getDataSourcesProps() {
        this.dataSourceProps = mapDataSourcesToProps(this.props);
        this.dataSourcePropsKeys = Object.keys(this.dataSourceProps);
        // Define getters
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          if (
            this.dataSourceProps[dataSourceKey] &&
            this.dataSourceProps[dataSourceKey].isGetter
          ) {
            this.dataSourcePropsGetters[dataSourceKey] = this.dataSourceProps[dataSourceKey].prop;
            this.dataSourceProps[dataSourceKey] = this.dataSourceProps[dataSourceKey]._method;
          }
        });
      }

      getDataSourcesPropsValues() {
        const dataSourcesProps = {};
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          dataSourcesProps[dataSourceKey] =
            this.dataSourceProps[dataSourceKey] &&
            this.dataSourceProps[dataSourceKey]._isDataSource
              ? this.cleanDataSourceProps(
                  this.dataSourceProps[dataSourceKey],
                  this.dataSourcePropsGetters[dataSourceKey]
                )
              : this.dataSourceProps[dataSourceKey];
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
          if (
            this.dataSourceProps[dataSourceKey] &&
            this.dataSourceProps[dataSourceKey]._methodName === READ_METHOD
          ) {
            this.dataSourceProps[dataSourceKey].dispatch().catch(error => {
              this.logError(this.dataSourceProps[dataSourceKey]._source._id, error.message);
            });
          }
        });
      }

      addDataSourceListeners() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          if (
            this.dataSourceProps[dataSourceKey] &&
            this.dataSourceProps[dataSourceKey]._isDataSource
          ) {
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
          }
        });
      }

      removeDataSourceListeners() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          if (
            this.dataSourceProps[dataSourceKey] &&
            this.dataSourceProps[dataSourceKey]._isDataSource
          ) {
            this.dataSourceProps[dataSourceKey]._source.removeCleanListener(
              this.dataSourcePropsReaders[dataSourceKey]
            );
            this.dataSourceProps[dataSourceKey]._source.removeChangeListener(
              this.dataSourcePropsListeners[dataSourceKey]
            );
          }
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
