import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

import { validateField } from '../../../../utils';

const RearWeightLimit = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        rear_weigh_limit: value.rear_weigh_limit,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="rear_weigh_limit"
      label={t('fields.axleRearWeightLimit') + ' (' + t('units.kg') + ')'}
      rules={[
        {
          required: false,
          title: t('fields.axleRearWeightLimit'),
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

export default RearWeightLimit;
