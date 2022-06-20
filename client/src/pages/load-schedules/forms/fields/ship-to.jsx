import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const ShipTo = ({ form, value, mode }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.SHIP_TO);

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_DISABLED = mode === '2' || (value && value.status !== 'F');
  // const IS_DISABLED = mode === '2' || (value && value.shls_status !== 'NEW SCHEDULE');

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_ship_to_num: value.shls_ship_to_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shls_ship_to_num" label={t('fields.shipTo')}>
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={IS_DISABLED}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectShipTo') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.partner_code}>
            {item.partner_cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ShipTo;
