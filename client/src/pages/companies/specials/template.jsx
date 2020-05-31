import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Button, Modal, notification, Select, InputNumber, Input } from 'antd';
import { DataTable } from '../../../components';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import columns from './columns';
import _ from 'lodash';
import { FooterEditor, SwitchRender } from './fields';
import axios from 'axios';
import { COMPANIES } from '../../../api';

const TemplateForm = ({ value }) => {
  const { data: payload, isValidating } = useSWR(`${COMPANIES.TEMPLATES}?cmpy_code=${value?.cmpy_code}`);
  console.log(payload?.records);

  const { t } = useTranslation();
  const fields = columns(t);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { resetFields, setFieldsValue, getFieldDecorator } = form;
  const [ templateData, setTemplateDate ] = useState(payload?.records)

  useEffect(() => {
    console.log("useEffect")
    console.log(value.cmpy_rtn_prompt)
    if (payload) {
      console.log("setFieldsValue templates")
      setFieldsValue({
        templates: payload?.records
      })
    }
    
  }, [ setFieldsValue, payload, setTemplateDate]);

  const validate = (rule, input) => {
    // if (input === '' || !input) {
    //   return Promise.reject(`${t('fields.loadToleranceCheck')}`);
    // }

    return Promise.resolve();
  };

  const onSave = async () => {
    const values = await form.validateFields();
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(COMPANIES.UPDATE_TEMPLATES, values.templates)
          .then(
            axios.spread(response => {
              mutate(COMPANIES.TEMPLATES);
              // Modal.destroyAll();
              // onComplete()
              notification.success({
                message: t('messages.updateSuccess'),
                description: t('messages.updateSuccess')
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

  const swithLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };

  const singleLineLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };
  
  return (
    <Form form={form}>
      <Form.Item name="templates">
        <DataTable 
          height="70vh"
          columns={fields} 
          data={payload?.records} 
          isLoading={isValidating} 
          components={{
            FooterEditor: FooterEditor,
            SwitchRender: SwitchRender
          }}
        />
      </Form.Item>
      <Button
        type="primary"
        icon={<EditOutlined />}
        htmlType="submit"
        style={{ float: 'right', marginTop: 5 }}
        onClick={onSave}
      >
        {t('operations.save')}
      </Button>
    </Form>
  );
};

export default TemplateForm;
