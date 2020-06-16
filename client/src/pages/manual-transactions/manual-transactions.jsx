import React, { useEffect, useState } from 'react';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Modal, notification, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Page } from '../../components';
import auth from '../../auth';

import DrawerProductTransfers from './drawer-product-transfer';
import Forms from './forms';
import { SETTINGS } from '../../constants';
import { MANUAL_TRANSACTIONS } from '../../api';

const { confirm } = Modal;

const ManualTransactions = ({popup, params}) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  // SCHEDULE: doing manual transaction with Load Schedule
  // OPENORDER: doing manual transaction with Open Order
  const [sourceType, setSourceType] = useState(params?.trans_type);
  // BY_PRODUCT: doing manual transaction with Pre-Order
  // BY_COMPARTMENT: doing manual transaction with Pre-Schedule
  const [loadType, setLoadType] = useState(undefined);
  // Store the trip number or open order number
  const [loadNumber, setLoadNumber] = useState(undefined);

  const [trips, setTrips] = useState(null);
  const [tankers, setTankers] = useState(null);
  const [orders, setOrders] = useState(null);

  const [customers, setCustomers] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(params?.supplier);
  const [selectedCustomer, setSelectedCustomer] = useState(params?.customer);
  const [selectedTrip, setSelectedTrip] = useState(params?.trip_no);
  const [selectedOrder, setSelectedOrder] = useState(params?.order_cust_no);
  const [selectedTanker, setSelectedTanker] = useState(null);

  const resetFormData = () => {
    setLoadType(null);
    setLoadNumber(null);
    setTrips(null);
    setTankers(null);
    setOrders(null);
    setCustomers(null);
    setSelectedSupplier(null);
    setSelectedCustomer(null);
    setSelectedTrip(null);
    setSelectedOrder(null);
    setSelectedTanker(null);
    form.setFieldsValue({transfers:[], base_transfers:[], base_totals:[], meter_totals:[]});
  };

  const preparePayload = (values) => {
    const payload = {};

    payload.supplier = values?.supplier;
    if (sourceType === 'SCHEDULE') {
      payload.trip_no = values?.trip_no;
    }
    else {
      payload.order_cust_no = values?.order_no;
    }
    payload.tanker = values?.tanker;
    payload.start_time = values?.start_date?.format(SETTINGS.DATE_TIME_FORMAT);
    payload.end_time = values?.end_date?.format(SETTINGS.DATE_TIME_FORMAT);
    payload.load_security = values?.load_security;
    payload.seal_range = values?.seal_range;

    let tidx = 0;
    let midx = 0;
    let bidx = 0;
    payload.transfers = [];
    for (tidx=0; tidx<values?.transfers?.length; tidx++) {
      const titem = values?.transfers?.[tidx];

      if (titem.trsf_arm_cd === t('placeholder.selectArmCode')) {
        continue;
      }

      const transfer = {};
      transfer.nr_in_tkr = titem.trsf_cmpt_no;
      transfer.arm_code = titem.trsf_arm_cd;
      transfer.drawer_code = titem.trsf_drwr_cd;
      transfer.product_code = titem.trsf_prod_code;
      transfer.dens = titem.trsf_density;
      transfer.temperature = titem.trsf_temp;
      transfer.amb_vol = titem.trsf_qty_amb;
      transfer.cor_vol = titem.trsf_qty_cor;
      transfer.liq_kg = titem.trsf_load_kg;

      transfer.meters = [];
      for (midx=0; midx<values?.meter_totals?.length; midx++) {
        const mitem = values?.meter_totals?.[midx];
        if (titem.trsf_cmpt_no === mitem.trsf_cmpt_no) {
          const meter = {};
          meter.open_amb = mitem.trsf_mtr_opn_amb;
          meter.open_cor = mitem.trsf_mtr_opn_cor;
          meter.open_kg = mitem.trsf_mtr_open_kg;
          meter.close_amb = mitem.trsf_mtr_cls_amb;
          meter.close_cor = mitem.trsf_mtr_cls_cor;
          meter.close_kg = mitem.trsf_mtr_close_kg;
          meter.injector_or_meter = mitem.injector_or_meter;
          meter.meter_injector_code = mitem.trsf_mtr_cd;
          transfer.meters.push(meter);
        }
      }

      transfer.bases = [];
      for (bidx=0; bidx<values?.base_transfers?.length; bidx++) {
        const bitem = values?.base_transfers?.[bidx];
        if (titem.trsf_cmpt_no === bitem.trsf_bs_cmpt_no) {
          const base = {};
          base.tank_code = bitem.trsf_bs_tk_cd;
          base.base_code = bitem.trsf_bs_prodcd;
          base.base_class = bitem.trsf_bs_prodcls;
          base.dens = bitem.trsf_bs_den;
          base.temperature = bitem.trsf_bs_temp;
          base.amb_vol = bitem.trsf_bs_qty_amb;
          base.cor_vol = bitem.trsf_bs_qty_cor;
          base.liq_kg = bitem.trsf_bs_load_kg;
          transfer.bases.push(base);
        }
      }

      payload.transfers.push(transfer);
    }

    /* if (sourceType === 'OPENORDER') {
      payload.seals = [];
      payload.seals.push({
        seal_nr: '',
        cmpt_nr: 1,
        seal_prefix: 'pre',
        seal_suffix: 'suffix'
      });
    } */
    /* "seals" : [
      {
          "seal_nr": "123",
          "cmpt_nr": 1,
          "seal_prefix": "pre",
          "seal_suffix": "suffix"
      }
    ] */

    return payload;
  };

  const onSubmit = () => {
    Modal.confirm({
      title: t('prompts.submit'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        try {
          const values = await form.validateFields();
          console.log('await values', values);
          await axios
            .post(MANUAL_TRANSACTIONS.SUBMIT, preparePayload(values))
            .then(
              axios.spread((response) => {
                setSourceType(null);
                resetFormData();
        
                notification.success({
                  message: t('messages.submitSuccess'),
                  description: t('descriptions.submitSuccess'),
                });
              })
            )
            .catch((error) => {
              notification.error({
                message: error.message,
                description: t('descriptions.submitFailed'),
              });
            });
        } catch (error) {
          message.error({
            key: 'submit',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
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

        setSourceType(null);
        resetFormData();
      },
    });
  };

  useEffect(() => {
    console.log("MT entry page sourceType", sourceType);
    resetFormData();
  }, [sourceType]);

  useEffect(() => {
    if (params && popup) {
      /* form.setFieldsValue({
        source_type: params?.trans_type,
        supplier: params?.supplier,
        customer: params?.customer,
        order_no: params?.order_cust_no,
        trip_no: params?.trip_no,
      }); */
      setSourceType(params?.trans_type);
      setSelectedSupplier(params?.supplier);
      setSelectedCustomer(params?.customer);
      setSelectedOrder(params?.order_cust_no);
      setSelectedTrip(params?.trip_no);
    }
  }, [popup, params]);

  const modifiers = (
    <>
      <Button type="danger" icon={<DeleteOutlined />} onClick={onReset}>
        {t('operations.clear')}
      </Button>

      <Button type="primary" icon={<PlusOutlined />} onClick={onSubmit}>
        {t('operations.submit')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.manualTransactions')}
      modifiers={modifiers}
      standalone={popup}
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Forms
          form={form}
          sourceType={sourceType}
          setSourceType={setSourceType}
          loadType={loadType}
          setLoadType={setLoadType}
          loadNumber={loadNumber}
          setLoadNumber={setLoadNumber}
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
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          setSelectedTrip={setSelectedTrip}
          setSelectedOrder={setSelectedOrder}
          setSelectedTanker={setSelectedTanker}
        />

        <DrawerProductTransfers 
          form={form} 
          sourceType={sourceType} 
          loadType={loadType} 
          loadNumber={loadNumber} 
          supplier={selectedSupplier} 
          trip={selectedTrip} 
          order={selectedOrder} 
          tanker={selectedTanker}
        />
      </Form>
    </Page>
  );
};

//export default auth(ManualTransactions);
export default ManualTransactions;
