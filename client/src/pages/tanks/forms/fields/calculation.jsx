import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RedoOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Select, Row, Col, Checkbox, Button } from 'antd';
import _ from 'lodash';
import { VCFManager, calcApiFromSg, calcSgFromApi, getTankVCF, getQtyByLevel } from '../../../../utils';
import { InputNumber as OmegaInputNumber } from '../../../../components';
// import CheckboxGroup from 'antd/es/checkbox/Group';
// import api, { TANK_STATUS } from '../../../../api';
import DensityManager from '../../theoretical-density';

const { Option } = Select;

const Calculation = ({ form, value, range, densRange, config, pinQuantity, pinDensity, noStrap }) => {
  const { t } = useTranslation();

  const { setFieldsValue, getFieldsValue } = form;

  const [densityMode, setDensityMode] = useState(value?.tank_dens_mode);
  const [tempBounds, setTempBounds] = useState({
    min: value?.tank_bclass_temp_lo || config.minTemperature,
    max: value?.tank_bclass_temp_hi || config.maxTemperature,
    type: 'ºC',
  });

  const lowSG = _.round(calcSgFromApi(range?.high), config?.precisionSG);
  const lowSGDef = _.round(calcSgFromApi(85), config?.precisionSG);
  const highSG = _.round(calcSgFromApi(range?.low), config?.precisionSG);
  const highSGDef = _.round(calcSgFromApi(0), config?.precisionSG);

  /* const getTankVCF = async (base, temp, density) => {
    const values = {
      tank_base: base,
      tank_qty_type: "LT",
      tank_qty_amount: 10000,
      tank_temp: temp,
      tank_density: density,
    };

    const results = await api.post(TANK_STATUS.CALCULATE_QUANTITY, values);
    // console.log('............getTankVCF', results);

    return results?.data;
  };

  const getQtyByLevel = async (code, level) => {
    const results = await api.get(`${TANK_STATUS.QTY_BY_LEVEL}?tank_code=${code}&tank_lvl=${level}`);
    console.log('............getQtyByLevel', results);

    return results?.data;
  }; */

  const onCheck = (v) => {
    setDensityMode(v.target.checked);
    setFieldsValue({
      tank_dens_mode: v.target.checked,
    });
  };

  const loadTheoreticalDensity = async (value) => {
    // const sealResults = await getTripSealByTrip(selectedSupplier, selectedTrip);

    setFieldsValue({
      tank_density: value?.std_dens_final,
    });
  };

  const onCalcTheoreticalDensity = () => {
    // pop up the dialog to calculate the theoretical density
    DensityManager(t('fields.theoreticalDensityCalc'), {}, loadTheoreticalDensity, '80vw', '40vh');
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        // tank_15_density: value?.tank_15_density,
        // tank_density: value?.tank_density,
        // tank_api: value?.tank_api,
        // tank_prod_lvl: value?.tank_prod_lvl,
        // tank_prod_c_of_e: value?.tank_prod_c_of_e,
        tank_temp: value?.tank_temp,
        // tank_amb_vol: value?.tank_amb_vol,
        // tank_cor_vol: value?.tank_cor_vol,
        // tank_liquid_kg: value?.tank_liquid_kg,
      });

      setDensityMode(value?.tank_dens_mode);

      // initialize the density source for calculation
      if (value?.tank_density) {
        pinDensity({ dens: value?.tank_density, type: 'D15C', title: t('fields.density') });
      } else if (value?.tank_api) {
        pinDensity({ dens: value?.tank_api, type: 'A60F', title: t('fields.api') });
      } else {
        pinDensity({ dens: value?.tank_15_density, type: 'D30C', title: t('fields.standardDensity') });
      }
      // initialize the quantity source for calculation
      if (value?.tank_amb_vol) {
        pinQuantity({
          qty: value?.tank_amb_vol,
          type: 'LT',
          title: t(config?.siteLabelUser + 'fields.ambientVolume'),
        });
      } else if (value?.tank_cor_vol) {
        pinQuantity({
          qty: value?.tank_cor_vol,
          type: 'L15',
          title: t(config?.siteLabelUser + 'fields.standardVolume'),
        });
      } else if (value?.tank_liquid_kg) {
        pinQuantity({
          qty: value?.tank_liquid_kg,
          type: 'KG',
          title: t(config?.siteLabelUser + 'fields.liquidMass'),
        });
      } else {
        pinQuantity({ qty: '', type: 'NA', title: t(config?.siteLabelUser + 'fields.ambientVolume') });
      }
    }
  }, [value, setFieldsValue, pinDensity, pinQuantity]);

  const handleTemperature = (selected) => {
    if (selected !== 'degC') {
      setTempBounds({
        min: VCFManager.temperatureC2F(value?.tank_bclass_temp_lo || config.minTemperature),
        max: VCFManager.temperatureC2F(value?.tank_bclass_temp_hi || config.maxTemperature),
        type: 'ºF',
      });
      setFieldsValue({
        tank_temp: VCFManager.temperatureC2F(value?.tank_temp),
      });
    } else {
      setTempBounds({
        min: value?.tank_bclass_temp_lo || config.minTemperature,
        max: value?.tank_bclass_temp_hi || config.maxTemperature,
        type: 'ºC',
      });

      setFieldsValue({
        tank_temp: value?.tank_temp,
      });
    }
  };

  const temperaturePostfix = (
    <Form.Item name="tank_temp_unit" noStyle>
      <Select
        style={{ width: '120px' }}
        defaultValue={config?.temperatureUnit || 'degC'}
        onChange={handleTemperature}
      >
        <Option value="degC">{t('units.celcius')}</Option>
        <Option value="degF">{t('units.fahrenheit')}</Option>
      </Select>
    </Form.Item>
  );

  const validateTemperature = (rule, input) => {
    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const precision = _.toString(number).split('.')[1]?.length || 0;

    if (invalid) {
      return Promise.reject(`${t('validate.wrongType')} ─ ${t('validate.mustBeNumber')}`);
    }

    if (precision > config.precisionTemperature) {
      return Promise.reject(`${t('validate.outOfRange')} ─ ${t('validate.decimalPlacesExceeded')}`);
    }

    if (number < tempBounds.min || number > tempBounds.max) {
      return Promise.reject(
        `${t('validate.outOfRange')} ─ ${t('validate.mustBeBetween')} ${tempBounds.min} & ${tempBounds.max}`
      );
    }

    return Promise.resolve();
  };

  const handleIfcVolFieldChange = (v) => {
    const values = getFieldsValue(['tank_total_vol', 'tank_water', 'tank_ifc']);
    const totalVol =
      values?.tank_total_vol === '' || values?.tank_total_vol === undefined ? 0 : values?.tank_total_vol;
    const waterVol = values?.tank_water === '' || values?.tank_water === undefined ? 0 : values?.tank_water;
    const ifcVol = v;
    const vol = totalVol - waterVol - ifcVol;
    // setFieldsValue({ tank_roof_weight: '' });
    setFieldsValue({ tank_amb_vol: vol });
    handleAmbVolFieldChange(vol);
  };

  const handleWaterLvlFieldChange = async (v) => {
    if (noStrap) {
      return;
    }
    if (!v || String(v).trim().length === 0) {
      return;
    }
    if (_.isNaN(_.toNumber(v))) {
      return;
    }
    if (_.toNumber(v) < 0) {
      return;
    }

    const values = getFieldsValue(['tank_total_vol', 'tank_water', 'tank_ifc']);
    const totalVol =
      values?.tank_total_vol === '' || values?.tank_total_vol === undefined ? 0 : values?.tank_total_vol;
    const waterVol = await getQtyByLevel(value?.tank_code, v);
    const ifcVol = values?.tank_ifc === '' || values?.tank_ifc === undefined ? 0 : values?.tank_ifc;
    const vol = totalVol - waterVol - ifcVol;
    setFieldsValue({ tank_amb_vol: vol });
    setFieldsValue({ tank_water: waterVol });
    handleAmbVolFieldChange(vol);
  };

  const handleWaterVolFieldChange = (v) => {
    const values = getFieldsValue(['tank_total_vol', 'tank_water', 'tank_ifc']);
    const totalVol =
      values?.tank_total_vol === '' || values?.tank_total_vol === undefined ? 0 : values?.tank_total_vol;
    const waterVol = v;
    const ifcVol = values?.tank_ifc === '' || values?.tank_ifc === undefined ? 0 : values?.tank_ifc;
    const vol = totalVol - waterVol - ifcVol;
    setFieldsValue({ tank_amb_vol: vol });
    handleAmbVolFieldChange(vol);
  };

  const handleProdLvlFieldChange = async (v) => {
    if (noStrap) {
      return;
    }
    if (!v || String(v).trim().length === 0) {
      return;
    }
    if (_.isNaN(_.toNumber(v))) {
      return;
    }
    if (_.toNumber(v) < 0) {
      return;
    }

    const values = getFieldsValue(['tank_total_vol', 'tank_water', 'tank_ifc']);
    const totalVol = await getQtyByLevel(value?.tank_code, v);
    const waterVol = values?.tank_water === '' || values?.tank_water === undefined ? 0 : values?.tank_water;
    const ifcVol = values?.tank_ifc === '' || values?.tank_ifc === undefined ? 0 : values?.tank_ifc;
    const vol = totalVol - waterVol - ifcVol;
    setFieldsValue({ tank_amb_vol: vol });
    setFieldsValue({ tank_total_vol: totalVol });
    handleAmbVolFieldChange(vol);
  };

  const handleTotalVolFieldChange = (v) => {
    const values = getFieldsValue(['tank_total_vol', 'tank_water', 'tank_ifc']);
    const totalVol = v;
    const waterVol = values?.tank_water === '' || values?.tank_water === undefined ? 0 : values?.tank_water;
    const ifcVol = values?.tank_ifc === '' || values?.tank_ifc === undefined ? 0 : values?.tank_ifc;
    const vol = totalVol - waterVol - ifcVol;
    setFieldsValue({ tank_amb_vol: vol });
    handleAmbVolFieldChange(vol);
  };

  const handleRoofWeightFieldChange = async (v) => {
    if (!v || String(v).trim().length === 0) {
      return;
    }
    if (_.toNumber(v) < 0) {
      return;
    }

    const values = getFieldsValue([
      'tank_total_vol',
      'tank_ifc',
      'tank_water',
      'tank_roof_weight',
      'tank_temp',
      'tank_density',
    ]);
    const totalVol =
      values?.tank_total_vol === '' || values?.tank_total_vol === undefined ? 0 : values?.tank_total_vol;
    const waterVol = values?.tank_water === '' || values?.tank_water === undefined ? 0 : values?.tank_water;
    const roofMass = v;
    const vcf = await getTankVCF(value?.tank_base, values?.tank_temp, values?.tank_density);
    const densAir = (vcf?.REAL_KG / 10000) * 1000;
    const ifcVol = (roofMass / densAir) * 1000;
    const vol = totalVol - waterVol - ifcVol;
    const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    setFieldsValue({ tank_amb_vol: _.round(vol, precision) });
    setFieldsValue({ tank_ifc: _.round(ifcVol, precision) });
    handleAmbVolFieldChange(vol);
  };

  const handleTempFieldChange = async (v) => {
    if (!config?.useWaterStrapping) {
      return;
    }
    const values = getFieldsValue([
      'tank_total_vol',
      'tank_ifc',
      'tank_water',
      'tank_roof_weight',
      'tank_temp',
      'tank_density',
    ]);
    const totalVol =
      values?.tank_total_vol === '' || values?.tank_total_vol === undefined ? 0 : values?.tank_total_vol;
    const waterVol = values?.tank_water === '' || values?.tank_water === undefined ? 0 : values?.tank_water;
    const roofMass =
      values?.tank_roof_weight === '' || values?.tank_roof_weight === undefined
        ? 0
        : values?.tank_roof_weight;
    const vcf = await getTankVCF(value?.tank_base, v?.target?.value, values?.tank_density);
    const densAir = (vcf?.REAL_KG / 10000) * 1000;
    const ifcVol = (roofMass / densAir) * 1000;
    const vol = totalVol - waterVol - ifcVol;
    const isAdtv = value?.tank_base_class === '6' || value?.tank_base_class === '11';
    const precision = isAdtv ? config?.precisionAdditive : config?.precisionVolume;
    setFieldsValue({ tank_amb_vol: _.round(vol, precision) });
    setFieldsValue({ tank_ifc: _.round(ifcVol, precision) });
    handleAmbVolFieldChange(vol);
  };

  const handleAmbVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'LT', title: t(config?.siteLabelUser + 'fields.ambientVolume') });
    }
  };

  const handleCorVolFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'L15', title: t(config?.siteLabelUser + 'fields.standardVolume') });
    }
  };

  const handleMassQtyFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinQuantity({ qty: value, type: 'KG', title: t(config?.siteLabelUser + 'fields.liquidMass') });
    }
  };

  // this is for tank_density
  const handleStdDensFieldChange = (value) => {
    //console.log('handleStdDensFieldChange', value);
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinDensity({ dens: value, type: 'D15C', title: t('fields.standardDensity') });
    }
  };

  // this is for tank_15_density
  const handleCorDensFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinDensity({ dens: value, type: 'D30C', title: t('fields.density') });
    }
  };

  const handleApiDensFieldChange = (value) => {
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      pinDensity({ dens: value, type: 'A60F', title: t('fields.api') });
    }
  };

  const handleSgDensFieldChange = (input) => {
    if (input !== undefined && input !== null && String(input).trim().length > 0) {
      const API = calcApiFromSg(input);
      value.tank_api = API;
      pinDensity({ dens: API, type: 'A60F', title: t('fields.api') });
    }
  };

  return (
    <>
      {/* config?.siteUseTankBatch && (
        <Form.Item
          name="tank_batch_no"
          label={t('fields.tankBatchNumber')}
        >
          <Input
            style={{ width: '100%' }}
            // type="number"
            // onChange={handleTempFieldChange}
          />
        </Form.Item>
      ) */}

      {config?.useWaterStrapping && (
        <Row gutter={[0, 0]}>
          <Col span={12}>
            <Form.Item name="tank_dens_mode" label={''}>
              <Checkbox checked={densityMode} onChange={onCheck}>
                {t('fields.theoreticalDensityEnabled')}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tank_theodens_calc" label={''}>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                style={{ float: 'right', marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                disabled={!densityMode}
                onClick={onCalcTheoreticalDensity}
              >
                {t('fields.theoreticalDensityCalc')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      )}

      <OmegaInputNumber
        form={form}
        value={value?.tank_density}
        name="tank_density"
        label={`${densityMode ? t('fields.theoreticalDensity') : t('fields.standardDensity')} (${
          densRange?.min
        } - ${densRange?.max})${t('units.kg/m3')} ${`@ ${t('fields.referenceTemperature')} ${
          config?.referenceTemperature
        }ºC/${VCFManager.temperatureC2F(config?.referenceTemperature)}ºF`}`}
        min={densRange?.min}
        max={densRange?.max}
        style={{ width: '100%' }}
        precision={config.precisionDensity}
        onChange={handleStdDensFieldChange} // D15C
      />
      {/* <Form.Item
        name="tank_density"
        label={`${t('fields.density')} (${value?.tank_base_dens_lo} - ${value?.tank_base_dens_hi}) ${`@${
          config?.vsmCompensation || config?.referenceTemperature
        }ºC/${VCFManager.temperatureC2F(config?.vsmCompensation || config?.referenceTemperature)}ºF`}`}
      >
        <InputNumber
          min={value?.tank_base_dens_lo}
          max={value?.tank_base_dens_hi}
          style={{ width: '100%' }}
          precision={config.precisionDensity}
          onChange={handleCorDensFieldChange}
        />
      </Form.Item> */}

      {config?.temperatureUnit === 'degC' &&
        config?.referenceTemperature === '15' &&
        config?.vsmCompensation === '30' && (
          <OmegaInputNumber
            form={form}
            value={value?.tank_15_density}
            name="tank_15_density"
            label={`${t('fields.density')} (${densRange?.min} - ${densRange?.max})${t(
              'units.kg/m3'
            )} ${`@ ${t('fields.compensationTemperature')} ${
              config?.vsmCompensation || config?.referenceTemperature
            }ºC/${VCFManager.temperatureC2F(config?.vsmCompensation || config?.referenceTemperature)}ºF`}`}
            min={densRange?.min}
            max={densRange?.max}
            style={{ width: '100%' }}
            precision={config.precisionDensity}
            onChange={handleCorDensFieldChange} // D30C
          />
          /* <Form.Item
          name="tank_15_density"
          label={`${t('fields.standardDensity')} (${value?.tank_base_dens_lo} - ${
            value?.tank_base_dens_hi
          }) ${`@${config?.referenceTemperature}ºC/${VCFManager.temperatureC2F(
            config?.referenceTemperature
          )}ºF`}`}
        >
          <InputNumber
            min={value?.tank_base_dens_lo}
            max={value?.tank_base_dens_hi}
            style={{ width: '100%' }}
            precision={config.precisionDensity}
            onChange={handleStdDensFieldChange}
            // formatter={value => value}
            // parser={value => value}
          />
        </Form.Item> */
        )}

      {config?.manageAPI && (
        <Row gutter={[8, 8]}>
          {config?.siteUseSG && (
            <Col span={12}>
              <OmegaInputNumber
                form={form}
                value={value?.tank_sg}
                name="tank_sg"
                label={`${t('fields.specificGravity')} (${lowSG || lowSGDef} - ${highSG || highSGDef})`}
                min={lowSG || lowSGDef}
                max={highSG || highSGDef}
                style={{ width: '100%' }}
                precision={config.precisionSG}
                onChange={handleSgDensFieldChange}
              />
              {/* <Form.Item
                name="tank_sg"
                label={`${t('fields.specificGravity')} (${lowSG || lowSGDef} - ${highSG || highSGDef})`}
              >
                <InputNumber
                  min={lowSG || lowSGDef}
                  max={highSG || highSGDef}
                  style={{ width: '100%' }}
                  precision={config.precisionSG}
                  onChange={handleSgDensFieldChange}
                />
              </Form.Item> */}
            </Col>
          )}
          <Col span={config?.siteUseSG ? 12 : 24}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_api}
              name="tank_api"
              label={`${t('fields.api')} (${range?.low || 0} - ${range?.high || 85})`}
              min={range?.low || 0}
              max={range?.high || 85}
              style={{ width: '100%' }}
              precision={config.precisionAPI}
              onChange={handleApiDensFieldChange}
            />
            {/* <Form.Item
              name="tank_api"
              label={`${t('fields.api')} (${range?.low || 0} - ${range?.high || 85})`}
            >
              <InputNumber
                min={range?.low || 0}
                max={range?.high || 85}
                style={{ width: '100%' }}
                precision={config.precisionAPI}
                onChange={handleApiDensFieldChange}
              />
            </Form.Item> */}
          </Col>
        </Row>
      )}

      {config?.useWaterStrapping && (
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_water_lvl}
              name="tank_water_lvl"
              label={`${t('fields.waterLevel')} (${t('units.mm')}) ${
                noStrap ? '(' + t('descriptions.strapDataNotFound') + ')' : ''
              }`}
              min={0}
              max={999999999}
              precision={config.precisionLevel}
              style={{ width: '100%' }}
              onChange={handleWaterLvlFieldChange}
            />
          </Col>
          <Col span={12}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_water}
              name="tank_water"
              label={`${t(config?.siteLabelUser + 'fields.waterVolume')} (${t('units.litres')})`}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={config.precisionVolume}
              onChange={handleWaterVolFieldChange}
            />
          </Col>
        </Row>
      )}

      {config?.useWaterStrapping && (
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_roof_weight}
              name="tank_roof_weight"
              label={`${t('fields.tankRoofWeight')} (${t('units.kg')})`}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={config.precisionVolume}
              onChange={handleRoofWeightFieldChange}
            />
          </Col>
          <Col span={12}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_ifc}
              name="tank_ifc"
              label={`${t('fields.tankIFC')} (${t('units.litres')})`}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={config.precisionVolume}
              onChange={handleIfcVolFieldChange}
            />
          </Col>
        </Row>
      )}

      <Row gutter={[8, 8]}>
        <Col span={config?.useWaterStrapping ? 12 : 24}>
          <OmegaInputNumber
            form={form}
            value={value?.tank_prod_lvl}
            name="tank_prod_lvl"
            label={`${t('fields.productLevel')} (${t('units.mm')}) ${
              noStrap ? '(' + t('descriptions.strapDataNotFound') + ')' : ''
            }`}
            min={0}
            max={999999999}
            precision={config.precisionLevel}
            style={{ width: '100%' }}
            onChange={handleProdLvlFieldChange}
          />
          {/* <Form.Item name="tank_prod_lvl" label={`${t('fields.productLevel')} (${t('units.mm')})`}>
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item> */}
        </Col>
        {config?.useWaterStrapping && (
          <Col span={12}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_total_vol}
              name="tank_total_vol"
              label={`${t(config?.siteLabelUser + 'fields.tankProdVolume')} (${t('units.litres')})`}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={config.precisionVolume}
              onChange={handleTotalVolFieldChange}
            />
          </Col>
        )}
      </Row>

      <OmegaInputNumber
        form={form}
        value={
          value?.tank_prod_c_of_e === '0' || value?.tank_prod_c_of_e === 0 ? '' : value?.tank_prod_c_of_e
        }
        name="tank_prod_c_of_e"
        label={`${t('fields.expCoeff')} (0.000414 - 0.001674)`}
        min={0.000414}
        max={0.001674}
        style={{ width: '100%' }}
      />
      {/* <Form.Item name="tank_prod_c_of_e" label={`${t('fields.expCoeff')} (0.000414 - 0.001674)`}>
        <InputNumber min={0.000414} step={0.0001} max={0.001674} style={{ width: '100%' }} />
      </Form.Item> */}

      <Form.Item
        name="tank_temp"
        label={`${t('fields.observedTemperature')} (${tempBounds.min}${tempBounds.type} - ${tempBounds.max}${
          tempBounds.type
        })`}
        rules={[{ validator: validateTemperature }]}
      >
        <Input
          style={{ width: '100%' }}
          addonAfter={temperaturePostfix}
          type="number"
          onChange={handleTempFieldChange}
        />
      </Form.Item>

      <OmegaInputNumber
        form={form}
        value={value?.tank_amb_vol}
        name="tank_amb_vol"
        label={`${t(config?.siteLabelUser + 'fields.ambientVolume')} (${t('units.litres')})`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={value?.tank_base_class === '6' ? config.precisionAdditive : config.precisionVolume}
        onChange={handleAmbVolFieldChange}
      />
      {/* <Form.Item name="tank_amb_vol" label={`${t('fields.ambientVolume')} (${t('units.litres')})`}>
        <InputNumber
          min={0}
          max={999999999}
          style={{ width: '100%' }}
          precision={value?.tank_base_class==='6' ? config.precisionAdditive : config.precisionVolume}
          onChange={handleAmbVolFieldChange}
        />
      </Form.Item> */}

      <Row gutter={[8, 8]}>
        <Col span={config?.useWaterStrapping ? 12 : 24}>
          <OmegaInputNumber
            form={form}
            value={value?.tank_cor_vol}
            name="tank_cor_vol"
            label={`${t(config?.siteLabelUser + 'fields.standardVolume')} (${t('units.litres')})`}
            min={0}
            max={999999999}
            style={{ width: '100%' }}
            precision={value?.tank_base_class === '6' ? config.precisionAdditive : config.precisionVolume}
            onChange={handleCorVolFieldChange}
          />
          {/* <Form.Item name="tank_cor_vol" label={`${t('fields.standardVolume')} (${t('units.litres')})`}>
            <InputNumber
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={value?.tank_base_class==='6' ? config.precisionAdditive : config.precisionVolume}
              onChange={handleCorVolFieldChange}
            />
          </Form.Item> */}
        </Col>
        {config?.useWaterStrapping && (
          <Col span={12}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_vcf}
              name="tank_vcf"
              label={t('fields.vcf')}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={4}
              disabled={true}
              // onChange={handleCorVolFieldChange}
            />
          </Col>
        )}
      </Row>

      <Row gutter={[8, 8]}>
        {config?.siteMassInVacuum && (
          <Col span={config?.siteMassInAir ? 12 : 24}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_liquid_kg}
              name="tank_liquid_kg"
              label={`${t(config?.siteLabelUser + 'fields.liquidMass')} (${t('units.kg')})`}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={value?.tank_base_class === '6' ? config.precisionAdditive : config.precisionMass}
              onChange={handleMassQtyFieldChange}
            />
          </Col>
        )}
        {config?.siteMassInAir && (
          <Col span={config?.siteMassInVacuum ? 12 : 24}>
            <OmegaInputNumber
              form={form}
              value={value?.tank_air_kg}
              name="tank_air_kg"
              label={`${t(config?.siteLabelUser + 'fields.weightInAir')} (${t('units.kg')})`}
              min={0}
              max={999999999}
              style={{ width: '100%' }}
              precision={value?.tank_base_class === '6' ? config.precisionAdditive : config.precisionMass}
              disabled={true}
              // onChange={handleMassQtyFieldChange}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Calculation;
