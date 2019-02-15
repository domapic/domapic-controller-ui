const JWT_HEADER = "Authorization";
const API_KEY_HEADER = "X-Api-Key";

let _config = {
  baseUrl: ""
};

let _headers = {};

let _allDataSources = [];

export const configDataSource = dataSource => {
  _allDataSources.push(dataSource);
  dataSource.config(_config);
  console.log(_allDataSources);
};

export const authDataSource = dataSource => {
  dataSource.setHeaders({
    ..._headers
  });
};

export const baseConfig = {
  onceBeforeRequest: configDataSource
};

export const authConfig = {
  ...baseConfig,
  onBeforeRequest: authDataSource
};

export const config = configuration => {
  _config = { ..._config, ...configuration };
};

export const setJwtAuth = token => {
  delete _headers[API_KEY_HEADER];
  _headers[JWT_HEADER] = `Bearer ${token}`;
};

export const setApiKeyAuth = token => {
  delete _headers[JWT_HEADER];
  _headers[API_KEY_HEADER] = token;
};

export const removeAuth = () => {
  delete _headers[JWT_HEADER];
  delete _headers[API_KEY_HEADER];
};

export const cleanAll = () => {
  _allDataSources.forEach(dataSource => dataSource.clean());
};
