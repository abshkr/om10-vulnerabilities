import React, { useEffect } from 'react';

import { Form, DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { SETTINGS } from '../../../../constants';
import { useConfig } from 'hooks';

const Dates = ({ form, value, expiryTypes }) => {
  const { showLegacyExpiryTime, dateTimeFormatHM, dateFormat } = useConfig();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_exp_d1_dmy: value.eqpt_exp_d1_dmy === ''? null: moment(value.eqpt_exp_d1_dmy, SETTINGS.DATE_TIME_FORMAT),
        eqpt_exp_d2_dmy: value.eqpt_exp_d2_dmy === ''? null: moment(value.eqpt_exp_d2_dmy, SETTINGS.DATE_TIME_FORMAT),
        eqpt_exp_d3_dmy: value.eqpt_exp_d3_dmy === ''? null: moment(value.eqpt_exp_d3_dmy, SETTINGS.DATE_TIME_FORMAT),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="eqpt_exp_d1_dmy" label={expiryTypes?.[0].expiry_date_titl}>
        <DatePicker 
          showTime={showLegacyExpiryTime} 
          format={showLegacyExpiryTime? dateTimeFormatHM : dateFormat} 
          style={{ width: '50%' }} 
        />
      </Form.Item>

      <Form.Item name="eqpt_exp_d2_dmy" label={expiryTypes?.[1].expiry_date_titl}>
        <DatePicker 
          showTime={showLegacyExpiryTime} 
          format={showLegacyExpiryTime? dateTimeFormatHM : dateFormat} 
          style={{ width: '50%' }} 
        />
      </Form.Item>

      <Form.Item name="eqpt_exp_d3_dmy" label={expiryTypes?.[2].expiry_date_titl}>
        <DatePicker 
          showTime={showLegacyExpiryTime} 
          format={showLegacyExpiryTime? dateTimeFormatHM : dateFormat} 
          style={{ width: '50%' }} 
        />
      </Form.Item>
    </>
  );
};

export default Dates;
