import React from 'react';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import axios from 'axios';

import { hazchemCodes } from '../../../api';
import {
  Id,
  SubsidiaryRisk,
  EmergencyProcedureGuide,
  EmergencyActionCode,
  PackagingMethod,
  TechnicalName,
  PackagingGroup,
  UNNumber,
  Class,
} from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, t, data }) => {
  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t('prompts.create'),
          okText: t('operations.yes'),
          okType: 'primary',
          cancelText: t('operations.no'),
          centered: true,
          onOk: () => {
            axios
              .all([hazchemCodes.create(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: t('messages.createSuccess'),
                  });
                }),
              )
              .catch(error => {
                notification.error({
                  message: error.message,
                  description: t('messages.createFailed'),
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
          onOk: () => {
            axios
              .all([hazchemCodes.update(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: t('messages.updateSuccess'),
                  });
                }),
              )
              .catch(error => {
                notification.error({
                  message: error.message,
                  description: t('messages.updateFailed'),
                });
              });
          },
        });
      }
    });
  };

  const handleDelete = () => {
    axios
      .all([hazchemCodes.remove(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.deleteSuccess'),
            description: `${t('descriptions.deleteSuccess')} ${value.prt_printer}`,
          });
        }),
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: t('descriptions.deleteFailed'),
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
      onOk: handleDelete,
    });
  };

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.general')}
            forceRender={true}
            key="1"
          >
            <Id form={form} value={value} t={t} data={data} />
            <SubsidiaryRisk form={form} value={value} t={t} />
            <Class form={form} value={value} t={t} />
            <EmergencyProcedureGuide form={form} value={value} t={t} />
            <EmergencyActionCode form={form} value={value} t={t} />
            <PackagingMethod form={form} value={value} t={t} />
            <TechnicalName form={form} value={value} t={t} e />
            <PackagingGroup form={form} value={value} t={t} />
            <UNNumber form={form} value={value} t={t} />
          </TabPane>
        </Tabs>
      </Form>

      <Button
        shape="round"
        icon="close"
        style={{ float: 'right' }}
        onClick={() => Modal.destroyAll()}
      >
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
