import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { EQUIPMENT_LIST } from '../../../../api';

const EquipmentType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(EQUIPMENT_LIST.AREAS);

  const { setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.area')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_area: value.eqpt_area,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="eqpt_area" label={t('fields.area')} rules={[{ required: true, validator: validate }]}>
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

export default EquipmentType;
