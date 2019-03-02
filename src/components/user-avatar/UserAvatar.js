import React from "react";
import PropTypes from "prop-types";
import { Image, Loader, Icon } from "semantic-ui-react";

import "./userAvatar.css";

export const UserAvatar = ({ loading, user, role }) => {
  return user && user.avatar ? (
    <Image circular className="user-avatar" avatar>
      <img src={user.avatar} />
    </Image>
  ) : (
    <Image circular className="user-avatar" avatar>
      <Loader active={loading} />
      {!loading ? (
        <Icon
          name={`user ${
            (user && user.role === "anonymous") || role === "anonymous" ? "secret" : "circle"
          }`}
          size="big"
          className="user-avatar__icon"
        />
      ) : null}
    </Image>
  );
};

UserAvatar.propTypes = {
  loading: PropTypes.bool,
  role: PropTypes.string,
  user: PropTypes.shape({
    avatar: PropTypes.string
  })
};
