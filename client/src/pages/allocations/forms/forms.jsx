import React from 'react';

import _ from 'lodash';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import { mutate } from 'swr';

import { ALLOCATIONS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

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
              .post(ALLOCATIONS.CREATE, values)
              .then(() => {
                mutate(ALLOCATIONS.READ);
                Modal.destroyAll();

                notification.success({
                  message: t('messages.createSuccess'),
                  description: `${t('descriptions.createSuccess')} `,
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

              .post(ALLOCATIONS.UPDATE, values)
              .then(() => {
                mutate(ALLOCATIONS.READ);
                Modal.destroyAll();

                notification.success({
                  message: t('messages.updateSuccess'),
                  description: `${t('descriptions.updateSuccess')}`,
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
          .post(ALLOCATIONS.DELETE, value)
          .then(() => {
            mutate(ALLOCATIONS.READ);

            Modal.destroyAll();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
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

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ width: '25%' }}>
                {/* <Type form={form} value={value} />
                <Company form={form} value={value} />
                <Supplier form={form} value={value} />
                <LockType form={form} value={value} /> */}

                {value && (
                  <Button type="primary" icon="reload" style={{ width: '100%', marginTop: 20 }}>
                    {t('operations.reset')}
                  </Button>
                )}
              </div>

              <div style={{ marginLeft: 25, marginRight: 25 }}>
                <Divider type="vertical" style={{ height: '100%' }} />
              </div>

              <div style={{ width: '75%' }}>{/* <BaseProducts form={form} value={value} t={t} /> */}</div>
            </div>
          </TabPane>

          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.allocationPeriod')}
            forceRender={true}
            key="2"
          ></TabPane>
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

export default FormModal;
