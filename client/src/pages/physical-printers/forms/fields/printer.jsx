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

  const validate = (rule, input) => {
    const match = _.find(physicalPrinters?.records, (object) => {
      const result = object.prntr.toLowerCase() === input?.toLowerCase();

      return result;
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (!value & !!match) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.charAt(0).toLowerCase() !== 'p') {
      return Promise.reject(`${t('descriptions.characterMustStart')} P`);
    }

    if (input && _.isNaN(_.toNumber(input.substr(1).toLowerCase()))) {
      return Promise.reject(`${t('placeholder.wrongType')} ─ ${t('descriptions.mustBeInteger')}`);
    }

    if (input && input.length > 3) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 3 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prntr: value.prntr,
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
