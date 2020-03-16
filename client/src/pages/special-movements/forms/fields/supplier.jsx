import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const Supplier = ({ form, value, toChange, fromChange, reason, type, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.SUPPLIERS);

  const IS_FROM_ENABLED = ['1', '2'].includes(type) && reason && !disabled;
  const IS_TO_ENABLED = ['0', '2'].includes(type) && reason && !disabled;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_prodcmpy: value.mlitm_prodcmpy,
        mlitm_prodcmpy_to: value.mlitm_prodcmpy_to
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!IS_FROM_ENABLED && !value) {
      setFieldsValue({
        mlitm_prodcmpy: undefined
      });
    }
  }, [IS_FROM_ENABLED, setFieldsValue, fromChange, value]);

  useEffect(() => {
    if (!IS_TO_ENABLED && !value) {
      setFieldsValue({
        mlitm_prodcmpy_to: undefined
      });
    }
  }, [IS_TO_ENABLED, setFieldsValue, toChange, value]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item
        name="mlitm_prodcmpy"
        label={t('fields.fromPlantSupplier')}
        style={{ width: '50%', marginRight: 5 }}
      >
        <Select
          loading={isValidating}
          showSearch
          disabled={!IS_FROM_ENABLED}
          onChange={fromChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectFromPlantSupplier')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_code} - {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="mlitm_prodcmpy_to"
        label={t('fields.toPlantSupplier')}
        style={{ width: '50%', marginLeft: 5 }}
      >
        <Select
          style={{ width: '100%' }}
          loading={isValidating}
          showSearch
          disabled={!IS_TO_ENABLED}
          onChange={toChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToPlantSupplier')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_code} - {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Supplier;
