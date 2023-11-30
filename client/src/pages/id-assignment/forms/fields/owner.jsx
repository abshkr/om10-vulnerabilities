import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Owner = ({ form, value, setOwner }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.CARRIERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.owner')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_tnkr_cmpy: value.kya_tnkr_cmpy,
      });

      setOwner(value.kya_tnkr_cmpy);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_tnkr_cmpy"
      label={t('fields.owner')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        onChange={setOwner}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectOwner') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Owner;
