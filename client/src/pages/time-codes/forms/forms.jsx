import React, { useEffect } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';
import { TIME_CODES } from '../../../api';

const TabPane = Tabs.TabPane;

const TimecodeForm = ({ value, visible, handleFormState, setCode }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { setFieldsValue } = form;

  const IS_CREATING = !value;

  const onComplete = (title) => {
    setCode(title);
    handleFormState(false, null);
    mutate(TIME_CODES.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: t('prompts.create'),
      okText: t('operations.create'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TIME_CODES.CREATE, values)
          .then(() => {
            onComplete(values?.tcd_title);

            notification.success({
              message: t('messages.createSuccess'),
              description: t('descriptions.createSuccess'),
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

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.timeCode')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 4) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }
    return Promise.resolve();
  };

  useEffect(() => {
    setFieldsValue({
      tcd_title: '',
    });
  }, [value, visible]);

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="40vw"
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
          >
            {t('operations.create')}
          </Button>
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={{
          tcd_title: '',
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Form.Item
              name="tcd_title"
              label={t('fields.timeCode')}
              rules={[{ required: true, validator: validate }]}
            >
              <Input></Input>
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default TimecodeForm;
