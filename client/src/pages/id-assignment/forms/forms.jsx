import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal } from 'antd';

import {
  AssignmentNumber,
  Issuer,
  AssignmentType,
  PhysicalType,
  PhysicalTagText,
  TimeCode,
  Flags,
  Pin,
  Employer,
  Role,
  Personnel,
  Drawer,
  Supplier,
  Carrier,
  Tanker,
  EquipmentCarrier,
  TransportEquipment
} from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldValue } = form;

  const type = getFieldValue('kya_type');

  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t('prompts.create'),
          okText: t('operations.yes'),
          okType: 'primary',
          cancelText: t('operations.no'),
          centered: true,
          onOk: async () => {}
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
          onOk: async () => {}
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
      onOk: async () => {}
    });
  };

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <AssignmentNumber form={form} value={value} />
            <Issuer form={form} value={value} />
            <PhysicalType form={form} value={value} />
            <PhysicalTagText form={form} value={value} />
            <TimeCode form={form} value={value} />
            <Pin form={form} value={value} />
            <Flags form={form} value={value} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.assignments')} forceRender={true} key="2">
            <AssignmentType form={form} value={value} />

            {['1', '3', '5'].includes(type) && (
              <>
                <Employer form={form} value={value} />
              </>
            )}

            {['1', '3', '5'].includes(type) && (
              <>
                <Role form={form} value={value} />
              </>
            )}

            {['3', '5'].includes(type) && (
              <>
                <Personnel form={form} value={value} />
              </>
            )}

            {['3', '5'].includes(type) && (
              <>
                <Drawer form={form} value={value} />
              </>
            )}

            {['1', '3', '5'].includes(type) && (
              <>
                <Supplier form={form} value={value} />
              </>
            )}

            {['4', '5'].includes(type) && (
              <>
                <Carrier form={form} value={value} />
              </>
            )}

            {['4', '5'].includes(type) && (
              <>
                <Tanker form={form} value={value} />
              </>
            )}

            {['8', '9'].includes(type) && (
              <>
                <EquipmentCarrier form={form} value={value} />
                <TransportEquipment form={form} value={value} />
              </>
            )}
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
