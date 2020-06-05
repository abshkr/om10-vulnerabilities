import React, { useCallback, useState, useEffect } from 'react';

import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const StatusField = ({ value, form }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [status , setStatus] = useState(value?.status);

  const onStatusChange = (e) => {
    setStatus(e.target.checked);
    setFieldsValue({
      status: e.target.checked,
    })
  }

  useEffect(() => {
    if (value) {
      setFieldsValue({
        status: value.status,
      })
    }
  }, [value]);

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
