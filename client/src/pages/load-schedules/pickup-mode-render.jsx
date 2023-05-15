import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

/*
  SHLS_PICKUP_MODE
  0: Normal Load
  1: Pickup Load
  2: Staged Load
*/

export default class PickupModeRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  getFlag = () => {
    // const { data } = this.props;
    const mode = this.props.value;

    if (mode === '1') {
      return true;
    } else {
      return false;
    }
  };

  getLabel = () => {
    const { t } = this.props;
    const mode = this.props.value;

    if (mode === '1') {
      return t('fields.stagingBayPickupLoad');
    } else if (mode === '2') {
      return t('fields.stagingBayStagedLoad');
    } else {
      return t('fields.stagingBayNormalLoad');
    }
  };

  render() {
    return (
      <Tooltip placement="left" title={this.getLabel()}>
        <div className="cell-icon">
          {this.getFlag() ? (
            <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: 18, color: this.props.value === '2' ? '#bc3e38' : '#ec6e68' }}
            />
          )}
        </div>
      </Tooltip>
    );
  }
}
