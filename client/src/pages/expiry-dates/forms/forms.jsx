import React, { useEffect } from 'react';

import axios from 'axios';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, Divider, notification, Tooltip, Drawer } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { ExpiryDateTarget, TypeCode, TypeDescription, DateTimeFormat, DefaultValue, Flags } from './fields';
import { EXPIRY_DATES } from '../../../api';
import _ from 'lodash';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, auth }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null); 
    mutate(EXPIRY_DATES.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (values?.edt_def_exp_date !== '') {
      values.edt_def_exp_date = values?.edt_def_exp_date?.format(SETTINGS.DATE_TIME_FORMAT);
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
          .post(IS_CREATING ? EXPIRY_DATES.CREATE : EXPIRY_DATES.UPDATE, values)
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
          .post(EXPIRY_DATES.DELETE, value)
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

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
            disabled={IS_CREATING ? !auth?.canCreate : !auth?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Tooltip title={value?.child_count > 0 && 'Disabled Due to the Existence of Child Records.'}>
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={onDelete}
                disabled={value?.child_count > 0 || !auth?.canDelete}
              >
                {t('operations.delete')}
              </Button>
            </Tooltip>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} key="1">
            <ExpiryDateTarget form={form} value={value} />
            <TypeCode form={form} value={value} />
            <TypeDescription form={form} value={value} />

            <Divider>{t('divider.flags')}</Divider>

            <Flags form={form} value={value} />

            <Divider>{t('divider.dateTime')}</Divider>

            <DefaultValue form={form} value={value} />

            <DateTimeFormat form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
