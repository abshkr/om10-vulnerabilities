import React, { Component } from 'react';
import { convertToLocale } from 'utils';
import _ from 'lodash';

export default class ExpiryDateRenderer extends Component {
  render() {
    const { value, edt_type_code } = this.props;

    if (value.length <= 0) {
      return <div></div>;
    }
    
    const targetDate = _.find(value, (item) => {
      return item.edt_type_code === edt_type_code
    });

    if (targetDate) {
      console.log(targetDate);
      return <div>{convertToLocale(targetDate.ed_exp_date)}</div>
    }

    return <div></div>;
  }
}
