import React, { Component } from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { RoutesContext } from "src/context/RoutesContext";
import { HistoryContext } from "src/context/HistoryContext";

import "./homeMenu.css";

class HomeLogo extends Component {
  render() {
    return (
      <Menu.Item className="home-menu__item">
        <Link to={this.context.home}>
          <Image
            src={`${this.context.assets}/logo-white-trans.png`}
            className="home-menu__item--logo"
          />
        </Link>
      </Menu.Item>
    );
  }
}

HomeLogo.contextType = RoutesContext;

class BackButton extends Component {
  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
  }

  isDisabled() {
    return this.context.position < 1;
  }

  goBack() {
    if (!this.isDisabled()) {
      this.context.history.goBack();
    }
  }

  render() {
    const disabled = this.isDisabled();
    return (
      <Menu.Item className="home-menu__item home-menu__item--back">
        <Icon
          link={!disabled}
          name="arrow left"
          size="large"
          disabled={disabled}
          onClick={this.goBack}
        />
      </Menu.Item>
    );
  }
}

BackButton.contextType = HistoryContext;

export const HomeMenu = () => (
  <React.Fragment>
    <HomeLogo />
    <BackButton />
  </React.Fragment>
);