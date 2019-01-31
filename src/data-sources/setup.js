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
    dataSource.addHeaders({
      [JWT_HEADER]: `Bearer ${accessToken}`,
      [API_KEY_HEADER]: undefined
    });
  });
};

export const setApiKey = apiKey => {
  needAuthDataSources.forEach(dataSource => {
    dataSource.addHeaders({
      [JWT_HEADER]: undefined,
      [API_KEY_HEADER]: apiKey
    });
  });
};
