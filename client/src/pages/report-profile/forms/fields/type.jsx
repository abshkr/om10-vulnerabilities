import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { REPORT_PROFILE } from '../../../../api';

/* const options = [
  {
    key: 'None',
    value: 'N'
  },
  {
    key: 'Daily',
    value: 'D'
  },
  {
    key: 'Weekly',
    value: 'W'
  },
  {
    key: 'Monthly',
    value: 'M'
  }
]; */

const Type = ({ form, value, source }) => {
  const { t } = useTranslation();
  const { data } = useSWR(REPORT_PROFILE.READ);
  const { data: options, isValidating } = useSWR(REPORT_PROFILE.TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const match = _.find(data?.records, (value) => {
      return value.report_jasper_file === source && value.report_type === input;
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    if (!!match & !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_type: value.report_type,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        report_type: undefined,
      });
    }
  }, [source, setFieldsValue, value]);

  return (
    <Form.Item name="report_type" label={t('fields.type')} rules={[{ required: true, validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={t('placeholder.selectType')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item) => (
          <Select.Option key={item.report_type_code} value={item.report_type_code}>
            {item.report_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
