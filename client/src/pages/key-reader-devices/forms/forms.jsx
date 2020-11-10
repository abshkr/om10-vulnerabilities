import React, { useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import api, { KEY_READER_DEVICES } from '../../../api';

import { Code, Type, Use } from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(KEY_READER_DEVICES.READ);
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
          .post(IS_CREATING ? KEY_READER_DEVICES.CREATE : KEY_READER_DEVICES.UPDATE, values)
          .then(() => {
            onComplete();

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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(KEY_READER_DEVICES.DELETE, value)
          .then(() => {
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

  useEffect(() => {
    if (!value && !visible) {
      form.resetFields();
    }
  }, [resetFields, value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="30vw"
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
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Tooltip
              placement="topRight"
              title={
                !value?.dev_type
                  ? t('descriptions.keyReaderDeviceNotUsed')
                  : t('descriptions.keyReaderDeviceUsed')
              }
            >
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete || value?.dev_type}
                onClick={onDelete}
              >
                {t('operations.delete')}
              </Button>
            </Tooltip>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Code form={form} value={value} />
            <Type form={form} value={value} />
            <Use form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
