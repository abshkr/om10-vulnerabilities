import React from 'react';

import axios from 'axios';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, Divider, notification } from 'antd';
import _ from 'lodash';

import { ExpiryDateTarget, TypeCode, TypeDescription, DateTimeFormat, DefaultValue, Flags } from './fields';
import { EXPIRY_DATES } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, value, data }) => {
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
              .post(EXPIRY_DATES.CREATE, values)
              .then(() => {
                mutate(EXPIRY_DATES.READ);
                Modal.destroyAll();

                notification.success({
                  message: t('messages.createSuccess'),
                  description: `${t('descriptions.createSuccess')} `
                });
              })
              .catch(errors => {
                _.forEach(errors.response.data.errors, error => {
                  notification.error({
                    message: error.type,
                    description: error.message
                  });
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

              .post(EXPIRY_DATES.UPDATE, values)
              .then(() => {
                mutate(EXPIRY_DATES.READ);
                Modal.destroyAll();

                notification.success({
                  message: t('messages.updateSuccess'),
                  description: `${t('descriptions.updateSuccess')}`
                });
              })
              .catch(errors => {
                _.forEach(errors.response.data.errors, error => {
                  notification.error({
                    message: error.type,
                    description: error.message
                  });
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
          .post(EXPIRY_DATES.DELETE, value)
          .then(() => {
            mutate(EXPIRY_DATES.READ);

            Modal.destroyAll();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`
            });
          })
          .catch(errors => {
            _.forEach(errors.response.data.errors, error => {
              notification.error({
                message: error.type,
                description: error.message
              });
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
            <ExpiryDateTarget form={form} value={value} />
            <TypeCode form={form} value={value} />
            <TypeDescription form={form} value={value} />

            <Divider>{t('divider.flags')}</Divider>

            <Flags form={form} value={value} />

            <Divider>{t('divider.dateTime')}</Divider>

            <DefaultValue form={form} value={value} />

            <DateTimeFormat form={form} value={value} />
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
