import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const Carrier = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.CARRIERS);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_carrier: value.mv_carrier
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.carrier')}>
      {getFieldDecorator('mv_carrier')(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectCarrier') : null}
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

export default Carrier;
