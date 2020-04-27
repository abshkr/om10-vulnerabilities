import React, { useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { Gauging, General, Calculation, Levels } from './fields';

import { TANKS, TANK_STATUS, AUTH } from '../../../api';
import { VCFManager } from '../../../utils';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: envrionment } = useSWR(AUTH.ENVIRONMENT);

  const [tab, setTab] = useState('1');

  const IS_CREATING = !value;
  const CAN_CALCULATE = tab === '2';

  const onFinish = (values) => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? TANKS.CREATE : TANKS.UPDATE, values)
          .then(
            axios.spread((response) => {
              Modal.destroyAll();

              mutate(TANKS.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  const handleDensityType = () => {
    const { tank_15_density, tank_density, tank_api } = form.getFieldsValue([
      'tank_15_density',
      'tank_density',
      'tank_api',
    ]);

    const payload = {
      reference: _.toNumber(envrionment?.VSM_COMPENSATION_PT) || 15,
    };

    if (tank_15_density && tank_15_density.length !== 0 && tank_15_density !== '0') {
      const converted = _.toNumber(tank_15_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'D15C';
      }
    } else if (tank_density && tank_density.length !== 0 && tank_density !== '0') {
      const converted = _.toNumber(tank_density);
      const valid = _.isNumber(converted);

      if (valid) {
        payload.value = converted;
        payload.type = 'D30C';
      }
    } else if (tank_api && tank_api.length !== 0 && tank_api !== '0') {
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

  const onCalculateByDensity = () => {
    const baseClass = value?.tank_base_class;
    const payload = handleDensityType();

    if (baseClass !== '6') {
      if (payload?.type === 'D15C') {
        const densityAtXC = VCFManager.densityAtXC(payload.value, payload.reference);
        const densityAt60F = VCFManager.densityAt60F(payload.value, payload.reference, 'C');
        const api = VCFManager.api(densityAt60F);

        form.setFieldsValue({
          tank_density: densityAtXC.toFixed(3),
          tank_api: api.toFixed(3),
        });
      }

      if (payload?.type === 'D30C') {
        const density15C = VCFManager.density15CFromXC(payload.value, payload.reference, 3);
        const densityAt60F = VCFManager.densityAt60F(density15C);
        const api = VCFManager.api(densityAt60F);

        form.setFieldsValue({
          tank_15_density: density15C.toFixed(3),
          tank_api: api.toFixed(3),
        });
      }

      if (payload?.type === 'A60F') {
        const densityAt15C = VCFManager.densityAt15C(payload.value);
        const densityAtXC = VCFManager.densityAtXC(densityAt15C, payload.reference);

        form.setFieldsValue({
          tank_density: densityAtXC.toFixed(3),
          tank_15_density: densityAt15C.toFixed(3),
        });
      }
    } else {
      if (payload?.type === 'D15C') {
        const density = payload.value;
        const densityAt60F = VCFManager.densityAt60F(density);
        const api = VCFManager.api(densityAt60F);

        form.setFieldsValue({
          tank_density: density.toFixed(3),
          tank_api: api.toFixed(3),
        });
      }

      if (payload?.type === 'D30C') {
        const density = payload.value;
        const densityAt60F = VCFManager.densityAt60F(density);
        const api = VCFManager.api(densityAt60F);

        form.setFieldsValue({
          tank_15_density: density.toFixed(3),
          tank_api: api.toFixed(3),
        });
      }

      if (payload?.type === 'A60F') {
        const density = VCFManager.densityAt60F(payload.value);

        form.setFieldsValue({
          tank_15_density: density.toFixed(3),
        });
      }
    }
  };

  const onCalculateByLevel = () => {
    const { getFieldsValue, setFieldsValue } = form;

    const payload = getFieldsValue(['tank_temp', 'tank_density', 'tank_amb_vol', 'tank_liquid_kg']);

    const values = {
      tank_base: value?.tank_base,
      tank_qty_type: 'KG',
      tank_qty_amount: payload?.tank_liquid_kg,
      tank_temp: payload?.tank_temp,
      tank_density: payload?.tank_density,
    };

    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.calculate'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(TANK_STATUS.CALCULATE_QUANTITY, values)
          .then((response) => {
            setFieldsValue({
              tank_amb_vol: response?.data?.REAL_LITRE,
              tank_cor_vol: response?.data?.REAL_LITRE15,
              tank_liquid_kg: response?.data?.REAL_KG,
            });
            notification.success({
              message: t('messages.calculateSuccess'),
              description: t('descriptions.calculateSuccess'),
            });
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

    const payload = getFieldsValue(['tank_temp', 'tank_density', 'tank_amb_vol', 'tank_prod_lvl']);

    const values = {
      tank_base: value?.tank_base,
      tank_qty_type: 'LT',
      tank_qty_amount: payload?.tank_amb_vol,
      tank_temp: payload?.tank_temp,
      tank_density: payload?.tank_density,
      tank_prod_lvl: payload?.tank_prod_lvl,
      tank_code: value?.tank_code,
    };

    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.calculate'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(TANK_STATUS.CALCULATE_QUANTITY, values)
          .then((response) => {
            setFieldsValue({
              tank_amb_vol: response?.data?.REAL_LITRE,
              tank_cor_vol: response?.data?.REAL_LITRE15,
              tank_liquid_kg: response?.data?.REAL_KG,
            });

            notification.success({
              message: t('messages.calculateSuccess'),
              description: t('descriptions.calculateSuccess'),
            });
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

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
      <Tabs defaultActiveKey={tab} animated={false} onChange={setTab}>
        <TabPane
          className="ant-tab-window-no-margin"
          tab={t('tabColumns.general')}
          forceRender={true}
          key="1"
        >
          <General form={form} value={value} />
        </TabPane>

        <TabPane
          className="ant-tab-window-no-margin"
          tab={t('tabColumns.calculations')}
          forceRender={true}
          key="2"
        >
          <Calculation form={form} value={value} />
        </TabPane>

        <TabPane
          className="ant-tab-window-no-margin"
          tab={t('tabColumns.gauging')}
          forceRender={true}
          key="3"
        >
          <Gauging form={form} value={value} />
        </TabPane>

        <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.levels')} forceRender={true} key="4">
          <Levels form={form} value={value} />
        </TabPane>
      </Tabs>

      <Form.Item>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {IS_CREATING ? t('operations.create') : t('operations.update')}
        </Button>

        {CAN_CALCULATE && (
          <>
            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ marginRight: 5 }}
              onClick={onCalculateByDensity}
            >
              {t('operations.calculateDensity')}
            </Button>

            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ marginRight: 5 }}
              onClick={onCalculateByLevel}
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
      </Form.Item>
    </Form>
  );
};

export default FormModal;
