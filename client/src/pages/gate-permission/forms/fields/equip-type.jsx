import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { GATE_PERMISSION } from '../../../../api';

const EquipType = ({ value, form, enabled }) => {
  const { t } = useTranslation();
  const { data: cases, isValidating } = useSWR(GATE_PERMISSION.EQUIPMENT_TYPES);

  const { setFieldsValue } = form;

  const onChange = (v) => {
    const ruleEtypname = _.find(cases?.records, (item) => {
      return item.etyp_id === v;
    })
    setFieldsValue({
      rule_etypname: ruleEtypname.etyp_title
    })
  }

  useEffect(() => {
    if (value && enabled) {
      setFieldsValue({
        rule_etyp: value.rule_etyp,
        rule_etypname: value.rule_etypname,
      });
    }

    if (!enabled) {
      setFieldsValue({
        rule_etyp: null,
        rule_etypname: null,
      });
    }
  }, [value, enabled]);

  return (
    <div>
      <Form.Item 
        name="rule_etyp" 
        label={t('fields.equipmentType')} 
        rules={enabled && [{ required: true }]}
      >
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          disabled={!enabled}
          showSearch
          onChange={onChange}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {cases?.records.map((item, index) => (
            <Select.Option key={index} value={item.etyp_id}>
              {item.etyp_id === '-999' ? t('fields.any') : item.etyp_title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="rule_etypname" noStyle>
        <Input type="hidden"/>
      </Form.Item>
    </div>
  );
};

export default EquipType;
