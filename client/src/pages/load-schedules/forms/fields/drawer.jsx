import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const Drawer = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.DRAWERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.drawer')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        drawer_code: value.drawer_code,
      });

      onChange(value.drawer_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="drawer_code"
      label={t('fields.drawer')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDrawer') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
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
