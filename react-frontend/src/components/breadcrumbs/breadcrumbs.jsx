import React, { Component } from "react";
import "./breadcrumbs.css";

export default class Breadcrumbs extends Component {
  render() {
    const { page, path } = this.props;
    if (path !== undefined) {
      return (
        <div className="breadcrumbs">
          {page} <span>/</span> {path}
        </div>
      );
    }
    return <div className="breadcrumbs">{page}</div>;
  }
}
