import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

import { SETTINGS } from '../../../../constants';

const DefaultValue = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_def_exp_date:
          value.edt_def_exp_date === '' ? null : moment(value.edt_def_exp_date, SETTINGS.DATE_TIME_FORMAT)
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="edt_def_exp_date" label={t('fields.defaultValue')}>
      <DatePicker showTime />
    </Form.Item>
  );
};

export default DefaultValue;
