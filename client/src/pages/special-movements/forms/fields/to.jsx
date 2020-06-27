import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import api from 'api';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const To = ({ type, onChange, form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const [suppliers, setSuppliers] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [supplier, setSupplier] = useState(undefined);
  const [tank, setTank] = useState(undefined);

  const IS_DISABLED = disabled;

  const getSuppliers = useCallback(() => {
    setLoading(true);

    api
      .get(SPECIAL_MOVEMENTS.SUPPLIERS)
      .then(response => {
        setSuppliers(response.data.records);
        setLoading(false);
      })
      .catch(errors => {
        setLoading(false);
      });
  }, []);

  const getTanks = useCallback(id => {
    setLoading(true);

    api
      .get(SPECIAL_MOVEMENTS.TANKS, {
        params: {
          supplier: id
        }
      })
      .then(response => {
        setTanks(response.data.records);
        setLoading(false);
      })
      .catch(errors => {
        setLoading(false);
      });
  }, []);

  const getProducts = useCallback(
    id => {
      setLoading(true);

      api
        .get(SPECIAL_MOVEMENTS.PRODUCTS, {
          params: {
            tank_code: id
          }
        })
        .then(response => {
          setProducts(response.data.records);
          setLoading(false);

          if (response.data.records.length > 0) {
            setFieldsValue({
              mlitm_prodcode_to: response.data.records[0]?.tank_base
            });
          }
        })
        .catch(errors => {
          setLoading(false);
        });
    },
    [setFieldsValue]
  );

  const onSupplierChange = value => {
    setSupplier(value);
    setTank(undefined);

    getTanks(value);

    setFieldsValue({
      mlitm_tankcode_to: undefined,
      mlitm_prodcode_to: undefined
    });
  };

  const onTankChange = value => {
    if (type === '0') {
      onChange(value);
    }

    setTank(value);
    getProducts(value);
  };

  useEffect(() => {
    if (value) {
      const prodCompany = value.mlitm_prodcmpy_to === '' ? undefined : value.mlitm_prodcmpy_to;
      const tankCode = value.mlitm_tankcode_to === '' ? undefined : value.mlitm_tankcode_to;
      const prodCode = value.mlitm_prodcode_to === '' ? undefined : value.mlitm_prodcode_to;

      setSupplier(prodCompany);
      setTank(tankCode);

      if (type === '0') {
        onChange(tankCode);
      }

      setFieldsValue({
        mlitm_prodcmpy_to: prodCompany,
        mlitm_tankcode_to: tankCode,
        mlitm_prodcode_to: prodCode
      });
    }
  }, [value, setFieldsValue, type, onChange]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item
        name="mlitm_prodcmpy_to"
        label={t('fields.toPlantSupplier')}
        style={{ width: '100%', marginRight: 5 }}
      >
        <Select
          showSearch
          loading={isLoading}
          onChange={onSupplierChange}
          disabled={IS_DISABLED}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToPlantSupplier')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {suppliers.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_code} - {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="mlitm_tankcode_to"
        label={t('fields.toTank')}
        style={{ width: '100%', marginRight: 5 }}
      >
        <Select
          showSearch
          loading={isLoading}
          onChange={onTankChange}
          disabled={IS_DISABLED || !supplier}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToTank')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {tanks.map((item, index) => (
            <Select.Option key={index} value={item.tank_code}>
              {item.tank_code} - {item.tank_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="mlitm_prodcode_to" label={t('fields.toProduct')} style={{ width: '100%' }}>
        <Select
          showSearch
          loading={isLoading}
          disabled={IS_DISABLED || !tank}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToProduct')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {products.map((item, index) => (
            <Select.Option key={index} value={item.tank_base}>
              {item.tank_base}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default To;
