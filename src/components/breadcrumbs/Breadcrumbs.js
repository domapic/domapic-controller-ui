import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";

import "./breadcrumbs.css";

export const Breadcrumbs = ({ sections }) => {
  return (
    <span className="breadcrumbs">
      {sections.map((sectionData, index) => {
        const icon = sectionData.icon ? <Icon name={sectionData.icon} /> : null;
        const key = `breadcrumb-${index}`;
        if (index === sections.length - 1) {
          return (
            <span key={key}>
              {icon}
              {sectionData.text}
            </span>
          );
        }
        return (
          <React.Fragment key={key}>
            <Link to={sectionData.url}>
              {icon} {sectionData.text}
            </Link>
            <span className="breadcrumbs__separator"> &gt; </span>
          </React.Fragment>
        );
      })}
    </span>
  );
};

Breadcrumbs.propTypes = {
  sections: PropTypes.array
};
