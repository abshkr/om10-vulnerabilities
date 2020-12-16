import React, { Component } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Popover, Descriptions } from 'antd';
import _ from 'lodash';

export default class FlowRateRenderer extends Component {
  getList() {
    const { value } = this.props;
    let rates = '';
    _.forEach(value, (o) => {
      rates += '[' + String(o.tank_level) + 'mm : ' + String(o.flow_rate) + 'LPM]';
    });
    return rates;
  }

  getList2() {
    const { value } = this.props;
    let rates = '';
    _.forEach(value, (o) => {
      if (rates.length > 0) {
        rates += '>>';
      }
      rates += String(o.flow_rate);
    });
    return rates;
  }

  render() {
    const { value } = this.props;

    const valid = value?.length > 0;

    return (
      <Popover
        placement="topRight"
        title=""
        content={
          <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }}>
            {value.map((item) => (
              <Descriptions.Item label={String(item.tank_level) + ' mm'} span={24}>
                {String(item.flow_rate) + ' LPM'}
              </Descriptions.Item>
            ))}
          </Descriptions>
        }
      >
        <div className="cell-icon">
          {valid ? (
            <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 18, color: '#ec6e68' }} />
          )}
        </div>
      </Popover>
    );
  }
}
