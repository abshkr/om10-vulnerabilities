import React from 'react';

import { QuestionCircleOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Card, notification, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import Calculation from '../forms/fields/calculation';
import { VCFManager } from '../../../utils';
import { TANKS, TANK_STATUS } from '../../../api';

const Calculations = ({ selected, access, isLoading, config }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

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

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(TANKS.UPDATE, values)
          .then(() => {
            mutate(TANKS.READ);

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

  const onCalculateByDensity = () => {
    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.calculate'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content: (
        <Form form={form} initialValues={{ type: 'D15C' }}>
          <Form.Item name="type">
            <Radio.Group style={{ width: '25vw', marginBottom: 15, marginTop: 5 }}>
              <Radio value="D15C">Use Standard</Radio>
              <Radio value="D30C">Use Corrected</Radio>
              <Radio value="A60F">Use API</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        const base = selected?.tank_base_class;
        const type = form.getFieldValue('type');
        const payload = handleDensityType(type);

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

    const payload = getFieldsValue(['tank_temp', 'tank_density', 'tank_amb_vol', 'tank_liquid_kg']);

    const values = {
      tank_base: selected?.tank_base,
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
              tank_amb_vol: _.round(response?.data?.REAL_LITRE, 2),
              tank_cor_vol: _.round(response?.data?.REAL_LITRE15, 2),
              tank_liquid_kg: _.round(response?.data?.REAL_KG, 2),
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
      tank_base: selected?.tank_base,
      tank_qty_type: 'LT',
      tank_qty_amount: payload?.tank_amb_vol,
      tank_temp: payload?.tank_temp,
      tank_density: payload?.tank_density,
      tank_prod_lvl: payload?.tank_prod_lvl,
      tank_code: selected?.tank_code,
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
              tank_amb_vol: _.round(response?.data?.REAL_LITRE, 2),
              tank_cor_vol: _.round(response?.data?.REAL_LITRE15, 2),
              tank_liquid_kg: _.round(response?.data?.REAL_KG, 2),
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

            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onCalculateByDensity}
            >
              {t('operations.calculateDensity')}
            </Button>

            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onCalculateByLevel}
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
        <Form.Item name="tank_code" noStyle />
        <Calculation form={form} value={selected} config={config} />
      </Card>
    </Form>
  );
};

export default Calculations;