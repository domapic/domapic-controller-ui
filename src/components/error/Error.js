import React from "react";

import { Message } from "semantic-ui-react";

export const ErrorComponent = ({ message }) => (
  <Message negative size="large">
    {message}
  </Message>
);
