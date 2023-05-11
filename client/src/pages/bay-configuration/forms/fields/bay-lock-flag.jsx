import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const BayLockFlag = ({ form, value, disabled }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.ba_lock);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      ba_lock: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        ba_lock: value.ba_lock,
      });
      setFlag(value.ba_lock);
    }
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="ba_lock" label={t('fields.bayLock')}>
      <Checkbox checked={flag} onChange={onCheck}></Checkbox>
    </Form.Item>
  );
};

export default BayLockFlag;
