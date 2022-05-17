import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col, Tag, Tooltip, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

import _ from 'lodash';

import {
  Account,
  Supplier,
  Customer,
  Address,
  Category,
  Location,
  Contact,
  Phone,
  PriceType,
  InvoiceType,
  SaleType,
  TermsType,
  OrderDays,
  CreditDays,
  AccountBalance,
  CreditLimit,
} from './fields';
import CustomerProduct from './customer_product/customer_product';
import CustomerCarrier from './customer_carrier/customer_carrier';

import api, { CUSTOMERS } from '../../../api';
import { AllocationsPopup } from '../../../pages/allocations';
import { OrderListingsPopup } from '../../../pages/order-listings';
import { DelvLocationsPopup } from 'pages/delv-locations';
import { CustomerCategoriesPopup } from 'pages/customer-categories';
import { AddressesPopup } from 'pages/addresses';
import { useConfig } from 'hooks';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const [supplier, setSupplier] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [carriers, setCarriers] = useState(undefined);
  const [drawerWidth, setDrawerWidth] = useState('60vw');
  const [mainTabOn, setMainTabOn] = useState(true);
  const config = useConfig();
  const site_customer_carrier = config.site_customer_carrier;
  const site_customer_product = config.site_customer_product;
  // const { site_customer_carrier, site_customer_product } = useConfig();

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const doTabChanges = (tabPaneKey) => {
    if (['1', '2', '3', '4', '5'].includes(tabPaneKey)) {
      setDrawerWidth('60vw');
      setMainTabOn(true);
    } else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  };

  const onFormClosed = () => {
    resetFields();
    handleFormState(false, null);
    setDrawerWidth('60vw');
    setMainTabOn(true);
  };

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      onFormClosed();
      return;
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        onFormClosed();
      },
    });
  };

  const onComplete = (cust_account) => {
    resetFields();
    handleFormState(false, null);
    mutate(CUSTOMERS.READ);
    setDrawerWidth('60vw');
    setMainTabOn(true);
    if (cust_account) {
      setFilterValue('' + cust_account);
    } else {
      setFilterValue(' ');
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.products = products;
    values.carriers = carriers;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? CUSTOMERS.CREATE : CUSTOMERS.UPDATE, values)
          .then(() => {
            onComplete(values?.cust_account);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
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
          .post(CUSTOMERS.DELETE, value)
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

  /* useEffect(() => {
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]); */

  const layout = IS_CREATING
    ? { layout: 'vertical' }
    : {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 18,
        },
      };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={onExitClicked}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width={drawerWidth}
      visible={visible}
      footer={
        <>
          {!IS_CREATING && (
            <div style={{ float: 'left', marginRight: 5 }}>
              <Tooltip placement="topRight" title={t('descriptions.countCustOrder')}>
                <Tag color={value?.cust_order_count > 0 ? 'red' : 'green'}>
                  {t('fields.countCustOrder') + ': ' + value?.cust_order_count}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countCustLocation')}>
                <Tag color={value?.cust_dloc_count > 0 ? 'red' : 'green'}>
                  {t('fields.countCustLocation') + ': ' + value?.cust_dloc_count}
                </Tag>
              </Tooltip>
            </div>
          )}

          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onExitClicked()}
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
              disabled={
                !access?.canDelete || !mainTabOn || value?.cust_order_count > 0 || value?.cust_dloc_count > 0
              }
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
        // {...layout}
        form={form}
        scrollToFirstError
        // initialValues={{
        //   cust_account: '',
        //   cust_supp_code: null,
        //   cust_cmpy_code: null,
        //   cust_addr_code: null,
        //   cust_ctgr_code: null,
        //   cust_delv_code: null,
        //   cust_contact: '',
        //   cust_phone_no: '',
        //   cust_pricetype_id: null,
        //   cust_invtype_id: null,
        //   cust_saletype_id: null,
        //   cust_crd_terms: null,
        //   // , cust_ord_days: 0
        //   // , cust_crd_days: 0
        //   // , cust_balance: 0
        //   // , cust_crd_limit: 0
        // }}
      >
        <Tabs onChange={doTabChanges}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Account form={form} value={value} config={config} />
              </Col>
              <Col span={12}>
                <Supplier form={form} value={value} onChange={setSupplier} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Customer form={form} value={value} supplier={supplier} />
              </Col>
              <Col span={12}>
                <Address form={form} value={value} reload={mainTabOn} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>{!IS_CREATING && <Category form={form} value={value} reload={mainTabOn} />}</Col>
              <Col span={12}>{!IS_CREATING && <Location form={form} value={value} reload={mainTabOn} />}</Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>{!IS_CREATING && <Contact form={form} value={value} />}</Col>
              <Col span={12}>{!IS_CREATING && <Phone form={form} value={value} />}</Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>{!IS_CREATING && <PriceType form={form} value={value} />}</Col>
              <Col span={12}>{!IS_CREATING && <InvoiceType form={form} value={value} />}</Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>{!IS_CREATING && <SaleType form={form} value={value} />}</Col>
              <Col span={12}>{!IS_CREATING && <TermsType form={form} value={value} />}</Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>{!IS_CREATING && <OrderDays form={form} value={value} />}</Col>
              <Col span={12}>{!IS_CREATING && <CreditDays form={form} value={value} />}</Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>{!IS_CREATING && <AccountBalance form={form} value={value} />}</Col>
              <Col span={12}>{!IS_CREATING && <CreditLimit form={form} value={value} />}</Col>
            </Row>
          </TabPane>
          {!IS_CREATING && site_customer_product && (
            <TabPane tab={t('tabColumns.customerProduct')} key="2">
              <CustomerProduct form={form} value={value} changeProducts={setProducts} />
            </TabPane>
          )}
          {!IS_CREATING && site_customer_carrier && (
            <TabPane tab={t('tabColumns.customerCarrier')} key="3">
              <CustomerCarrier form={form} value={value} changeCarriers={setCarriers} />
            </TabPane>
          )}
          <TabPane tab={t('tabColumns.addresses')} key="4">
            <AddressesPopup popup={true} />
          </TabPane>
          {!IS_CREATING && (
            <TabPane tab={t('tabColumns.customerCategories')} key="5">
              <CustomerCategoriesPopup popup={true} />
            </TabPane>
          )}
          {!IS_CREATING && (
            <TabPane tab={t('tabColumns.allocations')} key="6">
              <AllocationsPopup
                popup={true}
                params={{
                  alloc_type: '3',
                  alloc_cmpycode: value?.cust_cmpy_code,
                }}
              />
            </TabPane>
          )}
          {!IS_CREATING && (
            <TabPane tab={t('tabColumns.orderListing')} key="7">
              <OrderListingsPopup
                popup={true}
                params={{
                  order_supp_code: value?.cust_supp_code,
                  order_cust_acnt: value?.cust_account,
                }}
              />
            </TabPane>
          )}
          {!IS_CREATING && (
            <TabPane tab={t('tabColumns.deliveryLocations')} key="8">
              <DelvLocationsPopup
                popup={true}
                params={{
                  delv_cust_suppcode: value?.cust_supp_code,
                  delv_cust_acct: value?.cust_account,
                }}
              />
            </TabPane>
          )}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
