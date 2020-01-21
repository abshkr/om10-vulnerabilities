import React from 'react';

import _ from 'lodash';
import axios from 'axios';
import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';

import { Name, Code, Product, Density, Flags, DailyVariance, MontlhyVariance, MaxFlow } from './fields';
import { tanks } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, t, data, access, configuration }) => {
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
              .all([tanks.createTank(values)])
              .then(
                axios.spread(response => {
                  refresh();
                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: `${t('descriptions.createSuccess')} ${values.tank_code}`
                  });
                })
              )
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
          onOk: () => {
            axios
              .all([tanks.updateTank(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: `${t('descriptions.updateSuccess')} ${values.tank_code}`
                  });
                })
              )
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

  const handleDelete = () => {
    axios
      .all([tanks.deleteTank(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.deleteSuccess'),
            description: `${t('descriptions.deleteSuccess')} ${value.tank_code}`
          });
        })
      )
      .catch(errors => {
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message
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
      onOk: handleDelete
    });
  };

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Code form={form} value={value} t={t} data={data} />
            <Name form={form} value={value} t={t} />
            <Product form={form} value={value} t={t} />
            <Density form={form} value={value} t={t} product={form.getFieldValue('tank_base')} />
            <Divider>{t('divider.variances')}</Divider>
            <DailyVariance form={form} value={value} t={t} />
            <MontlhyVariance form={form} value={value} t={t} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags form={form} value={value} t={t} />
          </TabPane>

          {configuration?.features?.adaptiveFlowControl && (
            <TabPane className="ant-tab-window" tab={t('tabColumns.adaptiveFlow')} key="2">
              <MaxFlow form={form} value={value} t={t} />
            </TabPane>
          )}
        </Tabs>
      </Form>

      <Button shape="round" icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
        {t('operations.cancel')}
      </Button>

      <Button
        shape="round"
        type="primary"
        icon={!!value ? 'edit' : 'plus'}
        style={{ float: 'right', marginRight: 5 }}
        onClick={!!value ? handleUpdate : handleCreate}
        disabled={!!value ? !access.canUpdate : !access.canCreate}
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
