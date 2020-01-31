import React from 'react';

import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal, Table } from 'antd';

import axios from 'axios';

import columns from './columns';
import { ROLE_ACCESS_MANAGEMENT } from '../../../api';
import generator from './generator';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, value }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  const data = generator(value?.privilege);

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
              .post(ROLE_ACCESS_MANAGEMENT.CREATE, values)
              .then(
                axios.spread(response => {
                  mutate(ROLE_ACCESS_MANAGEMENT.READ);
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
              .post(ROLE_ACCESS_MANAGEMENT.UPDATE, values)
              .then(
                axios.spread(response => {
                  mutate(ROLE_ACCESS_MANAGEMENT.READ);

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
          .post(ROLE_ACCESS_MANAGEMENT.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(ROLE_ACCESS_MANAGEMENT.READ);
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
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.general')}
            style={{ height: '56vh' }}
            forceRender={true}
            key="1"
          >
            <Table
              rowKey="object_id"
              size="middle"
              columns={fields}
              dataSource={data}
              bordered
              pagination={false}
              scroll={{
                y: '47vh'
              }}
            />
          </TabPane>
        </Tabs>
      </Form>

      <Button shape="round" icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
        {t('operations.cancel')}
      </Button>

      <Button
        shape="round"
        type="primary"
        icon={value ? 'edit' : 'plus'}
        style={{ float: 'right', marginRight: 5 }}
        onClick={value ? handleUpdate : handleCreate}
      >
        {value ? t('operations.update') : t('operations.create')}
      </Button>

      {value && (
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
