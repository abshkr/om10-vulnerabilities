import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { SETTINGS } from '../../../../constants';

const EffectiveFrom = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_dtim_effect:
          value.mv_dtim_effect === '' ? null : moment(value.mv_dtim_effect, SETTINGS.DATE_TIME_FORMAT)
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.effectiveFrom')}>
      {getFieldDecorator('mv_dtim_effect')(<DatePicker showTime />)}
    </Form.Item>
  );
};

export default EffectiveFrom;
