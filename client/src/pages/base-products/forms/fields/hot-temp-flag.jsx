import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const HotTempFlag = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(value?.base_limit_preset_ht);

  const onCheck = v => {
    setFlag(v.target.checked)
    setFieldsValue({
      base_limit_preset_ht: v.target.checked,
    });
  }

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_limit_preset_ht: value.base_limit_preset_ht,
      });
      setFlag(value.base_limit_preset_ht);
    }
    
  }, [value, setFieldsValue, setFlag]);

  return (
    <Form.Item name="base_limit_preset_ht" label={t('fields.baseLimitPresetHt2')}>
      <Checkbox 
        checked={flag} 
        onChange={onCheck}
      ></Checkbox>
    </Form.Item>
  );
};

export default HotTempFlag;
