import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const Tarrif = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || (input!==0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvTarrif')}`);
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_tarrif: value.delv_tarrif
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="delv_tarrif" 
      label={t('fields.delvTarrif')} 
      rules={[{ required: true, validator:validate }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default Tarrif;
