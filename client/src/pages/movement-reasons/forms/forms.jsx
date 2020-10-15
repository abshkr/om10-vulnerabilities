import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';
import { Type, BusinessProcess, SendToHost, ShowComment, MovementReason } from './fields';
import api, { MOVEMENT_REASONS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, length, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [send, setSend] = useState(false);
  const [showComment, setShowComment] = useState(value?.mr_show_comment);

  const IS_CREATING = !value;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(MOVEMENT_REASONS.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    // Attaching the Id to the Updated Object
    if (!IS_CREATING) {
      values.mr_id = value?.mr_id;
    } else {
      values.mr_id = length + 1;
    }

    values.mr_flag = values?.mr_flag ? 1 : 0;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? MOVEMENT_REASONS.CREATE : MOVEMENT_REASONS.UPDATE, values)
          .then((response) => {
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
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(MOVEMENT_REASONS.DELETE, value)
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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setSend(false);
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

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            onClick={onFinish}
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
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <p>ID: {value ? value?.mr_id : length + 1}</p>

            <Row>
              <Col><SendToHost form={form} onChange={setSend} value={value} /></Col>
              <Col><ShowComment form={form} onChange={setShowComment} value={value} /></Col>
            </Row>

            <Type form={form} value={value} />
            <BusinessProcess form={form} value={value} />
            <MovementReason form={form} value={value} send={send} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
