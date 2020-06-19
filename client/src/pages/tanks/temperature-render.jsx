import React, { Component } from 'react';
import _ from 'lodash';
// import { useTranslation } from 'react-i18next';

export default class TemperatureRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cValue: this.props.value,
      fValue: (this.props.value * 1.8 + 32).toFixed(1),
    };
  }

  getValue() {
    return this.state.cValue;
  }

  render() {
    const { form, values } = this.props;
    // const { t } = useTranslation();

    return <div>{this.state.cValue + 'ºC/' + this.state.fValue + 'ºF'}</div>;
  }
}
