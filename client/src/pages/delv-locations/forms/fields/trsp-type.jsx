import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { DELV_LOCATIONS } from '../../../../api';
import { Form, Select } from 'antd';

const TransportType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DELV_LOCATIONS.TRANSPORT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvTrspType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_trsp_typeid: String(value.delv_trsp_typeid),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="delv_trsp_typeid"
      label={t('fields.delvTrspType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTrspType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.transport_id}>
            {item.transport_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TransportType;
