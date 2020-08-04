import React from 'react';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';

const ChangePassword = ({language, user_code, old, dispatch, onReturn}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);

    if (values.new !== values.confirm) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.passwordDoesntMatch'),
      });
      return;
    }

    Modal.destroyAll();
    onReturn({
      language: language,
      user_code: user_code,
      ret: "ok",
      new_password: values.new,
      old_password: old,
      dispatch: dispatch,
    });
  };

  const onComplete = () => {
    console.log("onComplete")
    Modal.destroyAll();
    onReturn({
      ret_code: "cancel",
      new_password: null,
    });
  }

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.newPassword')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}} >
      <Form.Item name="new" label={t("fields.newPassword")} rules={[{ required: true, validator: validate }]}>
        <Input.Password autoFocus={true} ></Input.Password>
      </Form.Item>  

      <Form.Item name="confirm" label={t("fields.confirmPassword")}>
        <Input.Password></Input.Password>
      </Form.Item>  

      <div style={{marginTop: "2rem"}}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => onComplete()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<CheckOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default ChangePassword;