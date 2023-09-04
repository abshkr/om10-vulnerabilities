import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const ManualFlag = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.base_manual);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      base_manual: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_manual: value.base_manual,
      });
      setFlag(value.base_manual);
    }
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="base_manual" label={t('fields.baseProdManual')}>
      <Checkbox checked={flag} onChange={onCheck}></Checkbox>
    </Form.Item>
  );
};

export default ManualFlag;
