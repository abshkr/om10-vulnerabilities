import React, { Component } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default class BooleanEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  getValue() {
    return this.state.value;
  }

  afterGuiAttached() {
    const { value } = this.state;

    this.setState({
      value: !value,
    });
  }

  render() {
    const { value } = this.state;

    return (
      <div style={{ marginTop: 3, marginLeft: 5 }}>
        {value ? (
          <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
        ) : (
          <CloseCircleOutlined style={{ fontSize: 18, color: '#ec6e68' }} />
        )}
      </div>
    );
  }
}
