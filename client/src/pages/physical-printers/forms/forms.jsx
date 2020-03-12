import React from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import { SystemPrinter, Printer, Area, Lock } from './fields';
import { PHYSICAL_PRINTERS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, tableAPI }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

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
          .post(IS_CREATING ? PHYSICAL_PRINTERS.CREATE : PHYSICAL_PRINTERS.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              IS_CREATING
                ? tableAPI.updateRowData({ add: [values] })
                : tableAPI.updateRowData({ update: [values] });

              mutate(PHYSICAL_PRINTERS.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('messages.updateSuccess')
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
          .post(PHYSICAL_PRINTERS.DELETE, value)
          .then(
            axios.spread(response => {
              tableAPI.updateRowData({ remove: [value] });

              mutate(PHYSICAL_PRINTERS.READ);
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
        <Tabs defaultActiveKey="1" style={{ height: '40vh' }}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <SystemPrinter form={form} value={value} />
            <Printer form={form} value={value} />
            <Area form={form} value={value} />
            <Lock form={form} value={value} />
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
