import React, { useContext } from 'react';
import moment from 'moment';

import { DATE_TIME_FORMAT } from 'constants/settings';
import ConfigStore from 'stores/config-store';

const DateRenderer = ({ value }) => {
  const { dateTimeFormat } = useContext(ConfigStore);

  if (value !== '') {
    const payload = moment(value, DATE_TIME_FORMAT).format(dateTimeFormat);

    return <div>{payload}</div>;
  }

  return null;
};

export default DateRenderer;
