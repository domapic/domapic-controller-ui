import React from "react";
import PropTypes from "prop-types";
import { Image, Loader, Dimmer, Icon } from "semantic-ui-react";

export const UserAvatar = ({ loading, user }) => {
  const loader = (
    <Dimmer active={loading}>
      <Loader />
    </Dimmer>
  );
  return user && user.avatar ? (
    <Image circular className="user-avatar" avatar>
      {loader}
      <img src={user.avatar} />
    </Image>
  ) : (
    <Image circular className="user-avatar" avatar>
      {loader}
      <Icon name="user circle" size="big" className="user-avatar__icon" />
    </Image>
  );
};

UserAvatar.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string
  })
};
