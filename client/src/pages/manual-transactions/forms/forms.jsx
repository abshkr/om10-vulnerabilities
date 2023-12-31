import React, { useEffect } from 'react';
import { Form, Select, Input, Button, Row, Col, DatePicker, Divider, Tag, Tooltip } from 'antd';
import { LockOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import moment from 'dayjs';
import { useState } from 'react';

import api, { LOAD_SCHEDULES, MANUAL_TRANSACTIONS, TANKER_LIST } from '../../../api';
import { getDateTimeFormat, validateField } from '../../../utils';
import TripSealManager from './trip-seals';
import Carrier from './fields/carrier';
import OrderSealManager from './order-seals';
import { SETTINGS } from '../../../constants';

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
  setDataLoaded,
  popup,
  setOrderSeals,
  setProductArms,
  resetFormGrids,
  setFormLoading,
  config,
}) => {
  const { setFieldsValue, resetFields } = form;

  const { t } = useTranslation();

  const [suppliers, setSuppliers] = useState(null);
  const [suppliersLoading, setSuppliersLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [tankersLoading, setTankersLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [activeFlag, setActiveFlag] = useState(false);
  const [activeTripCount, setActiveTripCount] = useState(0);

  /* const { data: suppliers, isValidating: suppliersLoading } = useSWR(
    // sourceType === 'SCHEDULE' ? MANUAL_TRANSACTIONS.SCHEDULE_SUPPLIERS : MANUAL_TRANSACTIONS.ORDER_SUPPLIERS
    sourceType === 'SCHEDULE' 
      ? MANUAL_TRANSACTIONS.SCHEDULE_SUPPLIERS 
      : (sourceType === 'OPENORDER' ? MANUAL_TRANSACTIONS.ORDER_SUPPLIERS : null)
  ); */
  const { data: drawers, isValidating: drawersLoading } = useSWR(LOAD_SCHEDULES.DRAWERS);
  const { data: drivers, isValidating: driversLoading } = useSWR(MANUAL_TRANSACTIONS.DRIVERS);
  const { data: carriers, isValidating: carriersLoading } = useSWR(MANUAL_TRANSACTIONS.CARRIERS);
  const { data: activeTrips } = useSWR(`${TANKER_LIST.CHECK_TANKER_ACTIVE_TRIPS}?tanker=${selectedTanker}`);

  const getSuppliersByType = async (type) => {
    let url = null;
    if (type === 'SCHEDULE') {
      url = MANUAL_TRANSACTIONS.SCHEDULE_SUPPLIERS;
    }
    if (type === 'OPENORDER') {
      url = MANUAL_TRANSACTIONS.ORDER_SUPPLIERS;
    }
    if (url) {
      const results = await api.get(url);
      return results?.data;
    } else {
      return [];
    }
  };

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

  const getOrdersByCustomer = async (supplier, customer) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.ORDERS}?supplier=${supplier}&customer=${customer}`);

    return results?.data;
  };

  const getTripTypeByTrip = async (supplier, trip) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.TRIP_TYPE}?supplier=${supplier}&trip_no=${trip}`);

    return results?.data;
  };

  const getTripBriefsByTrip = async (supplier, trip) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.TRIP_BRIEFS}?supplier=${supplier}&trip_no=${trip}`);

    return results?.data;
  };

  const getTripSealByTrip = async (supplier, trip) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.GET_TRIP_SEAL}?supplier=${supplier}&trip_no=${trip}`
    );

    return results?.data;
  };

  const getTripBasicsByTrip = async (supplier, trip) => {
    const results = await api.get(`${MANUAL_TRANSACTIONS.TRIP_BASICS}?supplier=${supplier}&trip_no=${trip}`);

    return results?.data;
  };

  const getOrderBasicsByOrder = async (supplier, order) => {
    const results = await api.get(
      `${MANUAL_TRANSACTIONS.ORDER_BASICS}?supplier=${supplier}&order_cust_no=${order}`
    );

    return results?.data;
  };

  const handleTripSelect = async (trip) => {
    resetFormGrids();
    setFieldsValue({
      tanker: undefined,
      carrier: undefined,
      drawer: undefined,
      driver: undefined,
      seal_range: '',
      load_security: '',
      mt_mngr_oo: '',
      mt_cust_code: '',
      mt_delv_loc: '',
      mt_delv_num: '',
    });

    const results = await getTripBasicsByTrip(selectedSupplier, trip);

    const value = results?.records?.[0];

    setTankersLoading(true);
    const tankerResults = await getTankersByCarrier(value?.carrier);
    setTankersLoading(false);

    const typeResults = await getTripTypeByTrip(selectedSupplier, trip);
    const briefsResults = await getTripBriefsByTrip(selectedSupplier, trip);

    const sealResults = await getTripSealByTrip(selectedSupplier, trip);

    setLoadType(typeResults?.records?.[0]?.schd_type);
    setActiveFlag(briefsResults?.records?.[0]?.schd_status !== 'F' ? true : false);
    setLoadNumber(trip);

    setTankers(tankerResults);
    setSelectedTrip(trip);
    setSelectedCustomer(value?.shls_cust);
    setSelectedTanker(value?.tnkr_code);
    setProductArms(undefined);

    setFieldsValue({
      tanker: value?.tnkr_code,
      customer: value?.shls_cust,
      carrier: value?.carrier,
      drawer: value?.drawer,
      driver: !value?.driver ? drivers?.records?.[0]?.per_code : value?.driver,
      seal_range: sealResults?.records?.[0]?.shls_seal_no,
      load_security: briefsResults?.records?.[0]?.shls_load_security_info,
    });
  };

  const handleOrderSelect = async (order) => {
    resetFormGrids();
    setFieldsValue({
      tanker: undefined,
      carrier: undefined,
      drawer: undefined,
      driver: undefined,
      seal_range: '',
      load_security: '',
      mt_mngr_oo: '',
      mt_cust_code: '',
      mt_delv_loc: '',
      mt_delv_num: '',
    });

    const results = await getOrderBasicsByOrder(selectedSupplier, order);

    const value = results?.records?.[0];

    setTankersLoading(true);
    const tankerResults = await getTankersByCarrier(value?.order_carrier);
    setTankersLoading(false);

    setLoadType('BY_PRODUCT');
    setLoadNumber(order);

    setTankers(tankerResults);
    setSelectedOrder(order);
    setSelectedTanker(null);
    setProductArms(undefined);

    setFieldsValue({
      // tanker: null,
      carrier: value?.order_carrier,
      drawer: value?.order_drawer,
      driver: drivers?.records?.[0]?.per_code,
      mt_cust_code: value?.customer_code,
      mt_delv_loc: value?.delivery_location,
    });
  };

  const handleSupplierSelect = async (supplier) => {
    // resetFormGrids();
    setFieldsValue({
      trip_no: undefined,
      tanker: undefined,
      carrier: undefined,
      drawer: undefined,
      driver: undefined,
      customer: undefined,
      order_no: undefined,
      seal_range: '',
      load_security: '',
      mt_mngr_oo: '',
      mt_cust_code: '',
      mt_delv_loc: '',
      mt_delv_num: '',
    });

    // console.log('handleSupplierSelect', sourceType);

    if (sourceType === 'SCHEDULE') {
      setTripsLoading(true);
      const trips = await getTripsBySupplier(supplier);
      setTrips(trips);
      setTripsLoading(false);
    } else {
      setTrips(null);
    }

    setCustomersLoading(true);
    const customers = await getCustomersBySupplier(supplier);
    setCustomersLoading(false);

    setCustomers(customers);
    setSelectedSupplier(supplier);
    setSelectedTrip(null);
    setFieldsValue({
      seal_range: '',
    });
  };

  const handleCustomerSelect = async (customer) => {
    // resetFormGrids();
    setFieldsValue({
      tanker: undefined,
      carrier: undefined,
      drawer: undefined,
      driver: undefined,
      order_no: undefined,
      seal_range: '',
      load_security: '',
      mt_mngr_oo: '',
      mt_cust_code: '',
      mt_delv_loc: '',
      mt_delv_num: '',
    });

    setOrdersLoading(true);
    const orders = await getOrdersByCustomer(selectedSupplier, customer);
    setOrdersLoading(false);

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

    // need to clear the transaction data of prev tanker
    const loaded = params;
    loaded.transfers = [];
    loaded.base_transfers = [];
    loaded.meter_transfers = [];
    loaded.base_totals = [];
    loaded.meter_totals = [];
    setDataLoaded(loaded);
  };

  const handleCarrierSelect = async (carrier) => {
    /* setFieldsValue({
      tanker: undefined,
    }); */

    // get tanker list of the carrier
    setTankersLoading(true);
    const tankers = await getTankersByCarrier(carrier);
    setSelectedTanker(null);
    setTankers(tankers);
    setTankersLoading(false);
    setFieldsValue({
      tanker: undefined,
    });
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  const handleTypeSelect = async (type) => {
    setSuppliersLoading(true);
    const suppliers = await getSuppliersByType(type);
    setSuppliers(suppliers);
    setSuppliersLoading(false);

    setSourceType(type);

    setFieldsValue({
      supplier: undefined,
      trip_no: undefined,
      tanker: undefined,
      carrier: undefined,
      drawer: undefined,
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

    resetFormGrids();
    //resetFields();
  };

  const loadTripSeal = async () => {
    const sealResults = await getTripSealByTrip(selectedSupplier, selectedTrip);

    setFieldsValue({
      seal_range: sealResults?.records?.[0]?.shls_seal_no,
    });
  };

  const onViewTripSeals = () => {
    // pop up the dialog to manage seals for the schedule
    //alert('TODO: manage seals for the schedule');
    TripSealManager(
      t('tabColumns.tripSeals'),
      { supplier_code: selectedSupplier, shls_trip_no: selectedTrip },
      loadTripSeal,
      '80vw',
      '40vh'
    );
  };

  const loadOrderSeal = async (value) => {
    // console.log('Forms: loadOrderSeal', value);
    setFieldsValue({
      seal_range: value?.sealRange,
    });

    setOrderSeals(value?.sealList);
  };

  const onViewOrderSeals = () => {
    // pop up the dialog to manage seals for the open order
    //alert('TODO: manage seals for the open order');
    OrderSealManager(
      t('tabColumns.orderSeals'),
      { supplier_code: selectedSupplier, order_no: selectedOrder },
      loadOrderSeal,
      '80vw',
      '40vh'
    );
  };

  const getFormLists = async (params) => {
    setFormLoading(true);

    handleTypeSelect(params?.trans_type);

    if (params?.trans_type === 'SCHEDULE') {
      setTripsLoading(true);
      const trips = await getTripsBySupplier(params?.supplier);
      setTrips(trips);
      setTripsLoading(false);
    } else {
      setTrips(null);
    }

    if (params?.trans_type === 'OPENORDER') {
      setCustomersLoading(true);
      const customers = await getCustomersBySupplier(params?.supplier);
      setCustomers(customers);
      setCustomersLoading(false);
    } else {
      setCustomers(null);
    }

    if (params?.trans_type === 'OPENORDER') {
      setOrdersLoading(true);
      const orders = await getOrdersByCustomer(params?.supplier, params?.customer);
      setOrders(orders);
      setOrdersLoading(false);
    } else {
      setOrders(null);
    }

    setTankersLoading(true);
    const tankers = await getTankersByCarrier(params?.carrier);
    setTankers(tankers);
    setTankersLoading(false);
    setProductArms(undefined);

    // setSourceType(params?.trans_type);
    setSelectedSupplier(params?.supplier);

    if (params?.trans_type === 'SCHEDULE') {
      const results = await getTripBasicsByTrip(params?.supplier, params?.trip_no);
      const value = results?.records?.[0];

      const typeResults = await getTripTypeByTrip(params?.supplier, params?.trip_no);
      const briefsResults = await getTripBriefsByTrip(params?.supplier, params?.trip_no);
      const sealResults = await getTripSealByTrip(params?.supplier, params?.trip_no);

      setLoadType(typeResults?.records?.[0]?.schd_type);
      setActiveFlag(briefsResults?.records?.[0]?.schd_status !== 'F' ? true : false);
      setLoadNumber(params?.trip_no);
      setSelectedTrip(params?.trip_no);
      setSelectedTanker(params?.tanker ? params?.tanker : value?.tnkr_code);
      setSelectedDriver(params?.driver ? params?.driver : value?.driver);

      setFieldsValue({
        source_type: params?.trans_type,
        supplier: params?.supplier,
        trip_no: params?.trip_no,
        tanker: params?.tanker ? params?.tanker : value?.tnkr_code,
        carrier: params?.carrier ? params?.carrier : value?.carrier,
        drawer: params?.drawer ? params?.drawer : value?.drawer,
        driver: params?.driver
          ? params?.driver
          : !value?.driver
          ? drivers?.records?.[0]?.per_code
          : value?.driver,
        seal_range: params?.seal_range ? params?.seal_range : sealResults?.records?.[0]?.shls_seal_no,
        load_security: params?.load_security
          ? params?.load_security
          : briefsResults?.records?.[0]?.shls_load_security_info,
      });
    }

    if (params?.trans_type === 'OPENORDER') {
      const results = await getOrderBasicsByOrder(params?.supplier, params?.order_cust_no);
      const value = results?.records?.[0];

      setLoadType('BY_PRODUCT');
      setLoadNumber(params?.order_cust_no);
      setSelectedCustomer(params?.customer);
      setSelectedOrder(params?.order_cust_no);
      setSelectedTanker(params?.tanker ? params?.tanker : null);
      setSelectedDriver(params?.driver);

      setFieldsValue({
        source_type: params?.trans_type,
        supplier: params?.supplier,
        customer: params?.customer,
        order_no: params?.order_cust_no,
        tanker: params?.tanker ? params?.tanker : null,
        carrier: params?.carrier ? params?.carrier : value?.order_carrier,
        drawer: params?.drawer ? params?.drawer : value?.order_drawer,
        driver: params?.driver ? params?.driver : drivers?.records?.[0]?.per_code,
        mt_cust_code: params?.mt_cust_code ? params?.mt_cust_code : value?.customer_code,
        mt_delv_loc: params?.mt_delv_loc ? params?.mt_delv_loc : value?.delivery_location,
      });
    }

    setFormLoading(false);
  };

  // get all the list in one place
  useEffect(() => {
    if (
      params &&
      !sourceType &&
      !loadType &&
      !selectedSupplier &&
      !selectedCustomer &&
      !selectedTrip &&
      !selectedOrder &&
      !selectedTanker
    ) {
      getFormLists(params);
    }
  }, [
    params,
    sourceType,
    loadType,
    selectedSupplier,
    selectedCustomer,
    selectedTrip,
    selectedOrder,
    selectedTanker,
  ]);

  // get all the list in one place
  useEffect(() => {
    // console.log('---------------------drivers are ready!')
    if (selectedTrip || selectedOrder) {
      if (!selectedDriver) {
        setFieldsValue({
          driver: drivers?.records?.[0]?.per_code,
        });
        setSelectedDriver(drivers?.records?.[0]?.per_code);
      } else {
        setFieldsValue({
          driver: selectedDriver,
        });
      }
    }
  }, [drivers, selectedDriver, selectedTrip, selectedOrder, setSelectedDriver]);

  /* useEffect(() => {
    if (params && !sourceType) {
      form.setFieldsValue({
        source_type: params?.trans_type,
      });
      handleTypeSelect(params?.trans_type);
    }
  }, [params, sourceType]);

  useEffect(() => {
    // if (params && (sourceType === 'SCHEDULE' || sourceType === 'OPENORDER') && !selectedSupplier) {
    if (params && !selectedSupplier) {
      form.setFieldsValue({
        supplier: params?.supplier,
      });
      handleSupplierSelect(params?.supplier);
    }
  }, [params, selectedSupplier]);
  // }, [params, sourceType, selectedSupplier]);

  useEffect(() => {
    if (params && sourceType === 'OPENORDER' && selectedSupplier && !selectedCustomer) {
      form.setFieldsValue({
        customer: params?.customer,
      });
      handleCustomerSelect(params?.customer);
    }
  }, [params, sourceType, selectedSupplier, selectedCustomer]);

  useEffect(() => {
    if (params && sourceType === 'OPENORDER' && selectedSupplier && !selectedOrder) {
      form.setFieldsValue({
        order_no: params?.order_cust_no,
      });
      handleOrderSelect(params?.order_cust_no);
    }
  }, [params, sourceType, selectedSupplier, selectedOrder]);

  useEffect(() => {
    if (params && sourceType === 'SCHEDULE' && selectedSupplier && !selectedTrip) {
      form.setFieldsValue({
        trip_no: params?.trip_no,
      });
      handleTripSelect(params?.trip_no);
    }
  }, [params, sourceType, selectedSupplier, selectedTrip]); */

  useEffect(() => {
    const serverCurrent = moment(config.serverTime, SETTINGS.DATE_TIME_FORMAT);
    // const diff = serverCurrent.diff(moment())
    // const interval = setInterval(() => {
    //   if (serverTime) {
    //     const current = moment().add(diff / 1000, 'seconds').format(dateTimeFormat);

    setFieldsValue({
      start_date: serverCurrent, // moment(),
      end_date: serverCurrent, // moment(),
    });
  }, [setFieldsValue]);

  useEffect(() => {
    if (activeTrips) {
      setActiveTripCount(activeTrips?.records?.[0]?.cnt);
    }
  }, [activeTrips]);

  const format = getDateTimeFormat();

  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="source_type" label={t('fields.mtDataType')} rules={[{ required: true }]}>
            <Select
              popupMatchSelectWidth={false}
              allowClear
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
          <Carrier
            form={form}
            customer={sourceType === 'SCHEDULE' && config?.site_customer_carrier ? selectedCustomer : ''}
            onChange={handleCarrierSelect}
            disabled={sourceType === 'SCHEDULE' && (loadType === 'BY_COMPARTMENT' || activeFlag === true)}
            config={config}
          />
        </Col>

        <Col span={8}>
          <Form.Item
            name="user_comments"
            label={t('fields.mtDataUserComments')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="supplier" label={t('fields.mtDataSupplier')} rules={[{ required: true }]}>
            <Select
              popupMatchSelectWidth={false}
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
          <Form.Item
            name="tanker"
            label={
              activeTripCount > 0 ? (
                <>
                  {t('fields.mtDataTanker')} &nbsp;&nbsp;&nbsp;
                  <Tooltip placement="topRight" title={t('descriptions.countTankerActiveTrips')}>
                    <Tag color={'red'}>{t('fields.countTankerActiveTrips') + ': ' + activeTripCount}</Tag>
                  </Tooltip>
                </>
              ) : (
                t('fields.mtDataTanker')
              )
            }
            rules={[{ required: true }]}
          >
            <Select
              popupMatchSelectWidth={false}
              allowClear
              showSearch
              disabled={sourceType === 'SCHEDULE' && (loadType === 'BY_COMPARTMENT' || activeFlag === true)}
              loading={tankersLoading}
              onChange={handleTankerSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectTanker')}
              filterOption={(input, option) =>
                String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tankers?.records?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item.tnkr_code}
                  disabled={item.tnkr_lock === 'Y' || item.tnkr_archive === 'Y'}
                >
                  {item.tnkr_code + (!item.tnkr_name ? '' : ' - ' + item.tnkr_name)}
                  {item.tnkr_lock === 'Y' ? <LockOutlined style={{ color: 'red' }} /> : ''}
                  {item.tnkr_archive === 'Y' ? <PaperClipOutlined style={{ color: 'red' }} /> : ''}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="start_date" label={t('fields.mtDataStartTime')} rules={[{ required: false }]}>
            <DatePicker showTime={{ format: 'HH:mm' }} format={format} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="end_date" label={t('fields.mtDataEndTime')} rules={[{ required: false }]}>
            <DatePicker showTime={{ format: 'HH:mm' }} format={format} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="customer"
            label={t('fields.mtDataCustomer')}
            rules={[{ required: sourceType === 'OPENORDER' }]}
          >
            <Select
              popupMatchSelectWidth={false}
              allowClear
              showSearch
              disabled={
                (sourceType !== 'OPENORDER' &&
                  !(config?.site_customer_carrier && loadType == 'BY_PRODUCT')) ||
                !selectedSupplier ||
                popup
              }
              loading={customersLoading}
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
          <Form.Item name="driver" label={t('fields.mtDataDriver')} rules={[{ required: true }]}>
            <Select
              popupMatchSelectWidth={false}
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
          <Form.Item name="drawer" label={t('fields.drawer')} rules={[{ required: false }]}>
            <Select
              popupMatchSelectWidth={false}
              loading={drawersLoading}
              allowClear
              showSearch
              disabled={true}
              optionFilterProp="children"
              placeholder={t('placeholder.selectDrawer')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {drawers?.records.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_code}>
                  {item.cmpy_desc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="trip_no"
            label={t('fields.mtDataTripNo')}
            rules={[{ required: sourceType === 'SCHEDULE' }]}
          >
            <Select
              popupMatchSelectWidth={false}
              loading={tripsLoading}
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
            label={t('fields.mtDataOrderNo')}
            rules={[{ required: sourceType === 'OPENORDER' }]}
          >
            <Select
              popupMatchSelectWidth={false}
              loading={ordersLoading}
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

        {config.showLSI && (
          <Col span={16}>
            {/* <Form.Item
              name="load_security"
              label={t('fields.loadSecurityInformation')}
              rules={[{ required: false }]}
            >
              <Input maxLength={120} />
            </Form.Item> */}
            <Form.Item
              name="load_security"
              label={t('fields.loadSecurityInformation')}
              rules={[
                {
                  required: false,
                  title: t('fields.loadSecurityInformation'),
                  dataType: 'STRING',
                  maxLength: 120,
                  precision: null,
                  min: null,
                  max: null,
                  prompts: t,
                  regexp: 'ALPHANUMERIC_HOSTCOMM',
                  validator: validateField,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        )}
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
