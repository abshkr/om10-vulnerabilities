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
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';

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
  OrderInstructions
} from './fields';

import { DataTable } from '../../../components';
import { ORDER_LISTINGS } from '../../../api';
import columns from './columns';
//import Period from './period';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, pageState }) => {
  const { data: units } = useSWR(ORDER_LISTINGS.UNIT_TYPES);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [orderNo, setOrderNo] = useState(value?.order_sys_no);
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [approved, setApproved] = useState(value?.order_approved);
  const [carrier, setCarrier] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [lockType, setLockType] = useState(undefined);

  const [orderItems, setOrderItems] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);

  const { resetFields } = form;

  const IS_CREATING = !value;
  const CAN_ORDER_PERIOD = selected && value;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(ORDER_LISTINGS.READ);
  };

  const getOrderItems = useCallback(() => {
    const url = IS_CREATING
      ? `${ORDER_LISTINGS.ORDER_ITEMS}?order_drwr_code=${drawer}&page_state=${pageState}`
      : `${ORDER_LISTINGS.ORDER_ITEMS}?order_sys_no=${value?.order_sys_no}`;

    axios.get(url).then((response) => {
      const payload = response.data?.records || [];
  
      form.setFieldsValue({
        order_items: payload,
      });

      setOrderItems(payload);
    });
  }, [orderNo, drawer]);

  const onFinish = async () => {
    const values = await form.validateFields();
    const orderItems = [];

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
    values.order_sys_no = orderNo;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? ORDER_LISTINGS.CREATE : ORDER_LISTINGS.UPDATE, values)
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
          .post(ORDER_LISTINGS.DELETE, value)
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

  const onApprove = () => {
    Modal.confirm({
      title: t('prompts.approve'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(ORDER_LISTINGS.APPROVE, {
            order_sys_no: value?.order_sys_no,
          })
          .then(() => {
            getOrderItems();
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
        await axios
          .post(ORDER_LISTINGS.UNAPPROVE, {
            order_sys_no: value?.order_sys_no,
          })
          .then(() => {
            getOrderItems();
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
  /*
  useEffect(() => {
    if (!value && !visible) {
      resetFields();

      setType(undefined);
      setCompany(undefined);
      setSupplier(undefined);
      setLockType(undefined);
      setOrderItems([]);
    }
  }, [resetFields, value, visible]);
  */
  useEffect(() => {
    getOrderItems();
  }, [orderNo, drawer, getOrderItems]);

  useEffect(() => {
    if (!value) {
      resetFields();
    }
  }, [value, resetFields]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="80vw"
      visible={visible}
      footer={
        <>
          {!IS_CREATING && !approved && (
            <Button 
              type="primary" 
              disabled={IS_CREATING || !access?.canUpdate} 
              icon={<EditOutlined />} 
              onClick={onApprove}
            >
              {t('operations.approve')}
            </Button>
          )}

          {!IS_CREATING && approved && (
            <Button 
              type="primary" 
              disabled={IS_CREATING || !access?.canUpdate} 
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
            disabled={(IS_CREATING ? !access?.canCreate : !access?.canUpdate) }
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<ClockCircleOutlined />}
              style={{ marginLeft: 5 }}
              disabled={!CAN_ORDER_PERIOD}
              onClick={() => setShowPeriod(true)}
            >
              {t('operations.orderPeriod')}
            </Button>
          )}

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1">
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
                <DrawerCompany form={form} value={value} onChange={setDrawer} pageState={pageState} />
              </Col>

              <Col span={6}>
                <OrderStatus form={form} value={value} pageState={pageState} />
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
                <TransferType form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={12}>
                <ApproveFlag form={form} value={value} onChange={setApproved} pageState={pageState} />
              </Col>
            </Row>

            {/* <Row gutter={[8, 8]}>
              <OrderInstructions form={form} value={value} pageState={pageState} />
            </Row> */}

            <Divider />

            <Form.Item name="order_items">
              <DataTable
                data={orderItems}
                height="60vh"
                minimal
                columns={columns(t, pageState, form, units)}
                handleSelect={(value) => setSelected(value[0])}
                /* components={{
                  UnitEditor: UnitType,
                }} */
              />
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
      {/* <Period visible={showPeriod && CAN_ORDER_PERIOD} setVisibility={setShowPeriod} selected={selected} /> */}
    </Drawer>
  );
};

export default FormModal;
