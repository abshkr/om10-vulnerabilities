import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import api, { SITE_CONFIGURATION } from 'api';

import {
  Code,
  Name,
  Contact,
  Address,
  PidxIdentifier,
  PidxOwner,
  PidxLocationType,
  PidxLocationIdentifier,
} from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const [company, setCompany] = useState(undefined);

  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(SITE_CONFIGURATION.TERMINALS);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    // now optional dropdown lists can be unselected and have the value of "undefined".
    // need to send blank string when it is undefined
    values.term_addr = !values?.term_addr ? '' : values?.term_addr;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? SITE_CONFIGURATION.CREATE_TERMINAL : SITE_CONFIGURATION.UPDATE_TERMINAL, values)
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
          .post(SITE_CONFIGURATION.DELETE_TERMINAL, value)
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
                // message: error.type,
                message: error.code === 500 ? t('messages.deleteFailed') : error.type,
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
      width="30vw"
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
            <Code form={form} value={value} />
            <Name form={form} value={value} />
            <Contact form={form} value={value} />
            <Address form={form} value={value} />
            {config?.siteEnabledPIDX && <PidxIdentifier form={form} value={value} />}
            {config?.siteEnabledPIDX && <PidxOwner form={form} value={value} />}
            {config?.siteEnabledPIDX && <PidxLocationType form={form} value={value} />}
            {config?.siteEnabledPIDX && <PidxLocationIdentifier form={form} value={value} />}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
