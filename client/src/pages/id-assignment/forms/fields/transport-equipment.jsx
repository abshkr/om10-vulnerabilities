import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const TransportEquipment = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const type = getFieldValue('kya_type');
  const carrier = getFieldValue('kya_eqpt_cmpy');

  const endpoints = {
    '8': `${ID_ASSIGNMENT.SCHEDULABLE}?owner=${carrier}`,
    '9': `${ID_ASSIGNMENT.NON_SCHEDULABLE}?owner=${carrier}`
  };

  const { data: options, isValidating } = useSWR(endpoints[type]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.transportEquipment')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_equipment: value.kya_equipment
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (carrier) {
      setFieldsValue({
        kya_equipment: null
      });
    }
  }, [carrier, setFieldsValue]);

  return (
    <Form.Item label={t('fields.transportEquipment')}>
      {getFieldDecorator('kya_equipment', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectTransportEquipment') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.eqpt_id}>
              {item.eqpt_desc}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default TransportEquipment;
