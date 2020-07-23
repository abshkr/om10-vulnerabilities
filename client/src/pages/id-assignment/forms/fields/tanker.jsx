import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Tanker = ({ form, value, carrier }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating, revalidate } = useSWR(
    `${ID_ASSIGNMENT.TANKERS}?tnkr_owner=${carrier}`
  );

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.tanker')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_tanker: value.kya_tanker
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    revalidate();

    if (!value) {
      setFieldsValue({
        kya_tanker: undefined
      });
    }
  }, [carrier, revalidate, setFieldsValue, value]);

  return (
    <Form.Item name="kya_tanker" label={t('fields.tanker')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        disabled={!carrier}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTanker') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.tnkr_code}>
            {item.tnkr_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Tanker;
