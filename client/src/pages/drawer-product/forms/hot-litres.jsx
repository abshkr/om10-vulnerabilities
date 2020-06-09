import React, { useState, useEffect } from 'react';

import { Form, Divider, Checkbox, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

const HotLitresForm = ({ value, form }) => {
  const { t } = useTranslation();
  // const [form] = Form.useForm();
  const [checked, setChecked] = useState(value?.prod_check_hot_volume)
  const { resetFields, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_15_density: value.prod_15_density,
        prod_hot_temp: value.prod_hot_temp,
        prod_check_hot_volume: value.prod_check_hot_volume,
      });
      setChecked(value.prod_check_hot_volume);
    }
    
  }, [resetFields, value]);

  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <div>
      <Divider/>
      <Form.Item name="prod_check_hot_volume" label={t('fields.checkHotLitre')} >
        <Checkbox 
          defaultChecked={checked} 
          // onChange={onChange}
          disabled={true}
        ></Checkbox>
      </Form.Item>
      <Form.Item name="prod_15_density" label={t('fields.prodDensAt15')} help="[500-1500]">
        <InputNumber
          min={500}
          max={1500}
          disabled={!checked}
        />
      </Form.Item>
      <Form.Item name="prod_hot_temp" label={t('fields.prodHotTemp')} help="[-25 - 275]">
        <InputNumber
          min={-25}
          max={275}
          disabled={!checked}
        />
      </Form.Item>
    </div>

  );
};

export default HotLitresForm;
