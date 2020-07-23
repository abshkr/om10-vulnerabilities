import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const Supplier = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.SUPPLIERS);

  useEffect(() => {
    if (value && value.mv_supplier !== '') {
      setFieldsValue({
        mv_supplier: value.mv_supplier
      });
    }
    else {
      setFieldsValue({
        mv_supplier: options?.records?.[0].cmpy_code,
      });
    }
  }, [value, options, setFieldsValue]);

  return (
    <Form.Item name="mv_supplier" label={t('fields.supplier')}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={t('placeholder.selectSupplier')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Supplier;
