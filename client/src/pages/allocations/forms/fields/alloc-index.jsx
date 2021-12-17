import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const AllocIndex = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_index: value.alloc_index,
      });

      onChange(value.alloc_index);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="alloc_index" label={t('fields.allocIndex')} rules={[{ required: false }]}>
      <Input
        type="number"
        disabled={true}
        style={{ width: '100%' }}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </Form.Item>
  );
};

export default AllocIndex;
