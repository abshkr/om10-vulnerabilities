import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import useSWR from 'swr';
import { AREA } from '../../../../api';

const Area = ({ form, value }) => {
  const { data } = useSWR(AREA.READ);

  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        area_k: value.area_k,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(data?.records, ['area_k', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.areaId')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 4) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')} ─ ${t('descriptions.mustBeInteger')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="area_k" label={t('fields.areaId')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Area;
