import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

import { validateField } from '../../../../../utils';

const WeightLimit = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        axle_weight_limit: value.axle_weight_limit,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="axle_weight_limit"
      label={t('fields.axleWeightLimit') + ' (' + t('units.kg') + ')'}
      rules={[
        {
          required: false,
          title: t('fields.axleWeightLimit'),
          dataType: 'NUMBER',
          // maxLength: 9,
          precision: null, // 0,
          min: 0,
          max: 999999999,
          prompts: t,
          // returnType: 'notice',
          // regexp: 'ALPHANUMERIC_HOSTCOMM',
          validator: validateField,
        },
      ]}
    >
      <InputNumber
        // min={0}
        // max={999999999}
        precision={0}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};

export default WeightLimit;
