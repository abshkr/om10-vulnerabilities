import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ORDER_LISTINGS } from '../../../../api';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

const Terminal = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.TERMINAL);

  const { setFieldsValue } = form;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;

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
        tank_terminal: value.tank_terminal,
      });
    } else {
      setFieldsValue({
        tank_terminal: site_code, // options?.records?.[0].term_code,
      });
    }
  }, [value, site_code, setFieldsValue]);

  return (
    <Form.Item
      name="tank_terminal"
      label={t('fields.terminal')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
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
