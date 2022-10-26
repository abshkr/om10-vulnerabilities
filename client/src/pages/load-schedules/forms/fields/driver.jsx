import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { LOAD_SCHEDULES } from '../../../../api';

const Driver = ({ form, value, employer, enabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(`${LOAD_SCHEDULES.DRIVERS}?employer=${employer}`);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.driver')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        driver: value.driver,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        driver: undefined,
      });
    } else {
      if (!employer) {
        setFieldsValue({
          driver: undefined,
        });
      }
      if (employer && options) {
        const found = _.find(options?.records, (o) => o?.per_code === value.driver);
        if (!found) {
          setFieldsValue({
            driver: undefined,
          });
        } else {
          setFieldsValue({
            driver: value.driver,
          });
        }
      }
    }
  }, [employer, options, setFieldsValue, value]);

  return (
    <Form.Item name="driver" label={t('fields.driver')} rules={[{ required: false, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        disabled={!employer || (!value ? false : !enabled)}
        loading={isValidating}
        showSearch
        allowClear
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDriver') : null}
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

export default Driver;
