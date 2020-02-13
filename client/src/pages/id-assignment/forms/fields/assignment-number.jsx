import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const AssignmentNumber = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_key_no: value.kya_key_no
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(idAssignments?.records, ['kya_key_no', _.toString(input)]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.assignmentNo')}`);
    }

    if (input && !!match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.assignmentNo')}>
      {getFieldDecorator('kya_key_no', {
        rules: [{ required: true, validator: validate }]
      })(<InputNumber min={0} style={{ width: '100%' }} disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default AssignmentNumber;
