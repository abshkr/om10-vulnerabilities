import React from 'react';

import {
  EditOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import { TANK_STRAPPING } from '../../../api';
import Fields from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const CAN_DELETE = !!value;

  const onFinish = (values) => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? TANK_STRAPPING.CREATE : TANK_STRAPPING.UPDATE, values)
          .then(
            axios.spread((response) => {
              Modal.destroyAll();

              mutate(TANK_STRAPPING.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
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
          .post(TANK_STRAPPING.DELETE, value)
          .then(
            axios.spread((response) => {
              mutate(TANK_STRAPPING.READ);
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
        <TabPane tab={t('tabColumns.general')} key="1">
          <Fields form={form} value={value} />
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

        {CAN_DELETE && (
          <>
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
      </Form.Item>
    </Form>
  );
};

export default FormModal;
