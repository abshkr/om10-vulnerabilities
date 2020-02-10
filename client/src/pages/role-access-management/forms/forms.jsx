import React from 'react';

import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal } from 'antd';
import _ from 'lodash';

import axios from 'axios';
import { ROLE_ACCESS_MANAGEMENT } from '../../../api';

import { General } from './fields';

const TabPane = Tabs.TabPane;

const options = [
  { value: '1', label: 'Read', index: 'priv_view' },
  { value: '2', label: 'Create', index: 'priv_create' },
  { value: '3', label: 'Update', index: 'priv_update' },
  { value: '4', label: 'Delete', index: 'priv_delete' },
  { value: '5', label: 'Protected', index: 'priv_protect' }
];

const FormModal = ({ form, value }) => {
  const { t } = useTranslation();

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
            const privileges = [];
            const payload = values?.privilege;

            _.forEach(payload, (object, index) => {
              if (object) {
                let entry = value.privilege[index];

                entry.priv_view = object.includes('1');
                entry.priv_create = object.includes('2');
                entry.priv_update = object.includes('3');
                entry.priv_delete = object.includes('4');
                entry.priv_protect = object.includes('5');

                privileges.push(entry);
              }
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
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <General form={form} value={value} options={options} />
          </TabPane>
        </Tabs>
      </Form>

      <Button icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
        {t('operations.cancel')}
      </Button>

      <Button
        type="primary"
        icon={value ? 'edit' : 'plus'}
        style={{ float: 'right', marginRight: 5 }}
        onClick={value ? handleUpdate : handleCreate}
      >
        {value ? t('operations.update') : t('operations.create')}
      </Button>

      {value && (
        <Button
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
