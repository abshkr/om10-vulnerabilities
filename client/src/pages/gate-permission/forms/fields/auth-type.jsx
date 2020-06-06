import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { GATE_PERMISSION } from '../../../../api';

const AuthType = ({ value, form, enabled }) => {
  const { t } = useTranslation();
  const { data: cases, isValidating } = useSWR(GATE_PERMISSION.ROLE_TYPES);

  const { setFieldsValue } = form;

  const onChange = (v) => {
    const ruleEtypname = _.find(cases?.records, (item) => {
      return item.role_id === v;
    })
    setFieldsValue({
      rule_authname: ruleEtypname.auth_level_name
    })
  }

  useEffect(() => {
    if (value) {
      setFieldsValue({
        rule_auth: value.rule_auth,
        rule_authname: value.rule_authname,
      });
    }
  }, [value]);

  return (
    <div>
      <Form.Item 
        name="rule_auth" 
        label={t('fields.authorityType')} 
        rules={enabled && [{ required: true }]}
      >
        <Select
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
          {cases?.records.map((item, index) => (
            <Select.Option key={index} value={item.role_id}>
              {item.auth_level_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="rule_authname" noStyle>
        <Input type="hidden"/>
      </Form.Item>
    </div>
  );
};

export default AuthType;
