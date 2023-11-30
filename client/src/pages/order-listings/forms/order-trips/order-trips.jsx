import React, { useState, useEffect } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  EyeOutlined,
  CarryOutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Drawer, Form, Card } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { ORDER_LISTINGS } from '../../../../api';
import Transactions from '../../../../pages/load-schedules/forms/transactions';
import Schedules from './schedules';

import columns from './columns';

const OrderTrips = ({ value, orderNo, config }) => {
  const [selected, setSelected] = useState(null);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [transactionVisible, setTransactionVisible] = useState(false);

  console.log('I am here!!! ', orderNo);
  console.log('values: ', value);

  const { t } = useTranslation();
  const fields = columns(t);

  const { data: payload, isValidating } = useSWR(
    `${ORDER_LISTINGS.ORDER_TRIPS}?order_sys_no=${value?.order_sys_no}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!selected}
        onClick={() => setTransactionVisible(true)}
      >
        {t('operations.viewTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!selected}
        onClick={() => setScheduleVisible(true)}
      >
        {t('operations.viewSchedule')}
      </Button>
    </>
  );

  return (
    <>
      {transactionVisible && (
        <Drawer
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => setTransactionVisible(false)}
          open={transactionVisible}
          width="100vw"
        >
          <Card size="small" title={t('tabColumns.transactions')}>
            <Transactions
              value={{
                supplier_code: selected?.[0]?.schd_supp_code,
                shls_trip_no: selected?.[0]?.schd_trip_no,
              }}
              config={config}
            />
          </Card>
        </Drawer>
      )}

      {scheduleVisible && (
        <Drawer
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => setScheduleVisible(false)}
          open={scheduleVisible}
          width="100vw"
        >
          <Card size="small" title={t('tabColumns.loadSchedulesForOpenOrder')}>
            <Schedules
              popup={true}
              params={{
                supplier_code: selected?.[0]?.schd_supp_code,
                shls_trip_no: selected?.[0]?.schd_trip_no,
              }}
            />
          </Card>
        </Drawer>
      )}

      <Form.Item name="order_trips">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          extra={modifiers}
          height="42vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          //apiContext={setTableAPI}
          selectionMode="single"
          //onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default OrderTrips;
