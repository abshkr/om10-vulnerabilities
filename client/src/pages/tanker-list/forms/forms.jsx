import React from 'react';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import _ from 'lodash';
import { tankerList } from '../../../api';
import BulkEdit from './bulkEdit';
import {
  Depot,
  Owner,
  Code,
  Name,
  EquipmentType,
  Carrier,
  TotalTrips,
  LastTrip,
  Comments,
  TankerPrompt,
  Pin,
  MaxKg,
  Destination,
  LastDepot,
  CurrentDepot,
  Locks,
  SLP,
} from './fields';
import axios from 'axios';
import Compartments from './compartments';
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
            if (values.tnkr_equips) {
              axios
                .all([tankerList.create(values)])
                .then(
                  axios.spread(response => {
                    refresh();
                    Modal.destroyAll();
                    notification.success({
                      message: t('messages.createSuccess'),
                      description: `${t('descriptions.createSuccess')} ${values.tnkr_code}`,
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
            } else {
              Modal.confirm({
                title: 'You have not selected any Equipment.',
                okText: t('operations.yes'),
                okType: 'primary',
                content:
                  'If you do not want to choose an existing one, OMEGA will create a new one for you automatically. Please confirm to process',
                cancelText: t('operations.no'),
                centered: true,
                onOk: () => {
                  axios
                    .all([tankerList.create(values)])
                    .then(
                      axios.spread(response => {
                        refresh();
                        Modal.destroyAll();
                        notification.success({
                          message: t('messages.createSuccess'),
                          description: `${t('descriptions.createSuccess')} ${values.tnkr_code}`,
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
          },
        });
      }
    });
  };

  const handleUpdate = () => {
    const matches = _.filter(data, object => {
      return (
        object.tnkr_name === value.tnkr_name &&
        object.tnkr_code !== value.tnkr_code &&
        object.tnkr_name !== ''
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
              .all([tankerList.update(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t('messages.updateSuccess'),
                    description: `${t('descriptions.updateSuccess')} ${values.tnkr_code}`,
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
          }),
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
                .all([tankerList.update(values)])
                .then(
                  axios.spread(response => {
                    refresh();

                    Modal.destroyAll();
                    notification.success({
                      message: t('messages.updateSuccess'),
                      description: `${t('descriptions.updateSuccess')} ${values.tnkr_code}`,
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
    }
  };

  const handleDelete = () => {
    axios
      .all([tankerList.deleteTanker(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.deleteSuccess'),
            description: `${t('descriptions.deleteSuccess')} ${value.tnkr_code}`,
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

  const handleUnlock = () => {
    axios
      .all([tankerList.unlockAll(value.tnkr_code)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t('messages.unlockSuccess'),
            description: `${t('descriptions.unlockSuccess')} ${value.tnkr_code}`,
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

  const equipment = getFieldValue('tnkr_etp');

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
            <Depot form={form} value={value} t={t} />
            <Owner form={form} value={value} t={t} />
            <Code form={form} value={value} t={t} data={data} />
            <Name form={form} value={value} t={t} />
            <SLP form={form} value={value} t={t} />
            <TotalTrips form={form} value={value} t={t} />
            <LastTrip form={form} value={value} t={t} />
            <Locks form={form} value={value} t={t} />
            <Comments form={form} value={value} t={t} />
          </TabPane>
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.tanker')}
            forceRender={true}
            key="2"
          >
            <EquipmentType form={form} value={value} t={t} />
            <Carrier form={form} value={value} t={t} />
            <TankerPrompt form={form} value={value} t={t} />
            <Destination form={form} value={value} t={t} />
            <LastDepot form={form} value={value} t={t} />
            <CurrentDepot form={form} value={value} t={t} />
            <Pin form={form} value={value} t={t} />
            <MaxKg form={form} value={value} t={t} />
          </TabPane>
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.compartments')}
            forceRender={true}
            key="3"
            disabled={!equipment}
          >
            <Compartments form={form} value={value} t={t} equipment={equipment} />
          </TabPane>
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.expiryDates')}
            forceRender={true}
            key="4"
          >
            <Expiry form={form} value={value} t={t} types={expiry} />
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
        disabled={!!value ? !access.canUpdate : !access.canCreate}
      >
        {!!value ? t('operations.update') : t('operations.create')}
      </Button>

      {!!value && (
        <Button
          shape="round"
          type="dashed"
          icon="unlock"
          style={{ float: 'right', marginRight: 5 }}
          onClick={handleUnlock}
          disabled={!access.canUpdate}
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
