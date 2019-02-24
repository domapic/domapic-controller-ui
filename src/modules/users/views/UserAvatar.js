import { plugins } from "reactive-data-source";

import { Component as UserAvatarComponent } from "src/components/user-avatar";
import { userAvatar } from "src/data-layer/users";

export const mapDataSourceToProps = ({ email, role }) => {
  const readUserAvatar = userAvatar.byEmail(email).read;
  return {
    role,
    user: readUserAvatar.getters.value,
    loading: readUserAvatar.getters.loading
  };
};

export const UserAvatar = plugins.connect(mapDataSourceToProps)(UserAvatarComponent);
