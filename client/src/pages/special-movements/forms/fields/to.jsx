import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Row, Col } from 'antd';
import api, { SPECIAL_MOVEMENTS } from 'api';

const To = ({
  type,
  supplier,
  setSupplier,
  tank,
  setTank,
  product,
  setProduct,
  // onChange,
  form,
  value,
  disabled
}) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const [suppliers, setSuppliers] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const IS_DISABLED = disabled;

  const getSuppliers = useCallback(() => {
    setLoading(true);

    api
      .get(SPECIAL_MOVEMENTS.PLANT_SUPPLIERS)
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
            setProduct(response.data.records?.[0]?.tank_base);
            setFieldsValue({
              mlitm_prodcode_to: response.data.records?.[0]?.tank_base
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
    setProduct(undefined);

    getTanks(value);

    setFieldsValue({
      mlitm_tankcode_to: undefined,
      mlitm_prodcode_to: undefined
    });
  };

  const onTankChange = value => {
    setTank(value);
    setProduct(undefined);
    getProducts(value);

    setFieldsValue({
      mlitm_dens_cor: undefined,
    });
    // onChange(value);
  };

  useEffect(() => {
    if (value) {
      const prodCompany = value.mlitm_prodcmpy_to === '' ? undefined : value.mlitm_prodcmpy_to;
      const tankCode = value.mlitm_tankcode_to === '' ? undefined : value.mlitm_tankcode_to;
      const prodCode = value.mlitm_prodcode_to === '' ? undefined : value.mlitm_prodcode_to;

      setSupplier(prodCompany);
      setTank(tankCode);
      setProduct(prodCode);
      // onChange(tankCode);
      console.log('here I am in TO 2!....', prodCompany, tankCode, prodCode, type);

      setFieldsValue({
        mlitm_prodcmpy_to: prodCompany,
        mlitm_tankcode_to: tankCode,
        mlitm_prodcode_to: prodCode
      });
    }
  // }, [value, setFieldsValue, onChange]);
  }, [value, setFieldsValue, setSupplier, setTank, setProduct]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  /* useEffect(() => {
    if (type === '0' || type === '2') {
      setSupplier(null);
      setTank(null);
    }
  }, [type]); */

  useEffect(() => {
    if (value) {
      const prodCompany = value.mlitm_prodcmpy_to === '' ? undefined : value.mlitm_prodcmpy_to;
      const tankCode = value.mlitm_tankcode_to === '' ? undefined : value.mlitm_tankcode_to;
      // const prodCode = value.mlitm_prodcode_to === '' ? undefined : value.mlitm_prodcode_to;
      console.log('here I am!....');
      // getSuppliers();
      getTanks(prodCompany);
      getProducts(tankCode);
    }
  }, [value, getTanks, getProducts]);

  const validate = (rule, value) => {
    if (rule.required === false) {
      return;
    }

    let title = "Supplier or Tank or Base Product";
    if (rule.field === 'mlitm_prodcmpy_to') {
      title = t('fields.toPlantSupplier');
    }
    if (rule.field === 'mlitm_tankcode_to') {
      title = t('fields.toTank');
    }
    if (rule.field === 'mlitm_prodcode_to') {
      title = t('fields.toProduct');
    }

    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${title}`);
    }

    return Promise.resolve();
  };

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item
            name="mlitm_prodcmpy_to"
            label={t('fields.toPlantSupplier')}
            style={{ width: '100%', marginRight: 5 }}
            rules={[{ required: type==='0'||type==='2', validator: validate }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
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
                  {item.cmpy_desc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            name="mlitm_tankcode_to"
            label={t('fields.toTank')}
            style={{ width: '100%', marginRight: 5 }}
            rules={[{ required: type==='0'||type==='2', validator: validate }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
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
                  {item.tank_code} - {item.tank_name} [{item.base_code} - {item.prod_code} - {item.prod_name}]
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            name="mlitm_prodcode_to"
            label={t('fields.toProduct')}
            style={{ width: '100%' }}
            rules={[{ required: type==='0'||type==='2', validator: validate }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
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

export default To;
