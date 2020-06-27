import React, { useEffect } from 'react';
import { Form, InputNumber, Row, Col } from 'antd';
import _ from 'lodash';

const DensityRange = ({ form, value, classification }) => {
  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_dens_lo: value.base_dens_lo,
        base_dens_hi: value.base_dens_hi,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (classification && !value.base_dens_lo && !value.base_dens_hi) {
      setFieldsValue({
        base_dens_lo: classification.bclass_dens_lo,
        base_dens_hi: classification.bclass_dens_hi,
      });
    }
  }, [setFieldsValue, classification]);

  const low = classification ? _.toNumber(classification?.bclass_dens_lo) : '';
  const high = classification ? _.toNumber(classification?.bclass_dens_hi) : '';

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Form.Item name="base_dens_lo" label={`Low Density ${classification ? `(${low} - ${high})` : ''}`}>
            <InputNumber 
              // min={low} 
              // max={high} 
              style={{ width: '100%' }} 
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="base_dens_hi" label={`High Density ${classification ? `(${low} - ${high})` : ''}`}>
            <InputNumber 
              // min={low} 
              // max={high} 
              style={{ width: '100%' }} 
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default DensityRange;
