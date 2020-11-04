import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import jwtDecode from 'jwt-decode';

import { SITE_CONFIGURATION } from 'api';

const Terminal = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;

  const { data: options, isValidating } = useSWR(SITE_CONFIGURATION.TERMINALS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.terminal')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_terminal: value.shls_terminal,
      });
    } else {
      setFieldsValue({
        shls_terminal: site_code, // options?.records?.[0].term_code,
      });
    }
  }, [value, site_code, setFieldsValue]);

  return (
    <Form.Item
      name="shls_terminal"
      label={t('fields.terminal')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        dropdownMatchSelectWidth={false}
        // onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTerminal') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {`${item.term_code} - ${item.term_name}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Terminal;
