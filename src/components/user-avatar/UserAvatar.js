import React from "react";
import PropTypes from "prop-types";
import { Image, Loader, Icon } from "semantic-ui-react";

export const UserAvatar = ({ loading, user }) => {
  return user && user.avatar ? (
    <Image circular className="user-avatar" avatar>
      <img src={user.avatar} />
    </Image>
  ) : (
    <Image circular className="user-avatar" avatar>
      <Loader active={loading} />
      {!loading ? <Icon name="user circle" size="big" className="user-avatar__icon" /> : null}
    </Image>
  );
};

UserAvatar.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string
  })
};
