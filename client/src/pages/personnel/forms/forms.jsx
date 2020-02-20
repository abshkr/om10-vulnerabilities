import React from 'react';
import { Form, Button, Tabs, notification, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import {
  Employer,
  Code,
  Name,
  SLP,
  Department,
  Email,
  Role,
  TimeCode,
  DriverLicence,
  Status,
  Comment,
  Lock
} from './fields';

import { CheckList, PasswordReset, Expiry } from '../../../components';
import { PERSONNEL } from '../../../api';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: payload } = useSWR(PERSONNEL.READ);

  const fields = columns(t);

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
              .post(PERSONNEL.CREATE, values)
              .then(
                axios.spread(response => {
                  mutate(PERSONNEL.READ);
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
    const matches = _.filter(payload?.records, object => {
      return (
        object.per_name === value.per_name && object.per_code !== value.per_code && object.per_name !== ''
      );
    });

    Modal.confirm({
      title: matches.length > 0 ? 'We found other records with similar data.' : t('prompts.update'),
      okText: matches.length > 0 ? 'Apply' : t('operations.yes'),
      okType: 'primary',
      content:
        matches.length > 0 ? (
          <CheckList form={form} matches={matches} columns={fields} rowKey="per_code" />
        ) : null,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await form.validateFields((err, values) => {
          axios
            .post(PERSONNEL.UPDATE, values)
            .then(
              axios.spread(response => {
                mutate(PERSONNEL.READ);

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
          .post(PERSONNEL.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(PERSONNEL.READ);
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
            <Employer form={form} value={value} />
            <Code form={form} value={value} />
            <Name form={form} value={value} />
            <SLP form={form} value={value} />
            <Department form={form} value={value} />
            <Email form={form} value={value} />
            <Role form={form} value={value} />
            <TimeCode form={form} value={value} />
            <DriverLicence form={form} value={value} />
            <Status form={form} value={value} />
            <Comment form={form} value={value} />
          </TabPane>
          <TabPane className="ant-tab-window" tab={t('tabColumns.expiryDates')} forceRender={true} key="2">
            <Expiry form={form} value={value} type={PERSONNEL.EXPIRY_TYPES} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.areaAccess')} forceRender={true} key="3">
            <Lock form={form} value={value} />
          </TabPane>

          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.resetPassword')}
            forceRender={true}
            key="4"
            disabled={!value}
          >
            <PasswordReset value={value} />
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
