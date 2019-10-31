import React, { Component } from 'react';
import { Form, Slider } from 'antd';
import _ from 'lodash';

export default class UserHLevel extends Component {
  state = {
    marks: {
      0: '0%',
      100: '100%',
    },
  };

  componentDidMount() {
    const { value, form } = this.props;

    const { setFieldsValue } = form;

    let { marks } = this.state;

    if (!!value) {
      const baseLevel = value.tank_cor_vol === '' ? 0 : _.toInteger(value.tank_cor_vol);
      const level = value.tank_uh_level === '' ? 0 : _.toInteger(value.tank_uh_level);

      setFieldsValue({
        tank_uh_level: level,
      });

      marks[level] = {
        style: {
          color: baseLevel >= level ? 'red' : 'black',
        },
        label: <strong>{level}%</strong>,
      };

      this.setState({
        marks,
      });
    }
  }

  render() {
    const { form } = this.props;
    const { marks } = this.state;

    const { getFieldDecorator } = form;

    return (
      <Form.Item label="User H" labelCol={{ offset: 5 }}>
        <div
          style={{
            height: 220,
            marginRight: 10,
            float: 'left',
          }}
        >
          {getFieldDecorator('tank_uh_level')(
            <Slider
              vertical
              marks={marks}
              tipFormatter={value => {
                return `User H: ${value}%`;
              }}
            />,
          )}
        </div>
      </Form.Item>
    );
  }
}
