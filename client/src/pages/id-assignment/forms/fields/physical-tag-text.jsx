import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const PhysicalTagText = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);

  const validate = (rule, input) => {
    const match = _.find(idAssignments?.records, ['kya_txt', _.toString(input)]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.physicalTagText')}`);
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
        kya_txt: value.kya_txt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_txt"
      label={t('fields.physicalTagText')}
      hasFeedback
      validateStatus={isValidating ? 'validating' : ''}
      rules={[{ required: true, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={isValidating} />
    </Form.Item>
  );
};

export default PhysicalTagText;
