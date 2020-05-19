import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { DELV_LOCATIONS } from '../../../../api';
import { Form, Select } from 'antd';

const EquipmentType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DELV_LOCATIONS.EQPT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvEtyp')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_etyp_id: String(value.delv_etyp_id),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="delv_etyp_id"
      label={t('fields.delvEtyp')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEqptType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.etyp_id}>
            {item.etyp_title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default EquipmentType;
