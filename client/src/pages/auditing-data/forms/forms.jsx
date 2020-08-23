import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Input, Drawer } from 'antd';
import { mutate } from 'swr';

import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        audit_datetime: value.audit_datetime,
        audit_record_key: value.audit_record_key,
        audit_action_name: value.audit_action_name,
        audit_category_name: value.audit_category_name,
        audit_description: value.audit_description,
        audit_value_before: value.audit_value_before,
        audit_value_after: value.audit_value_after,
        audit_user_code: value.audit_user_code,
        audit_user_name: value.audit_user_name,
        audit_user: value.audit_user_code + ' - ' + value.audit_user_name,
        audit_cmpy_code: value.audit_cmpy_code,
        audit_cmpy_name: value.audit_cmpy_name,
        audit_company: value.audit_cmpy_code + ' - ' + value.audit_cmpy_name,
        audit_ip: value.audit_ip,
        audit_column: value.audit_column,
        audit_table: value.audit_table,
        audit_pkeys: value.audit_pkeys,
      });
    }
  }, [value, setFieldsValue]);

  const formLayout = {
    labelCol: { span: 5 },
    labelAlign: 'left',
    // marginRight: 10
    // wrapperCol: { span: 16 },
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      destroyOnClose={true}
      placement="right"
      width="45vw"
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
        </>
      }
    >
      <Form form={form} scrollToFirstError {...formLayout}>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.general')}
            key="1"
            style={{ height: '80vh' }}
          >
            <Form.Item name="audit_record_key" label={t('fields.recordKey')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_datetime" label={t('fields.dateTime')}>
              <Input disabled={true}/>
            </Form.Item>
    
            <Form.Item name="audit_action_name" label={t('fields.action')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_category_name" label={t('fields.category')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_table" label={t('fields.table')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_column" label={t('fields.column')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_pkeys" label={t('fields.primaryKey')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_description" label={t('fields.description')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_value_before" label={t('fields.valueBefore')}>
              <Input.TextArea rows={3} disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_value_after" label={t('fields.valueAfter')}>
              <Input.TextArea rows={3} disabled={true}/>
            </Form.Item>

            {/* <Form.Item name="audit_user_code" label={t('fields.userId')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_user_name" label={t('fields.user')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_cmpy_code" label={t('fields.companyCode')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_cmpy_name" label={t('fields.company')}>
              <Input disabled={true}/>
            </Form.Item> */}

            <Form.Item name="audit_company" label={t('fields.company')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_user" label={t('fields.user')}>
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item name="audit_ip" label={t('fields.locationId')}>
              <Input disabled={true}/>
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
