import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const LpgDestType = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddLpgDestType')}`);
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
        dd_lpg_dest_type: value.dd_lpg_dest_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_lpg_dest_type"
      label={t('fields.ddLpgDestType')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : false} />
    </Form.Item>
  );
};

export default LpgDestType;
