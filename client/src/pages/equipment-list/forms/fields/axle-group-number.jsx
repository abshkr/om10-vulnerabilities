import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const AxleGroupNumber = ({ form, value, onChange, limitType }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const handleFieldChange = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (value && value.eqpt_axle_group_count) {
      setFieldsValue({
        eqpt_axle_group_count: value.eqpt_axle_group_count,
      });
    } else {
      setFieldsValue({
        eqpt_axle_group_count: 0,
      });
      // onChange(0);
    }
    onChange(value?.eqpt_axle_group_count || 0);
  }, [value, setFieldsValue, onChange]);

  useEffect(() => {
    if (limitType === 0) {
      setFieldsValue({
        eqpt_axle_group_count: 0,
      });
      onChange(0);
    }
  }, [limitType, setFieldsValue, onChange]);

  return (
    <Form.Item name="eqpt_axle_group_count" label={t('fields.axleGroupNumber')} rules={[{ required: false }]}>
      <InputNumber min={0} max={9} precision={0} style={{ width: '100%' }} onChange={handleFieldChange} disabled={limitType===0} />
    </Form.Item>
  );
};

export default AxleGroupNumber;
