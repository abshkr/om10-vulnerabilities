import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { CUSTOMERS } from '../../../../api';

import { validatorStatus } from '../../../../utils';
/*
const validateSwitch = (isLoading, match) => {
  if (isLoading) {
    return 'validating';
  } else if (match) {
    return 'warning';
  } else {
    return 'success';
  }
};
*/
const Account = ({ form, value }) => {
  const [account, setAccount] = useState(value?.cust_account);
  const [matched, setMatched] = useState(false);
  const { t } = useTranslation();
  const { setFieldsValue, validateFields } = form;

  const {
    data,
    isValidating,
    mutate: revalidate,
  } = useSWR(`${CUSTOMERS.CHECK_ACCOUNT}?cust_account=${account}`, {
    refreshInterval: 0,
  });

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_account: value.cust_account,
      });
    }
  }, [value, setFieldsValue]);

  const handleFieldChange = (event) => {
    setAccount(event.target.value);
    revalidate();
  };

  useEffect(() => {
    revalidate();
  }, [account, revalidate]);

  useEffect(() => {
    if (data) {
      const counter = _.toNumber(data?.records[0]?.cnt);
      const match = counter > 0;
      setMatched(match);
    }
  }, [data, setMatched]);

  useEffect(() => {
    validateFields(['cust_account']);
  }, [matched, validateFields]);

  const validate = (rule, input) => {
    if (matched && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.custAccount')}`);
    }
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    return Promise.resolve();
  };

  const status = validatorStatus(isValidating, matched);

  return (
    <Form.Item
      name="cust_account"
      label={t('fields.custAccount')}
      hasFeedback
      rules={[{ required: true, validator: validate }]}
      validateStatus={status}
      shouldUpdate
    >
      <Input disabled={!!value} onChange={handleFieldChange} />
    </Form.Item>
  );
};

export default Account;
