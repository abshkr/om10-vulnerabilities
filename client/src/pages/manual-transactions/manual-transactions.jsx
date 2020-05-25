import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Tabs, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Page } from '../../components';
import auth from '../../auth';

import DrawerProductTransfer from './drawer-product-transfer';
import ProductQuantities from './product-quantities';
import TransferDetails from './transfer-details';
import MeterTotals from './meter-totals';
import Forms from './forms';

const { TabPane } = Tabs;
const { confirm } = Modal;

const ManualTransactions = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [type, setType] = useState(undefined);

  const [trips, setTrips] = useState(null);
  const [tankers, setTankers] = useState(null);
  const [orders, setOrders] = useState(null);

  const [customers, setCustomers] = useState(null);
  const [trip, setTrip] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

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
      cancelText: 'No',
      onOk: async () => {
        await form.resetFields();
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
          type={type}
          setType={setType}
          trips={trips}
          setTrips={setTrips}
          tankers={tankers}
          setTankers={setTankers}
          orders={orders}
          setTrip={setTrip}
          setOrders={setOrders}
          customers={customers}
          setCustomers={setCustomers}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
        />

        <Divider style={{ margin: '0px 0' }}>{t('divider.drawerProductTransfer')}</Divider>

        <DrawerProductTransfer form={form} type={type} supplier={selectedSupplier} trip={trip} />

        <Divider style={{ margin: '0px 0' }}>{t('divider.baseProducts')}</Divider>

        <Tabs defaultActiveKey="1" animated={false} type="card">
          <TabPane tab={t('tabColumns.transferDetails')} key="1">
            <TransferDetails form={form} type={type} />
          </TabPane>

          <TabPane tab={t('tabColumns.cumulativeBaseProduct')} key="2">
            <ProductQuantities form={form} type={type} />
          </TabPane>
        </Tabs>

        <Divider style={{ margin: '0px 0' }}>{t('divider.meters')}</Divider>

        <Tabs defaultActiveKey="1" animated={false} type="card">
          <TabPane tab={t('tabColumns.cumulativeMeterTotals')} key="1">
            <MeterTotals form={form} type={type} />
          </TabPane>
        </Tabs>
      </Form>
    </Page>
  );
};

export default auth(ManualTransactions);
