import React, { Component } from "react";
import { Image, Loader, Dimmer, Icon } from "semantic-ui-react";

export class UserAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const image = this.props.user.avatar ? (
      <Image circular className="user-avatar" avatar>
        <img src={this.props.user.avatar} />
      </Image>
    ) : (
      <Image circular className="user-avatar" avatar>
        <Icon name="user circle" size="big" className="user-avatar__icon" />
      </Image>
    );

    return (
      <React.Fragment>
        <Dimmer active={this.props.loading}>
          <Loader />
        </Dimmer>
        {image}
      </React.Fragment>
    );
  }
}
