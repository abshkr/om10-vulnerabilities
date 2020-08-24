import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { NOMINATION_TRANSACTIONS } from '../../../../../../../api';

const AltQtyUnit = ({ form, value, altQty, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(NOMINATION_TRANSACTIONS.ALT_UNITS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranAltQtyUnit')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_unit_rpt: value.mlitm_unit_rpt,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mlitm_unit_rpt"
      label={t('fields.nomtranAltQtyUnit') + '   '}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        disabled={(pageState === 'transfer' ? false : false) || !altQty}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectUnit') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.unit}>
            {item.unit}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AltQtyUnit;
