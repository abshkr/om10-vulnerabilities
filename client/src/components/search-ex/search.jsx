import React, { useState } from 'react';
import { FileSearchOutlined, CloseOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Form, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import Supplier from './search/supplier';
import TripStatus from './search/trip-status';
import Tanker from './search/tanker';
import Trip from './search/trip-number';
import LoadID from './search/load-id';
import TrsaID from './search/trsa-id';
import MovementID from './search/mv-id';
import MovementStatus from './search/mv-status';
import OrderNumber from './search/order-number';
import OrderSupplier from './search/order-supplier';
import OrderCustomer from './search/order-customer';
import OrderStatus from './search/order-status';
import OrderRefCode from './search/order-ref-code';
import NominationKey from './search/nomination-key';
import NominationStatus from './search/nomination-status';
import NominationSource from './search/nomination-source';
import NominationTerminal from './search/nomination-terminal';
import NominationNumber from './search/nomination-number';


const SearchForm = ({onSearch, items}) => {
  const [orderSupplier, setOrderSupplier] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    Modal.destroyAll();
    onSearch(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}}>
      {items?.shls_trip_no && <Trip />}
      {items?.mlitm_id && <MovementID />}
      {items?.load_id && <LoadID />}
      {items?.trsa_id && <TrsaID />}
      {items?.supplier_code && <Supplier />}
      {items?.trip_status && <TripStatus />}
      {items?.mlitm_status && <MovementStatus />}
      {items?.tnkr_code && <Tanker />}
      {items?.order_cust_no && <OrderNumber />}
      {items?.order_supp_code && <OrderSupplier onChange={setOrderSupplier} />}
      {items?.order_cust_acnt && <OrderCustomer supplier={orderSupplier} />}
      {items?.order_stat_id && <OrderStatus />}
      {items?.order_ref_code && <OrderRefCode />}
      {items?.mv_key && <NominationKey />}
      {items?.mv_status && <NominationStatus />}
      {items?.mv_srctype && <NominationSource />}
      {items?.mv_terminal && <NominationTerminal />}
      {items?.mv_number && <NominationNumber />}
      
      <div style={{marginTop: "2rem"}}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.search')}
        </Button>
      </div>
    </Form>
  );
};

const WindowSearch = (
    onSearch, 
    title, 
    items,
  ) => {
  Modal.info({
    className: 'form-container',
    // title: t('operations.search'),
    title: title? title: 'Search',
    centered: true,
    width: '20vw',
    icon: <FileSearchOutlined />,
    content: (
    <SWRConfig
        value={{
        refreshInterval: 0,
        fetcher,
        }}
    >
      <SearchForm onSearch={onSearch} items={items} />
    </SWRConfig>
    ),
    okButtonProps: {
    style: { display: 'none' },
    },
  });

  return null;
};


export default WindowSearch;
  