import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const SubsidiaryRisk = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.subsidiaryRisk')}`);
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        hzcf_sub_risk: value.hzcf_sub_risk
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="hzcf_sub_risk"
      label={t('fields.subsidiaryRisk')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default SubsidiaryRisk;
