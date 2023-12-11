import React from 'react';
import moment from 'dayjs';

import { DATE_TIME_FORMAT } from 'constants/settings';
import { useConfig } from 'hooks';

const LegacyExpDateRenderer = (props) => {
  const { showLegacyExpiryTime, dateTimeFormatHM, dateFormat } = useConfig();
  const { value, defaultFormat } = props;

  if (value !== '') {
    const payload = moment(value, DATE_TIME_FORMAT).format(
      showLegacyExpiryTime ? dateTimeFormatHM : dateFormat || defaultFormat
    );

    return <div>{payload}</div>;
  }

  return <div />;
};

export default LegacyExpDateRenderer;
