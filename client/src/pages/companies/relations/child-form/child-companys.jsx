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
import { COMPANIES } from '../../../../api';
import useSWR, { mutate } from 'swr';

const ChildSelectFields = ({ value, form }) => {
  const { data: childRoles, isValidating } = useSWR(COMPANIES.CHILD_CMPY_ROLES);
  
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const IS_CREATING = !value;

  const [childRole, setChildRole] = useState(null);
  const [children, setChildren] = useState(null);

  const getChildren = useCallback(() => {
    axios
      .get(`${COMPANIES.CHILD_CMPYS}?cmpy_role_id=${childRole}`)
      .then((response) => {
        const payload = response.data?.records || [];
        setChildren(payload);
      });
  });

  const onRoleChange = (v) => {
    const selecteRole = _.find(childRoles.records, (item) => {
      return item.cmpy_role_id = v;
    })
    setFieldsValue({
      child_cmpy_role_name: selecteRole.cmpy_role_name,
    })
    setChildRole(v);
  }

  const onCompanyChange = (v) => {
    const selected = _.find(children, (item) => {
      return item.cmpy_code = v;
    })
    setFieldsValue({
      child_cmpy_name: selected?.cmpy_name,
    })
  }
  
  useEffect(() => {
    if (childRole) {
      getChildren()
    }
  }, [childRole]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        child_cmpy_role: value.child_cmpy_role,
        child_cmpy_code: value.child_cmpy_code,
      })
    }
  }, [value]);

  return (
    <div>
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

      <Form.Item name="child_cmpy_role_name" noStyle>
        <Input type="hidden" />
      </Form.Item>

      <Form.Item name="child_cmpy_code" label={t('fields.childCmpyName')} rules={[{ required: true }]}>
        <Select
          disabled={!IS_CREATING}
          onClick={onCompanyChange}
          showSearch
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

      <Form.Item name="child_cmpy_name" noStyle>
        <Input type="hidden" />
      </Form.Item>

    </div>
  );
};

export default ChildSelectFields;
