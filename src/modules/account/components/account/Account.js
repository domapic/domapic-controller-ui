import React, { Component } from "react";
import PropTypes from "prop-types";

import { Component as ContentContainer } from "src/components/container-content";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";
import { RoutesContext } from "src/contexts/RoutesContext";

export class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, goBack, userLoading, userError, UpdateUser } = this.props;
    const breadcrumbs = [
      {
        url: this.context.account,
        text: "Account",
        icon: "user"
      }
    ];
    return user._id ? (
      <UpdateUser id={user._id} onCancel={goBack} breadcrumbs={breadcrumbs} />
    ) : (
      <ContentContainer loading={userLoading} error={userError} background={true}>
        <ContentContainer.Header>
          <Breadcrumbs sections={breadcrumbs} />
        </ContentContainer.Header>
      </ContentContainer>
    );
  }
}

Account.contextType = RoutesContext;

Account.propTypes = {
  UpdateUser: PropTypes.func,
  goBack: PropTypes.func,
  user: PropTypes.any,
  userError: PropTypes.bool,
  userLoading: PropTypes.bool
};
