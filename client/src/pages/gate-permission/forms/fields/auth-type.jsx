import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { GATE_PERMISSION } from '../../../../api';

const AuthType = ({ value, form, enabled }) => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const { data: cases, isValidating } = useSWR(GATE_PERMISSION.ROLE_TYPES);

  const { setFieldsValue } = form;

  const onChange = (v) => {
    const ruleRole = _.find(roles, (item) => {
      return item.role_id === v;
    });
    setFieldsValue({
      rule_authname: ruleRole.auth_level_name,
    });
  };

  useEffect(() => {
    if (value && enabled) {
      setFieldsValue({
        rule_auth: value.rule_auth,
        rule_authname: value.rule_authname,
      });
    }

    if (!enabled) {
      setFieldsValue({
        rule_auth: null,
        rule_authname: null,
      });
    }
  }, [value, enabled]);

  useEffect(() => {
    if (cases) {
      _.forEach(cases?.records, (o) => {
        if (o.role_id === '999') {
          o.auth_level_name = t('fields.any');
        }
      });
      setRoles(cases?.records);
    }
  }, [cases, setRoles]);

  return (
    <div>
      <Form.Item name="rule_auth" label={t('fields.authorityType')} rules={enabled && [{ required: true }]}>
        <Select
          popupMatchSelectWidth={false}
          allowClear
          loading={isValidating}
          disabled={!enabled}
          showSearch
          onChange={onChange}
          optionFilterProp="children"
          // placeholder={!value ? t('placeholder.selectGate') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {roles.map((item, index) => (
            <Select.Option key={index} value={item.role_id}>
              {item.auth_level_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="rule_authname" noStyle>
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default AuthType;
