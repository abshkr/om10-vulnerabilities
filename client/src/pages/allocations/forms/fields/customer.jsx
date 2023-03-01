import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';
import api, { ALLOCATIONS, LOAD_SCHEDULES } from '../../../../api';

const Customer = ({ form, value, onChange, supplier }) => {
  const { setFieldsValue } = form;
  const [options, setOptions] = useState(null);

  const { t } = useTranslation();

  const { data: companys, isValidatingCompany } = useSWR(`${ALLOCATIONS.CUSTOMERS}`);
  const { data: accounts, isValidatingAccount } = useSWR(
    `${LOAD_SCHEDULES.SUPP_CUSTOMERS}?supplier=${!supplier || supplier === 'BaSePrOd' ? '-1' : supplier}`
  );

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.company')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (companys && accounts) {
      const items = _.filter(companys?.records, (o) => {
        const acnt = _.find(accounts?.records, (itm) => o?.cmpy_code === itm.cust_cmpy_code);
        if (!acnt) {
          return false;
        } else {
          return true;
        }
      });
      setOptions(items);
      if (!value) {
        setFieldsValue({
          alloc_cmpycode: undefined,
        });
        onChange(undefined);
      }
    }
  }, [companys, accounts]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_cmpycode: value.alloc_cmpycode,
      });
      onChange(value.alloc_cmpycode);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="alloc_cmpycode"
      label={t('fields.company')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidatingCompany || isValidatingAccount}
        disabled={!!value || !supplier}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCompany') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Customer;
