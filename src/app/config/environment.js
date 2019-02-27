const currentHost = `${window.location.protocol}//${window.location.host}`;

export const environment = {
  version: process.env.VERSION,
  baseRoute: process.env.BASE_ROUTE,
  staticsRoute: process.env.STATICS_ROUTE,
  baseApi: process.env.BASE_API || `${currentHost}/api`,
  baseSocket: process.env.BASE_SOCKET || currentHost
};
