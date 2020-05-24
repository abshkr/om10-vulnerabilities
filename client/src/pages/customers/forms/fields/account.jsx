import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { CUSTOMERS } from '../../../../api';

const Account = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_account: value.cust_account
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.custAccount')}`);
    }
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const handleFieldChange = (event) => {
    //setAccount(event.target.value);
    const input = event.target.value;
    axios
    .get(CUSTOMERS.CHECK_ACCOUNT, {
      params: {
        cust_account: input,
      },
    })
    .then((res) => {
      console.log('CHECK_ACCOUNT', res.data.records); 
      const result = res?.data?.records;
      //setCount;
      const match = (result[0].cnt) > 0;

      if (!!match && !value) {
        return Promise.reject(t('descriptions.alreadyExists'));
      }
    });
  };

  return (
    <Form.Item name="cust_account" label={t('fields.custAccount')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value} onChange={handleFieldChange} />
    </Form.Item>
  );
};

export default Account;
