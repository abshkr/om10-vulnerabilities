import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Drawer = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.DRAWERS);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.drawer')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_drawer: value.kya_drawer,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="kya_drawer" label={t('fields.drawer')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDrawer') : null}
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

export default Drawer;
