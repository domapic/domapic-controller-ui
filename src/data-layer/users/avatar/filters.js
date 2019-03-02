import md5 from "md5";

export const byEmailFilter = (email = "") => ({
  params: {
    hash: md5(email.toLowerCase())
  },
  query: {
    d: 404
  }
});
