import React, { useState, useEffect } from 'react';

import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal } from 'antd';
import _ from 'lodash';

import axios from 'axios';
import { ROLE_ACCESS_MANAGEMENT } from '../../../api';
import Menu from './menu';

const TabPane = Tabs.TabPane;

const options = [
  { value: '1', label: 'Read', index: 'priv_view' },
  { value: '2', label: 'Create', index: 'priv_create' },
  { value: '3', label: 'Update', index: 'priv_update' },
  { value: '4', label: 'Delete', index: 'priv_delete' },
  { value: '5', label: 'Protected', index: 'priv_protect' }
];

const FormModal = ({ form, value }) => {
  const [menuItems, setMenuItems] = useState([]);

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
            console.log(values);
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

  useEffect(() => {
    const payload = [];

    const uniqueItems = ['general', ..._.uniq(_.map(value?.privilege, 'domain_text'))];

    _.forEach(uniqueItems, item => {
      payload.push({
        name: item,
        nodes: _.filter(value?.privilege, entry => {
          if (item === 'general') {
            return entry.domain_text === entry.object_text;
          }

          return entry.domain_text === item;
        })
      });
    });

    setMenuItems(payload);
  }, [value]);

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          {menuItems.map(item => (
            <TabPane className="ant-tab-window" tab={t(`pageMenu.${item.name}`)} key={item.name}>
              <Menu title={item.name} form={form} value={value} options={options} nodes={item.nodes} />
            </TabPane>
          ))}
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
