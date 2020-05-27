import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const ApproveFlag = ({ form, value, onChange, pageState }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const handleCheck = e => {
    onChange(e.target.checked);
  };

  useEffect(() => {
    if (value) {
      onChange(value.order_approved);

      setFieldsValue({
        order_approved: value.order_approved
      });
    }
  }, [value, onChange, setFieldsValue]);

  return (
    <Form.Item 
      name="order_approved" 
      valuePropName="checked"
    >
      <Checkbox disabled={true} onChange={handleCheck}>{t('fields.orderApproved')}</Checkbox>
    </Form.Item>
  );
};

export default ApproveFlag;
