import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from 'react-i18next';

const PackagingGroup = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.packagingGroup')}`);
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        hzcf_pack_group: value.hzcf_pack_group
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="hzcf_pack_group"
      label={t('fields.packagingGroup')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default PackagingGroup;
