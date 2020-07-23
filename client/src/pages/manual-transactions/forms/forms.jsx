import React, { useEffect } from 'react';
import { Form, Select, Input, Button, Row, Col, DatePicker, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import moment from 'moment';

import api, { MANUAL_TRANSACTIONS } from '../../../api';
import { getDateTimeFormat } from '../../../utils';
import TripSealManager from './trip-seals';
import OrderSealManager from './order-seals';

const { Option } = Select;

const Forms = ({
  form,
  sourceType,
  setSourceType,
  loadType,
  setLoadType,
  loadNumber,
  setLoadNumber,
  trips,
  setTrips,
  tankers,
  setTankers,
  orders,
  setOrders,
  customers,
  setCustomers,
  selectedSupplier,
  setSelectedSupplier,
  selectedCustomer,
  setSelectedCustomer,
  selectedTrip,
  setSelectedTrip,
  selectedOrder,
  setSelectedOrder,
  selectedTanker,
  setSelectedTanker,
  params,
  popup,
  setOrderSeals,
  dataBoard,
  setDataBoard,
  dataLoadFlag,
  setDataLoadFlag,
  dataLoaded,
  setDataLoaded,
  setProductArms,
  setDataDrawTransfers,
  setDataBaseTransfers,
  setDataBaseTotals,
  setDataMeterTransfers,
  setDataMeterTotals,
}) => {
  const { setFieldsValue, resetFields } = form;

  const { t } = useTranslation();

  const { data: suppliers, isValidating: suppliersLoading } = useSWR(
    sourceType === 'SCHEDULE' ? MANUAL_TRANSACTIONS.SCHEDULE_SUPPLIERS : MANUAL_TRANSACTIONS.ORDER_SUPPLIERS
  );
  const { data: drivers, isValidating: driversLoading } = useSWR(MANUAL_TRANSACTIONS.DRIVERS);
  const { data: carriers, isValidating: carriersLoading } = useSWR(MANUAL_TRANSACTIONS.CARRIERS);

  const getTripsBySupplier = async (supplier) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.TRIPS}?supplier=${supplier}`);

    return results?.data;
  };

  const getCustomersBySupplier = async (supplier) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.CUSTOMERS}?supplier=${supplier}`);

    return results?.data;
  };

  const getTankersByCarrier = async (carrier) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.TANKERS}?tnkr_carrier=${carrier}`);

    return results?.data;
  };

  const getOrdersByCustomer = async (customer) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.ORDERS}?supplier=${selectedSupplier}&customer=${customer}`
    );

    return results?.data;
  };

  const getTripTypeByTrip = async (trip) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.TRIP_TYPE}?supplier=${selectedSupplier}&trip_no=${trip}`
    );

    return results?.data;
  };

  const getTripSealByTrip = async (trip) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.GET_TRIP_SEAL}?supplier=${selectedSupplier}&trip_no=${trip}`
    );

    return results?.data;
  };

  const getTripBasicsByTrip = async (trip) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.TRIP_BASICS}?supplier=${selectedSupplier}&trip_no=${trip}`
    );

    return results?.data;
  };

  const getOrderBasicsByOrder = async (order) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.ORDER_BASICS}?supplier=${selectedSupplier}&order_cust_no=${order}`
    );

    return results?.data;
  };

  const handleTripSelect = async (trip) => {

    setDataDrawTransfers([]);
    setDataBaseTransfers([]);
    setDataBaseTotals([]);
    setDataMeterTransfers([]);
    setDataMeterTotals([]);

    const results = await getTripBasicsByTrip(trip);

    const value = results?.records?.[0];

    const tankerResults = await getTankersByCarrier(value?.carrier);

    const typeResults = await getTripTypeByTrip(trip);

    const sealResults = await getTripSealByTrip(trip);

    setLoadType(typeResults?.records?.[0]?.schd_type);
    setLoadNumber(trip);

    setTankers(tankerResults);
    setSelectedTrip(trip);
    setSelectedTanker(value?.tnkr_code);
    setProductArms(undefined);

    setFieldsValue({
      tanker: value?.tnkr_code,
      carrier: value?.carrier,
      driver: !value?.driver ? drivers?.records?.[0]?.per_code : value?.driver,
      seal_range: sealResults?.records?.[0]?.shls_seal_no,
    });
  };

  const handleOrderSelect = async (order) => {
    setDataDrawTransfers([]);
    setDataBaseTransfers([]);
    setDataBaseTotals([]);
    setDataMeterTransfers([]);
    setDataMeterTotals([]);

    const results = await getOrderBasicsByOrder(order);

    const value = results?.records?.[0];

    const tankerResults = await getTankersByCarrier(value?.order_carrier);

    setLoadType('BY_PRODUCT');
    setLoadNumber(order);

    setTankers(tankerResults);
    setSelectedOrder(order);
    setProductArms(undefined);

    setFieldsValue({
      carrier: value?.order_carrier,
      driver: drivers?.records?.[0]?.per_code,
      mt_cust_code: value?.customer_code,
      mt_delv_loc: value?.delivery_location,
    });
  };

  const handleSupplierSelect = async (supplier) => {
    setFieldsValue({
      trip_no: undefined,
      tanker: undefined,
      carrier: undefined,
      driver: undefined,
      customer: undefined,
      order_no: undefined,
    });

    console.log('handleSupplierSelect', sourceType);

    if (sourceType === 'SCHEDULE') {
      const trips = await getTripsBySupplier(supplier);
      setTrips(trips);
    } else {
      setTrips(null);
    }

    const customers = await getCustomersBySupplier(supplier);

    setCustomers(customers);
    setSelectedSupplier(supplier);
    setSelectedTrip(null);
    setFieldsValue({
      seal_range: '',
    });
  };

  const handleCustomerSelect = async (customer) => {
    const orders = await getOrdersByCustomer(customer);

    setOrders(orders);
    setSelectedCustomer(customer);
    setSelectedOrder(null);
    setFieldsValue({
      seal_range: '',
    });
  };

  const handleTankerSelect = (tanker) => {
    // get tanker equipment and compartments
    setSelectedTanker(tanker);
  };

  const handleCarrierSelect = async (carrier) => {
    // get tanker list of the carrier
    const tankers = await getTankersByCarrier(carrier);
    setSelectedTanker(null);
    setTankers(tankers);
  };

  const handleDriverSelect = (tanker) => {
    // get tanker equipment and compartments
    console.log('Forms: Testing Types', sourceType, loadType, loadNumber);
  };

  const handleTypeSelect = (type) => {
    setSourceType(type);

    setFieldsValue({
      supplier: undefined,
      trip_no: undefined,
      tanker: undefined,
      carrier: undefined,
      driver: undefined,
      customer: undefined,
      order_no: undefined,
      user_comments: '',
      seal_range: '',
      load_security: '',
      mt_mngr_oo: '',
      mt_cust_code: '',
      mt_delv_loc: '',
      mt_delv_num: '',
    });

    setLoadType(null);
    setLoadNumber(null);
    setTrips(null);
    setTankers(null);
    setOrders(null);
    setCustomers(null);
    setSelectedSupplier(null);
    setSelectedTrip(null);
    setSelectedOrder(null);
    setSelectedTanker(null);

    setDataDrawTransfers([]);
    setDataBaseTransfers([]);
    setDataBaseTotals([]);
    setDataMeterTransfers([]);
    setDataMeterTotals([]);
    //resetFields();
  };

  const loadTripSeal = async () => {
    const sealResults = await getTripSealByTrip(selectedTrip);

    setFieldsValue({
      seal_range: sealResults?.records?.[0]?.shls_seal_no,
    });

  }

  const onViewTripSeals = () => {
    // pop up the dialog to manage seals for the schedule
    //alert('TODO: manage seals for the schedule');
    TripSealManager(
      t('tabColumns.tripSeals'),
      {supplier_code: selectedSupplier, shls_trip_no: selectedTrip},
      loadTripSeal,
      '80vw',
      '40vh',
    );
  };

  const loadOrderSeal = async (value) => {
    console.log('Forms: loadOrderSeal', value);
    setFieldsValue({
      seal_range: value?.sealRange,
    });

    setOrderSeals(value?.sealList);
  }

  const onViewOrderSeals = () => {
    // pop up the dialog to manage seals for the open order
    //alert('TODO: manage seals for the open order');
    OrderSealManager(
      t('tabColumns.orderSeals'),
      {supplier_code: selectedSupplier, order_no: selectedOrder},
      loadOrderSeal,
      '80vw',
      '40vh',
    );
  };

  useEffect(() => {
    if (params && popup && !sourceType) {
      form.setFieldsValue({
        source_type: params?.trans_type,
      });
      handleTypeSelect(params?.trans_type);
    }
  }, [popup, params, sourceType]);

  useEffect(() => {
    // if (params && popup && (sourceType === 'SCHEDULE' || sourceType === 'OPENORDER') && !selectedSupplier) {
    if (params && popup && !selectedSupplier) {
      form.setFieldsValue({
        supplier: params?.supplier,
      });
      handleSupplierSelect(params?.supplier);
    }
  }, [popup, params, selectedSupplier]);
  // }, [popup, params, sourceType, selectedSupplier]);

  useEffect(() => {
    if (params && popup && sourceType === 'OPENORDER' && selectedSupplier && !selectedCustomer) {
      form.setFieldsValue({
        customer: params?.customer,
      });
      handleCustomerSelect(params?.customer);
    }
  }, [popup, params, sourceType, selectedSupplier, selectedCustomer]);

  useEffect(() => {
    if (params && popup && sourceType === 'OPENORDER' && selectedSupplier && !selectedOrder) {
      form.setFieldsValue({
        order_no: params?.order_cust_no,
      });
      handleOrderSelect(params?.order_cust_no);
    }
  }, [popup, params, sourceType, selectedSupplier, selectedOrder]);

  useEffect(() => {
    if (params && popup && sourceType === 'SCHEDULE' && selectedSupplier && !selectedTrip) {
      form.setFieldsValue({
        trip_no: params?.trip_no,
      });
      handleTripSelect(params?.trip_no);
    }
  }, [popup, params, sourceType, selectedSupplier, selectedTrip]);

  useEffect(() => {
    setFieldsValue({
      start_date: moment(),
      end_date: moment(),
    });
  }, [setFieldsValue]);

  const format = getDateTimeFormat();

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && !sourceType) {
      form.setFieldsValue({
        source_type: dataLoaded?.source_type,
      });
      handleTypeSelect(dataLoaded?.source_type);
      console.log('MT 1 - Forms: data loading - sourceType selected!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType && !selectedSupplier) {
      form.setFieldsValue({
        supplier: dataLoaded?.supplier,
      });
      handleSupplierSelect(dataLoaded?.supplier);
      console.log('MT 1 - Forms: data loading - supplier selected!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType === 'OPENORDER' && selectedSupplier && !selectedCustomer) {
      form.setFieldsValue({
        customer: dataLoaded?.customer,
      });
      handleCustomerSelect(dataLoaded?.customer);
      console.log('MT 1 - Forms: data loading - customer selected for order!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier, selectedCustomer]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType === 'OPENORDER' && selectedSupplier && !selectedOrder) {
      form.setFieldsValue({
        order_no: dataLoaded?.order_no,
      });
      handleOrderSelect(dataLoaded?.order_no);

      setFieldsValue({
        carrier: dataLoaded?.carrier,
        driver: dataLoaded?.driver,
        seal_range: dataLoaded?.seal_range,
        mt_cust_code: dataLoaded?.customer_code,
        mt_delv_loc: dataLoaded?.delivery_location,
      });
      console.log('MT 1 - Forms: data loading - order selected! plus carrier, driver, seal_range, mt...', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier, selectedOrder]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType === 'SCHEDULE' && selectedSupplier && !selectedTrip) {
      form.setFieldsValue({
        trip_no: dataLoaded?.trip_no,
      });
      handleTripSelect(dataLoaded?.trip_no);

      setFieldsValue({
        carrier: dataLoaded?.carrier,
        driver: dataLoaded?.driver,
        seal_range: dataLoaded?.seal_range,
      });
      console.log('MT 1 - Forms: data loading - trip selected! plus carrier, driver, seal_range', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier, selectedTrip]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType === 'SCHEDULE' && selectedSupplier && selectedTrip && !selectedTanker) {
      form.setFieldsValue({
        tanker: dataLoaded?.tanker,
      });
      setSelectedTanker(dataLoaded?.tanker);
      console.log('MT 1 - Forms: data loading - tanker selected for trip!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier, selectedTrip, selectedTanker]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType === 'OPENORDER' && selectedSupplier && selectedOrder && !selectedTanker) {
      form.setFieldsValue({
        tanker: dataLoaded?.tanker,
      });
      setSelectedTanker(dataLoaded?.tanker);
      console.log('MT 1 - Forms: data loading - tanker selected for order!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier, selectedOrder, selectedTanker]);

  useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && sourceType && selectedSupplier && selectedTanker) {
      setDataLoadFlag(2);
      console.log('MT 1 - Forms: data loading - fields are set!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, sourceType, selectedSupplier, selectedTanker]);

  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="source_type" label={t('fields.transactionType')} rules={[{ required: true }]}>
            <Select
              disabled={popup}
              onChange={handleTypeSelect}
              placeholder={t('placeholder.selectTransType')}
            >
              <Option value="SCHEDULE">{t('fields.mtTypeSchedule')}</Option>
              <Option value="OPENORDER">{t('fields.mtTypeOrder')}</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="carrier" label={t('fields.mtDataCarrier')} rules={[{ required: true }]}>
            <Select
              allowClear
              showSearch
              disabled={sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT'}
              loading={carriersLoading}
              onChange={handleCarrierSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectCarriers')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {carriers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_code}>
                  {item.cmpy_code + ' - ' + item.cmpy_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="user_comments" label={t('fields.comments')} rules={[{ required: false }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="supplier" label={t('fields.mtDataSupplier')} rules={[{ required: true }]}>
            <Select
              loading={suppliersLoading}
              allowClear
              showSearch
              disabled={!sourceType || popup}
              onChange={handleSupplierSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectSupplier')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {suppliers?.records.map((item, index) => (
                <Select.Option key={index} value={item.supplier}>
                  {item.supplier + ' - ' + item.supplier_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="tanker" label={t('fields.tanker')} rules={[{ required: true }]}>
            <Select
              allowClear
              showSearch
              disabled={sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT'}
              onChange={handleTankerSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectTanker')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tankers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.tnkr_code}>
                  {item.tnkr_code + (!item.tnkr_name ? '' : ' - ' + item.tnkr_name)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="start_date" label={t('fields.startDate')} rules={[{ required: false }]}>
            <DatePicker showTime={{ format: 'HH:mm' }} format={format} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="customer"
            label={t('fields.customer')}
            rules={[{ required: sourceType === 'OPENORDER' }]}
          >
            <Select
              allowClear
              showSearch
              disabled={sourceType !== 'OPENORDER' || !selectedSupplier || popup}
              optionFilterProp="children"
              placeholder={t('placeholder.selectCustomer')}
              onChange={handleCustomerSelect}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {customers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.customer}>
                  {item.customer + ' - ' + item.customer_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="driver" label={t('fields.driver')} rules={[{ required: true }]}>
            <Select
              loading={driversLoading}
              allowClear
              showSearch
              disabled={!sourceType}
              onChange={handleDriverSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectDriver')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {drivers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.per_code}>
                  {item.per_code + ' - ' + item.per_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="end_date" label={t('fields.endDate')} rules={[{ required: false }]}>
            <DatePicker showTime={{ format: 'HH:mm' }} format={format} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="trip_no"
            label={t('fields.tripNumber')}
            rules={[{ required: sourceType === 'SCHEDULE' }]}
          >
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              placeholder={t('placeholder.selectTripNumber')}
              onChange={handleTripSelect}
              disabled={!trips || sourceType !== 'SCHEDULE' || popup}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {trips?.records?.map((item, index) => (
                <Select.Option key={index} value={item.shls_trip_no}>
                  {item.shls_trip_no}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="seal_range" label={t('fields.sealRange')} rules={[{ required: false }]}>
            <Input disabled={false} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Row gutter={[8, 30]}>
            <Col span={24}></Col>
          </Row>

          {sourceType === 'SCHEDULE' && selectedTrip && (
            <Button type="primary" onClick={onViewTripSeals}>
              {t('operations.viewTripSeals')}
            </Button>
          )}

          {sourceType === 'OPENORDER' && selectedOrder && (
            <Button type="primary" onClick={onViewOrderSeals}>
              {t('operations.viewOrderSeals')}
            </Button>
          )}
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="order_no"
            label={t('fields.orderNumber')}
            rules={[{ required: sourceType === 'OPENORDER' }]}
          >
            <Select
              //loading={driversLoading}
              allowClear
              showSearch
              disabled={!orders || sourceType !== 'OPENORDER' || popup}
              onChange={handleOrderSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectOrderNumber')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {orders?.records?.map((item, index) => (
                <Select.Option key={index} value={item.order_cust_no}>
                  {item.order_cust_no}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item
            name="load_security"
            label={t('fields.loadSecurityInformation')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Divider style={{ margin: '2px 0' }} />

      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="mt_mngr_oo" label={t('fields.mtMngrOO')} rules={[{ required: false }]}>
            <Input disabled={true} />
          </Form.Item>
        </Col>

        {/*(!sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT')) && */}
        {/*(!sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType !== 'BY_COMPARTMENT')) && */}
        {/*(!sourceType || !loadNumber || (sourceType === 'OPENORDER')) && */}

        {(!sourceType ||
          !loadNumber ||
          (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') ||
          sourceType === 'OPENORDER') && (
          <Col span={6}>
            <Form.Item name="mt_cust_code" label={t('fields.mtSoldTo')} rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          </Col>
        )}

        {(!sourceType ||
          !loadNumber ||
          (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') ||
          sourceType === 'OPENORDER') && (
          <Col span={6}>
            <Form.Item name="mt_delv_loc" label={t('fields.mtShipTo')} rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          </Col>
        )}

        {(!sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT')) && (
          <Col span={6}>
            <Form.Item name="mt_delv_num" label={t('fields.mtDelvNum')} rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Forms;
