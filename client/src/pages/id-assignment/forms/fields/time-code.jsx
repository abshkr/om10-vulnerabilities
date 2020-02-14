import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { TIME_CODES } from '../../../../api';

const TimeCode = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(TIME_CODES.READ);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.timeCode')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_timecode: value.kya_timecode
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        kya_timecode: options?.records[0]?.tcd_title
      });
    }
  }, [value, options, setFieldsValue]);

  return (
    <Form.Item label={t('fields.timeCode')}>
      {getFieldDecorator('kya_timecode', {
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
