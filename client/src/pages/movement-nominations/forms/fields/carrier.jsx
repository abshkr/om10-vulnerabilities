import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const Carrier = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.CARRIERS);

  useEffect(() => {
    if (value && value.mv_carrier !== '') {
      setFieldsValue({
        mv_carrier: value.mv_carrier
      });

      onChange(value.mv_carrier);
    }
  }, [value, setFieldsValue, onchange]);

  return (
    <Form.Item name="mv_carrier" label={t('fields.carrier')}>
      <Select
        loading={isValidating}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectCarrier')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

export default Carrier;
