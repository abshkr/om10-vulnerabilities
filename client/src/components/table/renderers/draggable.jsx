import React, { Component } from 'react';

import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default class DraggableRenderer extends Component {
  gridDragOver = (event) => {
    const dragSupported = event.dataTransfer.types.length;

    if (dragSupported) {
      event.dataTransfer.dropEffect = 'copy';
      event.preventDefault();
    }
  };

  gridDrop = (event) => {
    const jsonData = event.dataTransfer.getData('text');
    const data = JSON.parse(jsonData);

    console.log('.................gridDrop', jsonData, data, this.props);

    if (this.props.onDragFinished) {
      this.props.onDragFinished(this.props.rowIndex, data);
    }
  };

  onRemove = (event) => {
    console.log('.................onRemove', this.props);
    if (this.props.onDragFinished) {
      this.props.onDragFinished(this.props.rowIndex, {
        prod_code: '',
        prod_name: '',
        qty_scheduled: 0,
      });
    }
  };

  render() {
    const { value, t } = this.props;

    return (
      <div onDragOver={this.gridDragOver} onDrop={this.gridDrop.bind(this)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>{value === '' ? t('placeholder.dragProduct') : value}</div>
          {value !== '' && (
            <div>
              <Button
                style={{ marginLeft: 10 }}
                size="small"
                icon={<CloseOutlined />}
                onClick={this.onRemove}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
