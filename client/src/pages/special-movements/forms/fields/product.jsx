import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const Products = ({ form, value, toChange, fromChange, toTank, fromTank }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: from, isValidating: fromLoading } = useSWR(
    `${SPECIAL_MOVEMENTS.PRODUCTS}?tank_code=${fromTank}`
  );
  const { data: to, isValidating: toLoading } = useSWR(`${SPECIAL_MOVEMENTS.PRODUCTS}?tank_code=${toTank}`);

  const IS_LOADING = fromLoading || toLoading;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_prodcode: value.mlitm_prodcode,
        mlitm_prodcode_to: value.mlitm_prodcode_to
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value && from?.records.length > 0) {
      setFieldsValue({
        mlitm_prodcode: from?.records[0].tank_base
      });
    }
  }, [value, setFieldsValue, from, fromTank]);

  useEffect(() => {
    if (!value && to?.records.length > 0) {
      setFieldsValue({
        mlitm_prodcode_to: to?.records[0].tank_base
      });
    }
  }, [value, setFieldsValue, to, toTank]);

  useEffect(() => {
    if (!fromTank) {
      setFieldsValue({
        mlitm_prodcode: undefined
      });
    }
  }, [setFieldsValue, fromTank]);

  useEffect(() => {
    if (!toTank) {
      setFieldsValue({
        mlitm_prodcode_to: undefined
      });
    }
  }, [setFieldsValue, toTank]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item
        name="mlitm_prodcode"
        label={t('fields.fromProduct')}
        style={{ width: '50%', marginRight: 5 }}
      >
        <Select
          loading={IS_LOADING}
          showSearch
          disabled={!fromTank}
          onChange={fromChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectFromProduct')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        ></Select>
      </Form.Item>

      <Form.Item
        name="mlitm_prodcode_to"
        label={t('fields.toProduct')}
        style={{ width: '50%', marginLeft: 5 }}
      >
        <Select
          style={{ width: '100%' }}
          loading={IS_LOADING}
          showSearch
          disabled={!toTank}
          onChange={toChange}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToProduct')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        ></Select>
      </Form.Item>
    </div>
  );
};

export default Products;
