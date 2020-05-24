/*
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { CUSTOMERS } from '../../../../api';

const validateSwitch = (isLoading, match) => {
  if (isLoading) {
    return 'validating';
  } else if (match) {
    return 'warning';
  } else {
    return 'success';
  }
};

const Account = ({ form, value }) => {
  const [account, setAccount] = useState(value?.cust_account);
  const [matched, setMatched] = useState(false);
  const { t } = useTranslation();
  const { setFieldsValue, validateFields } = form;

  const { data, isValidating } = useSWR(`${CUSTOMERS.CHECK_ACCOUNT}?cust_account=${account}`, {
    refreshInterval: 0,
  });

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_account: value.cust_account,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (data) {
      const counter = _.toNumber(data?.records[0]?.cnt);
      const match = counter > 0;
      setMatched(match);
    }
  }, [data]);

  useEffect(() => {
    if (matched) {
      validateFields(['cust_account']);
    }
  }, [matched]);

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

  const handleFieldChange = (event) => {
    setAccount(event.target.value);
  };

  const status = validateSwitch(isValidating, matched);

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
*/
import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { CUSTOMERS } from '../../../../api';

const Account = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: accounts, isValidating } = useSWR(CUSTOMERS.ACCOUNT_NUMBERS);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_account: value.cust_account
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(accounts?.records, record => {
      return record.cust_acct.toLowerCase() === input?.toLowerCase();
    });

    if (!!match && !value) {
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

  return (
    <Form.Item name="cust_account" label={t('fields.custAccount')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Account;
