import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const NominationItemId = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranItemId')}`);
      }
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_item_id: value.mvitm_item_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mvitm_item_id"
      label={t('fields.nomtranItemId')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'transfer' ? true : true} />
    </Form.Item>
  );
};

export default NominationItemId;
