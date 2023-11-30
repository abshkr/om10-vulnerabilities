import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { COMPANIES } from '../../../../api';
import useSWR from 'swr';

const ParentField = ({ value, form, visible }) => {
  const { data: parentRoles } = useSWR(COMPANIES.PARENT_CMPY_ROLES);

  const { t } = useTranslation();
  const { setFieldsValue, resetFields } = form;

  const IS_CREATING = !value;

  useEffect(() => {
    if (value && visible) {
      setFieldsValue({
        parent_cmpy_role: value.parent_cmpy_role,
      });
    } else {
      resetFields();
    }
  }, [value, visible]);

  return (
    <Form.Item name="parent_cmpy_role" label={t('fields.parentCmpyType')} rules={[{ required: true }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
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
  );
};

export default ParentField;
