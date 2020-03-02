import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const AssignmentNumber = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);

  const validate = (rule, input, callback) => {
    const match = _.find(idAssignments?.records, ['kya_key_no', _.toString(input)]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.assignmentNo')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_key_no: value.kya_key_no
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_key_no"
      label={t('fields.assignmentNo')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default AssignmentNumber;
