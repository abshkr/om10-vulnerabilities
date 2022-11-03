import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';
import { validateField, calcWiA } from '../../../../../../../utils';

const AirMass = ({ form, value, pageState, config, wiv, gsv, dstd }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const getWiA = (mass, std, dens) => {
    // WiA = WiV - GSV x 0.0011
    let WiV = mass;
    let GSV = std;
    let Dstd = dens;

    let WiA = calcWiA(WiV, GSV, Dstd, config?.airBuoyancyFactor);

    return WiA;
  };

  /* useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_air_kg: !value?.mlitm_air_kg 
            ? getWiA(value, config?.airBuoyancyFactor)
            : value?.mlitm_air_kg,
      });
    }
  }, [value, setFieldsValue]); */

  useEffect(() => {
    const WiA = getWiA(wiv, gsv, dstd);
    setFieldsValue({ mlitm_air_kg: _.isNaN(WiA) ? '' : WiA });
  }, [wiv, gsv, dstd, setFieldsValue]);

  return (
    <Form.Item
      name="mlitm_air_kg"
      label={t(config?.siteLabelUser + 'fields.weightInAir') + '(' + t('units.kg') + ')'}
      // rules={[{ required: false, validator: validate }]}
      rules={[
        {
          required: false,
          title: t(config?.siteLabelUser + 'fields.weightInAir'),
          dataType: 'NUMBER',
          // maxLength: 9,
          precision: null, // config.precisionMass,
          min: 0,
          max: 999999999,
          prompts: t,
          // returnType: 'notice',
          validator: validateField,
        },
      ]}
    >
      <InputNumber
        // min={0}
        // max={999999999}
        precision={config.precisionMass}
        style={{ width: '100%' }}
        // onChange={handleFieldChange}
        disabled={true}
      />
    </Form.Item>
  );
};

export default AirMass;
