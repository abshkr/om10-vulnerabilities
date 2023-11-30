import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { STAGING_BAY } from '../../../../api';

const DeliveryLocation = ({ form, value, customer, enabled }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(`${STAGING_BAY.CUST_DELVLOCS}?customer=${customer}`);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderDlocName')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_delvloc: value.shls_delvloc,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        shls_delvloc: undefined,
      });
    } else {
      if (!customer) {
        setFieldsValue({
          shls_delvloc: undefined,
        });
      }
      if (customer && options) {
        const found = _.find(options?.records, (o) => o?.delv_code === value.shls_delvloc);
        if (!found) {
          setFieldsValue({
            shls_delvloc: undefined,
          });
        } else {
          setFieldsValue({
            shls_delvloc: value.shls_delvloc,
          });
        }
      }
    }
  }, [customer, options, setFieldsValue, value]);

  return (
    <Form.Item
      name="shls_delvloc"
      label={t('fields.orderDlocName')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        allowClear
        popupMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        disabled={!customer || (!value ? false : !enabled)}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDeliveryLocation') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.delv_code}>
            {item.delv_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DeliveryLocation;
