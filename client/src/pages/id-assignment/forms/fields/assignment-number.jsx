import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

import {validatorStatus} from '../../../../utils';

const AssignmentNumber = ({ form, value, physType, onChange }) => {
  const [keyNo, setKeyNo] = useState(value?.kya_key_no);
  const [matched, setMatched] = useState(false);
  const { t } = useTranslation();
  const { setFieldsValue, validateFields } = form;

  const url = keyNo ? `${ID_ASSIGNMENT.CHECK_ASSN_NUM}?kya_key_no=${keyNo}` : null;
  // const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);
  const { data, isValidating, revalidate } = useSWR(url);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_key_no: value.kya_key_no
      });

      onChange(value.kya_key_no);
    }
  }, [value, setFieldsValue]);

  const handleFieldChange = (value) => {
    setKeyNo(value);
    onChange(value);
    revalidate();
  };

  useEffect(() => {
    revalidate();
  }, [keyNo, revalidate]);

  useEffect(() => {
    if (data) {
      const counter = _.toNumber(data?.records[0]?.cnt);
      const match = counter > 0;
      setMatched(match);
    }
  }, [data, setMatched]);

  // this part is crucial for the instant verification of value
  useEffect(() => {
    if (keyNo!==undefined && String(keyNo)?.length>0) {
      validateFields(['kya_key_no']);
    }
  }, [matched, keyNo, validateFields]);

  const validate = (rule, input, callback) => {
    console.log("key num validate")
    // if (input && matched && !value) {
    if (matched && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || (!input && input !== 0)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.assignmentNo')}`);
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const status = validatorStatus(isValidating, matched);

  return (
    <Form.Item
      name="kya_key_no"
      label={t('fields.assignmentNo')}
      hasFeedback
      rules={[{ required: true, validator: validate }]}
      validateStatus={keyNo ? status : null}
      shouldUpdate
    >
      <InputNumber 
        disabled={!!value} 
        min={0}
        max={physType==='2' ? 9999 : 999999999}
        maxLength={physType==='2' ? 4 : 9}
        precision={0}
        style={{width: '100%'}}
        onChange={handleFieldChange}
      />
    </Form.Item>
  );
};

export default AssignmentNumber;
