export const typeFilter = serviceType => {
  if (serviceType && serviceType.length) {
    return {
      query: {
        type: serviceType
      }
    };
  }
};
