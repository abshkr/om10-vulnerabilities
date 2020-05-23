import React, { useEffect } from 'react';
import { Form, Select, Input, Row, Col, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import axios from 'axios';
import moment from 'moment';

import { MANUAL_TRANSACTIONS } from '../../../api';
import { getDateTimeFormat } from '../../../utils';

const { Option } = Select;

const Forms = ({
  form,
  type,
  setType,
  trips,
  setTrips,
  tankers,
  setTankers,
  orders,
  setOrders,
  customers,
  setCustomers,
  selecteSupplier,
  setSelectedSupplier,
}) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: suppliers, isValidating: suppliersLoading } = useSWR(MANUAL_TRANSACTIONS.SUPPLIERS);
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
      `${MANUAL_TRANSACTIONS.ORDERS}?supplier=${selecteSupplier}&customer=${customer}`
    );

    return results?.data;
  };

  const getTankerAndCarrierByTrip = async (trip) => {
    const results = await axios.get(
      `${MANUAL_TRANSACTIONS.CARRIER_AND_TANKER}?supplier=${selecteSupplier}&trip_no=${trip}`
    );

    const value = results?.data.records[0];

    const tankerResults = await getTankersByCarrier(value?.carrier);

    setTankers(tankerResults);

    setFieldsValue({
      tanker: value?.tnkr_code,
      carrier: value?.carrier,
      driver: drivers?.records[0].per_code,
    });
  };

  const handleSupplierSelect = async (supplier) => {
    const trips = await getTripsBySupplier(supplier);
    const suppliers = await getCustomersBySupplier(supplier);

    setTrips(trips);
    setCustomers(suppliers);
    setSelectedSupplier(supplier);
  };

  const handleTypeSelect = (type) => {
    setType(type);

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
            <Select onChange={handleTypeSelect} placeholder="Please Select Transaction Type">
              <Option value="schedule">Load From Schedule</Option>
              <Option value="open_order">Load From Open Order</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="tanker" label={t('fields.tanker')} rules={[{ required: true }]}>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={t('placeholder.selectTanker')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tankers?.records?.map((item, index) => (
                <Select.Option key={index} value={item.tnkr_code}>
                  {item.tnkr_name}
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

        <Col span={8}>
          <Form.Item name="supplier" label={t('fields.supplier')} rules={[{ required: true }]}>
            <Select
              loading={suppliersLoading}
              showSearch
              disabled={!type}
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
              showSearch
              loading={carriersLoading}
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

        <Col span={8}>
          <Form.Item
            name="customer"
            label={t('fields.customer')}
            rules={[{ required: type === 'open_order' }]}
          >
            <Select
              showSearch
              disabled={type !== 'open_order' || !selecteSupplier}
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
              showSearch
              disabled={!type}
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

        <Col span={8}>
          <Form.Item
            name="trip_no"
            label={t('fields.tripNumber')}
            rules={[{ required: type === 'schedule' }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={t('placeholder.selectTripNumber')}
              onChange={getTankerAndCarrierByTrip}
              disabled={!trips || type !== 'schedule'}
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
            name="order_no"
            label={t('fields.orderNumber')}
            rules={[{ required: type === 'open_order' }]}
          >
            <Select
              loading={driversLoading}
              showSearch
              disabled={type !== 'open_order'}
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

        <Col span={8}>
          <Form.Item
            name="load_security"
            label={t('fields.loadSecurityInformation')}
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
