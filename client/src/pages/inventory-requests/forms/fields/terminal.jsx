import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Tag } from 'antd';

import { SITE_CONFIGURATION } from 'api';

const Terminal = ({ form, value, terminal, onChange, counts }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

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
        tkrq_depot: value.tkrq_depot,
      });
      onChange(value.tkrq_depot);
    }
  }, [value]);

  return (
    <Form.Item
      name="tkrq_depot"
      label={
        terminal !== undefined ? (
          <>
            {t('fields.terminal')} &nbsp;&nbsp;&nbsp;
            <Tag color={counts > 0 ? 'green' : 'red'}>
              {counts > 0
                ? t('descriptions.terminalHasTanks', { value: counts })
                : t('descriptions.terminalHasNoTanks')}
            </Tag>
          </>
        ) : (
          t('fields.terminal')
        )
      }
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        dropdownMatchSelectWidth={false}
        allowClear
        onChange={onChange}
        // disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTerminal') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {item.term_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Terminal;
