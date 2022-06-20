import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { PHYSICAL_PRINTERS } from '../../../../api';

const Area = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(PHYSICAL_PRINTERS.AREAS);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prntr_area: value.prntr_area,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prntr_area" label={t('fields.areaLocation')}>
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectAreaLocation') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.area_k}>
            {item.area_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Area;
