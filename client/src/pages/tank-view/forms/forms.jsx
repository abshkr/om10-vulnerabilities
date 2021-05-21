import React, { useEffect, useState } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { mutate } from 'swr';

import { Tank } from 'components';
import {
  Terminal,
  Code,
  Product,
  Name,
  Density,
  DailyVariance,
  MontlhyVariance,
  Flags,
  Levels,
} from 'pages/tank-configuration/forms/fields';

import { GeneralContainer } from '../style';

import api, { TANKS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, handleRevalidate, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const [product, setProduct] = useState(undefined);

  const onFormClosed = () => {
    setProduct(undefined);
    handleFormState(false, null);
  };

  const onComplete = () => {
    setProduct(undefined);
    handleFormState(false, null);
    handleRevalidate();
  };

  const checkLevels = (obj, prodLevel) => {
    const maxLevel = obj?.tank_max_level;
    const userLow = obj?.tank_ul_level;
    const userHigh = obj?.tank_uh_level;

    console.log('................. values', obj);

    const errors = [];
    // give warning but allow to update if Tank Max Level < Product Level
    if (maxLevel && prodLevel && _.toNumber(maxLevel) < _.toNumber(prodLevel)) {
      errors.push(t('descriptions.tankMaxLevelLessThanProductLevel'));
    }
    // give warning but allow to update if User L Level > User H Level
    if (userLow && userHigh && _.toNumber(userLow) > _.toNumber(userHigh)) {
      errors.push(t('descriptions.tankUserLowLevelMoreThanUserHighLevel'));
    }
    // give warning but allow to update if User L Level > Tank Max Level
    if (userLow && maxLevel && _.toNumber(userLow) > _.toNumber(maxLevel)) {
      errors.push(t('descriptions.tankUserLowLevelMoreThanMaxLevel'));
    }
    // give warning but allow to update if User H Level > Tank Max Level
    if (userHigh && maxLevel && _.toNumber(userHigh) > _.toNumber(maxLevel)) {
      errors.push(t('descriptions.tankUserHighLevelMoreThanMaxLevel'));
    }

    return errors;
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    const errors = IS_CREATING ? [] : checkLevels(values, value?.tank_prod_lvl);

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      width: '30vw',
      content:
        errors.length <= 0 ? (
          ''
        ) : (
          <ul>
            <>
              {errors?.map((error, index) => (
                <li style={{ color: 'red' }}>{error}</li>
              ))}
            </>
          </ul>
        ),
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANKS.CREATE : TANKS.UPDATE, values)
          .then(() => {
            onComplete();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
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

  useEffect(() => {
    if (!value && !visible) {
      form.resetFields();
    }
  }, [resetFields, value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onFormClosed()}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="45vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onFormClosed()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey={IS_CREATING ? '2' : '1'}>
          <TabPane tab={t('tabColumns.general')} key="1" disabled={IS_CREATING}>
            <GeneralContainer>
              <Tank item={value} />

              <div style={{ marginTop: 15 }}>
                <Levels form={form} value={value} />
              </div>

              <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 10 }}>
                <Descriptions.Item label={t('fields.product')} span={2}>
                  {value?.tank_base_name}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.productCode')} span={2}>
                  {value?.tank_base}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.observedTemperature')} span={12}>
                  {value?.tank_temp} {t('units.degC')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.referenceDensity')} span={24}>
                  {value?.tank_density?.toLocaleString('en-AU')} {t('units.kg/m3')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.tankCapacity')} span={24}>
                  {value?.totalCapacity?.toLocaleString('en-AU')} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.tankMaxLevel')} span={24}>
                  {value?.tank_max_level?.toLocaleString('en-AU')} {t('units.mm')}
                </Descriptions.Item>

                {config?.useWaterStrapping && (
                  <Descriptions.Item label={t('fields.waterLevel')} span={24}>
                    {value?.tank_water_lvl?.toLocaleString('en-AU')} {t('units.mm')}
                  </Descriptions.Item>
                )}

                <Descriptions.Item label={t('fields.productLevel')} span={24}>
                  {value?.tank_prod_lvl?.toLocaleString('en-AU')} {t('units.mm')}
                </Descriptions.Item>

                {config?.useWaterStrapping && (
                  <Descriptions.Item label={t('fields.tankIFC')} span={24}>
                    {value?.tank_ifc?.toLocaleString('en-AU')} {t('units.litres')}
                  </Descriptions.Item>
                )}

                <Descriptions.Item label={t('fields.observedQuantity')} span={24}>
                  {value?.tank_amb_vol?.toLocaleString('en-AU')} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.standardQuantity')} span={24}>
                  {value?.tank_cor_vol?.toLocaleString('en-AU')} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.weightInAir')} span={24}>
                  {value?.tank_air_kg?.toLocaleString('en-AU')} {t('units.kg')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.ullage')} span={24}>
                  {value?.tank_ullage?.toLocaleString('en-AU')} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.pumpableVolume')} span={24}>
                  {value?.tank_pump_vol?.toLocaleString('en-AU')} {t('units.litres')}
                </Descriptions.Item>

                {config?.useWaterStrapping && (
                  <Descriptions.Item label={t('fields.waterVolume')} span={24}>
                    {value?.tank_water?.toLocaleString('en-AU')} {t('units.litres')}
                  </Descriptions.Item>
                )}

                <Descriptions.Item label={t('fields.weightInVacuum')} span={24}>
                  {value?.tank_liquid_kg?.toLocaleString('en-AU')} {t('units.kg')}
                </Descriptions.Item>
              </Descriptions>
            </GeneralContainer>
          </TabPane>

          <TabPane tab={t('tabColumns.tankConfiguration')} key="2" forceRender>
            <Terminal form={form} value={value} />
            <Code form={form} value={value} config={config} />
            <Name form={form} value={value} />
            <Product form={form} value={value} onChange={setProduct} />
            <Density form={form} value={value} product={product} config={config} />
            <Divider>{t('divider.variances')}</Divider>
            <DailyVariance form={form} value={value} />
            <MontlhyVariance form={form} value={value} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
