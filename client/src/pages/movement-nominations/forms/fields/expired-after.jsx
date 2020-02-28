import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';

const ExpiredAfter = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

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
    <Form.Item label={t('fields.expiredAfter')}>
      {getFieldDecorator('mv_dtim_expiry')(<DatePicker showTime />)}
    </Form.Item>
  );
};

export default ExpiredAfter;
