import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

const TransferProduct = ({ form, value, code, title, prompt, base, options, onChange }) => {
  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.' + title)}`);
    }

    return Promise.resolve();
  };

  const onSelectionChange = (value) => {
    const item = options?.records?.find(
      (o) => o?.ratio_base === base && value === `${o?.prod_cmpy},${o?.prod_code}`
    );
    onChange(item);
  };

  return (
    <Form.Item name={code} label={t('fields.' + title)} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        showSearch
        onChange={onSelectionChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.' + prompt) : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records
          ?.filter((o) => o?.ratio_base === base)
          .map((item, index) => (
            <Select.Option key={index} value={`${item.prod_cmpy},${item.prod_code}`}>
              {`${item.prod_code} - ${item.prod_name} (${item.prod_cmpy} - ${item.cmpy_name})`}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default TransferProduct;
