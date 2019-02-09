import moment from "moment";

export const formatDate = dateString => {
  return moment(dateString).format("YY-MM-DD, hh:mm:ss");
};

export const display = value => {
  if (["string", "number"].indexOf(typeof value) < 0) {
    return JSON.stringify(value);
  }
  return value;
};

export const byIdFilter = id => {
  if (id) {
    return {
      params: {
        id
      }
    };
  }
};
