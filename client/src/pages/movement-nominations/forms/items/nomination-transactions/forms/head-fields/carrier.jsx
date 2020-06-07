import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { NOMINATION_TRANSACTIONS } from '../../../../../../../api';

const Carrier = ({ form, value, onChange, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(NOMINATION_TRANSACTIONS.CARRIERS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranCarrier')}`);
      }
    }

    return Promise.resolve();
  };

  const onCarrierChange = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_carrier: value.mvitm_carrier,
      });

      onChange(value.mvitm_carrier);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="mvitm_carrier"
      label={t('fields.nomtranCarrier')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        onChange={onCarrierChange}
        disabled={pageState === 'create' || pageState === 'edit' ? false : false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCarrier') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Carrier;
