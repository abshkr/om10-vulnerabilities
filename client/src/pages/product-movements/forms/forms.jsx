import React from 'react';

import {
  EditOutlined,
  WarningOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import { MovementType, Unit, Source, Destination, BatchCode, Quantity, Class } from './fields';
import { PRODUCT_MOVEMENTS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const CAN_DELETE = value?.pmv_status_name === 'NEW';
  const IS_COMPLETE = value?.pmv_status_name === 'COMPLETE';

  const onFinish = (values) => {
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
              Modal.destroyAll();

              mutate(PRODUCT_MOVEMENTS.READ);
              notification.success({
                message: t('messages.createSuccess'),
                description: t('descriptions.createSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.createFailed'),
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
              Modal.destroyAll();

              mutate(PRODUCT_MOVEMENTS.READ);
              notification.success({
                message: t('messages.haltSuccess'),
                description: t('descriptions.haltSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.haltFailed'),
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
              Modal.destroyAll();

              mutate(PRODUCT_MOVEMENTS.READ);
              notification.success({
                message: t('messages.startSuccess'),
                description: t('descriptions.startSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.startFailed'),
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
              mutate(PRODUCT_MOVEMENTS.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`,
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed'),
            });
          });
      },
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      scrollToFirstError
      initialValues={{ pmv_state_name: 'NEW', pmv_unit_name: 'l' }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab={t('tabColumns.general')} key="1" className="ant-tab-window">
          <MovementType value={value} />
          <Unit value={value} />
          <Class form={form} value={value} />
          <Source form={form} value={value} />
          <Destination form={form} value={value} />
          <BatchCode form={form} value={value} />
          <Quantity form={form} value={value} />
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

        {IS_CREATING && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
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
            >
              {t('operations.start')}
            </Button>
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={onDelete}
              style={{ float: 'right', marginRight: 5 }}
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
      </Form.Item>
    </Form>
  );
};

export default FormModal;
