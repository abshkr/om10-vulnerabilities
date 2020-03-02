import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal } from 'antd';
import { mutate } from 'swr';
import axios from 'axios';

import { HAZCHEM_CODES } from '../../../api';

import {
  Id,
  SubsidiaryRisk,
  EmergencyProcedureGuide,
  EmergencyActionCode,
  PackagingMethod,
  TechnicalName,
  PackagingGroup,
  UNNumber,
  Class
} from './fields';

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
              .post(HAZCHEM_CODES.CREATE, values)
              .then(
                axios.spread(response => {
                  mutate(HAZCHEM_CODES.READ);

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
              .post(HAZCHEM_CODES.UPDATE, values)
              .then(
                axios.spread(response => {
                  mutate(HAZCHEM_CODES.READ);

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
          .post(HAZCHEM_CODES.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(HAZCHEM_CODES.READ);

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
            <Id form={form} value={value} />
            <SubsidiaryRisk form={form} value={value} />
            <Class form={form} value={value} />
            <EmergencyProcedureGuide form={form} value={value} />
            <EmergencyActionCode form={form} value={value} />
            <PackagingMethod form={form} value={value} />
            <TechnicalName form={form} value={value} />
            <PackagingGroup form={form} value={value} />
            <UNNumber form={form} value={value} />
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

export default FormModal;
