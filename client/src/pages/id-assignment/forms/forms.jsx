import React, { useState, useEffect } from 'react';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, notification, Drawer, setFilterValue } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
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
  DrawerField,
  Supplier,
  Carrier,
  Tanker,
  EquipmentCarrier,
  TransportEquipment,
} from './fields';

import api, { ID_ASSIGNMENT } from '../../../api';
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [type, setType] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [role, setRole] = useState(null);

  const IS_CREATING = !value;

  const onComplete = (kya_txt) => {
    handleFormState(false, null);
    mutate(ID_ASSIGNMENT.READ);
    if (kya_txt) {
      setFilterValue("" + kya_txt);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? ID_ASSIGNMENT.CREATE : ID_ASSIGNMENT.UPDATE, values)
          .then((response) => {
            onComplete(values.kya_txt);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
            });
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible]);

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ID_ASSIGNMENT.DELETE, value)
          .then((response) => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
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
                <DrawerField form={form} value={value} />
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
      </Form>
    </Drawer>
  );
};

export default FormModal;
