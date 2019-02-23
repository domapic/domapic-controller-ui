import { snakeCase, toUpper } from "lodash";

const DATA_SOURCE_PREFIX = "DATA_SOURCE";

const CREATE = "CREATE";
const READ = "READ";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

const CLEAN = "CLEAN";

const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const DISPATCH = "DISPATCH";

const DATA_SOURCE_CREATE_SUCCESS = `${DATA_SOURCE_PREFIX}_${CREATE}_${SUCCESS}`;
const DATA_SOURCE_READ_SUCCESS = `${DATA_SOURCE_PREFIX}_${READ}_${SUCCESS}`;
const DATA_SOURCE_UPDATE_SUCCESS = `${DATA_SOURCE_PREFIX}_${UPDATE}_${SUCCESS}`;
const DATA_SOURCE_DELETE_SUCCESS = `${DATA_SOURCE_PREFIX}_${DELETE}_${SUCCESS}`;

const DATA_SOURCE_CREATE_ERROR = `${DATA_SOURCE_PREFIX}_${CREATE}_${ERROR}`;
const DATA_SOURCE_READ_ERROR = `${DATA_SOURCE_PREFIX}_${READ}_${ERROR}`;
const DATA_SOURCE_UPDATE_ERROR = `${DATA_SOURCE_PREFIX}_${UPDATE}_${ERROR}`;
const DATA_SOURCE_DELETE_ERROR = `${DATA_SOURCE_PREFIX}_${DELETE}_${ERROR}`;

const DATA_SOURCE_CREATE_DISPATCH = `${DATA_SOURCE_PREFIX}_${CREATE}_${DISPATCH}`;
const DATA_SOURCE_READ_DISPATCH = `${DATA_SOURCE_PREFIX}_${READ}_${DISPATCH}`;
const DATA_SOURCE_UPDATE_DISPATCH = `${DATA_SOURCE_PREFIX}_${UPDATE}_${DISPATCH}`;
const DATA_SOURCE_DELETE_DISPATCH = `${DATA_SOURCE_PREFIX}_${DELETE}_${DISPATCH}`;

const DATA_SOURCE_CLEAN = `${DATA_SOURCE_PREFIX}_${CLEAN}`;

export const reducer = (state = {}, action = {}) => {
  const getCurrentMethodData = method => ({
    [method]:
      method === action.payload.method
        ? action.payload.state
        : (state[action.payload.id] && state[action.payload.id][method]) || {}
  });

  const getCurrentSourceData = () => ({
    [action.payload.id]: {
      ...getCurrentMethodData("create"),
      ...getCurrentMethodData("read"),
      ...getCurrentMethodData("update"),
      ...getCurrentMethodData("delete")
    }
  });

  switch (action.type) {
    case DATA_SOURCE_CREATE_SUCCESS:
    case DATA_SOURCE_READ_SUCCESS:
    case DATA_SOURCE_UPDATE_SUCCESS:
    case DATA_SOURCE_DELETE_SUCCESS:
    case DATA_SOURCE_CREATE_ERROR:
    case DATA_SOURCE_READ_ERROR:
    case DATA_SOURCE_UPDATE_ERROR:
    case DATA_SOURCE_DELETE_ERROR:
    case DATA_SOURCE_CREATE_DISPATCH:
    case DATA_SOURCE_READ_DISPATCH:
    case DATA_SOURCE_UPDATE_DISPATCH:
    case DATA_SOURCE_DELETE_DISPATCH:
    case DATA_SOURCE_CLEAN:
      return {
        ...state,
        ...getCurrentSourceData()
      };
    default:
      return state;
  }
};

const actionName = dataSourceActionName =>
  `${DATA_SOURCE_PREFIX}_${toUpper(snakeCase(dataSourceActionName))}`;

export const addDataSource = (dataSource, store) => {
  dataSource.onChangeAny(details => {
    store.dispatch({
      type: actionName(details.action),
      payload: {
        method: details.method,
        id: details.source._id,
        state: {
          value: details.source[details.method].value,
          error: details.source[details.method].error,
          loading: details.source[details.method].loading
        },
        params: details.params
      }
    });
  });

  dataSource.onCleanAny(details => {
    store.dispatch({
      type: actionName(details.action),
      payload: {
        id: details.source._id
      }
    });
  });
};

export const addDataSources = (dataSources, store) => {
  dataSources.forEach(dataSource => addDataSource(dataSource, store));
};
