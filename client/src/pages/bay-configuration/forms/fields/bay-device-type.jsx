import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BAY_CONFIGURATION } from '../../../../api';

const BayDeviceType = ({ form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BAY_CONFIGURATION.DEVICE_TYPES);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.bayDeviceType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bad_lnktype: value.bad_lnktype,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="bad_lnktype"
      label={t('fields.bayDeviceType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={disabled}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBayDeviceType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.bat_dev_id}>
            {`${item.bat_dev_id} - ${item.bat_dev_name} (${t('fields.bayMaxArms')}: ${item.bat_n_arms})`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayDeviceType;
