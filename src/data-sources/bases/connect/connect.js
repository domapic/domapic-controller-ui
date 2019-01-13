import { isEqual } from "lodash";
import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const connect = mapDataSourcesToProps => {
  return WrappedComponent => {
    class DataSourceConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          dataSourceProps: this.getInitialDataSourcesProps()
        };
      }

      componentDidMount() {
        this.getDataSourcesProps();
        this.addDataSourceListeners();
        this.mapDataSourcesPropsToState();
      }

      componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
          console.log("UPDATING", prevProps, this.props);
          this.removeDataSourceListeners();
          this.getDataSourcesProps();
          this.addDataSourceListeners();
          this.mapDataSourcesPropsToState();
        }
      }

      componentWillUnmount() {
        this.removeDataSourceListeners();
      }

      cleanDataSourceProps(dataSourceProps) {
        return {
          value: dataSourceProps.value,
          loading: dataSourceProps.loading,
          error: dataSourceProps.error
        };
      }

      getDataSourcesProps() {
        this.dataSourceProps = mapDataSourcesToProps(this.props);
        this.dataSourcePropsKeys = Object.keys(this.dataSourceProps);
      }

      getInitialDataSourcesProps() {
        this.getDataSourcesProps();
        const dataSourcesProps = {};
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          dataSourcesProps[dataSourceKey] = this.cleanDataSourceProps(
            this.dataSourceProps[dataSourceKey]
          );
        });
        return dataSourcesProps;
      }

      async mapDataSourcesPropsToState() {
        console.log("mapDataSourcesPropsToState");
        const temporalDataSourcePropsState = {};
        const newDataSourcePropsState = {};

        return Promise.all(
          this.dataSourcePropsKeys.map(dataSourceKey => {
            const dataSourceRead = this.dataSourceProps[dataSourceKey].read();
            temporalDataSourcePropsState[dataSourceKey] = this.cleanDataSourceProps(
              this.dataSourceProps[dataSourceKey]
            );

            if (
              Object.keys(temporalDataSourcePropsState).length === this.dataSourcePropsKeys.length
            ) {
              // TODO, check if state has changed
              console.log("SETTING TEMPORAL STATE");
              this.setState({
                dataSourceProps: temporalDataSourcePropsState
              });
            }

            const returnResults = () => ({
              ...this.cleanDataSourceProps(this.dataSourceProps[dataSourceKey]),
              key: dataSourceKey
            });

            return dataSourceRead.then(returnResults).catch(returnResults);
          })
        ).then(results => {
          results.forEach(result => {
            newDataSourcePropsState[result.key] = this.cleanDataSourceProps(result);
          });
          // TODO, check if state has changed
          console.log("SETTING FINAL STATE");
          this.setState({
            dataSourceProps: newDataSourcePropsState
          });
          return Promise.resolve();
        });
      }

      addDataSourceListeners() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          console.log("Adding dataSource listener", dataSourceKey);
          this.dataSourceProps[dataSourceKey].onClean(this.handleChange);
        });
      }

      removeDataSourceListeners() {
        this.dataSourcePropsKeys.forEach(dataSourceKey => {
          console.log("Removing dataSource listener", dataSourceKey);
          this.dataSourceProps[dataSourceKey].removeCleanListener(this.handleChange);
        });
      }

      async handleChange() {
        this.mapDataSourcesPropsToState();
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
