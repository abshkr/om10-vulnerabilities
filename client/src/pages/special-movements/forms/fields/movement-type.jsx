import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Input } from 'antd';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const MovementType = ({ form, value, onChange, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.TYPES);

  const IS_DISABLED = disabled;

  const handleChange = value => {
    setFieldsValue({
      mlitm_reason_code: undefined
    });

    onChange(value);
  };

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.movementType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_type: value.mlitm_type,
        mlitm_id: value.mlitm_id,
      });

      onChange(value.mlitm_type);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <div>
      <Form.Item
        name="mlitm_type"
        label={t('fields.movementType')}
        rules={[{ required: true, validator: validate }]}
      >
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          showSearch
          disabled={IS_DISABLED}
          onChange={handleChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectMovementType')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.movitem_type_id}>
              {item.movitem_type_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="mlitm_id" noStyle>
        <Input type="hidden"/>
      </Form.Item>
    </div>
  );
};

export default MovementType;
