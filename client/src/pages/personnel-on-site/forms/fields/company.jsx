import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Company = ({ form, value }) => {
    const { t } = useTranslation();
  
    const { setFieldsValue } = form;
    
    useEffect(() => {
      if (value) {
        setFieldsValue({
            cmpy_name: value.cmpy_name,
            
        });
      }
    }, [value, setFieldsValue]);
  
    return (
      <Form.Item name="cmpy_name" label={t('fields.companyName')} rules={[{ required: false}]}>
        <Input disabled={!!value}/>
      </Form.Item>
    );
  };

  export default Company;