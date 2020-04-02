import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { GATE_CONTROL } from '../../../../api';

const Gate = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(GATE_CONTROL.READ);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prmssn_gate: value.prmssn_gate
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.gate')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="prmssn_gate" label={t('fields.gate')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectGate') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.gate_k}>
            {item.gate_k}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Gate;
