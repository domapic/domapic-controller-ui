import { Selector } from "reactive-data-source";

import { byEmailFilter } from "./filters";

import { gravatar } from "./origins";

export const userAvatar = new Selector(
  {
    source: gravatar,
    filter: filter => filter
  },
  gravatarResponse => ({
    avatar: gravatarResponse.status === 200 ? gravatarResponse.request.responseURL : null
  })
);

userAvatar.addCustomFilter({
  byEmail: byEmailFilter
});
