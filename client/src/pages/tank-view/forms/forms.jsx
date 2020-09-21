import React, { useEffect, useState } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { mutate } from 'swr';

import { Tank } from 'components';
import {
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

const FormModal = ({ value, visible, handleFormState, access, handleRevalidate }) => {
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
                <Descriptions.Item label="Product" span={2}>
                  {value?.tank_base_name}
                </Descriptions.Item>

                <Descriptions.Item label="Product Code" span={2}>
                  {value?.tank_base}
                </Descriptions.Item>

                <Descriptions.Item label="Observed Temperature" span={12}>
                  {value?.tank_temp} °C
                </Descriptions.Item>

                <Descriptions.Item label="Reference Density" span={24}>
                  {value?.tank_density} Kg / m³
                </Descriptions.Item>

                <Descriptions.Item label="Tank Capacity" span={24}>
                  {value?.totalCapacity} Litres
                </Descriptions.Item>

                <Descriptions.Item label="Tank Max Level" span={24}>
                  {value?.tank_max_level} mm
                </Descriptions.Item>

                <Descriptions.Item label="Level" span={24}>
                  {value?.tank_prod_lvl} mm
                </Descriptions.Item>

                <Descriptions.Item label="Observed Quantity" span={24}>
                  {value?.tank_amb_vol} Litres
                </Descriptions.Item>

                <Descriptions.Item label="Standard Quantity" span={24}>
                  {value?.tank_cor_vol} Litres
                </Descriptions.Item>

                <Descriptions.Item label="Weight in Air" span={24}>
                  {value?.tank_vapour_kg} T
                </Descriptions.Item>

                <Descriptions.Item label="Ullage" span={24}>
                  {value?.tank_ullage} Litres
                </Descriptions.Item>

                <Descriptions.Item label="Pumpable Volume" span={24}>
                  {value?.tank_pump_vol} T
                </Descriptions.Item>

                <Descriptions.Item label="Water Level" span={24}>
                  {value?.tank_water_lvl} mm
                </Descriptions.Item>

                <Descriptions.Item label="Water Volume" span={24}>
                  {value?.tank_liquid_kg} Kg
                </Descriptions.Item>
              </Descriptions>
            </GeneralContainer>
          </TabPane>

          <TabPane tab={t('tabColumns.configuration')} key="2" forceRender>
            <Code form={form} value={value} config={null} />
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
