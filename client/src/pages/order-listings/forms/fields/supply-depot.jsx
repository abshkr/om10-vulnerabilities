import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TANKER_LIST } from '../../../../api';
import { Form, Select } from 'antd';
import useSWR from 'swr';

const SupplyDepot = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(TANKER_LIST.TERMINAL);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderStrmName')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_strm_code: value.order_strm_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_strm_code" label={t('fields.orderStrmName')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSupplyDepot') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {item.term_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SupplyDepot;
