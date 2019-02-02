import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimmer,
  Dropdown,
  Segment,
  Loader,
  Header,
  Placeholder,
  Menu,
  Input
} from "semantic-ui-react";

import { Component as ErrorComponent } from "src/components/error";

import "./contentContainer.css";

const HEADER = "ContentHeader";
const PLACEHOLDER = "ContentPlaceholder";
const CONTENT = "ContentContent";

export const ContentHeader = ({ children, as, loading }) => {
  const type = as || "h2";
  return loading ? (
    <Placeholder as={type}>
      <Placeholder.Paragraph>
        <Placeholder.Line as={type} />
      </Placeholder.Paragraph>
    </Placeholder>
  ) : (
    <Header as={type}>{children}</Header>
  );
};

ContentHeader.displayName = HEADER;

ContentHeader.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool
};

export const ContentPlaceholder = ({ children }) => <Placeholder>{children}</Placeholder>;

ContentPlaceholder.propTypes = {
  children: PropTypes.node
};

ContentPlaceholder.displayName = PLACEHOLDER;

export const ContentContent = ({ children }) => <React.Fragment>{children}</React.Fragment>;

ContentContent.displayName = CONTENT;

ContentContent.propTypes = {
  children: PropTypes.node
};

export class ContentContainer extends Component {
  static Header = ContentHeader;
  static Placeholder = ContentPlaceholder;
  static Content = ContentContent;

  renderChilds(type) {
    return React.Children.map(this.props.children, child => {
      if (child.type.displayName === type) {
        return child;
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChilds(HEADER)}
        <Menu pointing position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Menu>
            <Dropdown item text="By Name" className="content-container__sort-by">
              <Dropdown.Menu size="mini">
                <Dropdown.Item>By Name</Dropdown.Item>
                <Dropdown.Item>By Description</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item name="Info" active={true} />
            <Menu.Item name="Abilities" />
          </Menu.Menu>
        </Menu>
        <Segment>
          <Dimmer active={this.props.loading} inverted>
            <Loader inverted />
          </Dimmer>
          {this.props.loading ? this.renderChilds(PLACEHOLDER) : null}
          {!this.props.loading && !this.props.error ? this.renderChilds(CONTENT) : null}
          {this.props.error ? <ErrorComponent>{this.props.error.message}</ErrorComponent> : null}
        </Segment>
      </React.Fragment>
    );
  }
}

ContentContainer.propTypes = {
  children: PropTypes.node,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool
};
