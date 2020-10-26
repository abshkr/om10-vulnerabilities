import React from 'react';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const FaAuth = ({language, user_code, old, dispatch, onReturn}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    Modal.destroyAll();
    onReturn({
      language: language,
      user_code: user_code,
      ret: "ok",
      two_factor_code: values.new,
      old_password: old,
      dispatch: dispatch,
    });
  };

  const onComplete = () => {
    Modal.destroyAll();
    onReturn({
      ret_code: "cancel",
      two_factor_code: null,
    });
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}} >
      <Form.Item name="new" 
        noStyle
        rules={[{ required: true }]}
      >
        <Input autoFocus={true} />
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

export default FaAuth;