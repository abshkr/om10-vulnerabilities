import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDERLISTINGS } from '../../../../api';

const Drawer = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ORDERLISTINGS.DRAWERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderDrwrName')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_drwr_code: value.order_drwr_code,
      });

      onChange(value.order_drwr_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="order_drwr_code"
      label={t('fields.orderDrwrName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDrawer') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Drawer;
