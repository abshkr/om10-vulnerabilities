import React, { useState } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import {
  Code,
  Name,
  Classification,
  Group,
  Color,
  DensityRange,
  AdaptiveArmPriority,
  AdaptiveFlowControl,
  RefSpecTemp,
  CorrectionMethod,
  HotTempFlag
} from './fields';

import { COMMON, BASE_PRODUCTS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const [classification, setClassification] = useState(undefined);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: config } = useSWR(COMMON.CONFIG);

  const IS_CREATING = !value;

  const onFinish = values => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? BASE_PRODUCTS.CREATE : BASE_PRODUCTS.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(BASE_PRODUCTS.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed')
            });
          });
      }
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(BASE_PRODUCTS.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(BASE_PRODUCTS.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed')
            });
          });
      }
    });
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Code form={form} value={value} />
            <Name form={form} value={value} />
            <Classification
              form={form}
              value={value}
              onChange={setClassification}
              classification={classification}
            />
            <Group form={form} value={value} />
            <Color form={form} value={value} />
            <DensityRange form={form} value={value} classification={classification} />
            <Divider>{t('tabColumns.product')}</Divider>
            <RefSpecTemp form={form} value={value} />
            <CorrectionMethod form={form} value={value} />
            <HotTempFlag form={form} value={value} config={config} />
          </TabPane>

          {config?.features?.adaptiveFlowControl && (
            <TabPane className="ant-tab-window" tab={t('tabColumns.adaptiveFlow')} forceRender={true} key="3">
              <AdaptiveArmPriority form={form} value={value} />
              <AdaptiveFlowControl form={form} value={value} />
            </TabPane>
          )}
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

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
