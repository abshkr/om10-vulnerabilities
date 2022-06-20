import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const Carrier = ({ form, customer, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const curCust = value ? value.shls_cust : customer;
  const { data: options, isValidating } = useSWR(`${LOAD_SCHEDULES.CARRIERS}?customer=${curCust}`);

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_DISABLED = !value ? false : value?.status !== 'F' || value?.shls_ld_type === '2';
  // const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE' || value?.shls_ld_type === '2';

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.carrier')}`);
    }

    return Promise.resolve();
  };

  const onCarrierChange = (value) => {
    onChange(value);

    setFieldsValue({
      tnkr_code: undefined,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        carrier_code: value.carrier_code,
      });

      onChange(value.carrier_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="carrier_code"
      label={t('fields.carrier')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onCarrierChange}
        disabled={IS_DISABLED}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCarrier') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Carrier;
