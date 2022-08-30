import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Tag } from 'antd';

import { INVENTORY_REQUESTS } from '../../../../api';

const Type = ({ form, value, type, onChange }) => {
  const { t } = useTranslation();
  // const [type, setType] = useState(value?.tkrq_type);

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(INVENTORY_REQUESTS.REQUEST_TYPES);

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tkrq_type: value.tkrq_type,
      });
      onChange(value.tkrq_type);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="tkrq_type"
      label={
        type !== undefined ? (
          <>
            {t('fields.type')} &nbsp;&nbsp;&nbsp;
            <Tag color={'blue'}>
              {type === '0' ? t('descriptions.requestInformational') : t('descriptions.requestOfficial')}
            </Tag>
          </>
        ) : (
          t('fields.type')
        )
      }
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.rq_id}>
            {item.rq_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
