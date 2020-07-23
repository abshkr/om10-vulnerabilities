import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { DELIVERY_DETAILS } from '../../../../api';

const SoldTo = ({ form, value, supplier, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(DELIVERY_DETAILS.SOLD_TO);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddSoldTo')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_sold_to: value.dd_sold_to,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_sold_to"
      label={t('fields.ddSoldTo')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        mode="tags"
        loading={isValidating}
        showSearch
        disabled={pageState === 'create' || pageState === 'edit' ? false : false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSoldTo') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records
          .filter((item) => (!value ? item.partner_cmpy_code === '' : item.partner_cmpy_code === supplier))
          .map((item, index) => (
            <Select.Option key={index} value={item.partner_code}>
              {item.partner_cmpy_name}
              {!item.partner_cust_name ? '' : ' - ' + item.partner_cust_name} - {item.partner_code} -{' '}
              {item.partner_name1}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default SoldTo;
