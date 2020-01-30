import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { PHYSICAL_PRINTERS } from '../../../../api';

const Printer = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: physicalPrinters, isValidating } = useSWR(PHYSICAL_PRINTERS.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prntr: value.prntr
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(physicalPrinters?.records, ['prntr', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.charAt(0).toLowerCase() !== 'p') {
      callback(t('descriptions.characterMustStart'));
    }

    if (input && input.length > 10) {
      callback(`${t('placeholder.maxCharacters')}: 10 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.logicalPrinter')}>
      {getFieldDecorator('prntr', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default Printer;
