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
import axios from 'axios';
import { COMPANIES } from '../../../api';
import useSWR, { mutate } from 'swr';
import columns from './columns';

const ChildForm = ({ value, visible, returnChild, setChildVisible }) => {
  // const { data: payload, isValidating, revalidate } = useSWR(`${COMPANIES.RELATIONS}?parent_cmpy_code=${value.cmpy_code}`);
  const { data: childRoles, isValidating } = useSWR(COMPANIES.CHILD_CMPY_ROLES);
  const { data: parentRoles } = useSWR(COMPANIES.PARENT_CMPY_ROLES);
  
  const { t } = useTranslation();
  const fields = columns(t);
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields } = form;

  const IS_CREATING = !value;

  if (IS_CREATING) {
    resetFields();
  }

  const [childRole, setChildRole] = useState(null);
  const [children, setChildren] = useState(null);

  const onComplete = () => {
    // handleFormState(false, null);
    // mutate(COMPANIES.READ);
    Modal.destroyAll();
  };

  const onCancle = () => {
    setChildVisible(false)
  }

  const getChildren = useCallback(() => {
    axios
      .get(`${COMPANIES.CHILD_CMPYS}?cmpy_role_id=${childRole}`)
      .then((response) => {
        const payload = response.data?.records || [];
        // form.setFieldsValue({
        //   child_cmpy_code: payload,
        // });

        setChildren(payload);
        // setBaseLoading(false);
      });
  });

  const onRoleChange = (v) => {
    setChildRole(v);
  }

  const onStatusChange = (e) => {
    setFieldsValue({
      status: e.target.checked,
    })
  }
  
  const onFinish = async () => {
    const values = await form.validateFields();

    if (IS_CREATING) {
      const selecteRole = _.find(childRoles.records, (item) => {
        return item.cmpy_role_id = values.child_cmpy_role;
      })
      values.child_cmpy_role_name = selecteRole.cmpy_role_name;
  
      const selecteCompany = _.find(children, (item) => {
        return item.cmpy_code = values.child_cmpy_code;
      })
      values.child_cmpy_name = selecteCompany.cmpy_name;
    } else {
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
        child_cmpy_role: value.child_cmpy_role,
        child_cmpy_code: value.child_cmpy_code,
        status: value.status,
        comments: value.comments,
      })
    }

    if (childRole) {
      getChildren()
    }
    
  }, [setChildRole, childRole, value]);

  return (
    <Modal
      title={(IS_CREATING?t("operations.add"):t("operations.update")) + " " + t('tabColumns.companyRelation') }
      visible={visible}
      footer={null}
      // onOk={this.handleOk}
      // onCancel={this.handleCancel}
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
            onChange={onRoleChange}
            disabled={!IS_CREATING}
          >
              {parentRoles?.records.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_role_id}>
                  {item.cmpy_role_name}
                </Select.Option>
              ))}
            </Select>
        </Form.Item>

        <Form.Item name="child_cmpy_role" label={t('fields.childCmpyType')} rules={[{ required: true }]}>
          <Select 
            onChange={onRoleChange}
            disabled={!IS_CREATING}
          >
              {childRoles?.records.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_role_id}>
                  {item.cmpy_role_name}
                </Select.Option>
              ))}
            </Select>
        </Form.Item>

        <Form.Item name="child_cmpy_code" label={t('fields.childCmpyName')} rules={[{ required: true }]}>
          <Select
            disabled={!IS_CREATING}
            showSearch
            // onChange={handleChange}
            optionFilterProp="children"
            // placeholder={!value ? t('placeholder.selectHazchem') : null}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {children?.map((item, index) => (
              <Select.Option key={index} value={item.cmpy_code}>
                {item.cmpy_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label={t('fields.status')} >
          <Checkbox defaultChecked={value?.status} onChange={onStatusChange}/>
        </Form.Item>

        <Form.Item name="comments" label={t('fields.comments')} >
          <Input.TextArea rows={2}/>
        </Form.Item>

        <br/>

        <Form.Item>
          <Button
            htmlType="button"
            style={{ float: 'right' }}
            onClick={onCancle}
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
