import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const Vehicle = ({ form, value, carrier }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(`${MOVEMENT_NOMIATIONS.TANKERS}?tnkr_carrier=${carrier}`);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_vehicle: value.mv_vehicle
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mv_vehicle" label={t('fields.vehicle')}>
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={t('placeholder.selectVehicle')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.tnkr_code}>
            {item.tnkr_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Vehicle;
