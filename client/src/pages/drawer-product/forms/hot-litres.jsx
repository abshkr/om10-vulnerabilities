import React, { useState, useEffect } from 'react';

import { Form, Checkbox, InputNumber, Row, Col } from 'antd';
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
    <>
      <Row gutter={[8, 2]}>
        <Col span={8}>
          <Form.Item name="prod_check_hot_volume" label={t('fields.checkHotLitre')} >
            <Checkbox 
              defaultChecked={checked} 
              // onChange={onChange}
              disabled={true}
            ></Checkbox>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="prod_15_density" label={t('fields.prodDensAt15') + " [500-1500]"}>
            <InputNumber
              style={{width:'100%'}}
              min={500}
              max={1500}
              disabled={!checked}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="prod_hot_temp" label={t('fields.prodHotTemp') + " [-25 - 275]"}>
            <InputNumber
              style={{width:'100%'}}
              min={-25}
              max={275}
              disabled={!checked}
            />
          </Form.Item>
        </Col>
      </Row>
    </>

  );
};

export default HotLitresForm;
