import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const Tank = ({ form, value, toChange, fromChange, toSupplier, fromSupplier, type, reason }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: from, isValidating: fromLoading } = useSWR(
    `${SPECIAL_MOVEMENTS.TANKS}?supplier=${fromSupplier}`
  );
  const { data: to, isValidating: toLoading } = useSWR(`${SPECIAL_MOVEMENTS.TANKS}?supplier=${toSupplier}`);

  const IS_LOADING = fromLoading || toLoading;

  const IS_FROM_ENABLED = ['1', '2'].includes(type) && reason && fromSupplier;
  const IS_TO_ENABLED = ['0', '2'].includes(type) && reason && toSupplier;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_tankcode: value.mlitm_tankcode,
        mlitm_tankcode_to: value.mlitm_tankcode_to
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    setFieldsValue({
      mlitm_tankcode: undefined
    });

    fromChange(undefined);
  }, [setFieldsValue, fromSupplier, fromChange]);

  useEffect(() => {
    setFieldsValue({
      mlitm_tankcode_to: undefined
    });

    toChange(undefined);
  }, [setFieldsValue, toSupplier, toChange]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item name="mlitm_tankcode" label={t('fields.fromTank')} style={{ width: '50%', marginRight: 5 }}>
        <Select
          loading={IS_LOADING}
          showSearch
          disabled={!IS_FROM_ENABLED}
          onChange={fromChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectFromTank')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {from?.records.map((item, index) => (
            <Select.Option key={index} value={item.tank_code}>
              {item.tank_code} - {item.tank_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="mlitm_tankcode_to" label={t('fields.toTank')} style={{ width: '50%', marginLeft: 5 }}>
        <Select
          style={{ width: '100%' }}
          loading={IS_LOADING}
          showSearch
          disabled={!IS_TO_ENABLED}
          onChange={toChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToTank')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {to?.records.map((item, index) => (
            <Select.Option key={index} value={item.tank_code}>
              {item.tank_code} - {item.tank_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Tank;
