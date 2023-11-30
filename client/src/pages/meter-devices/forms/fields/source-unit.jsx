import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select, Input } from 'antd';
import useSWR from 'swr';

import { METER_DEVICES } from '../../../../api';

const SourceUnit = ({ form, value, source }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(METER_DEVICES.TANKS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.sourceUnit')}`);
    }

    if (input && input.length > 128) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 128 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mtd_src_type: value.mtd_src_type,
      });
    }
  }, [value, setFieldsValue]);

  const IS_TANK = source === '3';

  return (
    <Form.Item
      name="mtd_src_type"
      label={t('fields.sourceUnit')}
      rules={[{ required: true, validator: validate }]}
    >
      {IS_TANK ? (
        <Select
          popupMatchSelectWidth={false}
          allowClear
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectUnit') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item) => (
            <Select.Option key={item.tank_code} value={item.tank_code}>
              {item.tank_code}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <Input />
      )}
    </Form.Item>
  );
};

export default SourceUnit;
