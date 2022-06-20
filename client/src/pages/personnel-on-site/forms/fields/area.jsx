import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { PERSONNEL_ON_SITE } from '../../../../api';

const Area = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(PERSONNEL_ON_SITE.AREAS);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        perl_ara: value.area_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="perl_ara" label={t('fields.areaName')}>
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectArea') : null}
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

export default Area;
