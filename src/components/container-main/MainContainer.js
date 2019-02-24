import React, { Component } from "react";
import PropTypes from "prop-types";

import { Container } from "semantic-ui-react";

import { ScrollContext } from "src/contexts/ScrollContext";

import "./mainContainer.css";

export class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.scrollContainer = null;
    this.state = {
      useWindow: !props.mobile
    };
    this.setScrollContainer = this.setScrollContainer.bind(this);
    this.getScrollContainer = this.getScrollContainer.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mobile !== this.props.mobile) {
      this.setState({
        useWindow: !this.props.mobile
      });
    }
  }

  setScrollContainer(element) {
    this.scrollContainer = element;
  }

  getScrollContainer() {
    return this.scrollContainer;
  }

  render() {
    const { children, mobile, dimmed } = this.props;
    return mobile ? (
      <div
        className={`main-container__mobile-wrapper ${dimmed ? "dimmed" : ""}`}
        ref={this.setScrollContainer}
      >
        <ScrollContext.Provider
          value={{
            useWindow: this.state.useWindow,
            getScrollContainer: this.getScrollContainer
          }}
        >
          <Container className="main-container">{children}</Container>
        </ScrollContext.Provider>
      </div>
    ) : (
      <Container className="main-container">{children}</Container>
    );
  }
}

MainContainer.propTypes = {
  children: PropTypes.node,
  dimmed: PropTypes.bool,
  mobile: PropTypes.bool
};
