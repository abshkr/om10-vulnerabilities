import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Instruction = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddInstruction')}`);
      }
    }

    if (input && input.length > 70) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 70 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_instruction: value.dd_instruction,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_instruction"
      label={t('fields.ddInstruction')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : false} />
    </Form.Item>
  );
};

export default Instruction;
