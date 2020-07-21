import React, { Component } from 'react';
import { Badge } from 'antd';

export default class SourceRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  getBadge = () => {

    if (this.state.value === "Manually Created") {
      return "blue";
    } else if (this.state.value === "From Host") {
      return "green";
    } else if (this.state.value === "Open Order") {
      return "red";
    } else if (this.state.value === "Standalone or Special") {
      return "gold";
    } else {
      return "grey";
    };
  }

  render() {
    return (
      <div style={{ width: '100%',  display: 'flex' }}>
        <Badge color={this.getBadge()} text={this.state.value} />
      </div>
    );
  }
}
