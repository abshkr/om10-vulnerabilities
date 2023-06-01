import React, { useState, useEffect } from 'react';
import { FileSearchOutlined, CloseOutlined, CheckOutlined, ClearOutlined } from '@ant-design/icons';
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
  TrsaStatus,
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
  EqptTitle,
  EqptOwner,
  EqptType,
  TnkrCode,
  TnkrName,
  TnkrCarrier,
  TnkrOwner,
  TnkrEtyp,
  TnkrFlags,
  BayList,
  PsnlCode,
  PsnlEmployer,
  PsnlName,
  PsnlRole,
  PsnlFlags,
  PickupModes,
} from './fields';

const SearchForm = ({ onSearch, fields, initValues, modal, rangeRequired, timeRequired }) => {
  const [orderSupplier, setOrderSupplier] = useState(null);
  const [specmvType, setSpecmvType] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [formValues, setFormValues] = useState(initValues);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { setFieldsValue } = form;

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
      if (timeRequired) {
        // time section is visible, and the actual time is used
        converted.start_date = !values?.start_date ? null : values.start_date;
        converted.end_date = !values?.end_date ? null : values.end_date;
      } else {
        // time section is hidden, and the time values are adjusted
        converted.start_date = !values?.start_date ? null : values.start_date.substr(0, 10) + ' 00:00:00';
        converted.end_date = !values?.end_date ? null : values.end_date.substr(0, 10) + ' 23:59:59';
      }
    }
    modal.destroy();
    onSearch(converted);
  };

  const onClear = () => {
    const clearValues = {};
    for (const property in formValues) {
      if (property !== 'time_option_type' && property !== 'time_option') {
        if (property === 'start_date' || property === 'end_date') {
          clearValues[property] = null;
        } else if (property === 'use_date_range') {
          clearValues[property] = false;
        } else {
          clearValues[property] = '';
        }
      }
    }
    setFormValues(clearValues);
    setFieldsValue(clearValues);
  };

  /* useEffect(() => {
    setFormValues(initValues);
  }, [initValues]);
 */
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      scrollToFirstError
      style={{ marginTop: '1rem' }}
      initialValues={formValues}
    >
      {fields?.trsa_status && <TrsaStatus />}
      {fields?.terminal && <Terminal />}
      {fields?.bay_code && <BayList />}
      {fields?.mv_key && <NominationKey />}
      {fields?.shls_trip_no && <Trip />}
      {fields?.supplier_code && <Supplier />}
      {fields?.shls_pickup_mode && <PickupModes />}
      {fields?.mlitm_prodcmpy && <PlantSupplier />}
      {fields?.mlitm_id && <MovementID />}
      {fields?.load_id && <LoadID />}
      {fields?.trsa_id && <TrsaID />}
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
      {fields?.eqpt_title && <EqptTitle />}
      {fields?.eqpt_owner && <EqptOwner />}
      {fields?.eqpt_etyp && <EqptType />}
      {fields?.tnkr_code_input && <TnkrCode />}
      {fields?.tnkr_name && <TnkrName />}
      {fields?.tnkr_carrier && <TnkrCarrier />}
      {fields?.tnkr_owner && <TnkrOwner />}
      {fields?.tnkr_etyp && <TnkrEtyp />}
      {fields?.tnkr_flags && <TnkrFlags />}
      {fields?.psnl_code_input && <PsnlCode />}
      {fields?.psnl_name && <PsnlName />}
      {fields?.psnl_employer && <PsnlEmployer />}
      {fields?.psnl_role && <PsnlRole />}
      {fields?.psnl_flags && <PsnlFlags />}

      {rangeRequired && (
        <DateRange
          form={form}
          timeOptionType={fields?.time_option_type}
          // force={fields?.journal_msg}
          useRange={formValues?.use_date_range}
          startDate={
            !formValues?.start_date || formValues?.start_date === '-1' ? null : formValues?.start_date
          }
          endDate={!formValues?.end_date || formValues?.end_date === '-1' ? null : formValues?.end_date}
          timeRequired={timeRequired}
        />
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
          icon={<ClearOutlined />}
          htmlType="button"
          style={{ float: 'right', marginRight: 5 }}
          onClick={() => onClear()}
        >
          {t('operations.clear')}
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

const WindowSearchForm = (
  onSearch,
  title,
  fields,
  values = [],
  rangeRequired = true,
  timeRequired = false
) => {
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
        <SearchForm
          onSearch={onSearch}
          fields={fields}
          initValues={values}
          modal={modal}
          rangeRequired={rangeRequired}
          timeRequired={timeRequired}
        />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default WindowSearchForm;
