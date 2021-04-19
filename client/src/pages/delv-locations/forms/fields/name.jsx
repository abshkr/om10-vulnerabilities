import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvName')}`);
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input != input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input != input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_name: value.delv_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="delv_name"
      label={t('fields.delvName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Name;
