import React, { useContext } from 'react';
import moment from 'dayjs';

import { DATE_TIME_FORMAT } from 'constants/settings';
// import ConfigStore from 'stores/config-store';

const DateRender = ({ value, dateTimeFormat }) => {
  //const { dateTimeFormat } = useContext(ConfigStore);
  console.log('...........dateRender', value, dateTimeFormat, DATE_TIME_FORMAT);

  if (value !== '') {
    const payload = moment(value, DATE_TIME_FORMAT).format(dateTimeFormat);

    return <div>{payload}</div>;
  }

  return <div />;
};

export default DateRender;
