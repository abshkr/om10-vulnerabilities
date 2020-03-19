import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, notification } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import {
  AssignmentNumber,
  Issuer,
  AssignmentType,
  PhysicalType,
  PhysicalTagText,
  TimeCode,
  Flags,
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
import { ID_ASSIGNMENT } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [type, setType] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [role, setRole] = useState(null);

  const IS_CREATING = !value;

  const onFinish = values => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? ID_ASSIGNMENT.CREATE : ID_ASSIGNMENT.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(ID_ASSIGNMENT.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed')
            });
          });
      }
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(ID_ASSIGNMENT.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(ID_ASSIGNMENT.READ);
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
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <AssignmentNumber form={form} value={value} />
            <Issuer form={form} value={value} />
            <PhysicalType form={form} value={value} />
            <PhysicalTagText form={form} value={value} />
            <TimeCode form={form} value={value} />
            <Flags form={form} value={value} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.assignments')} forceRender={true} key="2">
            <AssignmentType form={form} value={value} onChange={setType} />

            {['1', '3', '5'].includes(type) && (
              <>
                <Employer form={form} value={value} onChange={setEmployer} />
              </>
            )}

            {['1', '3', '5'].includes(type) && (
              <>
                <Role form={form} value={value} onChange={setRole} />
              </>
            )}

            {['1', '3', '5'].includes(type) && (
              <>
                <Personnel form={form} value={value} employer={employer} role={role} />
              </>
            )}

            {['3', '5'].includes(type) && (
              <>
                <Drawer form={form} value={value} />
              </>
            )}

            {['3', '5'].includes(type) && (
              <>
                <Supplier form={form} value={value} />
              </>
            )}

            {['4', '5'].includes(type) && (
              <>
                <Carrier form={form} value={value} onChange={setCarrier} />
              </>
            )}

            {['4', '5'].includes(type) && (
              <>
                <Tanker form={form} value={value} carrier={carrier} />
              </>
            )}

            {['8', '9'].includes(type) && (
              <>
                <EquipmentCarrier form={form} value={value} />
                <TransportEquipment form={form} value={value} type={type} carrier={carrier} />
              </>
            )}
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
