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
  TransferType,
  ApproveFlag,
  OrderInstructions,
} from './fields';

import { DataTable, SelectInput, PartnershipManager } from '../../../components';
import { SETTINGS } from '../../../constants';
import api, { ORDER_LISTINGS } from '../../../api';
import columns from './columns';
import Period from './item-periods';
import OrderTrips from './order-trips';
import OrderItemTrips from './item-trips';

import DeliveryDetails from '../../delivery-details';
import { ItemEffectTime } from '../../movement-nominations/forms/items/nomination-transactions/forms/head-fields';
import { ManualTransactionsPopup } from '../../manual-transactions';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, pageState, revalidate, locateOrder }) => {
  const [drawerWidth, setDrawerWidth] = useState('80vw');
  const [mainTabOn, setMainTabOn] = useState(true);
  const [tableAPI, setTableAPI] = useState(undefined);

  const { data: units } = useSWR(ORDER_LISTINGS.UNIT_TYPES);
  // const { data: siteData } = useSWR(ORDER_LISTINGS.SITE_CODE);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields, getFieldValue } = form;

  const [orderNo, setOrderNo] = useState(value?.order_sys_no);
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(value?.order_drwr_code);
  const [selected, setSelected] = useState(null);
  const [approved, setApproved] = useState(value?.order_approved);
  const [carrier, setCarrier] = useState(value?.order_carr_code);
  const [shipTo, setShipTo] = useState(value?.order_ship_to_num);
  const [soldTo, setSoldTo] = useState(value?.order_sold_to_num);

  const [orderItems, setOrderItems] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  //console.log("access in OO", access);
  //console.log('pageState in OO', pageState);

  const IS_CREATING = !value;
  //const CAN_ORDER_PERIOD = !!selected && !!value;
  const CAN_ORDER_PERIOD =
    selected !== null && selected !== undefined && value !== null && value !== undefined;
  const CAN_DELIVERY_DETAIL = value !== null && value !== undefined;
  const fields = columns(t, pageState, form, units);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;
  console.log("jwtDecode", decoded);
  const site_code = decoded?.site_code

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === '1') {
      setDrawerWidth('80vw');
      setMainTabOn(true);
    } else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  };

  const onFormClosed = () => {
    setDrawerWidth('80vw');
    setMainTabOn(true);
    handleFormState(false, null);
  };

  const onComplete = (order) => {
    console.log('start of onComplete');
    setDrawerWidth('80vw');
    setMainTabOn(true);
    if (order) {
      locateOrder(order);
    } else {
      revalidate();
    }
    setSupplier(undefined);
    setDrawer(undefined);
    setSelected(null);
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

    /* console.log("onEditingFinished", value);
    const payload = orderItems;
    const line = value.data;

    payload.forEach((item) => {
      if (item.oitem_prod_cmpy === line.oitem_prod_cmpy 
      && item.oitem_prod_code === line.oitem_prod_code) {
        console.log("onEditingFinished1", item, line);
        item.oitem_prod_qty = line.oitem_prod_qty;
        item.oitem_prod_unit = line.oitem_prod_unit;
      }
    });
    console.log("onEditingFinished2", payload);

    setFieldsValue({
      order_items: payload,
    });
    setOrderItems(payload); */
  };

  const onFinish = async () => {
    const values = await validateFields();
    console.log('order items', values);

    const gridItems = [];
    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      gridItems.push(rowNode.data);
    });
    console.log('order items2', gridItems);

    const newItems = [];
    _.forEach(gridItems, (order_item) => {
      if (order_item.oitem_prod_qty > 0) {
        newItems.push({
          oitem_prod_cmpy: order_item.oitem_prod_cmpy,
          oitem_prod_code: order_item.oitem_prod_code,
          oitem_prod_qty: _.toNumber(order_item.oitem_prod_qty),
          oitem_prod_unit: _.toNumber(order_item.oitem_prod_unit),
          oitem_pack_size: _.toNumber(order_item.oitem_pack_size),
          oitem_prod_price: _.toNumber(order_item.oitem_prod_price),
          oitem_exempt_no: order_item.oitem_exempt_no,
          oitem_padj_code: order_item.oitem_padj_code,
        });
      }
    });

    values.order_items = newItems;
    if (value?.order_sys_no === undefined) {
      values.order_sys_no = -1;
    } else {
      values.order_sys_no = value?.order_sys_no;
    }
    console.log('values:', value?.order_sys_no, orderNo, values);
    console.log('date before', values.order_ord_time, values.order_dlv_time, values.order_exp_time);
    values.order_ord_time = values?.order_ord_time?.format(SETTINGS.DATE_TIME_FORMAT);
    values.order_dlv_time = values?.order_dlv_time?.format(SETTINGS.DATE_TIME_FORMAT);
    values.order_exp_time = values?.order_exp_time?.format(SETTINGS.DATE_TIME_FORMAT);
    console.log('date after', values.order_ord_time, values.order_dlv_time, values.order_exp_time);

    values.order_styp_id = 0;
    values.order_totals = 0;
    values.order_limit = 0;
    values.order_src_id = 5;
    if (user_code !== undefined) {
      values.order_psnl_code = user_code;
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? ORDER_LISTINGS.CREATE : ORDER_LISTINGS.UPDATE, values)
          .then(() => {
            onComplete(values?.order_cust_no);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ORDER_LISTINGS.DELETE, value)
          .then(() => {
            onComplete(null);

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onApprove = () => {
    Modal.confirm({
      title: t('prompts.approve'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ORDER_LISTINGS.APPROVE, {
            order_sys_no: value?.order_sys_no,
          })
          .then(() => {
            //getOrderItems();
            onComplete(value?.order_cust_no);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onUnapprove = () => {
    Modal.confirm({
      title: t('prompts.unapprove'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ORDER_LISTINGS.UNAPPROVE, {
            order_sys_no: value?.order_sys_no,
          })
          .then(() => {
            //getOrderItems();
            onComplete(value?.order_cust_no);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setOrderItems([]);
      setSupplier(undefined);
      setDrawer(undefined);
      setSelected(null);
    }
  }, [value, visible, resetFields, setOrderItems, setSupplier, setDrawer, setSelected]);

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

  const handleItemSelect = (value) => {
    // console.log('handleItemSelect', value);
    if (value) {
      value.editable = pageState==='detail'? false : true;
    }
    // console.log('handleItemSelect222', value);
    setSelected(value);
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width={drawerWidth}
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          {!IS_CREATING && !approved && (
            <Button
              type="primary"
              disabled={IS_CREATING || !access?.canUpdate || !mainTabOn}
              icon={<EditOutlined />}
              onClick={onApprove}
            >
              {t('operations.approve')}
            </Button>
          )}

          {!IS_CREATING && approved && (
            <Button
              type="primary"
              disabled={IS_CREATING || !access?.canUpdate || !mainTabOn}
              icon={<EditOutlined />}
              onClick={onUnapprove}
            >
              {t('operations.unapprove')}
            </Button>
          )}

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={(IS_CREATING ? !access?.canCreate : !access?.canUpdate) || !mainTabOn}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<ClockCircleOutlined />}
              style={{ marginLeft: 5 }}
              disabled={!CAN_ORDER_PERIOD || !mainTabOn}
              onClick={() => setShowPeriod(true)}
            >
              {t('operations.orderPeriod')}
            </Button>
          )}

          {/* {!IS_CREATING && (
            <Button
              type="primary"
              icon={<ClockCircleOutlined />}
              style={{ marginLeft: 5 }}
              disabled={!CAN_DELIVERY_DETAIL}
              onClick={() => setShowDeliveryDetails(true)}
            >
              {t('operations.deliveryDetails')}
            </Button>
          )} */}

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete || !mainTabOn || value?.order_approved}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
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
        <Tabs defaultActiveKey="1" onChange={doTabChanges}>
          <TabPane tab={t('tabColumns.general')} key="1">
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
                <DeliveryLocation form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <OrderTerminal form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <SupplyDepot form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
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
                {/* <SoldTo form={form} value={value} supplier={supplier} pageState={pageState} /> */}
                <SelectInput
                  form={form}
                  value={value}
                  name="order_sold_to_num"
                  label={t('fields.orderSoldTo')}
                  required={false}
                  allowClear={true}
                  maxLength={20}
                  disabled={(pageState==='create'||pageState==='edit'||pageState==='detail')? false : true}
                  onChange={setSoldTo}
                  popupManager={PartnershipManager}
                  popupTitle={t('fields.orderSoldTo') + ' - ' + t('pageNames.partnership')}
                  popupDisabled={!supplier}
                  popupIcon={<CaretDownOutlined />}
                  popupLabel={''}
                  popupParams={{
                    partner_code: soldTo,
                    partner_type: 'AG',
                    partner_cmpy_code: supplier,
                    partner_cust_acct: ''
                  }}
                />
              </Col>

              <Col span={6}>
                {/* <ShipTo form={form} value={value} supplier={supplier} pageState={pageState} /> */}
                <SelectInput
                  form={form}
                  value={value}
                  name="order_ship_to_num"
                  label={t('fields.orderShipTo')}
                  required={false}
                  allowClear={true}
                  maxLength={20}
                  disabled={(pageState==='create'||pageState==='edit'||pageState==='detail')? false : true}
                  onChange={setShipTo}
                  popupManager={PartnershipManager}
                  popupTitle={t('fields.orderShipTo') + ' - ' + t('pageNames.partnership')}
                  popupDisabled={!supplier}
                  popupIcon={<CaretDownOutlined />}
                  popupLabel={''}
                  popupParams={{
                    partner_code: shipTo,
                    partner_type: 'WE',
                    partner_cmpy_code: supplier,
                    partner_cust_acct: ''
                  }}
                />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <Row gutter={(8, 8)}>
                  <Col span={24}>
                    <TransferType form={form} value={value} pageState={pageState} />
                  </Col>
                </Row>
                <Row gutter={(8, 8)}>
                  <Col span={24}>
                    <ApproveFlag form={form} value={value} onChange={setApproved} pageState={pageState} />
                  </Col>
                </Row>
              </Col>

              <Col span={18}>
                <OrderInstructions form={form} value={value} pageState={pageState} />
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
          </TabPane>
          <TabPane tab={t('tabColumns.orderTrips')} disabled={IS_CREATING} key="2">
            <OrderTrips value={value} orderNo={orderNo} />
          </TabPane>
          <TabPane tab={t('tabColumns.orderItemTrips')} disabled={IS_CREATING || !selected} key="3">
            <OrderItemTrips value={value} orderItem={selected} />
          </TabPane>
          <TabPane tab={t('tabColumns.deliveryDetails')} disabled={IS_CREATING} key="4">
            <DeliveryDetails
              // access={access}
              params={{
                dd_supp_code: value?.order_supp_code,
                dd_tripord_no: value?.order_cust_no,
                dd_ld_type: 3,
              }}
            />
          </TabPane>
          <TabPane tab={t('pageNames.manualTransactions')} disabled={IS_CREATING || !value?.order_approved} key="5">
            <ManualTransactionsPopup 
              popup={true}
              params={{
                supplier: value?.order_supp_code,
                customer: value?.order_cust_acnt,
                cust_cmpy: value?.order_cust_code,
                carrier: value?.order_carr_code,
                order_sys_no: value?.order_sys_no,
                order_cust_no: value?.order_cust_no,
                trans_type: 'OPENORDER',
                repost: false,
                onComplete: onComplete,
              }}
            />
          </TabPane>
        </Tabs>
      </Form>
      {pageState !== 'create' && (
        <Period
          visible={showPeriod && CAN_ORDER_PERIOD}
          setVisibility={setShowPeriod}
          selected={selected}
          order={value}
          form={form}
        />
      )}
    </Drawer>
  );
};

export default FormModal;
