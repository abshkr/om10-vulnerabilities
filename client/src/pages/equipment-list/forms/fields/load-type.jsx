import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { EQUIPMENT_LIST } from '../../../../api';

const LoadType = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(EQUIPMENT_LIST.LOAD_TYPES);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.loadType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_load_type: value.eqpt_load_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.loadType')}>
      {getFieldDecorator('eqpt_load_type', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectLoadType') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.ld_type_code}>
              {item.ld_type_text}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default LoadType;
