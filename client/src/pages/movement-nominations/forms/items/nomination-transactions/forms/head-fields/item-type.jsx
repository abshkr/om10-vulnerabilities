import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const NominationItemType = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranType')}`);
      }
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_type_name: value.mvitm_type_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mvitm_type_name"
      label={t('fields.nomtranType')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'transfer' ? true : true} />
    </Form.Item>
  );
};

export default NominationItemType;
