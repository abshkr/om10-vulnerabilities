import React, { useState } from 'react';
import { FileSearchOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';
import { DatePicker } from 'antd';

// import { Calendar } from '../../components';

import { Form, Button, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  DateRange,
  Terminal,
  LoadID,
  Supplier,
  Carrier,
  TripStatus,
  Tanker,
  Trip,
  TrsaID,
  PlantSupplier,
  MovementID,
  MovementStatus,
  MovementType,
  MovementReason,
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
  JournalSearch,
  JournalEvent,
  JournalCategory,
  EqptId,
  EqptCode,
  EqptOwner,
  EqptType,
  TnkrCode,
  TnkrCarrier,
  TnkrOwner,
  TnkrEtyp,
  TnkrFlags,
} from './fields';

const SearchForm = ({ onSearch, fields, modal, rangeRequired }) => {
  const [orderSupplier, setOrderSupplier] = useState(null);
  const [specmvType, setSpecmvType] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let searchable = false;
    for (const property in values) {
      if (property != 'use_date_range' && property != 'start_date' && property != 'end_date') {
        if (values[property] != undefined) {
          searchable = true;
        }
      }
    }
    if (!searchable) {
      notification.error({
        description: t('descriptions.searchRequired'),
      });
      return;
    }

    const converted = { ...values };
    if (rangeRequired) {
      converted.start_date = values.start_date.substr(0, 10) + ' 00:00:00';
      converted.end_date = values.end_date.substr(0, 10) + ' 23:59:59';
    }
    modal.destroy();
    onSearch(converted);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      {fields?.terminal && <Terminal />}
      {fields?.mv_key && <NominationKey />}
      {fields?.shls_trip_no && <Trip />}
      {fields?.mlitm_prodcmpy && <PlantSupplier />}
      {fields?.mlitm_id && <MovementID />}
      {fields?.load_id && <LoadID />}
      {fields?.trsa_id && <TrsaID />}
      {fields?.supplier_code && <Supplier />}
      {fields?.carrier_code && <Carrier onChange={setCarrier} />}
      {fields?.tnkr_code && <Tanker carrier={carrier} />}
      {fields?.trip_status && <TripStatus />}
      {fields?.mlitm_status && <MovementStatus />}
      {fields?.mlitm_type && <MovementType onChange={setSpecmvType} />}
      {fields?.mlitm_reason_code && <MovementReason type={specmvType} />}
      {fields?.order_cust_no && <OrderNumber />}
      {fields?.order_supp_code && <OrderSupplier onChange={setOrderSupplier} />}
      {fields?.order_cust_acnt && <OrderCustomer supplier={orderSupplier} />}
      {fields?.order_stat_id && <OrderStatus />}
      {fields?.order_ref_code && <OrderRefCode />}
      {fields?.mv_status && <NominationStatus />}
      {fields?.mv_srctype && <NominationSource />}
      {fields?.mv_terminal && <NominationTerminal />}
      {fields?.mv_number && <NominationNumber />}
      {fields?.journal_msg && <JournalSearch />}
      {fields?.journal_event && <JournalEvent />}
      {fields?.journal_category && <JournalCategory />}
      {fields?.eqpt_id && <EqptId />}
      {fields?.eqpt_code && <EqptCode />}
      {fields?.eqpt_owner && <EqptOwner />}
      {fields?.eqpt_etyp && <EqptType />}
      {fields?.tnkr_code_input && <TnkrCode />}
      {fields?.tnkr_carrier && <TnkrCarrier />}
      {fields?.tnkr_owner && <TnkrOwner />}
      {fields?.tnkr_etyp && <TnkrEtyp />}
      {fields?.tnkr_flags && <TnkrFlags />}

      {rangeRequired && (
        <DateRange form={form} timeOption={fields?.time_option} force={fields?.journal_msg} />
      )}

      <div style={{ marginTop: '2rem' }}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => modal.destroy()}
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

const WindowSearch = (onSearch, title, fields, rangeRequired = true) => {
  const modal = Modal.info();
  modal.update({
    className: 'form-container',
    // title: t('operations.fields'),
    title: title ? title : 'Search',
    centered: true,
    width: '25vw',
    icon: <FileSearchOutlined />,
    content: (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher,
        }}
      >
        <SearchForm onSearch={onSearch} fields={fields} modal={modal} rangeRequired={rangeRequired} />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default WindowSearch;
