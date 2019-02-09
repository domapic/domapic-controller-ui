import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Loader, Dimmer, Icon } from "semantic-ui-react";

export class UserAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loader = (
      <Dimmer active={this.props.loading}>
        <Loader />
      </Dimmer>
    );
    const image = this.props.user.avatar ? (
      <Image circular className="user-avatar" avatar>
        {loader}
        <img src={this.props.user.avatar} />
      </Image>
    ) : (
      <Image circular className="user-avatar" avatar>
        {loader}
        <Icon name="user circle" size="big" className="user-avatar__icon" />
      </Image>
    );

    return image;
  }
}

UserAvatar.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string
  })
};
