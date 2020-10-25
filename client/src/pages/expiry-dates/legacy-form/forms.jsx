import React, { useEffect } from 'react';

import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, Checkbox, notification, Tooltip, Drawer, Input } from 'antd';
import _ from 'lodash';

import { EditOutlined, PlusOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import api, { EXPIRY_DATES } from '../../../api';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, all }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const { resetFields, setFieldsValue } = form;

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
        await api
          .post(IS_CREATING ? EXPIRY_DATES.CREATE : EXPIRY_DATES.UPDATE, values)
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
          .post(EXPIRY_DATES.DELETE, value)
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
    } else if (value) {
      setFieldsValue({
        expiry_date_no: value.expiry_date_no,
        expiry_date_desc: value.expiry_date_desc,
        expiry_date_titl: value.expiry_date_titl,
        expiry_date_reja: value.expiry_date_reja,
      });
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
            onClick={onFinish}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Form.Item name="expiry_date_no" label={t('fields.columnNo')}>
              <Input disabled></Input>
            </Form.Item>

            <Form.Item name="expiry_date_desc" label={t('fields.expiryDate')}>
              <Input disabled></Input>
            </Form.Item>

            <Form.Item name="expiry_date_titl" label={t('fields.title')}>
              <Input />
            </Form.Item>

            <Form.Item name="expiry_date_reja" valuePropName="checked">
              <Checkbox>{t('fields.rejectAuthorization')}</Checkbox>
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
