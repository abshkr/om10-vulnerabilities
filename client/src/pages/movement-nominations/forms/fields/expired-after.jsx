import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';

const ExpiredAfter = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_dtim_expiry:
          value.mv_dtim_expiry === '' ? null : moment(value.mv_dtim_expiry, SETTINGS.DATE_TIME_FORMAT)
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mv_dtim_expiry" label={t('fields.expiredAfter')}>
      <DatePicker showTime />
    </Form.Item>
  );
};

export default ExpiredAfter;
