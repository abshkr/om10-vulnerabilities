import React from 'react';

import { Form, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import ChildSelect from './child-companys';
import StatusField from './status';
import ParentSelect from './parent-company';
import CommentInput from './comments';

const ChildForm = ({ value, visible, returnChild, setChildVisible }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const IS_CREATING = !value;

  const onCancel = () => {
    setChildVisible(false);
    resetFields();
  }

  const onFinish = async () => {
    const values = await form.validateFields();

    values.is_creating = IS_CREATING;
    returnChild(values);
    setChildVisible(false);
    resetFields();
  };

  return (
    <Modal
      title={(IS_CREATING?t("operations.add"):t("operations.update")) + " " + t('tabColumns.companyRelation') }
      visible={visible}
      footer={null}
      // onOk={this.handleOk}
      onCancel={onCancel}
      // okButtonProps={{ disabled: true }}
      // cancelButtonProps={{ disabled: true }}
    >
      <Form 
        form={form} 
        onFinish={onFinish} 
        scrollToFirstError
        layout="vertical" 
      >
        <ParentSelect value={value} form={form} visible={visible} />

        <ChildSelect value={value} form={form} visible={visible} />

        <StatusField value={value} form={form} visible={visible} />

        <CommentInput value={value} form={form} visible={visible} />

        <br/>

        <Form.Item>
          <Button
            htmlType="button"
            style={{ float: 'right' }}
            onClick={onCancel}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING?t("operations.add"):t("operations.update")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChildForm;
