import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Page } from '../../components';
import auth from '../../auth';

import DrawerProductTransfers from './drawer-product-transfer';
import Forms from './forms';

const { confirm } = Modal;

const ManualTransactions = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [trsaType, setTrsaType] = useState(undefined);

  const [trips, setTrips] = useState(null);
  const [tankers, setTankers] = useState(null);
  const [orders, setOrders] = useState(null);

  const [customers, setCustomers] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTanker, setSelectedTanker] = useState(null);

  const onSumit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const onReset = () => {
    confirm({
      title: 'Are you sure reset this Transaction?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Reset',
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: async () => {
        await form.resetFields();

        setTrsaType(null);
        setTrips(null);
        setTankers(null);
        setOrders(null);
        setCustomers(null);
        setSelectedSupplier(null);
        setSelectedTrip(null);
      },
    });
  };

  const modifiers = (
    <>
      <Button type="danger" icon={<DeleteOutlined />} onClick={onReset}>
        {t('operations.clear')}
      </Button>

      <Button type="primary" icon={<PlusOutlined />} onClick={onSumit}>
        {t('operations.submit')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.manualTransactions')}
      modifiers={modifiers}
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Forms
          form={form}
          trsaType={trsaType}
          setTrsaType={setTrsaType}
          trips={trips}
          setTrips={setTrips}
          tankers={tankers}
          setTankers={setTankers}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
          setCustomers={setCustomers}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
          setSelectedTrip={setSelectedTrip}
          setSelectedOrder={setSelectedOrder}
          setSelectedTanker={setSelectedTanker}
        />

        <Divider style={{ margin: '0px 0' }}>{t('divider.drawerProductTransfer')}</Divider>

        <DrawerProductTransfers 
          form={form} 
          trsaType={trsaType} 
          supplier={selectedSupplier} 
          trip={selectedTrip} 
          order={selectedOrder} 
          tanker={selectedTanker}
        />
      </Form>
    </Page>
  );
};

export default auth(ManualTransactions);
