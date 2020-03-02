import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { PERSONNEL } from '../../../../api';

const Employer = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(PERSONNEL.EMPLOYERS);

  const { setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.employer')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_cmpy: value.per_cmpy
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="per_cmpy"
      label={t('fields.employer')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEmployer') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Employer;
