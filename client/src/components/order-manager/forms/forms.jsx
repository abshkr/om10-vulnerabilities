import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  CaretDownOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import {
  Supplier,
  Customer,
  OrderCustNo,
  OrderRefCode,
  OrderDate,
  DeliveryDate,
  ExpiryDate,
  TransportType,
  Carrier,
  DeliveryLocation,
  OrderTerminal,
  SupplyDepot,
  Drawer as DrawerCompany,
  OrderStatus,
  SoldTo,
  ShipTo,
  ApproveFlag,
} from './fields';

import { DataTable } from '../../../components';
import { SETTINGS } from '../../../constants';
import api, { ORDER_LISTINGS } from '../../../api';
import columns from './columns';
import OrderItemTrips from './item-trips';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, config, pageState, revalidate, locateOrder, item, setItem, onClose, modal }) => {
  const [drawerWidth, setDrawerWidth] = useState('80vw');
  const [tableAPI, setTableAPI] = useState(undefined);

  const { data: units } = useSWR(ORDER_LISTINGS.UNIT_TYPES);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields, getFieldValue } = form;

  const [orderNo, setOrderNo] = useState(value?.order_sys_no);
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(value?.order_drwr_code);
  const [carrier, setCarrier] = useState(value?.order_carr_code);

  const [orderItems, setOrderItems] = useState([]);

  /*
    6 - ORD_EXPIRED: order expired
    0 - ORD_NEW: new order
    5 - ORD_COMPLETED: fully delivered  !!!
    8 - ORD_PARTIALLY_COMPLETED: fully loaded but partially delivered !!!
    3 - ORD_DELIVERY: fully loaded but not delivered yet  !!!
    1 - ORD_FILLING: partially scheduled
    7 - ORD_PARTIALLY_DELIVERY: partially loaded but not all loaded
    2 - ORD_SCHEDULED: fully scheduled  ??
    4 - ORD_OUTSTANDING : other status
  */
  /*
    { "ordstat_type_id": "0",         "ordstat_type_name": "NEW"  },
    { "ordstat_type_id": "1",         "ordstat_type_name": "PARTIALLY SCHEDULED" },
    { "ordstat_type_id": "2",         "ordstat_type_name": "FULLY SCHEDULED" },
    { "ordstat_type_id": "3",         "ordstat_type_name": "FULLY LOADED" },
    { "ordstat_type_id": "4",         "ordstat_type_name": "OUTSTANDING" },
    { "ordstat_type_id": "5",         "ordstat_type_name": "FULLY DELIVERED" },
    { "ordstat_type_id": "6",         "ordstat_type_name": "EXPIRED" },
    { "ordstat_type_id": "7",         "ordstat_type_name": "PARTIALLY LOADED" },
    { "ordstat_type_id": "8",         "ordstat_type_name": "PARTIALLY DELIVERED" }
  */
  const fields = columns(t, pageState, form, units);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;
  console.log("jwtDecode", decoded);
  const site_code = decoded?.site_code
			
  const check_order = () => {
    let is_available=false;
    let is_approved=value?.order_approved;
    let stat_id=value?.order_stat_id;
    let error='';
    
    // check if the open order has been approved
    if ( is_approved === false ) {
      is_available = false;
      error = t('descriptions.schdOrderRejectNotApproved')
    } else {
      // check if the open order has been expired
      if ( stat_id === '6' ) { //6	EXPIRED
        is_available = false;
        error = t('descriptions.schdOrderRejectExpired')
      } else {
        // check if the open order still has enough amount to use
        const qtyTotal = item?.oitem_prod_qty;
        const qtyUsed = item?.oitem_schd_qty;
        const qtyLeft = _.toNumber(qtyTotal) - _.toNumber(qtyUsed);
    
        if ( qtyLeft < 0.1 ) {
          is_available = false;
          error = t('descriptions.schdOrderRejectNotEnoughAmount')
        } else {
          is_available = true;

          /* if ( stat_id === '0' ) { //0	NEW 
            is_available = true;
            error = t('descriptions.schdOrderRejectNotApproved')
          }
          else if ( stat_id === '1' ) { //1	PARTIALLY SCHEDULED
            is_available = true;
            error = t('descriptions.schdOrderRejectNotApproved')
          }
          else if ( stat_id == '2' ) { //2	FULLY SCHEDULED
            is_available = false;
            error = t('descriptions.schdOrderRejectFullyScheduled')
          }
          else if ( stat_id == '3' ) { //3	FULLY LOADED
            is_available = false;
            error = t('descriptions.schdOrderRejectFullyLoaded')
          }
          else if ( stat_id == '4' ) { //4	OUTSTANDING
            is_available = false;
            error = t('descriptions.schdOrderRejectOutstanding')
          }
          else if ( stat_id == '5' ) { //5	FULLY DELIVERED
            is_available = false;
            error = t('descriptions.schdOrderRejectFullyDelivered')
          }
          else if ( stat_id == '7' ) { //7	PARTIALLY LOADED
            is_available = false;
            error = t('descriptions.schdOrderRejectPartiallyLoaded')
          }
          else if ( stat_id == '8' ) { //8	PARTIALLY DELIVERED
          
            is_available = false;
            error = t('descriptions.schdOrderRejectPartiallyDelivered')
          }
          else {
            is_available = false;
            error = t('descriptions.schdOrderRejectUnknownStatus')
          } */							
        }
      }
    }
    
    if (error.length > 0) {
      notification.error({
        message: t('descriptions.schdOrderReject'),
        description: error,
      });
    }
    return is_available;
  }

  const onFormClosed = () => {
    setItem(null);
    handleFormState(false, null);
  };

  const onFinish = () => {
    if (!item) {
      notification.warning({
        message: '',
        description: t('descriptions.schdOrderRejectNotSelected'),
      });
    } else {
      const available = check_order();
      if (available) {
        modal.destroy();
        // onClose(selected?.order_cust_no);
        onClose(item?.order_cust_ordno);
      }
    }
  };

  const onComplete = (order) => {
    console.log('start of onComplete');
    if (order) {
      locateOrder(order);
    } else {
      revalidate();
    }
    setSupplier(undefined);
    setDrawer(undefined);
    setItem(null);
    handleFormState(false, null);
    console.log('end of onComplete');
  };

  const getOrderItems = useCallback(() => {
    const url =
      pageState === 'create'
        ? `${ORDER_LISTINGS.ORDER_ITEMS}?order_drwr_code=${supplier}&page_state=${pageState}`
        : `${ORDER_LISTINGS.ORDER_ITEMS}?order_sys_no=${orderNo}`;
    //: `${ORDER_LISTINGS.ORDER_ITEMS}?order_sys_no=${value?.order_sys_no}`;

    api.get(url).then((response) => {
      const payload = response.data?.records || [];

      /* setFieldsValue({
        order_items: payload,
      }); */

      setOrderItems(payload);
    });
  }, [orderNo, supplier, pageState]);

  const onEditingFinished = (value) => {
    if (pageState === 'create') return;
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setOrderItems([]);
      setSupplier(undefined);
      setDrawer(undefined);
      setItem(null);
    }
  }, [value, visible, resetFields, setOrderItems, setSupplier, setDrawer, setItem]);

  useEffect(() => {
    console.log('getOrderItems by', orderNo, supplier, pageState);
    getOrderItems();
  }, [orderNo, supplier, pageState, getOrderItems]);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setOrderNo(value.order_sys_no);
    }
  }, [value, setOrderNo]);

  useEffect(() => {
    setFieldsValue({
      order_items: orderItems,
    });
  }, [orderItems, setFieldsValue]);

  const handleItemSelect = (option) => {
    // console.log('handleItemSelect', option);
    if (option) {
      option.editable = false;
      option.order_cust_ordno = value?.order_cust_no;
    }
    // console.log('handleItemSelect222', option);
    setItem(option);
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={onFormClosed}
      destroyOnClose={true}
      placement="right"
      width={drawerWidth}
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={onFormClosed}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            htmlType="button"
            icon={<SyncOutlined />}
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
          >
            {t('operations.ok')}
          </Button>
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={{
          order_cust_no: null,
          order_ttyp_id: '0',
          order_dtrm_code: site_code,
          order_strm_code: site_code,
          order_stat_id: '0',
        }}
      >
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Supplier form={form} value={value} onChange={setSupplier} pageState={pageState} />
          </Col>

          <Col span={6}>
            <Customer form={form} value={value} supplier={supplier} pageState={pageState} />
          </Col>

          <Col span={6}>
            <OrderCustNo form={form} value={value} supplier={supplier} pageState={pageState} />
          </Col>

          <Col span={6}>
            <OrderRefCode form={form} value={value} pageState={pageState} />
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={6}>
            <OrderDate form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={6}>
            <DeliveryDate form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={6}>
            <ExpiryDate form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={6}>
            <TransportType form={form} value={value} pageState={pageState} />
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Carrier form={form} value={value} onChange={setCarrier} pageState={pageState} />
          </Col>

          <Col span={6}>
            <DrawerCompany
              form={form}
              value={value}
              supplier={supplier}
              onChange={setDrawer}
              pageState={pageState}
            />
          </Col>

          <Col span={6}>
            <OrderStatus form={form} value={value} pageState={pageState} />
          </Col>

          <Col span={6}>
            <ApproveFlag form={form} value={value} pageState={pageState} />
          </Col>
        </Row>

        <Divider />

        <Form.Item name="order_items">
          <DataTable
            data={value?.order_approved 
              ? orderItems.filter((item)=>(item.oitem_prod_qty>0)) 
              : orderItems
            }
            height="60vh"
            minimal
            columns={fields}
            //onClick={(value) => handleItemSelect(value)}
            handleSelect={(value) => handleItemSelect(value[0])}
            apiContext={setTableAPI}
            //selectionMode="single"
            onEditingFinished={onEditingFinished}
          />
        </Form.Item>

        <Divider>{t('tabColumns.orderItemTrips')}</Divider>
        <OrderItemTrips value={value} orderItem={item} />
      </Form>
    </Drawer>
  );
};

export default FormModal;
