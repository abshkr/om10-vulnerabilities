import React from 'react';

import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import { Source, Type, Name, Description, CloseOutReportBy, Flags } from './fields';
import { REPORT_PROFILE } from '../../../api';

const TabPane = Tabs.TabPane;

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
              .post(REPORT_PROFILE.CREATE, values)
              .then(
                axios.spread(response => {
                  mutate(REPORT_PROFILE.READ);
                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: t('descriptions.createSuccess')
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
              .post(REPORT_PROFILE.UPDATE, values)
              .then(
                axios.spread(response => {
                  mutate(REPORT_PROFILE.READ);

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: t('descriptions.updateSuccess')
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
          .post(REPORT_PROFILE.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(REPORT_PROFILE.READ);
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
            <Source form={form} value={value} />
            <Type form={form} value={value} />
            <Name form={form} value={value} />
            <CloseOutReportBy form={form} value={value} />
            <Description form={form} value={value} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags form={form} value={value} />
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
