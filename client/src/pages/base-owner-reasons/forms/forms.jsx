import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col, Tag, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';
import { ReasonCode, ReasonText, ReasonType, ReasonFlag } from './fields';
import api, { OWNER_TRSA_REASONS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, length, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [flag, setFlag] = useState(value?.otr_flag);

  const IS_CREATING = !value;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(OWNER_TRSA_REASONS.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    // Attaching the Id to the Updated Object
    if (!IS_CREATING) {
      values.otr_id = value?.otr_id;
    } else {
      values.otr_id = length + 1;
    }

    values.otr_flag = values?.otr_flag ? 1 : 0;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? OWNER_TRSA_REASONS.CREATE : OWNER_TRSA_REASONS.UPDATE, values)
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
          .post(OWNER_TRSA_REASONS.DELETE, value)
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
      setFlag(false);
    }
  }, [value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="40vw"
      visible={visible}
      footer={
        <>
          {!IS_CREATING && (
            <div style={{ float: 'left', marginRight: 5 }}>
              <Tooltip placement="topRight" title={t('descriptions.countReasonOwnerTrsa')}>
                <Tag color={value?.otrsa_count > 0 ? 'red' : 'green'}>
                  {t('fields.countReasonSpecmove') + ': ' + value?.otrsa_count}
                </Tag>
              </Tooltip>
            </div>
          )}

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
              disabled={!access?.canDelete || value?.otrsa_count > 0}
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
            <p>ID: {value ? value?.otr_id : length + 1}</p>

            <ReasonCode form={form} value={value} />
            <ReasonText form={form} value={value} />
            <ReasonType form={form} value={value} />
            <ReasonFlag form={form} onChange={setFlag} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
