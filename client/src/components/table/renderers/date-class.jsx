import React, { Component, useContext } from 'react';
import moment from 'dayjs';

import { DATE_TIME_FORMAT } from 'constants/settings';
import ConfigStore from 'stores/config-store';

export default class DateClassRenderer extends Component {
  render() {
    const { dateTimeFormat } = useContext(ConfigStore);
    const { value, defaultFormat } = this.props;

    if (value !== '') {
      const payload = moment(value, DATE_TIME_FORMAT).format(dateTimeFormat || defaultFormat);

      return <div>{payload}</div>;
    }

    return <div />;
  }
}
