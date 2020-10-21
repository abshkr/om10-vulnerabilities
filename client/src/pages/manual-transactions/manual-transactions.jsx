import React, { useEffect, useState } from 'react';
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Form, Modal, notification, message, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { Page } from '../../components';

import DataManager from './data-manager';
import DataColumns from './data-manager/columns';
import DrawerProductTransfers from './drawer-product-transfer';
import Forms from './forms';
import api, { MANUAL_TRANSACTIONS } from '../../api';
import useAuth from 'hooks/use-auth';
import useConfig from 'hooks/use-config';
import { SETTINGS } from '../../constants';

import { buildPayloadToSubmit, buildPayloadToLoad, buildPayloadToSave } from './data-builder';

const { confirm } = Modal;

const ManualTransactions = ({ popup, params }) => {
  const config = useConfig();
  //console.log("params", params);
  const { t } = useTranslation();
  const access = useAuth('M_MANUALTRANSACTIONS');
  const [form] = Form.useForm();

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const [dataLoaded, setDataLoaded] = useState(null);
  const [dataSaved, setDataSaved] = useState(null);
  const [dataBoard, setDataBoard] = useState({});
  const [dataDrawTransfers, setDataDrawTransfers] = useState([]);
  const [dataBaseTransfers, setDataBaseTransfers] = useState([]);
  const [dataBaseTotals, setDataBaseTotals] = useState([]);
  const [dataMeterTransfers, setDataMeterTransfers] = useState([]);
  const [dataMeterTotals, setDataMeterTotals] = useState([]);
  const [drawerChanges, setDrawerChanges] = useState([]);

  const [repost, setRepost] = useState(false);
  // SCHEDULE: doing manual transaction with Load Schedule
  // OPENORDER: doing manual transaction with Open Order
  const [sourceType, setSourceType] = useState(undefined);
  // BY_PRODUCT: doing manual transaction with Pre-Order
  // BY_COMPARTMENT: doing manual transaction with Pre-Schedule
  const [loadType, setLoadType] = useState(undefined);
  // Store the trip number or open order number
  const [loadNumber, setLoadNumber] = useState(undefined);
  // store the information of source for manual transaction
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTanker, setSelectedTanker] = useState(null);

  const [trips, setTrips] = useState(null);
  const [tankers, setTankers] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [orderSeals, setOrderSeals] = useState([]);
  const [productArms, setProductArms] = useState(undefined);

  const [isFormLoading, setFormLoading] = useState(false);


  const resetFormGrids = () => {
    setDataDrawTransfers([]);
    setDataBaseTransfers([]);
    setDataBaseTotals([]);
    setDataMeterTransfers([]);
    setDataMeterTotals([]);
  };

  const resetLoadData = () => {
    setDataLoaded(null);
  };

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

    form.setFieldsValue({
      supplier: undefined,
      trip_no: undefined,
      tanker: undefined,
      carrier: undefined,
      driver: undefined,
      customer: undefined,
      order_no: undefined,
      user_comments: '',
      seal_range: '',
      load_security: '',
      mt_mngr_oo: '',
      mt_cust_code: '',
      mt_delv_loc: '',
      mt_delv_num: '',
      // source_type: undefined,
    });
    // resetFormGrids();
    // resetLoadData();
  };

  const preparePayloadToSubmit = (values) => {
    const serverCurrent = moment(config.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (values?.start_date === null || values?.start_date === undefined) {
      values.start_date = serverCurrent;
    }
    if (values?.end_date === null || values?.end_date === undefined) {
      values.end_date = serverCurrent;
    }

    const payload = buildPayloadToSubmit(values, sourceType, orderSeals, t);
    return payload;
  };

  const onItemValidation = (items) => {
    const errors = [];

    _.forEach(drawerChanges, (o) => {errors.push(o);});

    // check the start and end date
    const start_date = form.getFieldValue('start_date');
    const end_date = form.getFieldValue('end_date');
    if (start_date === null || start_date === undefined) {
      errors.push({
        field: `${t('fields.mtDataStartTime')}`,
        message: `${t('descriptions.blankDateFillWithServerTime')}`,
        key: `${'start_date'}`,
        line: 0,
      });
    }
    if (end_date === null || end_date === undefined) {
      errors.push({
        field: `${t('fields.mtDataEndTime')}`,
        message: `${t('descriptions.blankDateFillWithServerTime')}`,
        key: `${'end_date'}`,
        line: 0,
      });
    }


    for (let tidx = 0; tidx < items?.length; tidx++) {
      const item = items?.[tidx];
      if (item.trsf_arm_cd === t('placeholder.selectArmCode') || 
        item.trsf_arm_cd === t('placeholder.noArmAvailable') ||
        item.trsf_prod_name === t('placeholder.selectDrawerProduct')
      ) {
        continue;
      }

      // The density must be filled
      if (!item.trsf_density || String(item.trsf_density).trim()==='') {
        errors.push({
          field: `${t('fields.density')} (${t('units.kg/m3')})`,
          message: `${t('descriptions.requiredAndCannotBeZeroCmptField')}${item.trsf_cmpt_no}`,
          key: `${'trsf_density'}${item.trsf_cmpt_no}`,
          line: item.trsf_cmpt_no,
        });
      }

      // The temperature must be filled and can be zero
      if ((item.trsf_temp!==0 && !item.trsf_temp) || String(item.trsf_temp).trim()==='') {
        errors.push({
          field: `${t('fields.temperature')} (${t('units.degC')})`,
          message: `${t('descriptions.requiredCmptField')}${item.trsf_cmpt_no}`,
          key: `${'trsf_temp'}${item.trsf_cmpt_no}`,
          line: item.trsf_cmpt_no,
        });
      }

      // console.log('...................onItemValidation.....', item);
      // check the planned qty and loaded qty
      const plan_qty = _.round(_.toNumber(item.trsf_qty_plan), 0);
      const load_qty = _.round(_.toNumber(item.trsf_qty_left), 0);
      if (plan_qty > 0 && load_qty > 0 && plan_qty === load_qty) {
        errors.push({
          field: `${t('fields.drawerProduct')} (${t('fields.compartment')} ${item.trsf_cmpt_no})`,
          message: `${t('prompts.productFullyLoaded')} [${t('fields.scheduled')}: ${plan_qty}, ${t('fields.loaded')}: ${load_qty}]`,
          key: `${'trsf_prod_name'}${item.trsf_cmpt_no}`,
          line: item.trsf_cmpt_no,
        });
      }

      // The observed quantity must be filled and cannot be zero
      if (!item.trsf_qty_amb || String(item.trsf_qty_amb).trim()==='') {
        errors.push({
          field: `${t('fields.observedQuantity')} (${t('units.ltr')})`,
          message: `${t('descriptions.requiredAndCannotBeZeroCmptField')}${item.trsf_cmpt_no}`,
          key: `${'trsf_qty_amb'}${item.trsf_cmpt_no}`,
          line: item.trsf_cmpt_no,
        });
      } else {
        // Compare the observed quantity with scheduled quantity or compartment capacity
        if (sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT') {
          // Compare with scheduled quantity for Pre-Schedule
          if ( _.round(_.toNumber(item.trsf_qty_amb), 0) > _.round((_.toNumber(item.trsf_qty_plan) - _.toNumber(item.trsf_qty_left)), 0) ) {
            errors.push({
              field: `${t('fields.observedQuantity')} (${t('units.ltr')})`,
              message: `${t('fields.compartment')} ${item.trsf_cmpt_no}: ${t('fields.observedQuantity')} ${_.round(_.toNumber(item.trsf_qty_amb), 0)} > ${t('fields.scheduled')} ${_.round((_.toNumber(item.trsf_qty_plan) - _.toNumber(item.trsf_qty_left)), 0)}`,
              key: `${'trsf_qty_amb'}${item.trsf_cmpt_no}`,
              line: item.trsf_cmpt_no,
            });
          }
        }
        if (sourceType === 'OPENORDER' || (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT')) {
          // Compare with planned quantity and compartment capacity for Pre-Order and Open Order
          if ( _.round(_.toNumber(item.trsf_qty_amb), 0) > _.round((_.toNumber(item.trsf_qty_plan) - _.toNumber(item.trsf_qty_left)), 0) ) {
            errors.push({
              field: `${t('fields.observedQuantity')} (${t('units.ltr')})`,
              message: `${t('fields.compartment')} ${item.trsf_cmpt_no}: ${t('fields.observedQuantity')} ${_.round(_.toNumber(item.trsf_qty_amb), 0)} > ${t('fields.planned')} ${_.round((_.toNumber(item.trsf_qty_plan) - _.toNumber(item.trsf_qty_left)), 0)}`,
              key: `${'trsf_qty_amb'}${item.trsf_cmpt_no}`,
              line: item.trsf_cmpt_no,
            });
          } else {
            if ( _.round(_.toNumber(item.trsf_qty_amb), 0) > _.round(_.toNumber(item.trsf_cmpt_capacit), 0) ) {
              errors.push({
                field: `${t('fields.observedQuantity')} (${t('units.ltr')})`,
                message: `${t('fields.compartment')} ${item.trsf_cmpt_no}: ${t('fields.observedQuantity')} ${_.round(_.toNumber(item.trsf_qty_amb), 0)} > ${t('fields.capacity')} ${_.round(_.toNumber(item.trsf_cmpt_capacit), 0)}`,
                key: `${'trsf_qty_amb'}${item.trsf_cmpt_no}`,
                line: item.trsf_cmpt_no,
              });
            }
          }
        }
      }

      // The standard quantity must be filled and cannot be zero
      if (!item.trsf_qty_cor || String(item.trsf_qty_cor).trim()==='') {
        errors.push({
          field: `${t('fields.standardQuantity')} (${t('units.ltr')})`,
          message: `${t('descriptions.requiredAndCannotBeZeroCmptField')}${item.trsf_cmpt_no}`,
          key: `${'trsf_qty_cor'}${item.trsf_cmpt_no}`,
          line: item.trsf_cmpt_no,
        });
      }

      // The mass quantity must be filled and cannot be zero
      if (!item.trsf_load_kg || String(item.trsf_load_kg).trim()==='') {
        errors.push({
          field: `${t('fields.massQuantity')} (${t('units.kg')})`,
          message: `${t('descriptions.requiredAndCannotBeZeroCmptField')}${item.trsf_cmpt_no}`,
          key: `${'trsf_load_kg'}${item.trsf_cmpt_no}`,
          line: item.trsf_cmpt_no,
        });
      }
    };

    /* if (errors.length > 0) {
      const lines = (
        <>
        {errors?.map((error, index) => (
          <Card size="small" title={error.field}>
            {error.message}
          </Card>
        ))}      
        </>
      );

      notification.error({
        message: t('validate.lineItemValidation'),
        description: lines,
        // duration: 0,
        placement: 'topLeft',
        style: {
          width: 600,
          height: '500px',
          overflowY: 'scroll',
        },
      });
    } */

    return errors;
  };

  const onSubmit = () => {
    // check to see if all compartments have blank quantities
    const dptrsf = form.getFieldValue('transfers');
    // console.log('---------------onSubmit0', dptrsf);
    let found = false;
    for (let tidx = 0; tidx < dptrsf.length; tidx++) {
      const titem = dptrsf?.[tidx];
      // console.log('---------------onSubmit', titem.trsf_density, titem.trsf_temp, titem.trsf_qty_amb, titem.trsf_qty_cor, titem.trsf_load_kg);
      if (titem.trsf_density && (titem.trsf_temp===0 || titem.trsf_temp) && titem.trsf_qty_amb && titem.trsf_qty_cor && titem.trsf_load_kg) {
        found = true;
        break;
      }
    }
    let errors = [];
    let lines = null;
    if (found === false) {
      notification.warning({
        message: t('messages.submitFailed'),
        description: t('descriptions.noTransferDetails'),
      });
      return;
    } else {
      errors = onItemValidation(dptrsf);
      if (errors.length > 0) {
        lines = (
          <Scrollbars
            style={{
              height: '300px',
              width: '25vw',
              marginTop: 15,
              padding: 5,
              marginBottom: 15,
            }}
          >
            <>
            {errors?.map((error, index) => (
              <Card size="small" title={error.field}>
                {error.message}
              </Card>
            ))}
            </>
          </Scrollbars>
        );
        //return;
      }
    }

    let submitPrompt = t('prompts.submit');
    if (errors.length>0) {
      submitPrompt += ' (' + String(errors.length) + ' ' + t('validate.warnings') + ')';
    }

    Modal.confirm({
      title: submitPrompt,
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      width: '30vw',
      content: lines,
      onOk: async () => {
        setDrawerChanges([]);
        try {
          const values = await form.validateFields();
          // console.log('MTmain: onSubmit - await values', values);
          await api
            .post(MANUAL_TRANSACTIONS.SUBMIT, preparePayloadToSubmit(values))
            .then((response) => {
              form.resetFields();

              resetLoadData();
              setSourceType(null);
              resetFormData();
              // resetFormGrids();

              if (sourceType === 'SCHEDULE' && params) {
                !!params?.onComplete && params.onComplete({
                  supplier_code: params?.supplier,
                  shls_trip_no: params?.trip_no,
                });
              }

              if (sourceType === 'OPENORDER' && params) {
                !!params?.onComplete && params.onComplete(params?.order_cust_no);
              }

              notification.success({
                message: t('messages.submitSuccess'),
                description: t('descriptions.submitSuccess'),
              });
            })
            
            .catch((errors) => {
              _.forEach(errors?.response?.data?.errors, (error) => {
                notification.error({
                  message: error.type,
                  description: error.message,
                });
              });
            });
        } catch (error) {
          // console.log('................MT submit validation error:', error);
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
      title:  t('prompts.reset'),
      icon: <ExclamationCircleOutlined />,
      okText: t('operations.reset'),
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: async () => {
        await form.resetFields();

        resetLoadData();
        setSourceType(null);
        resetFormData();
        // resetFormGrids();
      },
    });
  };

  const prepareValuesToLoad = (payload) => {
    const values = buildPayloadToLoad(payload, setRepost, t);
    return values;
  };

  const loadMTData = (value) => {
    api
      .get(MANUAL_TRANSACTIONS.READ_MT_DATA, {
        params: {
          seq_id: value?.mt_id,
        },
      })
      .then((res) => {
        resetLoadData();
        setSourceType(null);
        resetFormData();
        // resetFormGrids();

        // console.log('MTmain: loadMTData', res.data?.records);
        const record = res.data?.records?.[0];
        if (record.gud_head_data !== '' && record.gud_head_data !== null && record.gud_head_data !== false) {
          record.gud_head_data = JSON.parse(_.replace(record.gud_head_data, '{}', '""'));
        }
        if (record.gud_body_data !== '' && record.gud_body_data !== null && record.gud_body_data !== false) {
          record.gud_body_data = JSON.parse(_.replace(record.gud_body_data, '{}', '""'));
        }

        //setDataLoaded(record);
        // console.log('MTmain: loadMTData - DataLoaded', record);

        const values = prepareValuesToLoad(record);
        // console.log('MTmain: loadMTData - prepareValuesToLoad', values);

        setDataLoaded(values);
    
        // setDataDrawTransfers(values?.transfers);
        // setDataBaseTransfers(values?.base_transfers);
        // setDataBaseTotals(values?.base_totals);
        // setDataMeterTransfers(values?.meter_transfers);
        // setDataMeterTotals(values?.meter_totals);

        // console.log('MTmain: loadMTData - start to set form fields by loading data!');
      });
  };

  const onLoad = () => {
    DataManager(
      t('fields.mtDataTitle'), 
      DataColumns(t), 
      null, 
      loadMTData, 
      {popup: popup, type: sourceType, supplier: selectedSupplier, trip: selectedTrip, order: selectedOrder},
      '80vw', 
      '40vh'
    );
  };

  const preparePayloadToSave = (values, save_format) => {
    const payload = buildPayloadToSave(values, customers, sourceType, repost, user_code, save_format, t);
    setDataSaved(payload);
    return payload;
  };

  const onSave = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      /* content: (
        <Form form={form} initialValues={{ save_format: 'JSON' }}>
          <Form.Item name="save_format">
            <Radio.Group style={{ width: '30vw', marginBottom: 10, marginTop: 10 }}>
              <Radio value="JSON">JSON</Radio>
              <Radio value="XML" disabled={true}>XML</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ), */
      onOk: async () => {
        try {
          // const save_format = form.getFieldValue('save_format');
          const save_format = 'JSON';
          const values = await form.validateFields();
          // console.log('MTmain: onSave - await values', values);
          // console.log('MTmain: onSave - data board', dataBoard);
          await api
            .post(MANUAL_TRANSACTIONS.SAVE_MT_DATA, preparePayloadToSave(values, save_format))
            .then((response) => {
              // setSourceType(null);
              // resetFormData();

              notification.success({
                message: t('messages.saveSuccess'),
                description: t('descriptions.saveSuccess'),
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
        } catch (error) {
          message.error({
            key: 'save',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  useEffect(() => {
    // console.log('MTmain: sourceType changed.', sourceType);
    resetFormData();
  }, [sourceType]);

  useEffect(() => {
    if (params && popup && !repost) {
      setRepost(params?.repost);
    }
  }, [popup, params, repost]);

  useEffect(() => {
    if (params && popup && !dataLoaded) {
      setDataLoaded(params);
    }
  }, [popup, params]);

  const modifiers = (
    <>
      <Button type="primary" icon={<SyncOutlined />} onClick={onLoad} disabled={!access.canCreate/* || popup*/}>
        {t('operations.load')}
      </Button>

      <Button type="primary" icon={<SaveOutlined />} onClick={onSave} disabled={!access.canCreate}>
        {t('operations.save')}
      </Button>

      <Button type="danger" icon={<DeleteOutlined />} onClick={onReset}>
        {t('operations.clear')}
      </Button>

      <Button type="primary" icon={<PlusOutlined />} onClick={onSubmit} disabled={!access.canCreate}>
        {t('operations.submit')}
      </Button>
    </>
  );

  return (
    <Spin spinning={isFormLoading}>
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.manualTransactions')}
      modifiers={modifiers}
      standalone={popup}
      access={access}
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
          selectedTrip={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          selectedTanker={selectedTanker}
          setSelectedTanker={setSelectedTanker}
          params={dataLoaded}
          popup={popup}
          setOrderSeals={setOrderSeals}
          setProductArms={setProductArms}
          resetFormGrids={resetFormGrids}
          setFormLoading={setFormLoading}
          config={config}
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
          repost={repost}
          dataBoard={dataBoard}
          setDataBoard={setDataBoard}
          payload={dataDrawTransfers}
          setPayload={setDataDrawTransfers}
          dataBaseTransfers={dataBaseTransfers}
          setDataBaseTransfers={setDataBaseTransfers}
          dataBaseTotals={dataBaseTotals}
          setDataBaseTotals={setDataBaseTotals}
          dataMeterTransfers={dataMeterTransfers}
          setDataMeterTransfers={setDataMeterTransfers}
          dataMeterTotals={dataMeterTotals}
          setDataMeterTotals={setDataMeterTotals}
          dataLoaded={dataLoaded}
          setDataLoaded={setDataLoaded}
          productArms={productArms}
          setProductArms={setProductArms}
          drawerChanges={drawerChanges}
          setDrawerChanges={setDrawerChanges}
        />
      </Form>
    </Page>
    </Spin>
  );
};

//export default auth(ManualTransactions);
export default ManualTransactions;
