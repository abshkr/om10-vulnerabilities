import React, { useState } from 'react';
import { FileSearchOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';
import { DatePicker } from 'antd';

// import { Calendar } from '../../components';

import { Form, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { DateRange, 
  LoadID, 
  Supplier, 
  TripStatus, 
  Tanker, 
  Trip, 
  TrsaID,
  MovementID,
  MovementStatus,
  OrderNumber,
  OrderSupplier,
  OrderCustomer,
  OrderStatus,
  OrderRefCode,
  NominationKey,
  NominationStatus,
  NominationSource,
  NominationTerminal,
  NominationNumber,
} from './fields';

const SearchForm = ({onSearch, fields}) => {
  const [orderSupplier, setOrderSupplier] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    Modal.destroyAll();
    onSearch(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}}>
      {fields?.shls_trip_no && <Trip />}
      {fields?.mlitm_id && <MovementID />}
      {fields?.load_id && <LoadID />}
      {fields?.trsa_id && <TrsaID />}
      {fields?.supplier_code && <Supplier />}
      {fields?.trip_status && <TripStatus />}
      {fields?.mlitm_status && <MovementStatus />}
      {fields?.tnkr_code && <Tanker />}
      {fields?.order_cust_no && <OrderNumber />}
      {fields?.order_supp_code && <OrderSupplier onChange={setOrderSupplier} />}
      {fields?.order_cust_acnt && <OrderCustomer supplier={orderSupplier} />}
      {fields?.order_stat_id && <OrderStatus />}
      {fields?.order_ref_code && <OrderRefCode />}
      {fields?.mv_key && <NominationKey />}
      {fields?.mv_status && <NominationStatus />}
      {fields?.mv_srctype && <NominationSource />}
      {fields?.mv_terminal && <NominationTerminal />}
      {fields?.mv_number && <NominationNumber />}
      
      <DateRange form={form}/>
      
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
          icon={<CheckOutlined />}
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
    fields,
  ) => {
  Modal.info({
    className: 'form-container',
    // title: t('operations.fields'),
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
      <SearchForm onSearch={onSearch} fields={fields} />
    </SWRConfig>
    ),
    okButtonProps: {
    style: { display: 'none' },
    },
  });

  return null;
};


export default WindowSearch;
  