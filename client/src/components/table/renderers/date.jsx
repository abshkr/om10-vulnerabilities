import React, { useContext } from 'react';
import moment from 'dayjs';

import { DATE_TIME_FORMAT } from 'constants/settings';
import ConfigStore from 'stores/config-store';

// const DateRenderer = ({ value }) => {
const DateRenderer = (props) => {
  const { dateTimeFormat } = useContext(ConfigStore);
  const { value, defaultFormat } = props;
  // console.log('...................dateTimeFormat', dateTimeFormat, defaultFormat, props);

  if (value !== '') {
    const payload = moment(value, DATE_TIME_FORMAT).format(dateTimeFormat || defaultFormat);

    return <div>{payload}</div>;
  }

  return <div />;
};

export default DateRenderer;
