import React from 'react';

import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { reportConfiguration } from '../../../api';
import { Company, Name, Email, Flags } from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, t, data, access }) => {
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
              .all([reportConfiguration.createConfiguration(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: `${t('descriptions.createSuccess')} ${values.report_file}`,
                  });
                }),
              )
              .catch(errors => {
                _.forEach(errors.response.data.errors, error => {
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
          onOk: () => {
            axios
              .all([reportConfiguration.updateConfiguration(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: `${t('descriptions.updateSuccess')} ${values.report_file}`,
                  });
                }),
              )
              .catch(errors => {
                _.forEach(errors.response.data.errors, error => {
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

  const handleDelete = () => {
    axios
      .all([reportConfiguration.deleteConfiguration(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.deleteSuccess'),
            description: `${t('descriptions.deleteSuccess')} ${value.report_file}`,
          });
        }),
      )
      .catch(errors => {
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message,
          });
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

  const { getFieldValue } = form;

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
            <Company form={form} value={value} t={t} />
            <Name
              form={form}
              value={value}
              t={t}
              data={data}
              source={getFieldValue('report_cmpycode')}
            />
            <Email
              form={form}
              value={value}
              t={t}
              enabled={getFieldValue('report_canemail') && getFieldValue('report_enabled')}
            />
            <Divider>{t('divider.flags')}</Divider>
            <Flags
              form={form}
              value={value}
              t={t}
              enabled={getFieldValue('report_enabled')}
              canEmail={getFieldValue('report_canemail')}
            />
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
        disabled={!!value ? !access.canUpdate : !access.canCreate}
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
          disabled={!access.canDelete}
        >
          {t('operations.delete')}
        </Button>
      )}
    </div>
  );
};

const Forms = Form.create()(FormModal);

export default Forms;
