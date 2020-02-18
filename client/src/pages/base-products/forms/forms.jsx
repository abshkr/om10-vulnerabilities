import React from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal } from 'antd';

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

const FormModal = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: config, isValidating } = useSWR(COMMON.CONFIG);

  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t('prompts.create'),
          okText: t('operations.yes'),
          okType: 'primary',
          cancelText: t('operations.no'),
          centered: true,
          onOk: async () => {
            await axios
              .post(BASE_PRODUCTS.CREATE, values)
              .then(
                axios.spread(response => {
                  mutate(BASE_PRODUCTS.READ);
                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: t('messages.createSuccess')
                  });
                })
              )
              .catch(error => {
                notification.error({
                  message: error.message,
                  description: t('messages.createFailed')
                });
              });
          }
        });
      }
    });
  };

  const handleUpdate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t('prompts.update'),
          okText: t('operations.yes'),
          okType: 'primary',
          cancelText: t('operations.no'),
          centered: true,
          onOk: async () => {
            await axios
              .post(BASE_PRODUCTS.UPDATE, values)
              .then(
                axios.spread(response => {
                  mutate(BASE_PRODUCTS.READ);

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: t('messages.updateSuccess')
                  });
                })
              )
              .catch(error => {
                notification.error({
                  message: error.message,
                  description: t('descriptions.updateFailed')
                });
              });
          }
        });
      }
    });
  };

  const showDeleteConfirm = () => {
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
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Code form={form} value={value} />
            <Name form={form} value={value} />
            <Classification form={form} value={value} />
            <Group form={form} value={value} />
            <Color form={form} value={value} />
            <DensityRange form={form} value={value} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.product')} forceRender={true} key="2">
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
      </Form>

      <Button
        icon="close"
        style={{ float: 'right' }}
        onClick={() => Modal.destroyAll()}
        loading={isValidating}
      >
        {t('operations.cancel')}
      </Button>

      <Button
        type="primary"
        icon={value ? 'edit' : 'plus'}
        style={{ float: 'right', marginRight: 5 }}
        onClick={value ? handleUpdate : handleCreate}
        loading={isValidating}
      >
        {value ? t('operations.update') : t('operations.create')}
      </Button>

      {value && (
        <Button
          type="danger"
          icon="delete"
          style={{ float: 'right', marginRight: 5 }}
          onClick={showDeleteConfirm}
          loading={isValidating}
        >
          {t('operations.delete')}
        </Button>
      )}
    </div>
  );
};

const Forms = Form.create()(FormModal);

export default Forms;
