import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { EQUIPMENT_LIST } from '../../../../api';

const Owner = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(EQUIPMENT_LIST.OWNERS);

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_owner: value.eqpt_owner
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.owner')}`);
    }

    callback();
  };

  return (
    <Form.Item label={t('fields.owner')}>
      {getFieldDecorator('eqpt_owner', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectOwner') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Owner;
