import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker } from 'antd';
import moment from 'dayjs';

import { SETTINGS } from '../../../../constants';

const DefaultValue = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const onChange = (value) => {
    if (!value) {
      setFieldsValue({
        edt_def_exp_date: '',
      });
    }
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_def_exp_date:
          value.edt_def_exp_date === '' ? null : moment(value.edt_def_exp_date, SETTINGS.DATE_TIME_FORMAT),
      });
    } else {
      setFieldsValue({
        edt_def_exp_date: moment().add(1, 'years'),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="edt_def_exp_date" label={t('fields.defaultValue')}>
      <DatePicker format="DD/MM/YYYY HH:mm" showTime={{ format: 'HH:mm' }} onChange={onChange} />
    </Form.Item>
  );
};

export default DefaultValue;
