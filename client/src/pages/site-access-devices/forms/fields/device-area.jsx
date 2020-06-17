import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { SITE_ACCESS_DEVICES } from '../../../../api';

const DeviceArea = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(SITE_ACCESS_DEVICES.AREAS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.deviceAreaName')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        adv_area: value.adv_area
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="adv_area"
      label={t('fields.deviceAreaName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        // placeholder={!value ? t('placeholder.selectDeviceAreaName') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.area_k}>
            {item.area_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DeviceArea;
