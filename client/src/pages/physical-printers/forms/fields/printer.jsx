import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { PHYSICAL_PRINTERS } from '../../../../api';

const Printer = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: physicalPrinters, isValidating } = useSWR(PHYSICAL_PRINTERS.READ);

  const validate = (rule, value) => {
    const match = _.find(physicalPrinters?.records, ['prntr', value]);

    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (value && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (value && value.charAt(0).toLowerCase() !== 'p') {
      return Promise.reject(`${t('descriptions.characterMustStart')} P`);
    }

    if (value && value.length > 10) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 10 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prntr: value.prntr
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="prntr"
      label={t('fields.logicalPrinter')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Printer;
