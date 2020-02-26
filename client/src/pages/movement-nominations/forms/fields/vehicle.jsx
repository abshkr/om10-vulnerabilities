import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const Vehicle = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const carrier = getFieldValue('mv_carrier');

  const { data: options, isValidating } = useSWR(`${MOVEMENT_NOMIATIONS.TANKERS}?tnkr_carrier=${carrier}`);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_vehicle: value.mv_vehicle
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    setFieldsValue({
      mv_vehicle: undefined
    });
  }, [carrier, setFieldsValue]);

  return (
    <Form.Item label={t('fields.vehicle')}>
      {getFieldDecorator('mv_vehicle')(
        <Select
          loading={isValidating}
          showSearch
          disabled={!carrier}
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectVehicle') : null}
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
      )}
    </Form.Item>
  );
};

export default Vehicle;
