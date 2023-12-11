import React, { useContext, useState, useEffect } from 'react';
import moment from 'dayjs';
import _ from 'lodash';

import { DATE_TIME_FORMAT } from 'constants/settings';
import ConfigStore from 'stores/config-store';

// const ExpiryDateRenderer = ({ value, edt_type_code, edt_time_enabled }) => {
const ExpiryDateRenderer = (props) => {
  const { data, edt_type_code, edt_time_enabled } = props;

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
    // console.log('......................expiry-dates', data);
    // When the column uses ExpiryDateRenderer,
    // previously it displayed the customized expiry date from an array [expiry_dates], and the column field was always "expiry_dates".
    // Now the column field has been changed to "expiry_datesN_XXXX" (N=1,2,3...; XXXX=eqpt/tnkr/psnl) to serve for the feature of customisable columns,
    // but the value should be still from the array [expiry_dates]
    // So we can use "value" which points to "expiry_dates" in the past but now we have to deliberately refer to "expiry_dates"
    const value = data?.['expiry_dates'];
    if (value?.length > 0) {
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
  }, [data]);

  return <div>{date}</div>;
};

export default ExpiryDateRenderer;
