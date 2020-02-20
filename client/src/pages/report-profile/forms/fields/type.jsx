import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { REPORT_PROFILE } from '../../../../api';

const options = [
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
];

const Type = ({ form, value }) => {
  const { t } = useTranslation();
  const { data } = useSWR(REPORT_PROFILE.READ);

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const source = getFieldValue('report_jasper_file');

  const validate = (rule, input, callback) => {
    const match = _.find(data?.records, value => {
      return value.report_jasper_file === source && value.report_type === input;
    });

    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    if (!!match & !value) {
      callback(t('descriptions.alreadyExists'));
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_type: value.report_type
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        report_type: undefined
      });
    }
  }, [source, setFieldsValue, value]);

  return (
    <Form.Item label={t('fields.type')}>
      {getFieldDecorator('report_type', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={t('placeholder.selectType')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map(item => (
            <Select.Option key={item.value} value={item.value}>
              {item.key}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Type;
