import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const PhysicalTagText = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: idAssignments, isValidating } = useSWR(ID_ASSIGNMENT.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_txt: value.kya_txt
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(idAssignments?.records, ['kya_txt', _.toString(input)]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.physicalTagText')}`);
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
    <Form.Item
      label={t('fields.physicalTagText')}
      hasFeedback
      validateStatus={isValidating ? 'validating' : ''}
    >
      {getFieldDecorator('kya_txt', {
        rules: [{ required: true, validator: validate }]
      })(<Input style={{ width: '100%' }} disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default PhysicalTagText;
