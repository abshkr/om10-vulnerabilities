import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Row, Col } from 'antd';
import _ from 'lodash';
import api, { SPECIAL_MOVEMENTS } from 'api';

const From = ({
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
  disabled,
  setTankSelected,
}) => {
  const { t } = useTranslation();

  const { getFieldValue, setFieldsValue } = form;

  const [suppliers, setSuppliers] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [baseTanks, setBaseTanks] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const IS_DISABLED = disabled;

  const getBaseTanks = (tanks) => {
    // There might be multiple drawer products sharing one tank
    const baseTanks = [];
    for (let i = 0; i < tanks.length; i++) {
      const tank = tanks[i];
      const item = _.find(baseTanks, (o) => o.tank_code === tank.tank_code);
      if (!item) {
        baseTanks.push(tank);
      }
    }
    return baseTanks;
  };

  const getSuppliers = useCallback(() => {
    setLoading(true);

    api
      .get(SPECIAL_MOVEMENTS.PLANT_SUPPLIERS)
      .then((response) => {
        setSuppliers(response.data.records);
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
      });
  }, []);

  const getTanks = useCallback((id) => {
    setLoading(true);

    api
      .get(SPECIAL_MOVEMENTS.TANKS, {
        params: {
          supplier: id,
        },
      })
      .then((response) => {
        setTanks(response.data.records);
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
      });
  }, []);

  const getProducts = useCallback(
    (suppCode, tankCode, fromTank) => {
      setLoading(true);

      api
        .get(SPECIAL_MOVEMENTS.SUPP_TANK_PRODUCTS, {
          params: {
            supplier: suppCode,
            tank_code: tankCode,
          },
        })
        .then((response) => {
          setProducts(response.data.records);
          setLoading(false);

          // const prodSelected = getFieldValue('mlitm_prodcode');
          if (response.data.records.length > 0 && fromTank) {
            // setProduct(response.data.records?.[0]?.tank_base);
            setProduct(response.data.records?.[0]?.prod_code);
            setFieldsValue({
              // mlitm_prodcode: response.data.records?.[0]?.tank_base,
              mlitm_prodcode: response.data.records?.[0]?.prod_code,
            });
          }
        })
        .catch((errors) => {
          setLoading(false);
        });
    },
    [setProduct, setFieldsValue]
  );

  const onSupplierChange = (value) => {
    setSupplier(value);
    setTank(undefined);
    setProduct(undefined);

    getTanks(value);

    setFieldsValue({
      mlitm_tankcode: undefined,
      mlitm_prodcode: undefined,
    });
  };

  const onTankChange = (value) => {
    // console.log('here I am in FROM  onTankChange!....', value);
    setTank(value);
    setProduct(undefined);
    const supp = getFieldValue('mlitm_prodcmpy');
    getProducts(supp, value, true);
    setTankSelected(true);

    // setFieldsValue({
    //   mlitm_dens_cor: undefined,
    // });
    // onChange(value);
  };

  useEffect(() => {
    if (value) {
      const prodCompany = value.mlitm_prodcmpy === '' ? undefined : value.mlitm_prodcmpy;
      const tankCode = value.mlitm_tankcode === '' ? undefined : value.mlitm_tankcode;
      const prodCode = value.mlitm_prodcode === '' ? undefined : value.mlitm_prodcode;

      setSupplier(prodCompany);
      setTank(tankCode);
      setProduct(prodCode);
      // onChange(tankCode);
      // console.log('here I am in FROM  2!....', prodCompany, tankCode, prodCode, type);

      setFieldsValue({
        mlitm_prodcmpy: prodCompany,
        mlitm_tankcode: tankCode,
        mlitm_prodcode: prodCode,
      });
    }
  }, [value, setFieldsValue]);
  // }, [value, setFieldsValue, setSupplier, setTank, setProduct]);

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
      const prodCompany = value.mlitm_prodcmpy === '' ? undefined : value.mlitm_prodcmpy;
      const tankCode = value.mlitm_tankcode === '' ? undefined : value.mlitm_tankcode;
      // const prodCode = value.mlitm_prodcode === '' ? undefined : value.mlitm_prodcode;

      // getSuppliers();
      getTanks(prodCompany);
      getProducts(prodCompany, tankCode, false);
    }
  }, [value, getTanks, getProducts]);

  const validate = (rule, value) => {
    if (rule.required === false) {
      return;
    }

    let title = 'Supplier or Tank or Base Product';
    if (rule.field === 'mlitm_prodcmpy') {
      title = t('fields.fromPlantSupplier');
    }
    if (rule.field === 'mlitm_tankcode') {
      title = t('fields.fromTank');
    }
    if (rule.field === 'mlitm_prodcode') {
      title = t('fields.fromProduct');
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
            name="mlitm_prodcmpy"
            label={t('fields.fromPlantSupplier')}
            style={{ width: '100%', marginRight: 5 }}
            rules={[{ required: type === '1' || type === '2', validator: validate }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
              showSearch
              loading={isLoading}
              onChange={onSupplierChange}
              disabled={IS_DISABLED}
              optionFilterProp="children"
              placeholder={t('placeholder.selectFromPlantSupplier')}
              filterOption={(input, option) =>
                option?.props?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
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
            name="mlitm_tankcode"
            label={t('fields.fromTank')}
            style={{ width: '100%', marginRight: 5 }}
            rules={[{ required: type === '1' || type === '2', validator: validate }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
              showSearch
              loading={isLoading}
              onChange={onTankChange}
              disabled={IS_DISABLED || !supplier}
              optionFilterProp="children"
              placeholder={t('placeholder.selectFromTank')}
              filterOption={(input, option) =>
                option?.props?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
              }
            >
              {getBaseTanks(tanks).map((item, index) => (
                <Select.Option key={index} value={item.tank_code}>
                  {`${item.tank_code} - ${item.tank_name}`}
                  {/*  [{item.base_code} - {item.prod_code} - {item.prod_name}] */}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            name="mlitm_prodcode"
            label={t('fields.fromProduct')}
            style={{ width: '100%' }}
            rules={[{ required: type === '1' || type === '2', validator: validate }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
              showSearch
              loading={isLoading}
              disabled={IS_DISABLED || !tank}
              optionFilterProp="children"
              placeholder={t('placeholder.selectFromProduct')}
              filterOption={(input, option) =>
                option?.props?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
              }
            >
              {products.map((item, index) => (
                <Select.Option key={index} value={item.prod_code}>
                  {`${item.prod_code} - ${item.prod_name}`}
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
