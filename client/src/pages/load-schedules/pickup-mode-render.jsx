import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CloseCircleFilled } from '@ant-design/icons';

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
    const { data } = this.props;
    // const mode = this.props.value;
    const mode = String(data?.['shls_pickup_mode']);

    if (mode === '1') {
      return true;
    } else {
      return false;
    }
  };

  getLabel = () => {
    const { t, data } = this.props;
    // const mode = this.props.value;
    const mode = String(data?.['shls_pickup_mode']);

    if (mode === '1') {
      return t('fields.stagingBayPickupLoad');
    } else if (mode === '2') {
      return t('fields.stagingBayStagedLoad');
    } else {
      return t('fields.stagingBayNormalLoad');
    }
  };

  render() {
    const { data } = this.props;
    // const mode = this.props.value;
    const mode = String(data?.['shls_pickup_mode']);

    return (
      <Tooltip placement="left" title={this.getLabel()}>
        <div className="cell-icon">
          {this.getFlag() ? (
            <CheckCircleOutlined style={{ fontSize: 18, color: '#52c41a' }} />
          ) : mode === '2' ? (
            <CloseCircleFilled style={{ fontSize: 18, color: '#ec6e68' }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18, color: '#ec6e68' }} />
          )}
        </div>
      </Tooltip>
    );
  }
}
