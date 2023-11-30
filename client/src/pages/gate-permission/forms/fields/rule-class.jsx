import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { GATE_PERMISSION } from '../../../../api';

const RuleClass = ({ value, form, onCaseChange }) => {
  const { t } = useTranslation();
  const { data: cases, isValidating } = useSWR(GATE_PERMISSION.RULE_CASES);

  const { setFieldsValue } = form;

  const onChange = (v) => {
    const ruleEtypname = _.find(cases?.records, (item) => {
      return item.case_code === v;
    });
    setFieldsValue({
      rule_casename: ruleEtypname.case_name,
    });

    onCaseChange(v);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        rule_case: value.rule_case,
        rule_casename: value.rule_casename,
      });
    }
  }, [value]);

  return (
    <div>
      <Form.Item name="rule_case" label={t('fields.permissionRuleClass')} rules={[{ required: true }]}>
        <Select
          popupMatchSelectWidth={false}
          allowClear
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          onChange={(v) => onChange(v)}
          // placeholder={!value ? t('placeholder.selectGate') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {cases?.records.map((item, index) => (
            <Select.Option key={index} value={item.case_code}>
              {item.case_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="rule_casename" noStyle>
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default RuleClass;
