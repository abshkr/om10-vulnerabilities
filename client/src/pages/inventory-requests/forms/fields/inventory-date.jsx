import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';

const InventoryDate = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.date')}`);
    }

    return Promise.resolve();
  };

  const onChange = (value) => {
    if (!value) {
      setFieldsValue({
        tkrq_due: '',
      });
    }
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tkrq_due: value.tkrq_due === '' ? null : moment(value.tkrq_due, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        tkrq_due: moment(),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="tkrq_due" label={t('fields.date')} rules={[{ required: true, validator: validate }]}>
      <DatePicker format="DD/MM/YYYY HH:mm" showTime={{ format: 'HH:mm' }} onChange={onChange} />
    </Form.Item>
  );
};

export default InventoryDate;
