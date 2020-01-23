import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';

const DefaultValue = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_def_exp_date: moment(value.edt_def_exp_date, SETTINGS.DATE_TIME_FORMAT)
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.defaultValue')}>
      {getFieldDecorator('edt_def_exp_date')(<DatePicker showTime />)}
    </Form.Item>
  );
};

export default DefaultValue;
