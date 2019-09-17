import React, { Component } from 'react';
import { Form, Slider } from 'antd';
import _ from 'lodash';

export default class UserLLevel extends Component {
  state = {
    marks: {
      0: '0%',
      100: '100%'
    }
  };

  componentDidMount() {
    const { value, setValue } = this.props;
    let { marks } = this.state;

    if (!!value) {
      const baseLevel = value.tank_cor_vol === '' ? 0 : _.toInteger(value.tank_cor_vol);
      const level = value.tank_ul_level === '' ? 0 : _.toInteger(value.tank_ul_level);

      setValue({
        tank_ul_level: level
      });

      marks[level] = {
        style: {
          color: baseLevel <= level ? 'red' : 'black'
        },
        label: <strong>{level}%</strong>
      };

      this.setState({
        marks
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { marks } = this.state;

    return (
      <Form.Item label="User L" labelCol={{ offset: 15 }}>
        <div
          style={{
            float: 'right',
            height: 220,
            marginLeft: 10,
            textAlign: 'right'
          }}
        >
          {decorator('tank_ul_level')(
            <Slider
              vertical
              marks={marks}
              tipFormatter={value => {
                return `User L: ${value}%`;
              }}
            />
          )}
        </div>
      </Form.Item>
    );
  }
}
