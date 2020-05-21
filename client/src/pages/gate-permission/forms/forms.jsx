import React from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import Rules from './rules';
import { Id, Gate, Name } from './fields';
import { GATE_PERMISSION } from '../../../api';
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;
  
  const onComplete = () => {
    handleFormState(false, null);
    mutate(GATE_PERMISSION.READ);
  };

  const IS_CREATING = !value;
  if (IS_CREATING) {
    resetFields()
  }

  const onFinish = async () => {
    const values = await form.validateFields();
    if (typeof values.rules === 'undefined') {
      delete values.rules;
    } else {
      if (values.rules.length === 0) {
        Modal.info({
          title: t('pageNames.gatePermission') ,
          content: (
            <div>
              {t('descriptions.gatePermissionRule')}
            </div>
          ),
        })
        return;
      }
    }
    
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? GATE_PERMISSION.CREATE : GATE_PERMISSION.UPDATE, values)
          .then(
            axios.spread(response => {
              onComplete();

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
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
          .post(GATE_PERMISSION.DELETE, value)
          .then(
            axios.spread(response => {
              onComplete();

              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`
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
      }
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
      width="60vw"
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
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            style={{ float: 'right', marginRight: 5 }}
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
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '70vh' }}>
            <Id form={form} value={value} />
            <Gate form={form} value={value} />
            <Name form={form} value={value} />
            
          </TabPane>

          <TabPane tab={t('tabColumns.rules')} key="2" style={{ height: '70vh' }}>
            <Rules form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
