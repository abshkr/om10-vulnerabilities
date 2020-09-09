import React, { useContext } from 'react';
import moment from 'moment';

import { DATE_TIME_FORMAT } from 'constants/settings';
import ConfigStore from 'stores/config-store';

const DateRenderer = ({ value }) => {
  const { dateTimeFormat } = useContext(ConfigStore);
  console.log('...................dateTimeFormat', dateTimeFormat);

  if (value !== '') {
    const payload = moment(value, DATE_TIME_FORMAT).format(dateTimeFormat||'DD/MM/YYYY HH:mm:ss');

    return <div>{payload}</div>;
  }

  return <div />;
};

export default DateRenderer;
