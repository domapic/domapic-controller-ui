import moment from "moment";

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export const formatDate = dateString => {
  return moment(dateString).format("YY-MM-DD, HH:mm:ss");
};

export const displayValue = value => {
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
