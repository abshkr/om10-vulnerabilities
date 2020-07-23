import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { CUSTOMERS } from '../../../../api';

const Customer = ({ form, value, supplier }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  //const { data: options, isValidating } = useSWR(CUSTOMERS.CUST_COMPANYS);
  const { data: options, isValidating } = useSWR(
    `${CUSTOMERS.CUST_COMPANYS}?cust_supp_code=${supplier}`,
    { refreshInterval: 0,
    }
  );
  
  /*
  const { data: options, isValidating } = useSWR(
    `${CUSTOMERS.SUPP_CUST_COMPANYS}?cust_supp_code=${supplier}`,
    { refreshInterval: 0,
    }
  );
  */
  
  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.custCompany')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_cmpy_code: value.cust_cmpy_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_cmpy_code"
      label={t('fields.custCompany')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        // disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCompany') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.filter((item)=>(!value?(item.cust_supp===''):(item.cust_supp===supplier))).map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Customer;
