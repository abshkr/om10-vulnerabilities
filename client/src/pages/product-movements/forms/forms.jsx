import React, { useEffect } from 'react';

import {
  EditOutlined,
  WarningOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { MovementType, Unit, Source, Destination, BatchCode, Quantity, Class, BaseProduct } from './fields';
import { PRODUCT_MOVEMENTS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, auth }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const IS_CREATING = !value;
  const CAN_DELETE = value?.pmv_status_name === 'NEW';

  const onComplete = () => {
    handleFormState(false, null); 
    mutate(PRODUCT_MOVEMENTS.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    
    Modal.confirm({
      title: t('prompts.create'),
      okText: t('operations.create'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(PRODUCT_MOVEMENTS.CREATE, values)
          .then(
            axios.spread((response) => {
              onComplete();

              notification.success({
                message: t('messages.createSuccess'),
                description: t('descriptions.createSuccess'),
              });
            })
          )
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

  const onHalt = () => {
    Modal.confirm({
      title: t('prompts.halt'),
      okText: t('operations.halt'),
      okType: 'primary',
      icon: <WarningOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(PRODUCT_MOVEMENTS.HALT, value)
          .then(
            axios.spread((response) => {
              onComplete();

              notification.success({
                message: t('messages.haltSuccess'),
                description: t('descriptions.haltSuccess'),
              });
            })
          )
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

  const onStart = () => {
    Modal.confirm({
      title: t('prompts.start'),
      okText: t('operations.start'),
      okType: 'primary',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(PRODUCT_MOVEMENTS.START, value)
          .then(
            axios.spread((response) => {
              onComplete();

              notification.success({
                message: t('messages.startSuccess'),
                description: t('descriptions.startSuccess'),
              });
            })
          )
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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      icon: <DeleteOutlined />,
      centered: true,
      onOk: async () => {
        await axios
          .post(PRODUCT_MOVEMENTS.DELETE, value)
          .then(
            axios.spread((response) => {
              onComplete();

              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`,
              });
            })
          )
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

          {IS_CREATING && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              htmlType="submit"
              style={{ float: 'right', marginRight: 5 }}
              onClick={onFinish}
              disabled={IS_CREATING ? !auth?.canCreate : !auth?.canUpdate}
            >
              {t('operations.create')}
            </Button>
          )}

          {CAN_DELETE && (
            <>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={onStart}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!auth?.canDelete}
              >
                {t('operations.start')}
              </Button>
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!auth?.canDelete}
              >
                {t('operations.delete')}
              </Button>
            </>
          )}

          {!IS_CREATING && !CAN_DELETE && (
            <Button
              type="danger"
              icon={<WarningOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onHalt}
            >
              {t('operations.halt')}
            </Button>
          )}
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{ pmv_state_name: 'NEW', pmv_unit_name: 'l' }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <MovementType value={value} />
            <Unit value={value} />
            <BaseProduct form={form} value={value} />
            <Class form={form} value={value} />
            <Source form={form} value={value} />
            <Destination form={form} value={value} />
            <BatchCode form={form} value={value} />
            <Quantity form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
