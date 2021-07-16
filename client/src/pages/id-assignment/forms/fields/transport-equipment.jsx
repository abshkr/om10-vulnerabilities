import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { ID_ASSIGNMENT } from '../../../../api';

const TransportEquipment = ({ form, value, type, carrier }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const endpoints = {
    8: `${ID_ASSIGNMENT.SCHEDULABLE}?owner=${carrier}`,
    9: `${ID_ASSIGNMENT.NON_SCHEDULABLE}?owner=${carrier}`,
  };

  const { data: options, isValidating } = useSWR(endpoints[type]);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.transportEquipment')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_equipment: value.kya_equipment,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        kya_equipment: undefined,
      });
    } else {
      if (carrier && options) {
        const found = _.find(options?.records, (o) => o?.eqpt_id === value.kya_equipment);
        if (!found) {
          setFieldsValue({
            kya_equipment: undefined,
          });
        } else {
          setFieldsValue({
            kya_equipment: value.kya_equipment,
          });
        }
      }
    }
  }, [carrier, options, setFieldsValue, value]);

  return (
    <Form.Item
      name="kya_equipment"
      label={t('fields.transportEquipment')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
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
    </Form.Item>
  );
};

export default TransportEquipment;
