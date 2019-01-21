import React from "react";
import "./breadcrumbs.css";

const Breadcrumbs = ({ page, path }) => {
  if (path !== undefined) {
    return (
      <div className="breadcrumbs">
        {page} <span>/</span> {path}
      </div>
    );
  }
  return <div className="breadcrumbs">{page}</div>;
};

export default Breadcrumbs;
