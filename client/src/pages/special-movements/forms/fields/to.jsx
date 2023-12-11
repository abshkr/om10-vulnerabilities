import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Row, Col } from 'antd';
import moment from 'dayjs';
import _ from 'lodash';
import api, { SPECIAL_MOVEMENTS } from 'api';
import { SETTINGS } from '../../../../constants';

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
  disabled,
  setTankSelected,
  config,
  spmTime,
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
    (suppCode, tankCode, callByTank, callByTime = false) => {
      setLoading(true);

      // get the time
      let moveTime = getFieldValue('mlitm_dtim_start');
      const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
      if (moveTime === null || moveTime === undefined) {
        moveTime = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
      } else {
        moveTime = moveTime?.format(SETTINGS.DATE_TIME_FORMAT);
      }

      api
        .get(SPECIAL_MOVEMENTS.SUPP_TANK_PRODUCTS, {
          params: {
            supplier: suppCode,
            tank_code: tankCode,
            move_time: moveTime,
          },
        })
        .then((response) => {
          let productList = [];
          if (config?.siteFolioTankBaseChange) {
            if (IS_DISABLED) {
              // record submitted or reversed, the data cannot be changed, get all the available products in the folio
              productList = response.data.records;
            } else {
              // record new or created but not submitted yet, the data is editable, get the product of the particular period
              productList = response?.data?.records?.filter(
                (o) =>
                  (o.base_period_open === '' || o.base_period_open <= moveTime) &&
                  (o.base_period_close === '' || o.base_period_close >= moveTime)
              );
            }
          } else {
            productList = response.data.records;
          }

          setProducts(productList);
          setLoading(false);

          // const prodSelected = getFieldValue('mlitm_prodcode_to');
          if (productList.length > 0 && callByTank && !callByTime) {
            // setProduct(productList?.[0]?.tank_base);
            setProduct(productList?.[0]?.prod_code);
            setFieldsValue({
              // mlitm_prodcode_to: productList?.[0]?.tank_base,
              mlitm_prodcode_to: productList?.[0]?.prod_code,
            });
          } else {
            if (!value || callByTime) {
              // either callByTank is FALSE or productList.length is ZERO
              setProduct(undefined);
              setFieldsValue({
                // mlitm_prodcode_to: productList?.[0]?.tank_base,
                mlitm_prodcode_to: undefined,
              });
            }
          }
          if (productList.length === 0 && callByTank) {
            // either callByTank is FALSE or productList.length is ZERO
            setProduct(undefined);
            setFieldsValue({
              // mlitm_prodcode_to: productList?.[0]?.tank_base,
              mlitm_prodcode_to: undefined,
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
      mlitm_tankcode_to: undefined,
      mlitm_prodcode_to: undefined,
    });
  };

  const onTankChange = (value) => {
    setTank(value);
    setProduct(undefined);
    const supp = getFieldValue('mlitm_prodcmpy_to');
    getProducts(supp, value, true);
    setTankSelected(true);

    // setFieldsValue({
    //   mlitm_dens_cor: undefined,
    // });
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
      // console.log('here I am in TO 2!....', prodCompany, tankCode, prodCode, type);

      setFieldsValue({
        mlitm_prodcmpy_to: prodCompany,
        mlitm_tankcode_to: tankCode,
        mlitm_prodcode_to: prodCode,
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
      const prodCompany = value.mlitm_prodcmpy_to === '' ? undefined : value.mlitm_prodcmpy_to;
      const tankCode = value.mlitm_tankcode_to === '' ? undefined : value.mlitm_tankcode_to;
      // const prodCode = value.mlitm_prodcode_to === '' ? undefined : value.mlitm_prodcode_to;
      console.log('here I am!....');
      // getSuppliers();
      getTanks(prodCompany);
      getProducts(prodCompany, tankCode, false);
    }
  }, [value, getTanks, getProducts]);

  useEffect(() => {
    if (supplier && tank) {
      getProducts(supplier, tank, false, true);
    }
    // }, [spmTime, supplier, tank]);
  }, [spmTime]);

  const validate = (rule, value) => {
    if (rule.required === false) {
      return;
    }

    let title = 'Supplier or Tank or Base Product';
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
            rules={[{ required: type === '0' || type === '2', validator: validate }]}
          >
            <Select
              popupMatchSelectWidth={false}
              allowClear
              showSearch
              loading={isLoading}
              onChange={onSupplierChange}
              disabled={IS_DISABLED}
              optionFilterProp="children"
              placeholder={t('placeholder.selectToPlantSupplier')}
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
        <Col span={5}>
          <Form.Item
            name="mlitm_tankcode_to"
            label={t('fields.toTank')}
            style={{ width: '100%', marginRight: 5 }}
            rules={[{ required: type === '0' || type === '2', validator: validate }]}
          >
            <Select
              popupMatchSelectWidth={false}
              allowClear
              showSearch
              loading={isLoading}
              onChange={onTankChange}
              disabled={IS_DISABLED || !supplier}
              optionFilterProp="children"
              placeholder={t('placeholder.selectToTank')}
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
        <Col span={13}>
          <Form.Item
            name="mlitm_prodcode_to"
            label={t('fields.toProduct')}
            style={{ width: '100%' }}
            rules={[{ required: type === '0' || type === '2', validator: validate }]}
          >
            <Select
              popupMatchSelectWidth={false}
              allowClear
              showSearch
              loading={isLoading}
              disabled={IS_DISABLED || !tank}
              optionFilterProp="children"
              placeholder={t('placeholder.selectToProduct')}
              filterOption={(input, option) =>
                option?.props?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
              }
            >
              {!config?.siteFolioTankBaseChange &&
                products.map((item, index) => (
                  <Select.Option key={index} value={item.prod_code}>
                    {`${item.prod_code} - ${item.prod_name}`}
                  </Select.Option>
                ))}
              {config?.siteFolioTankBaseChange &&
                products.map((item, index) => (
                  <Select.Option key={index} value={item.prod_code}>
                    {`${item.prod_code} - ${item.prod_name} (${item.tank_density}${t('units.kg/m3')}, ${
                      item.base_period_open
                    }~${item.base_period_close})`}
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
