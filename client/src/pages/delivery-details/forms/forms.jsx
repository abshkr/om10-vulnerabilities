import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';

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

import { DataTable, SelectInput, PartnershipManager } from '../../../components';
import { SETTINGS } from '../../../constants';
import api, { DELIVERY_DETAILS } from '../../../api';
import DeliveryDetailItems from './dd-items/delivery-detail-items';
import DeliveryNoteTemplates from './dd-dn-templates/delivery-note-templates';
import DeliveryBolTemplates from './dlv-bol-templates/delivery-bol-templates';
/* import Period from './item-periods';
import OrderTrips from './order-trips';
import OrderItemTrips from './item-trips'; */

//import DeliveryDetails from '../../delivery-details';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  pageState,
  revalidate,
  supplier,
  loadNumber,
  loadType,
  supplierName,
  loadTypeName,
}) => {
  const [drawerWidth, setDrawerWidth] = useState('80vw');
  const [mainTabOn, setMainTabOn] = useState(true);
  const [ddiTableAPI, setDdiTableAPI] = useState(null);
  const [dddTableAPI, setDddTableAPI] = useState(null);
  const [deliveryNumber, setDeliveryNumber] = useState(undefined);

  // 1: PREORDER; 2: PRESCHEDULE; 3: OPENORDER
  const productUrl = ( loadType === '1' 
    ? `${DELIVERY_DETAILS.TRIP_PRODUCTS}?supp_code=${supplier}&trip_no=${loadNumber}`
    : ( loadType === '2' 
      ? `${DELIVERY_DETAILS.TRIP_COMPARTMENTS}?supp_code=${supplier}&trip_no=${loadNumber}`
      : ( loadType === '3'
        ? `${DELIVERY_DETAILS.ORDER_PRODUCTS}?supp_code=${supplier}&order_no=${loadNumber}`
        : null
      )
    )
  );
  const { data: products } = useSWR(productUrl);


  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields } = form;

  const [orderNo, setOrderNo] = useState(value?.order_sys_no);
  const [selected, setSelected] = useState(null);
  const [shipTo, setShipTo] = useState(value?.dd_ship_to);
  const [soldTo, setSoldTo] = useState(value?.dd_sold_to);

  const [orderItems, setDdiItems] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  const IS_CREATING = !value;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

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
    resetFields();
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
  };

  const onComplete = () => {
    console.log('start of onComplete');
    resetFields();
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
    revalidate();
    setSelected(null);
    console.log('end of onComplete');
  };

  const onFinish = async () => {
    const values = await validateFields();
    values.dd_veh_arr_time = values?.dd_veh_arr_time?.format(SETTINGS.DATE_TIME_FORMAT);

    const ddi_items=[];
    ddiTableAPI.forEachNode((rowNode, index) => {
      rowNode.data.ddi_dd_number = values?.dd_number;
      ddi_items.push(rowNode?.data);
    });
    const ddd_items=[];
    dddTableAPI.forEachNode((rowNode, index) => {
      rowNode.data.ddd_dd_number = values?.dd_number;
      ddd_items.push(rowNode?.data);
    });
    values.ddi_items = ddi_items;
    values.ddd_items = ddd_items;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
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
        await api
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
      setSelected(null);
    }
  }, [value, visible, resetFields, setDdiItems, setSelected]);

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
            onClick={onFormClosed}
          >
            {t('operations.cancel')}
          </Button>

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
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete || !mainTabOn}
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
      >
        <Tabs defaultActiveKey="1" onChange={doTabChanges}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Row gutter={[8, 2]}>
              <Col span={6}>
                <Supplier form={form} value={value} defValue={supplier} pageState={pageState} />
              </Col>

              <Col span={6}>
                <TripOrderNo form={form} value={value} defValue={loadNumber} pageState={pageState} />
              </Col>

              <Col span={6}>
                <LoadType form={form} value={value} defValue={loadType} pageState={pageState} />
              </Col>

              <Col span={6}>
                <DeliveryNumber form={form} value={value} onChange={setDeliveryNumber} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={6}>
                <DeliveryType form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                <VehicleArrvTime form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={6}>
                {/* <SoldTo form={form} value={value} supplier={supplier} pageState={pageState} /> */}
                <SelectInput
                  form={form}
                  value={value}
                  name="dd_sold_to"
                  label={t('fields.ddSoldTo')}
                  required={true}
                  allowClear={true}
                  maxLength={20}
                  disabled={(pageState==='create'||pageState==='edit'||pageState==='detail')? false : true}
                  onChange={setSoldTo}
                  popupManager={PartnershipManager}
                  popupTitle={t('fields.ddSoldTo') + ' - ' + t('pageNames.partnership')}
                  popupDisabled={false} // !supplier}
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
                  name="dd_ship_to"
                  label={t('fields.ddShipTo')}
                  required={true}
                  allowClear={true}
                  maxLength={20}
                  disabled={(pageState==='create'||pageState==='edit'||pageState==='detail')? false : true}
                  onChange={setShipTo}
                  popupManager={PartnershipManager}
                  popupTitle={t('fields.ddShipTo') + ' - ' + t('pageNames.partnership')}
                  popupDisabled={false} // !supplier}
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

            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Instruction form={form} value={value} pageState={pageState} />
              </Col>

              <Col span={12}>
                <LpgRemark form={form} value={value} pageState={pageState} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
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

            <Row gutter={[8, 2]}>
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

            <Row gutter={[8, 2]}>
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

            {/* <Divider /> */}

            <Row gutter={[8, 2]}>
              <Col span={24}>
                <Card size="small" title={t('divider.ddiTitle')}>
                  <DeliveryDetailItems
                    form={form}
                    value={value}
                    supplier={supplier}
                    loadNumber={loadNumber}
                    loadType={loadType}
                    supplierName={supplierName}
                    loadTypeName={loadTypeName}
                    deliveryNumber={deliveryNumber}
                    products={products}
                    pageState={pageState}
                    tableAPI={ddiTableAPI}
                    setTableAPI={setDdiTableAPI}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={24}>
                <Card size="small" title={t('divider.dddTitle')}>
                  <DeliveryNoteTemplates
                    form={form}
                    value={value}
                    supplier={supplier}
                    loadNumber={loadNumber}
                    loadType={loadType}
                    supplierName={supplierName}
                    loadTypeName={loadTypeName}
                    deliveryNumber={deliveryNumber}
                    pageState={pageState}
                    tableAPI={dddTableAPI}
                    setTableAPI={setDddTableAPI}
                  />
                </Card>
              </Col>

              {/* <Col span={12}>
                <Card size="small" title={t('divider.ddbTitle')}>
                  <DeliveryBolTemplates
                    form={form}
                    value={value}
                    supplier={supplier}
                    loadNumber={loadNumber}
                    loadType={loadType}
                    pageState={pageState}
                  />
                </Card>
              </Col> */}
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
