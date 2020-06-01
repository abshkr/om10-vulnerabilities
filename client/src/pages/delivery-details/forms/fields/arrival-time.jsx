import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';
import { getDateTimeFormat } from '../../../../utils';

const VehicleArrvTime= ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.ddVehArrTime')}`);
      }
    }
    
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_veh_arr_time: '' ? null : moment(value.dd_veh_arr_time, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        dd_veh_arr_time: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="dd_veh_arr_time" 
      label={t('fields.ddVehArrTime')}
      rules={[{ required: false, validator: validate }]}
    >
      <DatePicker 
        showTime 
        format={FORMAT} 
        style={{ width: '100%' }} 
        disabled={(pageState==='create')? false : false}
      />
    </Form.Item>
  );
};

export default VehicleArrvTime;
