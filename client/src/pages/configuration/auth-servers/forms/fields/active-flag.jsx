import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const ActiveFlag = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.as_active);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      as_active: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        as_active: value.as_active,
      });
      setFlag(value.as_active);
    }
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="as_active" label={t('fields.asActive')}>
      <Checkbox checked={flag} onChange={onCheck}></Checkbox>
    </Form.Item>
  );
};

export default ActiveFlag;
