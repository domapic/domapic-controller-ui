const JWT_HEADER = "authorization";
const API_KEY_HEADER = "X-Api-Key";

let allDataSources = [];
let needAuthDataSources = [];

export const setAllDataSources = dataSources => {
  allDataSources = dataSources;
};

export const setNeedAuthDataSources = dataSources => {
  needAuthDataSources = dataSources;
};

const configDataSources = (dataSources, config) => {
  dataSources.forEach(dataSource => dataSource.config(config));
};

export const setBaseUrl = baseUrl =>
  configDataSources(allDataSources, {
    baseUrl
  });

export const setAuthErrorHandler = authErrorHandler =>
  configDataSources(needAuthDataSources, {
    authErrorHandler
  });

export const setJwt = accessToken => {
  needAuthDataSources.forEach(dataSource => {
    dataSource.setHeaders({
      [JWT_HEADER]: `Bearer ${accessToken}`
    });
  });
};

export const setApiKey = apiKey => {
  needAuthDataSources.forEach(dataSource => {
    dataSource.setHeaders({
      [API_KEY_HEADER]: apiKey
    });
  });
};

export const logout = () => {
  needAuthDataSources.forEach(dataSource => {
    dataSource.setHeaders({});
  });
};

export const cleanAll = () => {
  allDataSources.forEach(dataSource => dataSource.clean());
};
