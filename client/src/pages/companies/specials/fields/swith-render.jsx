import React, { Component } from 'react';
import { Switch } from 'antd';
import _ from 'lodash';
// import { useTranslation } from 'react-i18next';

export default class SwitchRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  getValue() {
    return this.state.value;
  }

  onChange = v => {
    this.setState({
      value: v,
    });
    if (this.props.colDef.field === "status") {
      this.props.data.status = v;
    } else if (this.props.colDef.field === "default_flag") {
      this.props.data.default_flag = v;
    } else if (this.props.colDef.field === "send_to_printer") {
      this.props.data.send_to_printer = v;
    }
  }

  render() {
    const { form, values } = this.props;
    // const { t } = useTranslation();

    return (
      <div style={{ display: 'flex' }}>
        <Switch checked={this.state.value} onChange={this.onChange} ></Switch>
      </div>
    );
  }
}
