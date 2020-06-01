import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import Form from 'antd/lib/form/Form';
// import { useTranslation } from 'react-i18next';

export default class FooterEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  getValue() {
    return this.state.value;
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.data.footers = e.target.value;
    this.props.data.copies = (e.target.value.match(/;/g) || []).length + 1
  }

  render() {
    return (
      <Input defaultValue={this.state.value} onChange={this.onChange} />
    )
  }
}
