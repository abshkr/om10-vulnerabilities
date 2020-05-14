import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const Tanker = ({ form, value, carrier }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(
    `${LOAD_SCHEDULES.TANKERS_BY_CARRIER}?tnkr_carrier=${carrier}`
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
        tnkr_code: value.tnkr_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="tnkr_code" label={t('fields.tanker')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value || !carrier}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTanker') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.tnkr_code}>
            {item.tnkr_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Tanker;
