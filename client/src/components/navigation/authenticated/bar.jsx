import React, { Component } from "react";

export default class Bar extends Component {
  render() {
    return (
      <div className="nav">
        <img className="logo" alt="tide" src={require("./logo.png")} />
      </div>
    );
  }
}
