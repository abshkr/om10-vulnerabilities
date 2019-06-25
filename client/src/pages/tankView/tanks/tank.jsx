import React, { Component } from "react";

export default class Tank extends Component {
  render() {
    const { tank } = this.props;
    return (
      <div>
        <p>Base Product: {tank.tank_base_name}</p>
      </div>
    );
  }
}
