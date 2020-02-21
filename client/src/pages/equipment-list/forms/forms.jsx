import React from 'react';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { EQUIPMENT_LIST } from '../../../api';
import Compartments from './compartments';

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
import { Expiry, CheckList } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: payload } = useSWR(EQUIPMENT_LIST.READ);

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
              .post(EQUIPMENT_LIST.CREATE, values)
              .then(response => {
                mutate(EQUIPMENT_LIST.READ);
                Modal.destroyAll();

                notification.success({
                  message: t('messages.createSuccess'),
                  description: t('descriptions.createSuccess')
                });
              })
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
        object.eqpt_title === value.eqpt_title &&
        object.eqpt_code !== value.eqpt_code &&
        object.eqpt_title !== ''
      );
    });

    Modal.confirm({
      title: matches.length > 0 ? 'We found other records with similar data.' : t('prompts.update'),
      okText: matches.length > 0 ? 'Apply' : t('operations.yes'),
      okType: 'primary',
      content:
        matches.length > 0 ? (
          <CheckList form={form} matches={matches} columns={fields} rowKey="eqpt_code" />
        ) : null,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await form.validateFields((err, values) => {
          axios
            .post(EQUIPMENT_LIST.UPDATE, values)
            .then(response => {
              mutate(EQUIPMENT_LIST.READ);

              Modal.destroyAll();
              notification.success({
                message: t('messages.updateSuccess'),
                description: t('descriptions.updateSuccess')
              });
            })
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

  const handleUnlock = () => {
    axios
      .post(`${EQUIPMENT_LIST.DELETE}?eqpt_id=${value.eqpt_id}`)
      .then(response => {
        mutate(EQUIPMENT_LIST.READ);

        Modal.destroyAll();
        notification.success({
          message: t('messages.unlockSuccess'),
          description: `${t('descriptions.unlockSuccess')}`
        });
      })

      .catch(error => {
        notification.error({
          message: error.message,
          description: t('descriptions.unlockFailed')
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
      onOk: async () => {
        await axios
          .post(EQUIPMENT_LIST.DELETE, value)
          .then(response => {
            mutate(EQUIPMENT_LIST.READ);

            Modal.destroyAll();
            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`
            });
          })
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
            <Owner form={form} value={value} />
            <Code form={form} value={value} />
            <Title form={form} value={value} />
            <Area form={form} value={value} />
            <LoadType form={form} value={value} />
            <Locks form={form} value={value} />

            <EmptyWeight form={form} value={value} />
            <PullingLimit form={form} value={value} />

            <Comments form={form} value={value} />
          </TabPane>

          {/* <TabPane className="ant-tab-window" tab={t('tabColumns.compartments')} forceRender={true} key="3">
            <EquipmentType form={form} value={value} t={t} />
            <Compartments form={form} value={value} />
          </TabPane> */}
          <TabPane className="ant-tab-window" tab={t('tabColumns.expiryDates')} forceRender={true} key="4">
            <Expiry form={form} value={value} type={EQUIPMENT_LIST.EXPIRY} />
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
        <Button type="dashed" icon="unlock" style={{ float: 'right', marginRight: 5 }} onClick={handleUnlock}>
          {t('operations.unlockAll')}
        </Button>
      )}

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
