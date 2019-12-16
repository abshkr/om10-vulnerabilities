import React from 'react';

import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Type, Company, Supplier, LockType } from './fields';
import BaseProducts from './base-products';
import { allocations } from '../../../api';

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
              .all([allocations.create(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: `${t('descriptions.createSuccess')} ${values.eqpt_code}`,
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
              .all([allocations.update(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: `${t('descriptions.updateSuccess')} ${values.eqpt_code}`,
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
      .all([allocations.remove(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.deleteSuccess'),
            description: `${t('descriptions.deleteSuccess')} ${value.eqpt_code}`,
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
            tab={t('tabColumns.general')}
            forceRender={true}
            key="1"
          >
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ width: '25%' }}>
                <Type form={form} value={value} t={t} />
                <Company form={form} value={value} t={t} />
                <Supplier form={form} value={value} t={t} />
                <LockType form={form} value={value} t={t} />

                {!!value && (
                  <Button type="primary" icon="reload" style={{ width: '100%', marginTop: 20 }}>
                    {t('operations.reset')}
                  </Button>
                )}
              </div>

              <div style={{ marginLeft: 25, marginRight: 25 }}>
                <Divider type="vertical" style={{ height: '100%' }} />
              </div>

              <div style={{ width: '75%' }}>
                <BaseProducts form={form} value={value} t={t} />
              </div>
            </div>
          </TabPane>

          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.allocationPeriod')}
            forceRender={true}
            key="2"
          ></TabPane>
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
        disabled={!!value ? !access.canUpdate : !access.canCreate}
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
