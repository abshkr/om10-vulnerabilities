import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';
import { calcArmDensity, getDensityRange, validateField } from '../../../../../../../utils';

const StdDensity = ({ form, value, tank, arm, pageState, config, setValue }) => {
  const [minDens, setMinDens] = useState(config.minDensity);
  const [maxDens, setMaxDens] = useState(config.maxDensity);

  console.log('in StdDensity', tank);
  const { t } = useTranslation();

  const { setFieldsValue, validateFields } = form;

  /* const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranStdDens')}`);
      }
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    const number = _.toNumber(input);
    const invalid = _.isNaN(number);
    if (maxDens !== undefined && input !== '' && !invalid && number > _.toNumber(maxDens)) {
      return Promise.reject(`${t('validate.outOfRangeMax')} ${maxDens} ─ ${t('descriptions.maxNumber')}`);
    }

    if (minDens !== undefined && input !== '' && !invalid && number < _.toNumber(minDens)) {
      return Promise.reject(`${t('validate.outOfRangeMin')} ${minDens} ─ ${t('descriptions.minNumber')}`);
    }

    return Promise.resolve();
  }; */

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_dens_cor: value.mlitm_dens_cor,
      });

      setValue(value.mlitm_dens_cor);
    }
  }, [value, setFieldsValue, setValue]);

  useEffect(() => {
    // console.log('validateFields([mlitm_dens_cor]);');
    validateFields(['mlitm_dens_cor']);
  }, [minDens, maxDens, validateFields]);

  useEffect(() => {
    if (tank && tank.length > 0) {
      setFieldsValue({
        mlitm_dens_cor: tank?.[0]?.tank_density,
      });

      const densRange = getDensityRange({
        manageFlag: config.manageBaseProductDensityRange,
        useFlag: config.useBaseProductDensityRange,
        minDefaultDensity: config.minDensity,
        maxDefaultDensity: config.maxDensity,
        minClassDensity: tank?.[0]?.bclass_dens_lo,
        maxClassDensity: tank?.[0]?.bclass_dens_hi,
        minBaseDensity: tank?.[0]?.base_dens_lo,
        maxBaseDensity: tank?.[0]?.base_dens_hi,
      });
      setMinDens(densRange.min);
      setMaxDens(densRange.max);
      setValue(tank?.[0]?.tank_density);

      /* if (!tank?.[0]?.base_dens_lo) {
        setMinDens(tank?.[0]?.bclass_dens_lo);
      } else {
        if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
          setMinDens(tank?.[0]?.base_dens_lo);
        } else {
          setMinDens(tank?.[0]?.bclass_dens_lo);
        }
      }
      if (!tank?.[0]?.base_dens_hi) {
        setMaxDens(tank?.[0]?.bclass_dens_hi);
      } else {
        if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
          setMaxDens(tank?.[0]?.base_dens_hi);
        } else {
          setMaxDens(tank?.[0]?.bclass_dens_hi);
        }
      } */
    } else {
      if (arm) {
        if (arm.length <= 1) {
          setFieldsValue({
            mlitm_dens_cor: arm?.[0]?.stream_tankden,
          });
          // setMinDens(tank?.[0]?.bclass_dens_lo);
          // setMaxDens(tank?.[0]?.bclass_dens_hi);
          setMinDens(config.minDensity);
          setMaxDens(config.maxDensity);
          setValue(arm?.[0]?.stream_tankden);
        } else {
          const armDens = calcArmDensity(arm?.[0]?.stream_armcode, arm);
          setFieldsValue({
            mlitm_dens_cor: armDens,
          });
          // setMinDens(tank?.[0]?.bclass_dens_lo);
          // setMaxDens(tank?.[0]?.bclass_dens_hi);
          setMinDens(config.minDensity);
          setMaxDens(config.maxDensity);
          setValue(armDens);
        }
      } else {
        setFieldsValue({
          mlitm_dens_cor: null,
        });
        setMinDens(config.minDensity);
        setMaxDens(config.maxDensity);
        setValue(null);
      }
    }

    // console.log('validateFields([mlitm_dens_cor]);222');
    validateFields(['mlitm_dens_cor']);
  }, [tank, arm, config, setFieldsValue, setMinDens, setMaxDens, validateFields, setValue]);

  return (
    <Form.Item
      name="mlitm_dens_cor"
      label={
        t('fields.nomtranStdDens') +
        '[' +
        String(minDens) +
        ' ~ ' +
        String(maxDens) +
        '](' +
        t('units.kg/m3') +
        ')'
      }
      // rules={[{ required: false, validator: validate }]}
      rules={[
        {
          required: false,
          title: t('fields.nomtranStdDens'),
          dataType: 'NUMBER',
          // maxLength: 9,
          precision: null, // config.precisionDensity,
          min: _.toNumber(minDens),
          max: _.toNumber(maxDens),
          prompts: t,
          // returnType: 'notice',
          validator: validateField,
        },
      ]}
    >
      <InputNumber
        style={{ width: '100%' }}
        disabled={pageState === 'transfer' ? false : false}
        // placeholder={String(minDens) + ' ~ ' + String(maxDens)}
        // min={_.toNumber(minDens)}
        // max={_.toNumber(maxDens)}
        precision={config.precisionDensity}
        onChange={setValue}
        //step={0.01}
      />
    </Form.Item>
  );
};

export default StdDensity;
