import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Name = ({ form, value }) => {
    const { t } = useTranslation();
  
    const { setFieldsValue } = form;
    
    useEffect(() => {
      if (value) {
        setFieldsValue({
            per_name: value.per_name,
            
        });
      }
    }, [value, setFieldsValue]);
  
    return (
      <Form.Item name="per_name" label={t('fields.name')} rules={[{ required: false}]}>
        <Input disabled={!!value}/>
      </Form.Item>
    );
  };

  export default Name;