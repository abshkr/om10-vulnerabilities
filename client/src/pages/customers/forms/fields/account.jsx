import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { CUSTOMERS } from '../../../../api';

import { validatorStatus } from '../../../../utils';

const Account = ({ form, value, config }) => {
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
    } else {
      /* setFieldsValue({
        cust_account: '',
      }); */
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

  // this part is crucial for the instant verification of value
  useEffect(() => {
    if (account?.length > 0) {
      validateFields(['cust_account']);
    }
  }, [matched, account, validateFields]);

  const validate = (rule, input) => {
    console.log('account validate');
    if (matched && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.custAccount')}`);
    }
    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthCustAcct) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthCustAcct} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
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
      // validateStatus={account ? status : null}
      shouldUpdate
    >
      <Input disabled={!!value} onChange={handleFieldChange} />
    </Form.Item>
  );
};

export default Account;
