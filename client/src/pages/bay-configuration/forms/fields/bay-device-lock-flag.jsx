import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const BayDeviceLockFlag = ({ form, value, disabled }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.bad_lock);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      bad_lock: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bad_lock: value.bad_lock,
      });
      setFlag(value.bad_lock);
    }
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="bad_lock" label={t('fields.bayDeviceLock')}>
      <Checkbox checked={flag} onChange={onCheck}></Checkbox>
    </Form.Item>
  );
};

export default BayDeviceLockFlag;
