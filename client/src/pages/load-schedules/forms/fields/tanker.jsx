import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const Tanker = ({ form, value, carrier, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(
    `${LOAD_SCHEDULES.TANKERS_BY_CARRIER}?tnkr_carrier=${carrier}`
  );

  const IS_DISABLED = !value ? false : (value?.shls_status !== 'NEW SCHEDULE' || value?.shls_ld_type === '2');

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.tanker')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_code: value.tnkr_code,
      });

      onChange(value.tnkr_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item name="tnkr_code" label={t('fields.tanker')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        onChange={onChange}
        disabled={IS_DISABLED || !carrier}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTanker') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.tnkr_code}>
            {`${item.tnkr_code}${item.tnkr_name && (' - ' + item.tnkr_name)}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Tanker;
