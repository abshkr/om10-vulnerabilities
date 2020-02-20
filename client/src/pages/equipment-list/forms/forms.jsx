import React from 'react';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import { equipmentList } from '../../../api';
import BulkEdit from './bulkEdit';
import Compartments from './compartments';
import axios from 'axios';
import _ from 'lodash';
import {
  Owner,
  Code,
  Title,
  Id,
  EquipmentType,
  Area,
  LoadType,
  EmptyWeight,
  PullingLimit,
  Comments,
  Locks
} from './fields';
import { Expiry } from '../../../components';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, t, expiry, data, access }) => {
  const { getFieldValue } = form;

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
              .all([equipmentList.createEquipment(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.createSuccess'),
                    description: `${t('descriptions.createSuccess')} ${values.eqpt_code}`
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
    const matches = _.filter(data, object => {
      return (
        object.eqpt_title === value.eqpt_title &&
        object.eqpt_code !== value.eqpt_code &&
        object.eqpt_title !== ''
      );
    });

    if (matches.length > 0) {
      Modal.confirm({
        title: 'We found other records with similar data.',
        okText: 'Apply',
        okType: 'primary',
        content: <BulkEdit form={form} t={t} matches={matches} />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: () =>
          form.validateFields((err, values) => {
            axios
              .all([equipmentList.updateEquipment(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: `${t('descriptions.updateSuccess')} ${values.eqpt_code}`
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
          })
      });
    } else {
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
                .all([equipmentList.updateEquipment(values)])
                .then(
                  axios.spread(response => {
                    refresh();

                    Modal.destroyAll();
                    notification.success({
                      message: t('messages.updateSuccess'),
                      description: `${t('descriptions.updateSuccess')} ${values.eqpt_code}`
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
    }
  };

  const handleDelete = () => {
    axios
      .all([equipmentList.deleteEquipment(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.deleteSuccess'),
            description: `${t('descriptions.deleteSuccess')} ${value.eqpt_code}`
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

  const handleUnlock = () => {
    axios
      .all([equipmentList.toggleLocks(value.eqpt_id)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.unlockSuccess'),
            description: `${t('descriptions.unlockSuccess')} ${value.eqpt_code}`
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

  const equipment = getFieldValue('eqpt_etp');

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Id form={form} value={value} t={t} />
            <Owner form={form} value={value} t={t} />
            <Code form={form} value={value} t={t} data={data} />
            <Title form={form} value={value} t={t} />
            <Area form={form} value={value} t={t} />
            <LoadType form={form} value={value} t={t} />
            <Locks form={form} value={value} t={t} />

            <EmptyWeight form={form} value={value} t={t} />
            <PullingLimit form={form} value={value} t={t} />

            <Comments form={form} value={value} t={t} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.compartments')} forceRender={true} key="3">
            <EquipmentType form={form} value={value} t={t} />
            <Compartments form={form} value={value} t={t} equipment={equipment} values={data} />
          </TabPane>
          <TabPane className="ant-tab-window" tab={t('tabColumns.expiryDates')} forceRender={true} key="4">
            <Expiry form={form} value={value} t={t} types={expiry} />
          </TabPane>
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
        disabled={!!value ? !access.canUpdate : !access.canCreate}
        onClick={!!value ? handleUpdate : handleCreate}
      >
        {!!value ? t('operations.update') : t('operations.create')}
      </Button>

      {!!value && (
        <Button
          shape="round"
          type="dashed"
          icon="unlock"
          style={{ float: 'right', marginRight: 5 }}
          disabled={!access.canUpdate}
          onClick={handleUnlock}
        >
          {t('operations.unlockAll')}
        </Button>
      )}

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
