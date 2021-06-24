import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const Personnel = ({ form, value, employer, role }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(`${ID_ASSIGNMENT.PSN}?employer=${employer}&role=${role}`);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.personnel')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_personnel: value.kya_personnel,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        kya_personnel: undefined,
      });
    } else {
      if (employer && role && options) {
        const found = _.find(options?.records, (o) => o?.per_code === value.kya_personnel);
        if (!found) {
          setFieldsValue({
            kya_personnel: undefined,
          });
        } else {
          setFieldsValue({
            kya_personnel: value.kya_personnel,
          });
        }
      }
    }
  }, [employer, role, options, setFieldsValue, value]);

  return (
    <Form.Item
      name="kya_personnel"
      label={t('fields.personnel')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        disabled={!employer || !role}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectPersonnel') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.per_code}>
            {item.per_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Personnel;
