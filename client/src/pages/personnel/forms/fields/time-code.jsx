import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { PERSONNEL } from '../../../../api';

const TimeCode = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(PERSONNEL.TIME_CODES);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.timeCode')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pt_timecd: value.pt_timecd
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.timeCode')}>
      {getFieldDecorator('pt_timecd', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectTimeCode') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.tcd_title}>
              {item.tcd_title}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default TimeCode;
