import React from 'react';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Company, Usage, Printer } from './fields';
import { logicalPrinters } from '../../../api';

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
              .all([logicalPrinters.createLogicalPrinters(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: `${t('descriptions.createSuccess')} ${values.prt_printer}`,
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
              .all([logicalPrinters.updateLogicalPrinters(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: `${t('descriptions.updateSuccess')} ${values.prt_printer}`,
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
      .all([logicalPrinters.deleteLogicalPrinters(value)])
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

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            className="ant-tab-window"
            style={{ height: '30vh' }}
            tab={t('tabColumns.general')}
            forceRender={true}
            key="1"
          >
            <Company form={form} value={value} t={t} />
            <Usage form={form} value={value} t={t} />
            <Printer form={form} value={value} t={t} data={data} />
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
