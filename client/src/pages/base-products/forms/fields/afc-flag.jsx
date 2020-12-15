import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const AdaptiveFlowControlFlag = ({ form, value, onChange }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.afc_enabled);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      afc_enabled: v.target.checked,
    });
    onChange(v.target.checked);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        afc_enabled: value.afc_enabled,
      });
      setFlag(value.afc_enabled);
      onChange(value.afc_enabled);
    } else {
      onChange(value?.afc_enabled);
    }
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="afc_enabled" label={t('fields.adaptiveFlowControl')}>
      <Checkbox checked={flag} onChange={onCheck}></Checkbox>
    </Form.Item>
  );
};

export default AdaptiveFlowControlFlag;
