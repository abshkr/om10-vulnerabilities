import React, { useCallback, useState, useEffect } from 'react';

import {
  EditOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { Form, Button, Select, Modal, notification, Checkbox, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { COMPANIES } from '../../../../api';
import useSWR from 'swr';
import ChildSelect from './child-companys';
import StatusField from './status';

const ChildForm = ({ value, visible, returnChild, setChildVisible }) => {

  // const { data: payload, isValidating, revalidate } = useSWR(`${COMPANIES.RELATIONS}?parent_cmpy_code=${value.cmpy_code}`);
  const { data: parentRoles } = useSWR(COMPANIES.PARENT_CMPY_ROLES);
  
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields } = form;

  const IS_CREATING = !value;

  if (IS_CREATING) {
    resetFields();
  }

  const onCancel = () => {
    setChildVisible(false)
  }

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!IS_CREATING) {
      values.child_cmpy_role_name = value.child_cmpy_role_name;
      values.child_cmpy_name = value.child_cmpy_name;
    }
    
    values.is_creating = IS_CREATING;
    returnChild(values)
    setChildVisible(false)
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        parent_cmpy_role: value.parent_cmpy_role,
        comments: value.comments,
        create_date: value.create_date,
      })
    }
  }, [value]);

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
        <Form.Item name="parent_cmpy_role" label={t('fields.parentCmpyType')} rules={[{ required: true }]}>
          <Select 
            // onChange={onParentRoleChange}
            disabled={!IS_CREATING}
          >
              {parentRoles?.records.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_role_id}>
                  {item.cmpy_role_name}
                </Select.Option>
              ))}
            </Select>
        </Form.Item>

        <ChildSelect value={value} form={form} />

        <StatusField value={value} form={form} />

        <Form.Item name="comments" label={t('fields.comments')} >
          <Input.TextArea rows={2}/>
        </Form.Item>

        <Form.Item name="create_date" noStyle >
          <Input type="hidden"/>
        </Form.Item>

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
