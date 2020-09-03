import React, { useEffect } from 'react';
import { Form, InputNumber, Row, Col } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { validateField } from '../../../../utils';

const DensityRange = ({ form, value, classification, config }) => {
  const { t } = useTranslation();
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
    if (classification && !value?.base_dens_lo && !value?.base_dens_hi) {
      setFieldsValue({
        // base_dens_lo: classification.bclass_dens_lo,
        // base_dens_hi: classification.bclass_dens_hi,
        base_dens_lo: _.round(_.toNumber(classification?.bclass_dens_lo), config.precisionDensity),
        base_dens_hi: _.round(_.toNumber(classification?.bclass_dens_hi), config.precisionDensity),
      });
    }
  }, [setFieldsValue, classification]);

  const low = classification ? _.round(_.toNumber(classification?.bclass_dens_lo), config.precisionDensity) : '';
  const high = classification ? _.round(_.toNumber(classification?.bclass_dens_hi), config.precisionDensity) : '';

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Form.Item
            name="base_dens_lo"
            label={`${t('fields.baseProdDensLo')} ${classification ? `(${low} - ${high})${t(`units.${config.densityUnit}`)}` : ''}`}
            rules={[{ 
              required: false,
              title: t('fields.baseProdDensLo'), 
              dataType: 'NUMBER',
              // maxLength: 256, 
              precision: 3,
              min: low || config.minDensity, 
              max: high || config.maxDensity,
              prompts: t,
              // returnType: 'notice',
              validator: validateField 
            }]}
          >
            <InputNumber 
              // min={low} 
              // max={high} 
              style={{ width: '100%' }} 
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="base_dens_hi"
            label={`${t('fields.baseProdDensHi')} ${classification ? `(${low} - ${high})${t(`units.${config.densityUnit}`)}` : ''}`}
            rules={[{ 
              required: false,
              title: t('fields.baseProdDensHi'), 
              dataType: 'NUMBER',
              // maxLength: 256, 
              precision: 3,
              min: low || config.minDensity, 
              max: high || config.maxDensity,
              prompts: t,
              // returnType: 'notice',
              validator: validateField 
            }]}
          >
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
