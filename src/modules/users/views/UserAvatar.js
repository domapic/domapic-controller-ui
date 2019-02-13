import { plugins } from "reactive-data-source";

import { Component as UserAvatarComponent } from "src/components/user-avatar";
import { userAvatar } from "src/data-sources/users";

export const mapDataSourceToProps = ({ email }) => {
  const readUserAvatar = userAvatar.byEmail(email).read;
  return {
    user: readUserAvatar.getters.value,
    loading: readUserAvatar.getters.loading
  };
};

export const UserAvatar = plugins.connect(mapDataSourceToProps)(UserAvatarComponent);
