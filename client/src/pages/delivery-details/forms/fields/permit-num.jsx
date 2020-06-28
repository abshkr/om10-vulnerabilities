import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const PermitNumber = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddPermitNum')}`);
      }
    }

    if (input && input.length > 210) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 210 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_permit_num: value.dd_permit_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_permit_num"
      label={t('fields.ddPermitNum')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : false} />
    </Form.Item>
  );
};

export default PermitNumber;
