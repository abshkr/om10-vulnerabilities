import React from "react";
import { Icon } from "antd";
import "./breadcrumbs.css";

const Breadcrumbs = ({ page, path }) => {
  if (path !== undefined) {
    return (
      <div className="breadcrumbs">
        <div className="bc-title">{page}</div>
        <span>
          <Icon type="right" style={{ fontSize: 22 }} />
        </span>
        <div className="bc-page">{path}</div>
      </div>
    );
  }
  return <div className="breadcrumbs">{page}</div>;
};

export default Breadcrumbs;
