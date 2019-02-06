export const display = value => {
  if (["string", "number"].indexOf(typeof value) < 0) {
    return JSON.stringify(value);
  }
  return value;
};
