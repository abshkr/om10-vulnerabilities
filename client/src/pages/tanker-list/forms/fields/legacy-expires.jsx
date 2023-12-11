import React, { useEffect } from 'react';

import { Form, DatePicker, Col } from 'antd';
import moment from 'dayjs';
import _ from 'lodash';

import { SETTINGS } from '../../../../constants';
import { useConfig } from 'hooks';

const Dates = ({ form, value, expiryTypes }) => {
  const { showLegacyExpiryTime, dateTimeFormatHM, dateFormat } = useConfig();
  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_lic_exp:
          value.tnkr_lic_exp === '' ? null : moment(value.tnkr_lic_exp, SETTINGS.DATE_TIME_FORMAT),
        tnkr_dglic_exp:
          value.tnkr_dglic_exp === '' ? null : moment(value.tnkr_dglic_exp, SETTINGS.DATE_TIME_FORMAT),
        tnkr_ins_exp:
          value.tnkr_ins_exp === '' ? null : moment(value.tnkr_ins_exp, SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="tnkr_lic_exp" label={expiryTypes?.[0].expiry_date_titl}>
        <DatePicker
          showTime={showLegacyExpiryTime}
          format={showLegacyExpiryTime ? dateTimeFormatHM : dateFormat}
          style={{ width: '50%' }}
        />
      </Form.Item>

      <Form.Item name="tnkr_dglic_exp" label={expiryTypes?.[1].expiry_date_titl}>
        <DatePicker
          showTime={showLegacyExpiryTime}
          format={showLegacyExpiryTime ? dateTimeFormatHM : dateFormat}
          style={{ width: '50%' }}
        />
      </Form.Item>

      <Form.Item name="tnkr_ins_exp" label={expiryTypes?.[2].expiry_date_titl}>
        <DatePicker
          showTime={showLegacyExpiryTime}
          format={showLegacyExpiryTime ? dateTimeFormatHM : dateFormat}
          style={{ width: '50%' }}
        />
      </Form.Item>
    </>
  );
};

export default Dates;
