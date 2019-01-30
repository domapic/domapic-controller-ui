export const setup = (dataSources, config) => {
  dataSources.forEach(dataSource =>
    dataSource.config({
      baseUrl: config.baseApi
    })
  );
};
