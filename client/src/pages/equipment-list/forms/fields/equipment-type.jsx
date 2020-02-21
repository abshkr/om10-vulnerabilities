import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { EQUIPMENT_LIST } from '../../../../api';

const EquipmentType = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(EQUIPMENT_LIST.TYPES);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.equipmentType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_etp: value.eqpt_etp
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.equipmentType')}>
      {getFieldDecorator('eqpt_etp', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectEquipmentType') : null}
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
      )}
    </Form.Item>
  );
};

export default EquipmentType;
