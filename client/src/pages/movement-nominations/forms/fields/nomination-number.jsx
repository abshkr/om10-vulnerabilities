import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const NominationNumber = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_number: value.mv_number
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.nominationNumber')}>
      {getFieldDecorator('mv_number', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default NominationNumber;
