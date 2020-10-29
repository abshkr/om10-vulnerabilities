import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { REGEX } from '../../../../constants';

import { EQUIPMENT_TYPES } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: equipment, isValidating } = useSWR(EQUIPMENT_TYPES.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        etyp_title: value.etyp_title,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(equipment?.records, (record) => {
      return record.etyp_title.toLowerCase() === input?.toLowerCase();
    });

    if (!!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.equipmentTypeCode')}`);
    }

    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextDocument')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        name="etyp_title"
        label={t('fields.equipmentTypeCode')}
        rules={[{ required: true, validator: validate }]}
      >
        <Input disabled={!!value || isValidating} />
      </Form.Item>

      {value && (
        <Form.Item label={t('fields.compartments')}>
          <Input value={value?.cmptnu} disabled />
        </Form.Item>
      )}
    </>
  );
};

export default Code;
