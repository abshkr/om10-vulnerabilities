import React from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ON_DEMAND_REPORTS } from 'api';

const Supplier = ({ form, param, supplier }) => {
  const { data: options, isValidating } = useSWR(ON_DEMAND_REPORTS.STRICT_SUPPLIERS);

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.carrier')}`);
    }

    return Promise.resolve();
  };

  const itemLayout = {
    labelCol: { span: 6 },
    labelAlign: 'left',
    // marginRight: 10
    // wrapperCol: { span: 16 },
  };

  return (
    <Form.Item
      form={form}
      name={param}
      label={t('fields.supplier')}
      rules={[{ required: true, validator: validate }]}
      {...itemLayout}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        // onChange={onCarrierChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectSupplier')}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records
          .filter((o) => supplier === 'ANY' || o.cmpy_code === supplier)
          .map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_desc}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default Supplier;
