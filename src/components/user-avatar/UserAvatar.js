import React, { Component } from "react";
import { Image } from "semantic-ui-react";

import { RoutesContext } from "src/context/RoutesContext";

import "./userAvatar.css";

export class UserAvatar extends Component {
  render() {
    return (
      <Image src={`${this.context.assets}/logo.png`} circular className="user-avatar" avatar />
    );
  }
}

UserAvatar.contextType = RoutesContext;
