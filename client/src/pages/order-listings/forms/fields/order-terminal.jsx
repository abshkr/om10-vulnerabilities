import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ORDER_LISTINGS } from '../../../../api';
import { Form, Select } from 'antd';
import useSWR from 'swr';

const OrderTerminal = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.TERMINAL);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderDtrmName')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_dtrm_code: value.order_dtrm_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_dtrm_code" 
      label={t('fields.orderDtrmName')} 
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        disabled={(pageState==='create'||pageState==='edit')? false : true}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectOrderTerminal') : null}
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

export default OrderTerminal;
