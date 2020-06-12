import React, { useEffect } from 'react';
import { Form, Select, Input, Button, Row, Col, DatePicker, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import axios from 'axios';
import moment from 'moment';

import { MANUAL_TRANSACTIONS } from '../../../api';
import { getDateTimeFormat } from '../../../utils';

const { Option } = Select;

const Forms = ({
  form,
  trsaType,
  setTrsaType,
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
  setSelectedTrip,
  setSelectedOrder,
  setSelectedTanker,
}) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: suppliers, isValidating: suppliersLoading } = useSWR(
    trsaType === 'SCHEDULE' ? MANUAL_TRANSACTIONS.SCHEDULE_SUPPLIERS : MANUAL_TRANSACTIONS.ORDER_SUPPLIERS
  );
  const { data: drivers, isValidating: driversLoading } = useSWR(MANUAL_TRANSACTIONS.DRIVERS);
  const { data: carriers, isValidating: carriersLoading } = useSWR(MANUAL_TRANSACTIONS.CARRIERS);

  const getTripsBySupplier = async (supplier) => {
    const results = await axios.get(`${MANUAL_TRANSACTIONS.TRIPS}?supplier=${supplier}`);

    return results?.data;
  };

  const getCustomersBySupplier = async (supplier) => {
    const results = await axios.get(`${MANUAL_TRANSACTIONS.CUSTOMERS}?supplier=${supplier}`);

    return results?.data;
  };

  const getTankersByCarrier = async (carrier) => {
    const results = await axios.get(`${MANUAL_TRANSACTIONS.TANKERS}?tnkr_carrier=${carrier}`);

    return results?.data;
  };

  const getOrdersByCustomer = async (customer) => {
    const results = await axios.get(
      `${MANUAL_TRANSACTIONS.ORDERS}?supplier=${selectedSupplier}&customer=${customer}`
    );

    return results?.data;
  };

  const getTankerAndCarrierByTrip = async (trip) => {
    const results = await axios.get(
      `${MANUAL_TRANSACTIONS.CARRIER_AND_TANKER}?supplier=${selectedSupplier}&trip_no=${trip}`
    );

    const value = results?.data.records[0];

    const tankerResults = await getTankersByCarrier(value?.carrier);

    setTankers(tankerResults);
    setSelectedTrip(trip);
    setSelectedTanker(value?.tnkr_code);

    setFieldsValue({
      tanker: value?.tnkr_code,
      carrier: value?.carrier,
      driver: drivers?.records[0].per_code,
    });

    return value;
  };

  const getTripBasicsByTrip = async (trip) => {
    const results = await axios.get(
      `${MANUAL_TRANSACTIONS.TRIP_BASICS}?supplier=${selectedSupplier}&trip_no=${trip}`
    );

    return results?.data;
  };

  const getOrderBasicsByOrder = async (order) => {
    const results = await axios.get(
      `${MANUAL_TRANSACTIONS.ORDER_BASICS}?supplier=${selectedSupplier}&order_cust_no=${order}`
    );

    return results?.data;
  };

  const handleTripSelect = async (trip) => {
    const results = await getTripBasicsByTrip(trip);

    const value = results?.records[0];

    const tankerResults = await getTankersByCarrier(value?.carrier);

    setTankers(tankerResults);
    setSelectedTrip(trip);
    setSelectedTanker(value?.tnkr_code);

    setFieldsValue({
      tanker: value?.tnkr_code,
      carrier: value?.carrier,
      driver: !value?.driver ? drivers?.records[0].per_code : value?.driver,
    });
  };

  const handleOrderSelect = async (order) => {
    const results = await getOrderBasicsByOrder(order);

    const value = results?.records[0];

    const tankerResults = await getTankersByCarrier(value?.order_carrier);

    setTankers(tankerResults);
    setSelectedOrder(order);

    setFieldsValue({
      carrier: value?.order_carrier,
      driver: drivers?.records[0].per_code,
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

    const trips = await getTripsBySupplier(supplier);
    const suppliers = await getCustomersBySupplier(supplier);

    setTrips(trips);
    setCustomers(suppliers);
    setSelectedSupplier(supplier);
  };

  const handleTypeSelect = (type) => {
    setTrsaType(type);

    setFieldsValue({
      supplier: undefined,
      trip_no: undefined,
      tanker: undefined,
      carrier: undefined,
      driver: undefined,
      customer: undefined,
      order_no: undefined,
    });
  };

  const handleCustomerSelect = async (customer) => {
    const orders = await getOrdersByCustomer(customer);

    setOrders(orders);
  };

  const handleTankerSelect = (tanker) => {
    // get tanker equipment and compartments
    setSelectedTanker(tanker);
  };

  const handleCarrierSelect = async (carrier) => {
    // get tanker list of the carrier
    const tankers = await getTankersByCarrier(carrier);
    setTankers(tankers);
  };

  const handleDriverSelect = (tanker) => {
    // get tanker equipment and compartments

  };

  const onViewTripSeals = () => {
    // pop up the dialog to manage seals for the schedule
    alert("TODO: manage seals for the schedule");
  };

  const onViewOrderSeals = () => {
    // pop up the dialog to manage seals for the open order
    alert("TODO: manage seals for the open order");
  };

  useEffect(() => {
    setFieldsValue({
      start_date: moment(),
      end_date: moment(),
    });
  }, [setFieldsValue]);

  const format = getDateTimeFormat();

  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="type" label={t('fields.transactionType')} rules={[{ required: true }]}>
            <Select onChange={handleTypeSelect} placeholder={t('placeholder.selectTransType')}>
              <Option value="SCHEDULE">{t('fields.mtTypeSchedule')}</Option>
              <Option value="OPENORDER">{t('fields.mtTypeOrder')}</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="tanker" label={t('fields.tanker')} rules={[{ required: true }]}>
            <Select
              allowClear
              showSearch
              onChange={handleTankerSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectTanker')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tankers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.tnkr_code}>
                  {item.tnkr_code + (!item.tnkr_name ? '' : (' - ' + item.tnkr_name))}
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
          <Form.Item name="supplier" label={t('fields.supplier')} rules={[{ required: true }]}>
            <Select
              loading={suppliersLoading}
              allowClear
              showSearch
              disabled={!trsaType}
              onChange={handleSupplierSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectSupplier')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {suppliers?.records.map((item, index) => (
                <Select.Option key={index} value={item.supplier}>
                  {item.supplier_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="carrier" label={t('fields.carrier')} rules={[{ required: true }]}>
            <Select
              allowClear
              showSearch
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
                  {item.cmpy_name}
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
            rules={[{ required: trsaType === 'OPENORDER' }]}
          >
            <Select
              allowClear
              showSearch
              disabled={trsaType !== 'OPENORDER' || !selectedSupplier}
              optionFilterProp="children"
              placeholder={t('placeholder.selectCustomer')}
              onChange={handleCustomerSelect}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {customers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.customer}>
                  {item.customer_name}
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
              disabled={!trsaType}
              onChange={handleDriverSelect}
              optionFilterProp="children"
              placeholder={t('placeholder.selectDriver')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {drivers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.per_code}>
                  {item.per_name}
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
            rules={[{ required: trsaType === 'SCHEDULE' }]}
          >
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              placeholder={t('placeholder.selectTripNumber')}
              onChange={handleTripSelect}
              disabled={!trips || trsaType !== 'SCHEDULE'}
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
          <Form.Item
            name="seal_range"
            label={t('fields.sealRange')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Row gutter={[8,30]}>
            <Col span={24}></Col>
          </Row>

          {trsaType === 'SCHEDULE' &&(
            <Button type="primary"  onClick={onViewTripSeals}>
              {t('operations.viewTripSeals')}
            </Button>
          )}

          {trsaType === 'OPENORDER' && (
            <Button type="primary"  onClick={onViewOrderSeals}>
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
            rules={[{ required: trsaType === 'OPENORDER' }]}
          >
            <Select
              //loading={driversLoading}
              allowClear
              showSearch
              disabled={trsaType !== 'OPENORDER'}
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
          <Form.Item
            name="mt_mngr_oo"
            label={t('fields.mtMngrOO')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="mt_cust_code"
            label={t('fields.mtSoldTo')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="mt_delv_loc"
            label={t('fields.mtShipTo')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="mt_delv_num"
            label={t('fields.mtDelvNum')}
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Forms;
