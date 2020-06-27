import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Radio, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';

import { Gauging, General, Calculation, Levels } from './fields';

import { TANKS, TANK_STATUS } from '../../../api';
import { VCFManager } from '../../../utils';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config, setFilterValue }) => {
  const { data: counter} = useSWR(`${TANK_STATUS.COUNT_STRAPS}?tank_code=${value?.tank_code}&tank_terminal=${value?.tank_terminal}`);
  
  const [quantitySource, setQuantitySource] = useState(null);
  const [densitySource, setDensitySource] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { resetFields } = form;

  const [tab, setTab] = useState('1');
  const [refTempC, setRefTempC] = useState('');
  const [refTempF, setRefTempF] = useState('');

  const IS_CREATING = !value;
  const CAN_CALCULATE = tab === '2';

  const onComplete = (tank_code) => {
    handleFormState(false, null);
    mutate(TANKS.READ);
    if (tank_code) {
      setFilterValue('' + tank_code);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!IS_CREATING) {
      values.tank_code = value.tank_code;
    }

    const payload = _.omit(
      {
        ...values,
        tank_temp:
          values?.tank_temp_unit !== 'degF'
            ? values.tank_temp
            : VCFManager.temperatureF2C(values.tank_temp),
      },
      ['tank_temp_unit']
    );

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANKS.CREATE : TANKS.UPDATE, payload)
          .then(() => {
              onComplete(values.tank_code);

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
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

  const handleRefTemperature = (temperature, unit) => {
    if (unit === 0) {
      setRefTempC(temperature);
      const temp = VCFManager.temperatureC2F(temperature);
      setRefTempF(temp);
    } else {
      setRefTempF(temperature);
      const temp = VCFManager.temperatureF2C(temperature);
      setRefTempC(temp);
    }
  };

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
      const converted = _.toNumber(tank_15_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'D15C';
      }
    } else if (type === 'D30C') {
      const converted = _.toNumber(tank_density);
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
      const converted = _.toNumber(tank_15_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'NA';
      }
    }

    return payload;
  };

  const handleAPIRange = (low, high) => {
    if (low && high) {
      const end = VCFManager.api(low);
      const start = VCFManager.api(high);

      return {
        low: _.round(start, 2),
        high: _.round(end, 2),
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
      title: t('prompts.calculate') + ' (' + t('descriptions.lastFieldChanged') + ': ' + densitySource?.title + ')',
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
        const base = value?.tank_base_class;
        //const type = form.getFieldValue('type');
        const type = densitySource?.type;
        //const payload = handleDensityType(type);
        const payload = handleDensitySource(densitySource);
        
        if (base !== '6') {
          if (payload.type === 'D15C') {
            const densityAtXC = VCFManager.densityAtXC(payload.value, payload.reference);
            const densityAt60F = VCFManager.densityAt60F(payload.value, payload.reference, 'C');
            const api = VCFManager.api(densityAt60F);

            form.setFieldsValue({
              tank_density: densityAtXC.toFixed(3),
              tank_api: api.toFixed(3),
            });
          }

          if (payload.type === 'D30C') {
            const density15C = VCFManager.density15CFromXC(payload.value, payload.reference, 3);
            const densityAt60F = VCFManager.densityAt60F(density15C);
            const api = VCFManager.api(densityAt60F);
            // console.log('D30C', density15C, densityAt60F, api);

            form.setFieldsValue({
              tank_15_density: density15C.toFixed(3),
              tank_api: api.toFixed(3),
            });
          }

          if (payload.type === 'A60F') {
            const densityAt15C = VCFManager.densityAt15C(payload.value);
            const densityAtXC = VCFManager.densityAtXC(densityAt15C, payload.reference);

            form.setFieldsValue({
              tank_density: densityAtXC.toFixed(3),
              tank_15_density: densityAt15C.toFixed(3),
            });
          }
        } else {
          if (payload.type === 'D15C') {
            const density = payload.value;
            const densityAt60F = VCFManager.densityAt60F(density);
            const api = VCFManager.api(densityAt60F);

            form.setFieldsValue({
              tank_density: density.toFixed(3),
              tank_api: api.toFixed(3),
            });
          }

          if (payload.type === 'D30C') {
            const density = payload.value;
            const densityAt60F = VCFManager.densityAt60F(density);
            const api = VCFManager.api(densityAt60F);

            form.setFieldsValue({
              tank_15_density: density.toFixed(3),
              tank_api: api.toFixed(3),
            });
          }

          if (payload.type === 'A60F') {
            const density = VCFManager.densityAt60F(payload.value);

            form.setFieldsValue({
              tank_15_density: density.toFixed(3),
            });
          }
        }
      },
    });
  };

  const onCalculateByLevel = () => {
    const { getFieldsValue, setFieldsValue } = form;

    const payload = getFieldsValue(['tank_amb_vol', 'tank_temp', 'tank_density', 'tank_15_density', 'tank_prod_lvl']);

    const values = {
      tank_code: value?.tank_code,
      tank_base: value?.tank_base,
      tank_qty_type: 'LT',
      tank_qty_amount: payload?.tank_amb_vol,
      tank_temp: payload?.tank_temp,
      tank_density: payload?.tank_density,
      tank_15_density: payload?.tank_15_density,
      tank_prod_lvl: payload?.tank_prod_lvl,
    };

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
            }
            else {
              setFieldsValue({
                tank_amb_vol: _.round(response?.data?.REAL_LITRE, 2),
                tank_cor_vol: _.round(response?.data?.REAL_LITRE15, 2),
                tank_liquid_kg: _.round(response?.data?.REAL_KG, 2),
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

    Modal.confirm({
      title: t('prompts.calculate') + ' (' + t('descriptions.lastFieldChanged') + ': ' + quantitySource?.title + ')',
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
          tank_base: value?.tank_base,
          // tank_qty_type: type,
          // tank_qty_amount: payload?.tank_amb_vol,
          tank_qty_type: quantitySource?.type,
          tank_qty_amount: quantitySource?.qty,
          tank_temp: payload?.tank_temp,
          tank_density: payload?.tank_density,
          tank_prod_lvl: payload?.tank_prod_lvl,
          tank_code: value?.tank_code,
        };

        await api
          .post(TANK_STATUS.CALCULATE_QUANTITY, values)
          .then((response) => {
            if (!response?.data?.REAL_LITRE) {
              notification.error({
                message: t('descriptions.calculateFailed'),
                description: response?.data?.MSG_CODE + ': ' + response?.data?.MSG_DESC,
              });
            }
            else {
              setFieldsValue({
                tank_amb_vol: _.round(response?.data?.REAL_LITRE, 2),
                tank_cor_vol: _.round(response?.data?.REAL_LITRE15, 2),
                tank_liquid_kg: _.round(response?.data?.REAL_KG, 2),
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

  useEffect(() => {
    if (config) {
      handleRefTemperature(config.vsmCompensation, 0);
    }
  }, [config]);

  const range = handleAPIRange(value?.tank_base_dens_lo, value?.tank_base_dens_hi);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
            // disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {CAN_CALCULATE && (
            <>
              {config?.manageAPI && (
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  style={{ marginRight: 5 }}
                  onClick={onCalculateByDensity}
                >
                  {t('operations.calculateDensity')}
                </Button>
              )}

              <Button
                type="primary"
                icon={<RedoOutlined />}
                style={{ marginRight: 5 }}
                onClick={onCalculateByLevel}
                disabled={_.toNumber(counter?.records?.[0]?.cnt) === 0}
              >
                {t('operations.calculateQuantityByLevel')}
              </Button>

              <Button
                type="primary"
                icon={<RedoOutlined />}
                style={{ marginRight: 5 }}
                onClick={onCalculateByQuantity}
              >
                {t('operations.calculateQuantity')}
              </Button>
            </>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey={tab} animated={false} onChange={setTab}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <General form={form} value={value} refTempC={refTempC} refTempF={refTempF} config={config} />
          </TabPane>

          <TabPane tab={t('tabColumns.calculations')} key="2">
            <Calculation 
              form={form} 
              value={value} 
              range={range} 
              config={config} 
              pinQuantity={setQuantitySource}
              pinDensity={setDensitySource}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.gauging')} key="3">
            <Gauging form={form} value={value} />
          </TabPane>

          {config?.manageTankLevelAlarms && (
            <TabPane tab={t('tabColumns.alarms')} key="4">
              <Levels form={form} value={value} />
            </TabPane>
          )}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
