import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Row, Col } from 'antd';
import api from 'api';

import { SPECIAL_MOVEMENTS } from 'api';

const From = ({ onChange, form, value, disabled }) => {
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
              mlitm_prodcode: response.data.records[0]?.tank_base
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
      mlitm_tankcode: undefined,
      mlitm_prodcode: undefined
    });
  };

  const onTankChange = value => {
    setTank(value);
    getProducts(value);

    onChange(value);
  };

  useEffect(() => {
    if (value) {
      const prodCompany = value.mlitm_prodcmpy === '' ? undefined : value.mlitm_prodcmpy;
      const tankCode = value.mlitm_tankcode === '' ? undefined : value.mlitm_tankcode;
      const prodCode = value.mlitm_prodcode === '' ? undefined : value.mlitm_prodcode;

      setSupplier(prodCompany);
      setTank(tankCode);
      onChange(tankCode);

      setFieldsValue({
        mlitm_prodcmpy: prodCompany,
        mlitm_tankcode: tankCode,
        mlitm_prodcode: prodCode
      });
    }
  }, [value, setFieldsValue, onChange]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item
            name="mlitm_prodcmpy"
            label={t('fields.fromPlantSupplier')}
            style={{ width: '100%', marginRight: 5 }}
          >
            <Select
              showSearch
              loading={isLoading}
              onChange={onSupplierChange}
              disabled={IS_DISABLED}
              optionFilterProp="children"
              placeholder={t('placeholder.selectFromPlantSupplier')}
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
        </Col>
        <Col span={9}>
          <Form.Item name="mlitm_tankcode" label={t('fields.fromTank')} style={{ width: '100%', marginRight: 5 }}>
            <Select
              showSearch
              loading={isLoading}
              onChange={onTankChange}
              disabled={IS_DISABLED || !supplier}
              optionFilterProp="children"
              placeholder={t('placeholder.selectFromTank')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tanks.map((item, index) => (
                <Select.Option key={index} value={item.tank_code}>
                  {item.tank_code} - {item.tank_name} [{item.base_code} - {item.prod_code} - {item.prod_name}]
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item name="mlitm_prodcode" label={t('fields.fromProduct')} style={{ width: '100%' }}>
            <Select
              showSearch
              loading={isLoading}
              disabled={IS_DISABLED || !tank}
              optionFilterProp="children"
              placeholder={t('placeholder.selectFromProduct')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {products.map((item, index) => (
                <Select.Option key={index} value={item.tank_base}>
                  {item.tank_base} - {item.tank_base_name} [{item.tank_bclass_name}]
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default From;
