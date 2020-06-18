import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Select } from 'antd';
import useSWR from 'swr';

import { TANK_STATUS } from '../../../../api';

const Fields = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: tanks, isValidating: tanksLoading } = useSWR(TANK_STATUS.READ);
  const { setFieldsValue } = form;

  const isLoading = tanksLoading;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        strap_tankcode: value.strap_tankcode,
        strap_height: value.strap_height,
        strap_volume: value.strap_volume,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="strap_tankcode" label={t('fields.tank')}>
        <Select
          loading={isLoading}
          showSearch
          disabled={!!value}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {tanks?.records.map((item, index) => (
            <Select.Option key={index} value={item.tank_code}>
              {item.tank_code + ': ' + item.tank_name + '[' + item.tank_base + ' - ' + item.tank_base_name + ' - ' + item.tank_bclass_name + ']'}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="strap_height" label={`${t('fields.level')} (${t('units.mm')})`}>
        <InputNumber style={{ width: '100%' }} disabled={!!value} />
      </Form.Item>

      <Form.Item name="strap_volume" label={`${t('fields.observedVolume')} (${t('units.litres')})`}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default Fields;
