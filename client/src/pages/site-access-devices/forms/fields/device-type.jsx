import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { SITE_ACCESS_DEVICES } from '../../../../api';

const DeviceType = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(SITE_ACCESS_DEVICES.DEVICE_TYPES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.deviceType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        adv_device: value.adv_device
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="adv_device"
      label={t('fields.deviceType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDeviceType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.dev_type}>
            {item.dev_type}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DeviceType;
