import React, { useState, useEffect } from 'react';

import { Form, Checkbox, InputNumber, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import CheckboxContainer from './style';

const HotLitresForm = ({ value, form, hotFlag }) => {
  const { t } = useTranslation();
  // const [form] = Form.useForm();
  const [flag, setFlag] = useState(hotFlag)
  const { resetFields, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_15_density: value.prod_15_density,
        prod_hot_temp: value.prod_hot_temp,
        prod_check_hot_volume: value.prod_check_hot_volume,
      });
      setFlag(value.prod_check_hot_volume);
    }
    
  }, [value, setFieldsValue, setFlag]);

  useEffect(() => {
    setFieldsValue({
      prod_check_hot_volume: hotFlag,
    });
    setFlag(hotFlag);
  }, [hotFlag, setFieldsValue, setFlag]);

  return (
    <>
      <Row gutter={[8, 2]}>
        <Col span={8}>
          <Form.Item name="prod_check_hot_volume" label={t('fields.prodCheckHotVolume2')} >
            <CheckboxContainer>
              <Checkbox 
                checked={flag} 
                // onChange={onChange}
                disabled={true}
              ></Checkbox>
            </CheckboxContainer>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="prod_15_density" label={t('fields.prodDensAt15') + " [500-1500]"}>
            <InputNumber
              style={{width:'100%'}}
              min={500}
              max={1500}
              disabled={!flag}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="prod_hot_temp" label={t('fields.prodHotTemp') + " [-25 - 275]"}>
            <InputNumber
              style={{width:'100%'}}
              min={-25}
              max={275}
              disabled={!flag}
            />
          </Form.Item>
        </Col>
      </Row>
    </>

  );
};

export default HotLitresForm;
