import React, { Component } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export default class MarkRenderer extends Component {
  render() {
    const { value } = this.props;

    switch(value) {
      case '+':
        return (
          <div className="cell-icon">
            <PlusOutlined style={{ fontSize: 18, color: '#ff0000' }} />
          </div>
        );
      case '-':
        return (
          <div className="cell-icon">
            <DeleteOutlined style={{ fontSize: 18, color: '#ff0000' }} />
          </div>
        );
      case '*':
        return (
          <div className="cell-icon">
            <EditOutlined style={{ fontSize: 18, color: '#ff0000' }} />
          </div>
        );
      case '':
      default:
        return <span>{null}</span>;
    }
  }
}
