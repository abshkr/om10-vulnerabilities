import React, { useState, useEffect } from 'react';

import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const StatusField = ({ value, form, visible }) => {
  const { t } = useTranslation();
  const { setFieldsValue, resetFields } = form;
  const [status , setStatus] = useState(value?.status);

  const onStatusChange = (e) => {
    setStatus(e.target.checked);
    setFieldsValue({
      status: e.target.checked,
    })
  }

  useEffect(() => {
    if (value && visible) {
      setStatus(value.status);
      setFieldsValue({
        status: value.status,
      })
    } else {
      setStatus(false);
      resetFields();
    }
  }, [value, visible]);

  return (
    <Form.Item name="status" label={t('fields.status')} >
      <Checkbox 
        defaultChecked={value?.status} 
        checked={status}
        onChange={onStatusChange}
      />
    </Form.Item>
  );
};

export default StatusField;
