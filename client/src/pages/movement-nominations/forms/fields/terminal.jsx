import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ORDER_LISTINGS } from '../../../../api';
import { Form, Select } from 'antd';
import useSWR from 'swr';

const Terminal = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.TERMINAL);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.terminal')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_terminal: value.mv_terminal
      });
    }
    else {
      setFieldsValue({
        mv_terminal: options?.records?.[0].term_code,
      });
    }
  }, [value, options, setFieldsValue]);

  return (
    <Form.Item 
      name="mv_terminal" 
      label={t('fields.terminal')} 
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        disabled={false}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTerminal') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {item.term_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Terminal;
