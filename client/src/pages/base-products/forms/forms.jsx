import React from 'react';

import {
  Code,
  Name,
  Classification,
  Group,
  Color,
  AdaptiveArmPriority,
  AdaptiveFlowControl,
  DensityRange,
  CorrectionMethod,
  RefSpecTemp,
  HotTempFlag
} from './fields';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import { BASE_PRODUCTS } from '../../../api';
import axios from 'axios';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, t, data, configuration }) => {
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
              .all([BASE_PRODUCTS.createBaseProduct(values)])
              .then(
                axios.spread(response => {
                  refresh();

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
              .all([BASE_PRODUCTS.updateBaseProduct(values)])
              .then(
                axios.spread(response => {
                  refresh();

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
                  description: t('messages.updateFailed')
                });
              });
          }
        });
      }
    });
  };

  const handleDelete = () => {
    axios
      .all([BASE_PRODUCTS.deleteBaseProduct(value)])
      .then(
        axios.spread(response => {
          refresh();

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
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => await handleDelete
    });
  };

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Code form={form} value={value} t={t} data={data} />
            <Name form={form} value={value} t={t} data={data} />
            <Classification form={form} value={value} t={t} data={data} />
            <Group form={form} value={value} t={t} data={data} />
            <Color form={form} value={value} t={t} data={data} />
            <DensityRange form={form} value={value} t={t} data={data} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.product')} forceRender={true} key="2">
            <RefSpecTemp form={form} value={value} t={t} data={data} />
            <CorrectionMethod form={form} value={value} t={t} data={data} />
            <HotTempFlag
              form={form}
              value={value}
              t={t}
              enabled={configuration?.features?.hotLitreCalculation}
            />
          </TabPane>

          {configuration?.features?.adaptiveFlowControl && (
            <TabPane className="ant-tab-window" tab={t('tabColumns.adaptiveFlow')} forceRender={true} key="3">
              <AdaptiveArmPriority form={form} value={value} t={t} data={data} />
              <AdaptiveFlowControl form={form} value={value} t={t} data={data} />
            </TabPane>
          )}
        </Tabs>
      </Form>

      <Button shape="round" icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
        {t('operations.cancel')}
      </Button>

      <Button
        shape="round"
        type="primary"
        icon={!!value ? 'edit' : 'plus'}
        style={{ float: 'right', marginRight: 5 }}
        onClick={!!value ? handleUpdate : handleCreate}
      >
        {!!value ? t('operations.update') : t('operations.create')}
      </Button>

      {!!value && (
        <Button
          shape="round"
          type="danger"
          icon="delete"
          style={{ float: 'right', marginRight: 5 }}
          onClick={showDeleteConfirm}
        >
          {t('operations.delete')}
        </Button>
      )}
    </div>
  );
};

const Forms = Form.create()(FormModal);

export default Forms;
