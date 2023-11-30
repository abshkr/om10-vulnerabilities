import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Employer = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.EMPLOYERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.employer')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_psnl_cmpy: value.kya_psnl_cmpy,
      });

      onChange(value.kya_psnl_cmpy);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="kya_psnl_cmpy"
      label={t('fields.employer')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEmployer') : null}
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

export default Employer;
