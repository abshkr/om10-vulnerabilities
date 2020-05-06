import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PRODUCT_GROUPS } from '../../../../api';

const MessageId = ({ form, value }) => {
  const { data, isValidating } = useSWR(PRODUCT_GROUPS.READ_MESSAGES);

  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    const match = _.find(data?.records, (record) => {
      return record.cm_msg_id.toLowerCase() === input?.toLowerCase();
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.messageId')}`);
    }

    if (input && match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cm_msg_id: value.cm_msg_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cm_msg_id"
      label={t('fields.messageId')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default MessageId;
