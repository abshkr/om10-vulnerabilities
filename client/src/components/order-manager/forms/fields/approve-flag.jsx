import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const ApproveFlag = ({ form, value, pageState }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_approved: value.order_approved
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_approved" 
      label={t('fields.orderApproved')}
      valuePropName="checked"
    >
      <Checkbox disabled={true}></Checkbox>
    </Form.Item>
  );
};

export default ApproveFlag;
