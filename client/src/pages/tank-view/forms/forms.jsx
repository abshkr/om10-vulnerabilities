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
import { ConfigConsumer } from 'antd/lib/config-provider';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, handleRevalidate, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const [product, setProduct] = useState(undefined);

  const onComplete = () => {
    handleFormState(false, null);
    handleRevalidate();
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
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
      onClose={() => handleFormState(false, null)}
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
            onClick={() => handleFormState(false, null)}
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
                  {value?.tank_density} {t('units.kg/m3')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.tankCapacity')} span={24}>
                  {value?.totalCapacity} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.tankMaxLevel')} span={24}>
                  {value?.tank_max_level} {t('units.mm')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.level')} span={24}>
                  {value?.tank_prod_lvl} {t('units.mm')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.observedQuantity')} span={24}>
                  {value?.tank_amb_vol} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.standardQuantity')} span={24}>
                  {value?.tank_cor_vol} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.weightInAir')} span={24}>
                  {value?.tank_vapour_kg} {t('units.kg')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.ullage')} span={24}>
                  {value?.tank_ullage} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.pumpableVolume')} span={24}>
                  {value?.tank_pump_vol} {t('units.litres')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.waterLevel')} span={24}>
                  {value?.tank_water_lvl} {t('units.mm')}
                </Descriptions.Item>

                <Descriptions.Item label={t('fields.weightInVacuum')} span={24}>
                  {value?.tank_liquid_kg} {t('units.kg')}
                </Descriptions.Item>
              </Descriptions>
            </GeneralContainer>
          </TabPane>

          <TabPane tab={t('tabColumns.tankConfiguration')} key="2" forceRender>
            <Terminal form={form} value={value} />
            <Code form={form} value={value} config={ConfigConsumer} />
            <Name form={form} value={value} />
            <Product form={form} value={value} onChange={setProduct} />
            <Density form={form} value={value} product={product} />
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
