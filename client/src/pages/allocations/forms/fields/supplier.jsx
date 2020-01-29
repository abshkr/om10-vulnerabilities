import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const Supplier = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.SUPPLIERS);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.supplier')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_suppcode: value.alloc_suppcode
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.supplier')}>
      {getFieldDecorator('alloc_suppcode', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectSupplier') : null}
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
      )}
    </Form.Item>
  );
};

export default Supplier;
