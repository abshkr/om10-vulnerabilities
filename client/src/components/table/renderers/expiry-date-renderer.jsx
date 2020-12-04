import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { DATE_TIME_FORMAT } from 'constants/settings';
import ConfigStore from 'stores/config-store';

const ExpiryDateRenderer = ({ value, edt_type_code, edt_time_enabled }) => {
  const { dateTimeFormat } = useContext(ConfigStore);

  const [date, setDate] = useState(null);

  const getDateTimeFormat = (timeEnabled) => {
    let dtFormat = dateTimeFormat;
    if (!timeEnabled) {
      const pairs = dateTimeFormat.split(' ');
      dtFormat = pairs[0];
    }
    return dtFormat;
  };

  useEffect(() => {
    if (value.length > 0) {
      const target = _.find(value, (item) => {
        return item.edt_type_code === edt_type_code;
      });

      if (moment(target?.ed_exp_date, DATE_TIME_FORMAT).isValid()) {
        // const payload = moment(target?.ed_exp_date, DATE_TIME_FORMAT).format(dateTimeFormat);
        const payload = moment(target?.ed_exp_date, DATE_TIME_FORMAT).format(
          getDateTimeFormat(edt_time_enabled)
        );

        setDate(payload);
      }
    }
  }, [value]);

  return <div>{date}</div>;
};

export default ExpiryDateRenderer;
