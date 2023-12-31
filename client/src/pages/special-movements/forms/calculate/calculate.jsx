import React, { useEffect, useCallback, useState } from 'react';
import useSWR from 'swr';
import api from 'api';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Select, Row, Col } from 'antd';
import _ from 'lodash';
import moment from 'dayjs';

import { SETTINGS } from '../../../../constants';

import { SPECIAL_MOVEMENTS } from 'api';
import { getDensityRange, calcWiA } from 'utils';

const Calculate = ({
  form,
  value,
  disabled,
  type,
  tank,
  config,
  pinQuantity,
  tankSelected,
  setTankSelected,
}) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.UNITS);

  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(null);
  const [tempDecimals, setTempDecimals] = useState(2);
  const [densDecimals, setDensDecimals] = useState(3);
  const [minDens, setMinDens] = useState(config.minDensity);
  const [maxDens, setMaxDens] = useState(config.maxDensity);
  const [inited, setInited] = useState(false);

  const { setFieldsValue, validateFields, getFieldValue } = form;

  const IS_DISALBED = disabled || !type || !tank || isLoading;

  const getLimit = useCallback((tank) => {
    setLoading(true);

    // get the time
    let moveTime = getFieldValue('mlitm_dtim_start');
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (moveTime === null || moveTime === undefined) {
      moveTime = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
    } else {
      moveTime = moveTime?.format(SETTINGS.DATE_TIME_FORMAT);
    }

    api
      .get(SPECIAL_MOVEMENTS.PRODUCTS, {
        params: {
          tank_code: tank,
          move_time: moveTime,
        },
      })
      .then((response) => {
        if (response?.data?.records?.length > 0) {
          let productList = response.data.records;
          console.log('...............tankproddata before', productList);
          if (config?.siteFolioTankBaseChange) {
            productList = response?.data?.records?.filter(
              (o) =>
                (o.base_period_open === '' || o.base_period_open <= moveTime) &&
                (o.base_period_close === '' || o.base_period_close >= moveTime)
            );
          }

          const prod = productList?.[0];
          console.log('...............tankproddata after', prod, productList);
          setFieldsValue({
            mlitm_dens_cor: prod?.tank_density,
          });
          setFieldsValue({
            mlitm_temp_amb: prod?.tank_temp,
          });

          const densRange = getDensityRange({
            manageFlag: config.manageBaseProductDensityRange,
            useFlag: config.useBaseProductDensityRange,
            minDefaultDensity: config.minDensity,
            maxDefaultDensity: config.maxDensity,
            minClassDensity: prod?.tank_bclass_dens_lo,
            maxClassDensity: prod?.tank_bclass_dens_hi,
            minBaseDensity: prod?.tank_base_dens_lo,
            maxBaseDensity: prod?.tank_base_dens_hi,
          });
          prod.density_lo = densRange.min;
          prod.density_hi = densRange.max;

          /* if (!prod?.tank_base_dens_lo) {
            prod.density_lo = prod?.tank_bclass_dens_lo;
          } else {
            if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
              prod.density_lo = prod?.tank_base_dens_lo;
            } else {
              prod.density_lo = prod?.tank_bclass_dens_lo;
            }
          }
          if (!prod?.tank_base_dens_hi) {
            prod.density_hi = prod?.tank_bclass_dens_hi;
          } else {
            if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
              prod.density_hi = prod?.tank_base_dens_hi;
            } else {
              prod.density_hi = prod?.tank_bclass_dens_hi;
            }
          } */

          // setLimit(response.data.records[0]);
          setLimit(prod);
          const densL = prod
            ? _.round(_.toNumber(prod?.density_lo), config.precisionDensity)
            : prod?.density_lo;
          const densH = prod
            ? _.round(_.toNumber(prod?.density_hi), config.precisionDensity)
            : prod?.density_hi;
          setMinDens(densL);
          setMaxDens(densH);
          // console.log('I am here 111');
          // const temp_dens = getFieldValue('mlitm_dens_cor');
          // if (!temp_dens) {
          //   console.log('I am here 222');
          /* setFieldsValue({
            mlitm_dens_cor: response.data.records[0].tank_density,
          });
          setFieldsValue({
            mlitm_temp_amb: response.data.records[0].tank_temp,
          }); */
          // }
          setLoading(false);
          //console.log('validateFields([mlitm_dens_cor]);222');
          //validateFields(['mlitm_dens_cor']);
        }

        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (limit) {
      console.log('validateFields([mlitm_dens_cor]);', minDens, maxDens, limit);
      validateFields(['mlitm_dens_cor']);
    }
  }, [limit, minDens, maxDens, validateFields]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_qty_amb: value?.mlitm_qty_amb,
        mlitm_qty_cor: value?.mlitm_qty_cor,
        mlitm_qty_kg: value?.mlitm_qty_kg,
        mlitm_temp_amb: value?.mlitm_temp_amb,
        mlitm_dens_cor: value?.mlitm_dens_cor,
        mlitm_qty_rpt: value?.mlitm_qty_rpt,
        mlitm_unit_rpt: value?.mlitm_unit_rpt,
        mlitm_vcf:
          !value?.mlitm_qty_amb || value?.mlitm_qty_amb <= 0
            ? ''
            : value?.mlitm_qty_cor / value?.mlitm_qty_amb,
        // mlitm_qty_amb: _.round(_.toNumber(value?.mlitm_qty_amb), config.precisionVolume),
        // mlitm_qty_cor: _.round(_.toNumber(value?.mlitm_qty_cor), config.precisionVolume),
        // mlitm_qty_kg: _.round(_.toNumber(value?.mlitm_qty_kg), config.precisionMass),
        // mlitm_temp_amb: _.round(_.toNumber(value?.mlitm_temp_amb), config.precisionTemperature),
        // mlitm_dens_cor: _.round(_.toNumber(value?.mlitm_dens_cor), config.precisionDensity),
      });

      // initialize the quantity source for calculation
      if (value?.mlitm_qty_amb) {
        pinQuantity({
          qty: value?.mlitm_qty_amb,
          type: 'LT',
          title: t(config?.siteLabelUser + 'fields.observedQuantity'),
        });
      } else if (value?.mlitm_qty_cor) {
        pinQuantity({
          qty: value?.mlitm_qty_cor,
          type: 'L15',
          title: t(config?.siteLabelUser + 'fields.standardQuantity'),
        });
      } else if (value?.mlitm_qty_kg) {
        pinQuantity({
          qty: value?.mlitm_qty_kg,
          type: 'KG',
          title: t(config?.siteLabelUser + 'fields.observedMass'),
        });
      } else {
        pinQuantity({ qty: '', type: 'NA', title: t(config?.siteLabelUser + 'fields.observedQuantity') });
      }

      handleTemperatureChange(value?.mlitm_temp_amb);
      handleDensityChange(value?.mlitm_dens_cor);
      setWiA(true);
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
    const disabledStatus =
      value?.mlitm_status === '5' || value?.mlitm_status === '9' || value?.mlitm_status === '4';
    // console.log('I am here 999', tankSelected, disabledStatus, tank, value);
    if (tank && !disabledStatus && tankSelected) {
      setTankSelected(false);
      setLimit(null);
      getLimit(tank);
    }
  }, [getLimit, tank, value, tankSelected]);

  const setWiA = (fromDatabase) => {
    // WiA = WiV - GSV x 0.0011
    let WiV = getFieldValue('mlitm_qty_kg');
    let GSV = getFieldValue('mlitm_qty_cor');
    let Dstd = getFieldValue('mlitm_dens_cor');
    if (fromDatabase) {
      WiV = value?.mlitm_qty_kg;
      GSV = value?.mlitm_qty_cor;
      Dstd = value?.mlitm_dens_cor;
    }

    let WiA = calcWiA(WiV, GSV, Dstd, config?.airBuoyancyFactor);

    setFieldsValue({
      mlitm_air_kg: _.isNaN(WiA) ? '' : WiA,
    });
  };

  const handleAmbVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'LT', title: t(config?.siteLabelUser + 'fields.observedQuantity') });
    }
  };

  const handleCorVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'L15', title: t(config?.siteLabelUser + 'fields.standardQuantity') });
    }
    setWiA(false);
  };

  const handleMassQtyFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'KG', title: t(config?.siteLabelUser + 'fields.observedMass') });
    }
    setWiA(false);
  };

  const handleDensityChange = (value) => {
    const decimals = _.toString(value).split('.')[1]?.length;
    setDensDecimals(decimals);
    setWiA(false);
  };

  const handleTemperatureChange = (value) => {
    const decimals = _.toString(value).split('.')[1]?.length;
    setTempDecimals(decimals);
  };

  const validateDensity = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.standardDensity')}`);
      }
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);
    console.log('...............validateDensity', input, invalid, minDens, maxDens, limit);
    if (limit && maxDens !== undefined && input !== '' && !invalid && number > _.toNumber(maxDens)) {
      return Promise.reject(`${t('validate.outOfRangeMax')} ${maxDens} ─ ${t('descriptions.maxNumber')}`);
    }

    if (limit && minDens !== undefined && input !== '' && !invalid && number < _.toNumber(minDens)) {
      return Promise.reject(`${t('validate.outOfRangeMin')} ${minDens} ─ ${t('descriptions.minNumber')}`);
    }

    return Promise.resolve();
  };

  const validateTemperature = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.observedTemperature')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const precision = _.toString(number).split('.')[1]?.length || 0;

    if (invalid) {
      return Promise.reject(`${t('validate.wrongType')} ─ ${t('validate.mustBeNumber')}`);
    }

    /* if (precision > config?.precisionTemperature) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionTemperature} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    } */

    if (number < limit?.temp_lo || number > limit?.temp_hi) {
      return Promise.reject(
        `${t('validate.outOfRange')} ─ ${t('validate.mustBeBetween')} ${limit?.temp_lo} & ${limit?.temp_hi}`
      );
    }

    return Promise.resolve();
  };

  const validateAMB = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t(config?.siteLabelUser + 'fields.observedQuantity')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    /* if (decimals > config?.precisionVolume) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionVolume} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    } */

    return Promise.resolve();
  };

  const validateCOR = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t(config?.siteLabelUser + 'fields.standardQuantity')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    /* if (decimals > config?.precisionVolume) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionVolume} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    } */

    return Promise.resolve();
  };

  const validateVCF = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.vcf')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    /* if (decimals > config?.precisionVCF) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionVCF} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    } */

    return Promise.resolve();
  };

  const validateWIV = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t(config?.siteLabelUser + 'fields.observedMass')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (input !== '' && !invalid && number <= 0) {
      return Promise.reject(`${t('validate.positiveNumber')}`);
    }

    /* if (decimals > config?.precisionMass) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionMass} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    } */

    return Promise.resolve();
  };

  const validateWIA = (rule, input) => {
    if ((rule.required && input === '') || (rule.required && input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t(config?.siteLabelUser + 'fields.weightInAir')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    /* if (decimals > config?.precisionMass) {
      return Promise.reject(
        `${t('validate.decimalPlacesExceeded')} ${config?.precisionMass} ─ ${t(
          'descriptions.invalidDecimals'
        )}`
      );
    } */

    return Promise.resolve();
  };

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={config?.siteUseVCF ? 8 : 12}>
          <Form.Item
            name="mlitm_qty_amb"
            label={t(config?.siteLabelUser + 'fields.observedQuantity') + '(' + t('units.ltr') + ')'}
            rules={[{ required: config?.siteMandatoryTankCalcFields, validator: validateAMB }]}
          >
            <InputNumber
              min={0}
              max={999999999}
              precision={config.precisionVolume}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleAmbVolFieldChange}
            />
          </Form.Item>
        </Col>
        <Col span={config?.siteUseVCF ? 8 : 12}>
          <Form.Item
            name="mlitm_qty_cor"
            label={t(config?.siteLabelUser + 'fields.standardQuantity') + '(' + t('units.ltr') + ')'}
            rules={[{ required: config?.siteMandatoryTankCalcFields, validator: validateCOR }]}
          >
            <InputNumber
              min={0}
              max={999999999}
              precision={config.precisionVolume}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleCorVolFieldChange}
            />
          </Form.Item>
        </Col>
        {config?.siteUseVCF && (
          <Col span={8}>
            <Form.Item
              name="mlitm_vcf"
              label={t('fields.vcf')}
              rules={[{ required: false, validator: validateVCF }]}
            >
              <InputNumber
                min={0}
                max={999999999}
                precision={config.precisionVCF}
                disabled={true}
                style={{ width: '100%' }}
                // onChange={handleCorVolFieldChange}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={[8, 8]}>
        {config?.siteMassInVacuum && (
          <Col span={config?.siteMassInAir ? 12 : 24}>
            <Form.Item
              name="mlitm_qty_kg"
              label={t(config?.siteLabelUser + 'fields.observedMass') + '(' + t('units.kg') + ')'}
              rules={[{ required: config?.siteMandatoryTankCalcFields, validator: validateWIV }]}
            >
              <InputNumber
                min={0}
                max={999999999}
                precision={config.precisionMass}
                disabled={IS_DISALBED}
                style={{ width: '100%' }}
                onChange={handleMassQtyFieldChange}
              />
            </Form.Item>
          </Col>
        )}
        {config?.siteMassInAir && (
          <Col span={config?.siteMassInVacuum ? 12 : 24}>
            <Form.Item
              name="mlitm_air_kg"
              label={t(config?.siteLabelUser + 'fields.weightInAir') + '(' + t('units.kg') + ')'}
              rules={[{ required: false, validator: validateWIA }]}
            >
              <InputNumber
                min={0}
                max={999999999}
                precision={config.precisionMass}
                disabled={true}
                style={{ width: '100%' }}
                // onChange={handleMassQtyFieldChange}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="mlitm_dens_cor"
            label={
              `${t('fields.standardDensity')} ${limit ? `[${limit.density_lo} - ${limit.density_hi}]` : ''}` +
              '(' +
              t('units.kg/m3') +
              ')'
            }
            rules={[{ required: config?.siteMandatoryTankCalcFields, validator: validateDensity }]}
          >
            <InputNumber
              precision={densDecimals > config.precisionDensity ? config.precisionDensity : densDecimals}
              // min={limit ? _.round(_.toNumber(limit?.density_lo), config.precisionDensity) : limit?.density_lo}
              // max={limit ? _.round(_.toNumber(limit?.density_hi), config.precisionDensity) : limit?.density_hi}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
              onChange={handleDensityChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mlitm_temp_amb"
            label={
              `${t('fields.observedTemperature')} ${limit ? `[${limit.temp_lo} - ${limit.temp_hi}]` : ''}` +
              '(' +
              t('units.degC') +
              ')'
            }
            rules={[{ required: config?.siteMandatoryTankCalcFields, validator: validateTemperature }]}
          >
            <InputNumber
              precision={
                tempDecimals > config.precisionTemperature ? config.precisionTemperature : tempDecimals
              }
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
          <Form.Item name="mlitm_qty_rpt" label={t('fields.alternateQuantity')}>
            <InputNumber
              min={0}
              max={999999999}
              precision={config.precisionVolume}
              disabled={IS_DISALBED}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="mlitm_unit_rpt" label={t('fields.alternateUnit')}>
            <Select
              popupMatchSelectWidth={false}
              showSearch
              allowClear
              loading={isValidating}
              disabled={IS_DISALBED}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options?.records.map((item, index) => (
                <Select.Option key={index} value={item.unit_id}>
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
