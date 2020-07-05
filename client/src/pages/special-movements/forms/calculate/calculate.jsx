import React, { useEffect, useCallback, useState } from 'react';
import useSWR from 'swr';
import api from 'api';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Select, Row, Col } from 'antd';
import _ from 'lodash';

import { SPECIAL_MOVEMENTS } from 'api';

const Calculate = ({ form, value, disabled, type, tank, config, pinQuantity }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.UNITS);

  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState(null);
  const [tempDecimals, setTempDecimals] = useState(2);
  const [densDecimals, setDensDecimals] = useState(3);

  const { setFieldsValue } = form;

  const IS_DISALBED = disabled || !type || isLoading;

  const getLimit = useCallback((tank) => {
    setLoading(true);

    api
      .get(SPECIAL_MOVEMENTS.PRODUCTS, {
        params: {
          tank_code: tank,
        },
      })
      .then((response) => {
        if (response?.data?.records?.length > 0) {
          setLimit(response.data.records[0]);
          setFieldsValue({
            mlitm_dens_cor: response.data.records[0].tank_density,
          });
          setLoading(false);
        }

        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_qty_amb: value?.mlitm_qty_amb,
        mlitm_qty_cor: value?.mlitm_qty_cor,
        mlitm_qty_kg: value?.mlitm_qty_kg,
        mlitm_temp_amb: value?.mlitm_temp_amb,
        mlitm_dens_cor: value?.mlitm_dens_cor,
        // mlitm_qty_amb: _.round(_.toNumber(value?.mlitm_qty_amb), config.precisionVolume),
        // mlitm_qty_cor: _.round(_.toNumber(value?.mlitm_qty_cor), config.precisionVolume),
        // mlitm_qty_kg: _.round(_.toNumber(value?.mlitm_qty_kg), config.precisionMass),
        // mlitm_temp_amb: _.round(_.toNumber(value?.mlitm_temp_amb), config.precisionTemperature),
        // mlitm_dens_cor: _.round(_.toNumber(value?.mlitm_dens_cor), config.precisionDensity),
      });

      // initialize the quantity source for calculation
      if (value?.mlitm_qty_amb) {
        pinQuantity({ qty: value?.mlitm_qty_amb, type: 'LT', title: t('fields.observedQuantity') });
      } else if (value?.mlitm_qty_cor) {
        pinQuantity({ qty: value?.mlitm_qty_cor, type: 'L15', title: t('fields.standardQuantity') });
      } else if (value?.mlitm_qty_kg) {
        pinQuantity({ qty: value?.mlitm_qty_kg, type: 'KG', title: t('fields.observedMass') });
      } else {
        pinQuantity({ qty: '', type: 'NA', title: t('fields.observedQuantity') });
      }

      handleTemperatureChange(value?.mlitm_temp_amb);
      handleDensityChange(value?.mlitm_dens_cor);     
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        unit: 'BB6',
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (tank) {
      getLimit(tank);
    }
  }, [getLimit, tank]);

  const handleAmbVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'LT', title: t('fields.observedQuantity') });
    }
  };

  const handleCorVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'L15', title: t('fields.standardQuantity') });
    }
  };

  const handleMassQtyFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'KG', title: t('fields.observedMass') });
    }
  };

  const handleDensityChange = (value) => {
    const decimals = _.toString(value).split('.')[1]?.length;
    setDensDecimals(decimals);
  };

  const handleTemperatureChange = (value) => {
    const decimals = _.toString(value).split('.')[1]?.length;
    setTempDecimals(decimals);
  };

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="mlitm_qty_amb" label={t('fields.observedQuantity')}>
            <InputNumber
              precision={config.precisionVolume}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleAmbVolFieldChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="mlitm_qty_cor" label={t('fields.standardQuantity')}>
            <InputNumber
              precision={config.precisionVolume}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleCorVolFieldChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="mlitm_qty_kg" label={t('fields.observedMass')}>
            <InputNumber
              precision={config.precisionMass}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleMassQtyFieldChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="mlitm_dens_cor"
            label={`${t('fields.standardDensity')} ${limit ? `[${limit.density_lo} - ${limit.density_hi}]` : ''}`}
          >
            <InputNumber
              precision={densDecimals>config.precisionDensity ? config.precisionDensity : densDecimals}
              min={limit ? _.round(_.toNumber(limit?.density_lo), config.precisionDensity) : limit?.density_lo}
              max={limit ? _.round(_.toNumber(limit?.density_hi), config.precisionDensity) : limit?.density_hi}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleDensityChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mlitm_temp_amb"
            label={`${t('fields.observedTemperature')} ${limit ? `[${limit.temp_lo} - ${limit.temp_hi}]` : ''}`}
          >
            <InputNumber
              precision={tempDecimals>config.precisionTemperature ? config.precisionTemperature : tempDecimals}
              min={limit ? _.round(_.toNumber(limit?.temp_lo), config.precisionTemperature) : limit?.temp_lo}
              max={limit ? _.round(_.toNumber(limit?.temp_hi), config.precisionTemperature) : limit?.temp_hi}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleTemperatureChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="mlitm_qty_rpt" label={t('fields.alternateQuantity')} >
            <InputNumber precision={config.precisionVolume} disabled={IS_DISALBED} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="mlitm_unit_rpt" label={t('fields.unit')} >
            <Select
              showSearch
              loading={isValidating}
              disabled={IS_DISALBED}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options?.records.map((item, index) => (
                <Select.Option key={index} value={item.unit}>
                  {item.unit}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Calculate;
