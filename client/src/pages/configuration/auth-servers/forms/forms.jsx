import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { AUTH_SERVERS } from 'api';

import {
  Code,
  Name,
  URL,
  Username,
  Password,
  BaseDN,
  Filters,
  Returns,
  Comment,
  Roles,
  Types,
  ActiveFlag,
} from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(AUTH_SERVERS.READ);
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
          .post(IS_CREATING ? AUTH_SERVERS.CREATE : AUTH_SERVERS.UPDATE, values)
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
          .post(AUTH_SERVERS.DELETE, value)
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
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      open={visible}
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
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Row gutter={[12, 4]}>
              <Col span={12}>
                <Code form={form} value={value} />
              </Col>
              <Col span={12}>
                <Name form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 4]}>
              <Col span={12}>
                <Types form={form} value={value} />
              </Col>
              <Col span={12}>
                <URL form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 4]}>
              <Col span={12}>
                <Username form={form} value={value} />
              </Col>
              <Col span={12}>
                <Password form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 4]}>
              <Col span={12}>
                <BaseDN form={form} value={value} />
              </Col>
              <Col span={12}>
                <Filters form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 4]}>
              <Col span={12}>
                <Returns form={form} value={value} />
              </Col>
              <Col span={12}>
                <Roles form={form} value={value} />
              </Col>
            </Row>

            <Comment form={form} value={value} />
            <ActiveFlag form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
