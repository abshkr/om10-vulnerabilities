import React, { useEffect, useState } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
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

import api, { CUSTOMERS } from '../../../api';
import { AllocationsPopup } from '../../../pages/allocations';
import { OrderListingsPopup } from '../../../pages/order-listings';
import { DelvLocationsPopup } from 'pages/delv-locations';
import { CustomerCategoriesPopup } from 'pages/customer-categories';
import { AddressesPopup } from 'pages/addresses';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const [supplier, setSupplier] = useState(undefined);
  const [drawerWidth, setDrawerWidth] = useState('60vw');
  const [mainTabOn, setMainTabOn] = useState(true);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === '1') {
      setDrawerWidth('60vw');
      setMainTabOn(true);
    } else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  };

  const onFormClosed = () => {
    handleFormState(false, null);
    setDrawerWidth('60vw');
    setMainTabOn(true);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(CUSTOMERS.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

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
            onComplete();

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

  useEffect(() => {
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]);

  const layout = {
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

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
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
        // layout="vertical"
        {...layout}
        form={form}
        // scrollToFirstError
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
            <Account form={form} value={value} />
            <Supplier form={form} value={value} onChange={setSupplier} />
            <Customer form={form} value={value} supplier={supplier} />
            <Address form={form} value={value} />
            {!IS_CREATING && <Category form={form} value={value} />}
            {!IS_CREATING && <Location form={form} value={value} />}
            {!IS_CREATING && <Contact form={form} value={value} />}
            {!IS_CREATING && <Phone form={form} value={value} />}
            {!IS_CREATING && <PriceType form={form} value={value} />}
            {!IS_CREATING && <InvoiceType form={form} value={value} />}
            {!IS_CREATING && <SaleType form={form} value={value} />}
            {!IS_CREATING && <TermsType form={form} value={value} />}
            {!IS_CREATING && <OrderDays form={form} value={value} />}
            {!IS_CREATING && <CreditDays form={form} value={value} />}
            {!IS_CREATING && <AccountBalance form={form} value={value} />}
            {!IS_CREATING && <CreditLimit form={form} value={value} />}
          </TabPane>
          <TabPane tab={t('tabColumns.addresses')} key="2">
            <AddressesPopup popup={true} />
          </TabPane>
          {!IS_CREATING && 
          <TabPane tab={t('tabColumns.customerCategories')} key="3">
            <CustomerCategoriesPopup popup={true} />
          </TabPane> 
          }
          {!IS_CREATING && 
          <TabPane tab={t('tabColumns.allocations')} key="4">
            <AllocationsPopup popup={true} />
          </TabPane>
          }
          {!IS_CREATING && 
          <TabPane tab={t('tabColumns.orderListing')} key="5">
            <OrderListingsPopup
              popup={true}
              params={{
                order_supp_code: value?.cust_supp_code,
                order_cust_acnt: value?.cust_account,
              }}
            />
          </TabPane>
          }
          {!IS_CREATING && 
          <TabPane tab={t('tabColumns.deliveryLocations')} key="6">
            <DelvLocationsPopup
              popup={true}
              params={{
                delv_cust_suppcode: value?.cust_supp_code,
                delv_cust_acct: value?.cust_account,
              }}
            />
          </TabPane>
          }
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
