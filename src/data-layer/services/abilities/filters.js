export const ofService = serviceId => {
  if (serviceId) {
    return {
      query: {
        service: serviceId
      }
    };
  }
};
