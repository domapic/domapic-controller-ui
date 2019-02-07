import md5 from "md5";
import { origins, Selector } from "reactive-data-source";

export const userMe = new origins.Api(
  "/users/me",
  {},
  {
    defaultValue: {}
  }
);

export const userAvatar = new origins.Api(
  "https://www.gravatar.com/avatar/:hash",
  {},
  {
    fullResponse: true,
    validateStatus: () => true
  }
);

export const userMeWithAvatar = new Selector(
  userMe,
  {
    source: userAvatar,
    filter: (filter, results) => ({
      params: {
        hash: md5(results[0].email.toLowerCase())
      },
      query: {
        d: 404
      }
    })
  },
  (userMeData, userMeAvatarResponse) => ({
    ...userMeData,
    avatar: userMeAvatarResponse.status === 200 ? userMeAvatarResponse.request.responseURL : null
  }),
  {}
);

export const userMeIsAdmin = new Selector(
  userMe,
  userMeData => userMeData.role === "admin",
  false
);
