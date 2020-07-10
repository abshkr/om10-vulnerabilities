import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const AssignmentNumber = ({ form, value, physType, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);

  const validate = (rule, input, callback) => {
    const match = _.find(idAssignments?.records, ['kya_key_no', _.toString(input)]);

    if (input === '' || (!input && input !== 0)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.assignmentNo')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_key_no: value.kya_key_no
      });

      onChange(value.kya_key_no);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_key_no"
      label={t('fields.assignmentNo')}
      rules={[{ required: true, validator: validate }]}
    >
      <InputNumber 
        disabled={!!value || isValidating} 
        min={0}
        max={physType==='2' ? 9999 : 999999999}
        maxLength={physType==='2' ? 4 : 9}
        precision={0}
        style={{width: '100%'}}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default AssignmentNumber;
