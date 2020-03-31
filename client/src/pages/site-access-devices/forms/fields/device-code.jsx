import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { SITE_ACCESS_DEVICES } from '../../../../api';

const DeviceCode = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(SITE_ACCESS_DEVICES.DEVICE_CODES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.deviceCode')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        adv_code: value.adv_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="adv_code"
      label={t('fields.deviceCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDeviceCode') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.adv_code}>
            {item.adv_code}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DeviceCode;
