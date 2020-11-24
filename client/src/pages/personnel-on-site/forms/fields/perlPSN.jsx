import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

const PerlPSN = ({ form, value }) => {
    const { t } = useTranslation();
  
    const { setFieldsValue } = form;
    
    useEffect(() => {
      if (value) {
        setFieldsValue({
            perl_psn: value.perl_psn,
            
        });
      }
    }, [value, setFieldsValue]);
  
    return (
      <Form.Item name="perl_psn" rules={[{ required: false}]}>
      </Form.Item>
    );
  };

  export default PerlPSN;