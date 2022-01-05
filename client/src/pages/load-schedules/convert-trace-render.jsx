import React, { Component } from 'react';
import { Badge } from 'antd';
import './source-render.css';

export default class ConvertTraceRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  getBadge = () => {
    const { data } = this.props;
    // const code = this.state.value;
    const code = data?.shls_cnvrt_trace;

    /*
        'NA': No changes
        '32': A schedule is converted from Pre-Order to Pre-Schedule
        '23': A schedule is reverted from Pre-Schedule to Pre-Order
    */

    if (code === "NA") {
      return "yellow";
    } else if (code === "32") {
      return "green";
    } else if (code === "23") {
      return "blue";
    } else {
      return "red";
    };
  }

  getLabel = () => {
    const { data, t } = this.props;
    // const code = this.state.value;
    const code = data?.shls_cnvrt_trace;
    const origType = data?.shls_ld_type;

    /*
        'NA': No changes
        '32': A schedule is converted from Pre-Order to Pre-Schedule
        '23': A schedule is reverted from Pre-Schedule to Pre-Order
    */

    if (code === "NA") {
      if (origType === "2") {
        return t('descriptions.preSchedule');
      } else if (origType === "3") {
        return t('descriptions.preOrder');
      } else {
        return data?.ld_type;
      }
    } else if (code === "32") {
      return t('descriptions.preScheduleFromOrder');
    } else if (code === "23") {
      return t('descriptions.preOrderFromSched');
    } else {
      return "";
    };
  }

  render() {
    return (
      <div style={{ width: '100%',  display: 'flex' }}>
        <Badge color={this.getBadge()} text={this.getLabel()} />
      </div>
    );
  }
}
