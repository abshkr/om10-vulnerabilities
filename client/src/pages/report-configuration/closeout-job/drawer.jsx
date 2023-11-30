import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ON_DEMAND_REPORTS } from 'api';

const Drawer = ({ form, value, param, supplier, onChange }) => {
  // const { data: options, isValidating } = useSWR(ON_DEMAND_REPORTS.DRAWERS);
  const { data: options, isValidating } = useSWR(`${ON_DEMAND_REPORTS.DRAWERS}?parent=${supplier}`);

  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.drawer')}`);
    }

    return Promise.resolve();
  };

  const onDrawerChange = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (value && param) {
      onChange(value[param]);
    }
  }, [value, param]);

  useEffect(() => {
    if (!value && param && supplier !== 'ANY') {
      setFieldsValue({ [param]: supplier });
      onChange(supplier);
    }
  }, [value, param, supplier]);

  const itemLayout = {
    labelCol: { span: 6 },
    labelAlign: 'left',
  };

  return (
    <Form.Item
      form={form}
      name={param}
      label={t('fields.drawer')}
      rules={[{ required: true, validator: validate }]}
      {...itemLayout}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onDrawerChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectDrawer')}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records
          // .filter((o) => supplier === 'ANY' || o.cmpy_code === supplier)
          .map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_desc}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default Drawer;
