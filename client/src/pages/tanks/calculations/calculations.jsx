import React, { useState, useEffect } from 'react';

import { QuestionCircleOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Card, notification, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';

import _ from 'lodash';

import Calculation from '../forms/fields/calculation';
import { VCFManager, getDensityRange, getQtyByLevel } from '../../../utils';
import api, { TANKS, TANK_STATUS } from '../../../api';

const Calculations = ({ selected, access, isLoading, config, setSelected }) => {
  const { data: counter } = useSWR(
    `${TANK_STATUS.COUNT_STRAPS}?tank_code=${selected?.tank_code}&tank_terminal=${selected?.tank_terminal}`
  );

  const [quantitySource, setQuantitySource] = useState(null);
  const [densitySource, setDensitySource] = useState(null);
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const handleDensitySource = (source) => {
    const payload = {
      reference: _.toNumber(config?.vsmCompensation) || 15,
    };

    const converted = _.toNumber(source?.dens);
    const valid = _.isNumber(converted);

    if (valid) {
      payload.value = converted;
      payload.type = source?.type;
    } else {
      payload.value = converted;
      payload.type = 'NA';
    }

    return payload;
  };

  const handleDensityType = (type) => {
    const { tank_15_density, tank_density, tank_api } = form.getFieldsValue([
      'tank_15_density',
      'tank_density',
      'tank_api',
    ]);

    const payload = {
      reference: _.toNumber(config?.vsmCompensation) || 15,
    };

    if (type === 'D15C') {
      const converted = _.toNumber(tank_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'D15C';
      }
    } else if (type === 'D30C') {
      const converted = _.toNumber(tank_15_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'D30C';
      }
    } else if (type === 'A60F') {
      const converted = _.toNumber(tank_api);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'A60F';
      }
    } else {
      const converted = _.toNumber(tank_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'NA';
      }
    }

    return payload;
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.tank_code = selected?.tank_code;

    if (values?.tank_prod_c_of_e === '') {
      values.tank_prod_c_of_e = 0;
    }

    const payload = _.omit(
      {
        ...values,
        tank_temp:
          values?.tank_temp_unit !== 'degF' ? values.tank_temp : VCFManager.temperatureF2C(values.tank_temp),
      },
      ['tank_temp_unit']
    );

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANKS.UPDATE, payload)
          .then(() => {
            mutate(TANKS.READ);
            // to refresh changes in the form, need to NULL the selected
            setSelected(null);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const handleAPIRange = (low, high) => {
    if (low && high) {
      const end = VCFManager.api(low);
      const start = VCFManager.api(high);

      return {
        low: _.round(start, config.precisionAPI),
        high: _.round(end, config.precisionAPI),
      };
    } else {
      return {
        low: 0,
        high: 85,
      };
    }
  };

  const onCalculateByDensity = () => {
    Modal.confirm({
      title:
        t('prompts.calculate') +
        ' (' +
        t('descriptions.lastFieldChanged') +
        ': ' +
        densitySource?.title +
        ')',
      okText: t('operations.calculate'),
      okType: 'primary',
      width: '30vw',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,

      /* content: (
        <Form form={form} initialValues={{ type: 'D15C' }}>
          <Form.Item name="type">
            <Radio.Group style={{ width: '25vw', marginBottom: 15, marginTop: 5 }}>
              <Radio value="D15C">Use Standard</Radio>
              <Radio value="D30C">Use Corrected</Radio>
              <Radio value="A60F">Use API</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ), */

      onOk: () => {
        const base = selected?.tank_base_class;
        //const type = form.getFieldValue('type');
        const type = densitySource?.type;
        //const payload = handleDensityType(type);
        const payload = handleDensitySource(densitySource);
        console.log('calculation simple', payload);

        if (base !== '6') {
          if (payload.type === 'D15C') {
            // tank_density as source
            const densityAtXC = VCFManager.densityAtXC(payload.value, payload.reference);
            const densityAt60F = VCFManager.densityAt60F(payload.value, payload.reference, 'C');
            const api = VCFManager.api(densityAt60F);

            form.setFieldsValue({
              tank_15_density: densityAtXC.toFixed(config.precisionDensity),
              tank_api: api.toFixed(config.precisionAPI),
            });
          }

          if (payload.type === 'D30C') {
            // tank_15_density as source
            const density15C = VCFManager.density15CFromXC(
              payload.value,
              payload.reference,
              config.precisionDensity
            );
            const densityAt60F = VCFManager.densityAt60F(density15C);
            const api = VCFManager.api(densityAt60F);
            console.log('D30C', density15C, densityAt60F, api);

            form.setFieldsValue({
              tank_density: density15C.toFixed(config.precisionDensity),
              tank_api: api.toFixed(config.precisionAPI),
            });
          }

          if (payload.type === 'A60F') {
            const densityAt15C = VCFManager.densityAt15C(payload.value);
            const densityAtXC = VCFManager.densityAtXC(densityAt15C, payload.reference);

            form.setFieldsValue({
              tank_15_density: densityAtXC.toFixed(config.precisionDensity), // D30C
              tank_density: densityAt15C.toFixed(config.precisionDensity), // D15C
            });
          }
        } else {
          if (payload.type === 'D15C') {
            // tank_density as source
            const density = payload.value;
            const densityAt60F = VCFManager.densityAt60F(density);
            const api = VCFManager.api(densityAt60F);

            form.setFieldsValue({
              tank_15_density: density.toFixed(config.precisionDensity),
              tank_api: api.toFixed(config.precisionAPI),
            });
          }

          if (payload.type === 'D30C') {
            // tank_15_density as source
            const density = payload.value;
            const densityAt60F = VCFManager.densityAt60F(density);
            const api = VCFManager.api(densityAt60F);

            form.setFieldsValue({
              tank_density: density.toFixed(config.precisionDensity),
              tank_api: api.toFixed(config.precisionAPI),
            });
          }

          if (payload.type === 'A60F') {
            const density = VCFManager.densityAt60F(payload.value);

            form.setFieldsValue({
              tank_density: density.toFixed(config.precisionDensity),
            });
          }
        }
      },
    });
  };

  const onCalculateByLevel = () => {
    const { getFieldsValue, setFieldsValue } = form;

    const payload = getFieldsValue([
      'tank_amb_vol',
      'tank_temp',
      'tank_density',
      'tank_15_density',
      'tank_prod_lvl',
    ]);

    if (!payload?.tank_prod_lvl || String(payload?.tank_prod_lvl).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.productLevel'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_prod_lvl) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.productLevel'),
      });
      return;
    }
    if ((!payload?.tank_temp && payload?.tank_temp !== 0) || String(payload?.tank_temp).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedTemperature'),
      });
      return;
    }
    /* if (_.toNumber(payload?.tank_temp) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.observedTemperature'),
      });
      return;
    } */
    if (!payload?.tank_density || String(payload?.tank_density).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.density'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_density) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.density'),
      });
      return;
    }

    const values = {
      tank_code: selected?.tank_code,
      tank_base: selected?.tank_base,
      tank_qty_type: 'LT',
      tank_qty_amount: payload?.tank_amb_vol,
      tank_temp: payload?.tank_temp,
      tank_density: payload?.tank_density,
      tank_15_density: payload?.tank_15_density,
      tank_prod_lvl: payload?.tank_prod_lvl,
    };

    const isAdtv = selected?.tank_base_class === '6' || selected?.tank_base_class === '11';

    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.calculate'),
      okType: 'primary',
      width: '30vw',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANK_STATUS.CALCULATE_BY_LEVEL, values)
          .then((response) => {
            if (!response?.data?.REAL_LITRE) {
              notification.error({
                message: t('descriptions.calculateFailed'),
                description: response?.data?.MSG_CODE + ': ' + response?.data?.MSG_DESC,
              });
            } else {
              const WIA =
                _.toNumber(response?.data?.REAL_KG) -
                _.toNumber(response?.data?.REAL_LITRE15) * config?.airBuoyancyFactor;
              setFieldsValue({
                tank_amb_vol: _.round(
                  response?.data?.REAL_LITRE,
                  isAdtv ? config.precisionAdditive : config.precisionVolume
                ),
                tank_cor_vol: _.round(
                  response?.data?.REAL_LITRE15,
                  isAdtv ? config.precisionAdditive : config.precisionVolume
                ),
                tank_liquid_kg: _.round(
                  response?.data?.REAL_KG,
                  isAdtv ? config.precisionAdditive : config.precisionMass
                ),
                tank_vcf: _.round(response?.data?.REAL_VCF, config?.precisionVCF),
                tank_air_kg: _.round(WIA, isAdtv ? config.precisionAdditive : config.precisionMass),
              });
              notification.success({
                message: t('messages.calculateSuccess'),
                description: t('descriptions.calculateSuccess'),
              });
            }
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.calculateFailed'),
            });
          });
      },
    });
  };

  const onCalculateByAllLevels = async () => {
    const { getFieldsValue, setFieldsValue } = form;

    const payload = getFieldsValue([
      'tank_amb_vol',
      'tank_temp',
      'tank_density',
      'tank_15_density',
      'tank_prod_lvl',
      'tank_water_lvl',
      'tank_ifc',
    ]);

    if (
      (!payload?.tank_ifc && _.toNumber(payload?.tank_ifc) !== 0) ||
      String(payload?.tank_ifc).trim().length === 0
    ) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.tankIFC'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_ifc) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.tankIFC'),
      });
      return;
    }

    if (
      (!payload?.tank_water_lvl && _.toNumber(payload?.tank_water_lvl) !== 0) ||
      String(payload?.tank_water_lvl).trim().length === 0
    ) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.waterLevel'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_water_lvl) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.waterLevel'),
      });
      return;
    }

    if (!payload?.tank_prod_lvl || String(payload?.tank_prod_lvl).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.productLevel'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_prod_lvl) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.productLevel'),
      });
      return;
    }
    if ((!payload?.tank_temp && payload?.tank_temp !== 0) || String(payload?.tank_temp).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedTemperature'),
      });
      return;
    }
    if (!payload?.tank_density || String(payload?.tank_density).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.density'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_density) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.density'),
      });
      return;
    }

    const isAdtv = selected?.tank_base_class === '6' || selected?.tank_base_class === '11';

    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.calculate'),
      okType: 'primary',
      width: '30vw',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        // get the water volume from water level
        const waterVol = await getQtyByLevel(selected?.tank_code, _.toNumber(payload?.tank_water_lvl));
        // get the total volume from prod level
        const totalVol = await getQtyByLevel(selected?.tank_code, _.toNumber(payload?.tank_prod_lvl));
        // get the ambient volume
        const ambVol = totalVol - waterVol - _.toNumber(payload?.tank_ifc);
        setFieldsValue({ tank_total_vol: totalVol });
        setFieldsValue({ tank_water: waterVol });
        setFieldsValue({ tank_amb_vol: ambVol });

        const values = {
          tank_base: selected?.tank_base,
          tank_qty_type: 'LT',
          tank_qty_amount: ambVol,
          tank_temp: payload?.tank_temp,
          tank_density: payload?.tank_density,
          tank_prod_lvl: payload?.tank_prod_lvl,
          tank_code: selected?.tank_code,
        };

        await api
          .post(TANK_STATUS.CALCULATE_QUANTITY, values)
          .then((response) => {
            if (!response?.data?.REAL_LITRE) {
              notification.error({
                message: t('descriptions.calculateFailed'),
                description: response?.data?.MSG_CODE + ': ' + response?.data?.MSG_DESC,
              });
            } else {
              const WIA =
                _.toNumber(response?.data?.REAL_KG) -
                _.toNumber(response?.data?.REAL_LITRE15) * config?.airBuoyancyFactor;
              setFieldsValue({
                tank_amb_vol: _.round(
                  response?.data?.REAL_LITRE,
                  isAdtv ? config.precisionAdditive : config.precisionVolume
                ),
                tank_cor_vol: _.round(
                  response?.data?.REAL_LITRE15,
                  isAdtv ? config.precisionAdditive : config.precisionVolume
                ),
                tank_liquid_kg: _.round(
                  response?.data?.REAL_KG,
                  isAdtv ? config.precisionAdditive : config.precisionMass
                ),
                tank_vcf: _.round(response?.data?.REAL_VCF, config?.precisionVCF),
                tank_air_kg: _.round(WIA, isAdtv ? config.precisionAdditive : config.precisionMass),
              });
              // selected.tank_amb_vol = _.round(response?.data?.REAL_LITRE, isAdtv ? config.precisionAdditive : config.precisionVolume);
              // selected.tank_cor_vol = _.round(response?.data?.REAL_LITRE15, isAdtv ? config.precisionAdditive : config.precisionVolume);
              // selected.tank_liquid_kg = _.round(response?.data?.REAL_LITRE15, isAdtv ? config.precisionAdditive : config.precisionMass);
              notification.success({
                message: t('messages.calculateSuccess'),
                description: t('descriptions.calculateSuccess'),
              });
            }
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.calculateFailed'),
            });
          });
      },
    });
  };

  const onCalculateByQuantity = () => {
    const { getFieldsValue, setFieldsValue } = form;

    const payload = getFieldsValue([
      'tank_temp',
      'tank_density',
      'tank_amb_vol',
      'tank_prod_lvl',
      'tank_cor_vol',
      'tank_liquid_kg',
    ]);

    if (
      String(payload?.tank_amb_vol).trim().length === 0 &&
      String(payload?.tank_cor_vol).trim().length === 0 &&
      String(payload?.tank_liquid_kg).trim().length === 0
    ) {
      notification.error({
        message: t('validate.set'),
        description:
          t(config?.siteLabelUser + 'fields.ambientVolume') +
          t('descriptions.or') +
          t(config?.siteLabelUser + 'fields.standardVolume') +
          t('descriptions.or') +
          t(config?.siteLabelUser + 'fields.liquidMass'),
      });
      return;
    }

    if (!quantitySource || String(quantitySource?.qty).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: !quantitySource
          ? t(config?.siteLabelUser + 'fields.observedQuantity') +
            t('descriptions.or') +
            t(config?.siteLabelUser + 'fields.standardQuantity') +
            t('descriptions.or') +
            t(config?.siteLabelUser + 'fields.observedMass')
          : quantitySource?.title,
      });
      return;
    }
    if (_.toNumber(quantitySource?.qty) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: quantitySource?.title,
      });
      return;
    }
    if ((!payload?.tank_temp && payload?.tank_temp !== 0) || String(payload?.tank_temp).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedTemperature'),
      });
      return;
    }
    /* if (_.toNumber(payload?.tank_temp) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.observedTemperature'),
      });
      return;
    } */
    if (!payload?.tank_density || String(payload?.tank_density).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.density'),
      });
      return;
    }
    if (_.toNumber(payload?.tank_density) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.density'),
      });
      return;
    }

    const isAdtv = selected?.tank_base_class === '6' || selected?.tank_base_class === '11';

    Modal.confirm({
      title:
        t('prompts.calculate') +
        ' (' +
        t('descriptions.lastFieldChanged') +
        ': ' +
        quantitySource?.title +
        ')',
      okText: t('operations.calculate'),
      okType: 'primary',
      width: '30vw',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,

      /* content: (
        <Form form={form} initialValues={{ volume_type: 'LT' }}>
          <Form.Item name="volume_type">
            <Radio.Group style={{ width: '30vw', marginBottom: 10, marginTop: 10 }}>
              <Radio value="LT">Use Ambient Volume</Radio>
              <Radio value="L15">Use Standard Volume</Radio>
              <Radio value="KG">Use Liquid Mass</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ), */

      onOk: async () => {
        /* const type = form.getFieldValue('volume_type');

        const getLevel = (calculateBy) => {
          switch (calculateBy) {
            case 'LT':
              return payload?.tank_amb_vol;

            case 'L15':
              return payload?.tank_cor_vol;

            case 'KG':
              return payload?.tank_liquid_kg;

            default:
              return 0;
          }
        }; */

        const values = {
          tank_base: selected?.tank_base,
          // tank_qty_type: type,
          // tank_qty_amount: getLevel(type),
          tank_qty_type: quantitySource?.type,
          tank_qty_amount: quantitySource?.qty,
          tank_temp: payload?.tank_temp,
          tank_density: payload?.tank_density,
          tank_prod_lvl: payload?.tank_prod_lvl,
          tank_code: selected?.tank_code,
        };

        await api
          .post(TANK_STATUS.CALCULATE_QUANTITY, values)
          .then((response) => {
            if (!response?.data?.REAL_LITRE) {
              notification.error({
                message: t('descriptions.calculateFailed'),
                description: response?.data?.MSG_CODE + ': ' + response?.data?.MSG_DESC,
              });
            } else {
              const WIA =
                _.toNumber(response?.data?.REAL_KG) -
                _.toNumber(response?.data?.REAL_LITRE15) * config?.airBuoyancyFactor;
              setFieldsValue({
                tank_amb_vol: _.round(
                  response?.data?.REAL_LITRE,
                  isAdtv ? config.precisionAdditive : config.precisionVolume
                ),
                tank_cor_vol: _.round(
                  response?.data?.REAL_LITRE15,
                  isAdtv ? config.precisionAdditive : config.precisionVolume
                ),
                tank_liquid_kg: _.round(
                  response?.data?.REAL_KG,
                  isAdtv ? config.precisionAdditive : config.precisionMass
                ),
                tank_vcf: _.round(response?.data?.REAL_VCF, config?.precisionVCF),
                tank_air_kg: _.round(WIA, isAdtv ? config.precisionAdditive : config.precisionMass),
              });
              // selected.tank_amb_vol = _.round(response?.data?.REAL_LITRE, isAdtv ? config.precisionAdditive : config.precisionVolume);
              // selected.tank_cor_vol = _.round(response?.data?.REAL_LITRE15, isAdtv ? config.precisionAdditive : config.precisionVolume);
              // selected.tank_liquid_kg = _.round(response?.data?.REAL_LITRE15, isAdtv ? config.precisionAdditive : config.precisionMass);
              notification.success({
                message: t('messages.calculateSuccess'),
                description: t('descriptions.calculateSuccess'),
              });
            }
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.calculateFailed'),
            });
          });
      },
    });
  };

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        ...selected,
      });
    }
  }, [selected]);

  /* const getTankDensHi = (value, config) => {
    let density_hi = 2000;
    if (!value?.tank_base_dens_hi) {
      density_hi = value?.tank_bclass_dens_hi;
    } else {
      if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
        density_hi = value?.tank_base_dens_hi;
      } else {
        density_hi = value?.tank_bclass_dens_hi;
      }
    }
    return density_hi;
  };

  const getTankDensLo = (value, config) => {
    let density_lo = 0;
    if (!value?.tank_base_dens_lo) {
      density_lo = value?.tank_bclass_dens_lo;
    } else {
      if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
        density_lo = value?.tank_base_dens_lo;
      } else {
        density_lo = value?.tank_bclass_dens_lo;
      }
    }
    return density_lo;
  };

  const densRange = {
    min: getTankDensLo(selected, config),
    max: getTankDensHi(selected, config),
  }; */

  const densRange = getDensityRange({
    manageFlag: config.manageBaseProductDensityRange,
    useFlag: config.useBaseProductDensityRange,
    minDefaultDensity: config.minDensity,
    maxDefaultDensity: config.maxDensity,
    minClassDensity: selected?.tank_bclass_dens_lo,
    maxClassDensity: selected?.tank_bclass_dens_hi,
    minBaseDensity: selected?.tank_base_dens_lo,
    maxBaseDensity: selected?.tank_base_dens_hi,
  });
  const range = handleAPIRange(densRange.min, densRange.max);
  // const range = handleAPIRange(selected?.tank_base_dens_lo, selected?.tank_base_dens_hi);

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} scrollToFirstError initialValues={selected}>
      <Card
        loading={isLoading}
        actions={[
          <Form.Item>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canUpdate}
            >
              {t('operations.update')}
            </Button>

            {(config?.manageAPI ||
              (config?.temperatureUnit === 'degC' &&
                config?.referenceTemperature === '15' &&
                config?.vsmCompensation === '30')) && (
              <Button
                type="primary"
                icon={<RedoOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={onCalculateByDensity}
              >
                {t('operations.calculateDensity')}
              </Button>
            )}

            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={config?.useWaterStrapping ? onCalculateByAllLevels : onCalculateByLevel}
              disabled={_.toNumber(counter?.records?.[0]?.cnt) === 0}
            >
              {t('operations.calculateQuantityByLevel')}
            </Button>

            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onCalculateByQuantity}
            >
              {t('operations.calculateQuantity')}
            </Button>
          </Form.Item>,
        ]}
      >
        <Calculation
          form={form}
          value={selected}
          range={range}
          densRange={densRange}
          config={config}
          pinQuantity={setQuantitySource}
          pinDensity={setDensitySource}
          noStrap={_.toNumber(counter?.records?.[0]?.cnt) === 0}
        />
      </Card>
    </Form>
  );
};

export default Calculations;
