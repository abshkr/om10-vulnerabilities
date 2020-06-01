import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import {
  Supplier,
  TripOrderNo,
  LoadType,
  DeliveryNumber,
  DeliveryType,
  VehicleArrvTime,
  SoldTo,
  ShipTo,
  Instruction,
  LpgRemark,
  Phone,
  SalesOrderNumber,
  CustomerPurchaseOrder,
  SaleOrderType,
  VatId,
  DeliveryRoute,
  ShipCondition,
  CustomCode,
  LpgDestType,
  PermitNumber,
  SellCompany,
} from './fields';

import { DataTable } from '../../../components';
import { SETTINGS } from '../../../constants';
import { DELIVERY_DETAILS } from '../../../api';
import DeliveryDetailItems from './dd-items/delivery-detail-items';
import DeliveryNoteTemplates from './dd-dn-templates/delivery-note-templates';
import DeliveryBolTemplates from './dlv-bol-templates/delivery-bol-templates';
/* import Period from './item-periods';
import OrderTrips from './order-trips';
import OrderItemTrips from './item-trips'; */

//import DeliveryDetails from '../../delivery-details';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, pageState, revalidate, params }) => {
  const [drawerWidth, setDrawerWidth] = useState('80vw');
  const [mainTabOn, setMainTabOn] = useState(true);

  const { data: units } = useSWR(DELIVERY_DETAILS.UNIT_TYPES);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields } = form;

  const [orderNo, setOrderNo] = useState(value?.order_sys_no);
  const [supplier, setSupplier] = useState(params?.dd_supp_code);
  const [selected, setSelected] = useState(null);

  const [orderItems, setDdiItems] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);


  const IS_CREATING = !value;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === "1") {
      setDrawerWidth('80vw');
      setMainTabOn(true);
    }
    else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  }

  const onFormClosed = () => {
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
  };

  const onComplete = () => {
    console.log("start of onComplete");
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
    revalidate();
    setSupplier(undefined);
    setSelected(null);
    console.log("end of onComplete");
  };

  const onFinish = async () => {
    const values = await validateFields();
    const orderItems = [];
    // TODO
    return;

    _.forEach(values?.order_items, (order_item) => {
      if (order_item.oitem_prod_qty > 0) {
        orderItems.push({
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

    values.order_items = orderItems;
    if (value?.order_sys_no === undefined) {
      values.order_sys_no = -1;
    }
    else {
      values.order_sys_no = value?.order_sys_no;
    }
    console.log("values:", value?.order_sys_no, orderNo, values)
    console.log("date before", values.order_ord_time, values.order_dlv_time, values.order_exp_time);
    values.order_ord_time = values?.order_ord_time?.format(SETTINGS.DATE_TIME_FORMAT);
    values.order_dlv_time = values?.order_dlv_time?.format(SETTINGS.DATE_TIME_FORMAT);
    values.order_exp_time = values?.order_exp_time?.format(SETTINGS.DATE_TIME_FORMAT);
    console.log("date after", values.order_ord_time, values.order_dlv_time, values.order_exp_time);

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
        await axios
          .post(IS_CREATING ? DELIVERY_DETAILS.CREATE : DELIVERY_DETAILS.UPDATE, values)
          .then(() => {
            onComplete();

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
        await axios
          .post(DELIVERY_DETAILS.DELETE, value)
          .then(() => {
            onComplete();

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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setDdiItems([]);
      setSupplier(undefined);
      setSelected(null);
    }
  }, [value, visible, resetFields, setDdiItems, setSupplier, setSelected]);

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
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={(IS_CREATING ? !access?.canCreate : !access?.canUpdate) || !mainTabOn }
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={(!access?.canDelete) || !mainTabOn}
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
          dd_supp_code: params?.dd_supp_code,
          dd_tripord_no: params?.dd_tripord_no,
          dd_ld_type: String(params?.dd_ld_type),
        }}
      >
        <Tabs defaultActiveKey="1" onChange={doTabChanges}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Row gutter={[8, 8]}>
              <Col span={6}>
                <Supplier form={form} value={value} onChange={setSupplier} pageState={pageState} />
              </Col>

              <Col span={6}>
                <TripOrderNo form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <LoadType form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <DeliveryNumber form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <DeliveryType form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <VehicleArrvTime form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <SoldTo form={form} value={value} supplier={supplier} pageState={pageState} />
              </Col>

              <Col span={6}>
                <ShipTo form={form} value={value} supplier={supplier} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Instruction form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={12}>
                <LpgRemark form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <Phone form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <SalesOrderNumber form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <CustomerPurchaseOrder form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <SaleOrderType form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <VatId form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <DeliveryRoute form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={12}>
                <ShipCondition form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <CustomCode form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <LpgDestType form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <PermitNumber form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <SellCompany form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Divider />

            <Row gutter={[8, 8]}>
              <Col span={24}>
                <DeliveryDetailItems form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <DeliveryNoteTemplates form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={12}>
                <DeliveryBolTemplates form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

          </TabPane>
          {/* <TabPane tab={t('tabColumns.orderTrips')} disabled={IS_CREATING} key="2">
          </TabPane>
          <TabPane tab={t('tabColumns.orderItemTrips')} disabled={IS_CREATING||!selected} key="3">
          </TabPane>
          <TabPane tab={t('tabColumns.deliveryDetails')} disabled={IS_CREATING} key="4">
          </TabPane> */}
        </Tabs>
      </Form>
      {/* <Period visible={showPeriod && CAN_ORDER_PERIOD} setVisibility={setShowPeriod} selected={selected} order={value} form={form} /> */}
    </Drawer>
  );
};

export default FormModal;
