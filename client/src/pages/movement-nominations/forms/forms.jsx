import React from 'react';

import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import {
  NominationKey,
  NominationNumber,
  NominationSource,
  Supplier,
  Carrier,
  Vehicle,
  TPP,
  TransportMode,
  TransportSystem,
  Comments,
  EffectiveFrom,
  ExpiredAfter
} from './fields';

import Items from './items';

import { REPORT_PROFILE } from '../../../api';

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
            <NominationKey form={form} value={value} />
            <NominationNumber form={form} value={value} />
            <NominationSource form={form} value={value} />
            <Supplier form={form} value={value} />
            <Carrier form={form} value={value} />
            <Vehicle form={form} value={value} />
            <Divider />
            <EffectiveFrom form={form} value={value} />
            <ExpiredAfter form={form} value={value} />
            <Divider />
            <TPP form={form} value={value} />
            <TransportMode form={form} value={value} />
            <TransportSystem form={form} value={value} />
            <Comments form={form} value={value} />
          </TabPane>
          <TabPane className="ant-tab-window" tab={t('tabColumns.items')} forceRender={true} key="2">
            <Items form={form} value={value} />
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

      <Button icon="carry-out" style={{ marginRight: 5 }}>
        {t('operations.makeTransaction')}
      </Button>

      <Button icon="eye" style={{ marginRight: 5 }}>
        {t('operations.viewTransaction')}
      </Button>

      <Button icon="eye" style={{ marginRight: 5 }}>
        {t('operations.viewSchedule')}
      </Button>
    </div>
  );
};

export default FormModal;
