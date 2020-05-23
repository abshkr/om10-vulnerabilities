import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Description = ({ form, value }) => {
  const { t } = useTranslation();
  const { TextArea } = Input

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        description: value.description,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.folioExceptionDesc')}`);
    }

    // if (input && input.length > 40) {
    //   return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    // }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="description"
      label={t('fields.folioExceptionDesc')}
      rules={[{ required: true, validator: validate }]}
    >
      <TextArea rows={4} />
    </Form.Item>
  );
};

export default Description;
