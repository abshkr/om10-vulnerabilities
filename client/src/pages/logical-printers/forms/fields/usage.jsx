import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOGICAL_PRINTERS } from '../../../../api';

const Usage = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(LOGICAL_PRINTERS.PRINTERS);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.usage')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prt_usage_name: value.prt_usage_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.usage')}>
      {getFieldDecorator('prt_usage_name', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          disabled={!!value}
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectUsage') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {payload?.records.map((item, index) => (
            <Select.Option key={index} value={item.use_id}>
              {item.use_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Usage;
