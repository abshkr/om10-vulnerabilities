import React, { useEffect, useState } from 'react';
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Form, Modal, notification, message } from 'antd';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import { Page } from '../../components';

import DataManager from './data-manager';
import DataColumns from './data-manager/columns';
import DrawerProductTransfers from './drawer-product-transfer';
import Forms from './forms';
import api, { MANUAL_TRANSACTIONS } from '../../api';
import useAuth from 'hooks/use-auth';

import { buildPayloadToSubmit, buildPayloadToLoad, buildPayloadToSave } from './data-builder';

const { confirm } = Modal;

const ManualTransactions = ({ popup, params }) => {
  //console.log("params", params);
  const { t } = useTranslation();
  const access = useAuth('M_MANUALTRANSACTIONS');
  const [form] = Form.useForm();

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const [dataLoaded, setDataLoaded] = useState(null);
  // dataLoadFlagXYZ values:
  // 0: no data loading from database, manual operations by user 
  // 1: start data loading
  // 2: data loading is done
  // 3: data loading idle
  const [dataLoadFlagForm, setDataLoadFlagForm] = useState(0);
  const [dataLoadFlagDrawTransfers, setDataLoadFlagDrawTransfers] = useState(0);
  const [dataLoadFlagBaseTransfers, setDataLoadFlagBaseTransfers] = useState(0);
  const [dataLoadFlagBaseTotals, setDataLoadFlagBaseTotals] = useState(0);
  const [dataLoadFlagMeterTransfers, setDataLoadFlagMeterTransfers] = useState(0);
  const [dataLoadFlagMeterTotals, setDataLoadFlagMeterTotals] = useState(0);
  const [dataSaved, setDataSaved] = useState(null);
  const [dataBoard, setDataBoard] = useState({});
  const [dataDrawTransfers, setDataDrawTransfers] = useState([]);
  const [dataBaseTransfers, setDataBaseTransfers] = useState([]);
  const [dataBaseTotals, setDataBaseTotals] = useState([]);
  const [dataMeterTransfers, setDataMeterTransfers] = useState([]);
  const [dataMeterTotals, setDataMeterTotals] = useState([]);

  const [repost, setRepost] = useState(false);
  // SCHEDULE: doing manual transaction with Load Schedule
  // OPENORDER: doing manual transaction with Open Order
  const [sourceType, setSourceType] = useState(undefined);
  // BY_PRODUCT: doing manual transaction with Pre-Order
  // BY_COMPARTMENT: doing manual transaction with Pre-Schedule
  const [loadType, setLoadType] = useState(undefined);
  // Store the trip number or open order number
  const [loadNumber, setLoadNumber] = useState(undefined);

  const [trips, setTrips] = useState(null);
  const [tankers, setTankers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [productArms, setProductArms] = useState(undefined);

  const [customers, setCustomers] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTanker, setSelectedTanker] = useState(null);

  const [orderSeals, setOrderSeals] = useState([]);

  const resetFormGrids = () => {
    setDataDrawTransfers([]);
    setDataBaseTransfers([]);
    setDataBaseTotals([]);
    setDataMeterTransfers([]);
    setDataMeterTotals([]);
  };

  const resetLoadData = () => {
    setDataLoaded(null);
    setDataLoadFlagForm(0);
    setDataLoadFlagDrawTransfers(0);
    setDataLoadFlagBaseTransfers(0);
    setDataLoadFlagBaseTotals(0);
    setDataLoadFlagMeterTransfers(0);
    setDataLoadFlagMeterTotals(0);
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
    // resetFormGrids();
    // resetLoadData();
  };

  const preparePayloadToSubmit = (values) => {
    const payload = buildPayloadToSubmit(values, sourceType, orderSeals, t);
    return payload;
  };

  const onSubmit = () => {
    // check to see if all compartments have blank quantities
    const dptrsf = form.getFieldsValue(['transfers']);
    let found = false;
    for (let tidx = 0; tidx < dptrsf.length; tidx++) {
      const titem = dptrsf?.[tidx];
      if (titem.trsf_density && titem.trsf_temp && titem.trsf_qty_amb && titem.trsf_qty_cor && titem.trsf_load_kg) {
        found = true;
        break;
      }
    }
    if (found === false) {
      notification.warning({
        message: t('messages.submitFailed'),
        description: t('descriptions.noTransferDetails'),
      });
      return;
    }

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
          console.log('MTmain: onSubmit - await values', values);
          await api
            .post(MANUAL_TRANSACTIONS.SUBMIT, preparePayloadToSubmit(values))
            .then((response) => {
              setSourceType(null);
              resetFormData();
              // resetFormGrids();
              resetLoadData();

              if (sourceType === 'SCHEDULE') {
                !!params.onComplete && params.onComplete({
                  supplier_code: params?.supplier,
                  shls_trip_no: params?.trip_no,
                });
              }

              if (sourceType === 'OPENORDER') {
                !!params.onComplete && params.onComplete(params?.order_cust_no);
              }

              notification.success({
                message: t('messages.submitSuccess'),
                description: t('descriptions.submitSuccess'),
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
        // resetFormGrids();
        resetLoadData();
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
        setSourceType(null);
        resetFormData();
        // resetFormGrids();
        // resetLoadData();

        console.log('MTmain: loadMTData', res.data?.records);
        const record = res.data?.records?.[0];
        if (record.gud_head_data !== '' && record.gud_head_data !== null && record.gud_head_data !== false) {
          record.gud_head_data = JSON.parse(_.replace(record.gud_head_data, '{}', '""'));
        }
        if (record.gud_body_data !== '' && record.gud_body_data !== null && record.gud_body_data !== false) {
          record.gud_body_data = JSON.parse(_.replace(record.gud_body_data, '{}', '""'));
        }

        //setDataLoaded(record);
        console.log('MTmain: loadMTData - DataLoaded', record);

        const values = prepareValuesToLoad(record);
        console.log('MTmain: loadMTData - prepareValuesToLoad', values);

        setDataLoaded(values);
        setDataLoadFlagForm(1);
        setDataLoadFlagDrawTransfers(0);
        setDataLoadFlagBaseTransfers(0);
        setDataLoadFlagBaseTotals(0);
        setDataLoadFlagMeterTransfers(0);
        setDataLoadFlagMeterTotals(0);
    
        // setDataDrawTransfers(values?.transfers);
        // setDataBaseTransfers(values?.base_transfers);
        // setDataBaseTotals(values?.base_totals);
        // setDataMeterTransfers(values?.meter_transfers);
        // setDataMeterTotals(values?.meter_totals);

        /* form.setFieldsValue({
        transfers: values?.transfers,
        base_transfers: values?.base_transfers,
        base_totals: values?.base_totals,
        meter_transfers: values?.meter_transfers,
        meter_totals: values?.meter_totals,
      }) */

        console.log('MTmain: loadMTData - start to set form fields by loading data!');
      });
  };

  const onLoad = () => {
    DataManager(t('fields.mtDataTitle'), DataColumns(t), null, loadMTData, '80vw', '40vh');
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
          console.log('MTmain: onSave - await values', values);
          console.log('MTmain: onSave - data board', dataBoard);
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
    console.log('MTmain: sourceType changed.', sourceType);
    resetFormData();
  }, [sourceType]);

  // following is the sequential data loading
  useEffect(() => {
    if (dataLoadFlagForm === 2) {
      console.log('MTmain: dataLoadFlagForm', dataLoadFlagForm);
      setDataLoadFlagForm(3);
      //setDataLoadFlagDrawTransfers(1);
      console.log('MT 1 - set form fields done! start to set Drawer Transfers', 
        dataLoadFlagForm, 
        dataLoadFlagDrawTransfers, 
        dataLoadFlagBaseTransfers, 
        dataLoadFlagBaseTotals, 
        dataLoadFlagMeterTransfers, 
        dataLoadFlagMeterTotals
      );
      setDataLoadFlagDrawTransfers(1);
      setDataLoadFlagBaseTransfers(1);
      setDataLoadFlagBaseTotals(1);
      setDataLoadFlagMeterTransfers(1);
      setDataLoadFlagMeterTotals(1);
  }
  }, [dataLoadFlagForm]);

  useEffect(() => {
    if (dataLoadFlagDrawTransfers === 2) {
      console.log('MTmain: dataLoadFlagDrawTransfers', dataLoadFlagDrawTransfers);
      setDataLoadFlagDrawTransfers(3);
      //setDataLoadFlagBaseTransfers(1);
      console.log('MT 2 - set Drawer Transfers done! start to set Base Transfers', 
        dataLoadFlagForm, 
        dataLoadFlagDrawTransfers, 
        dataLoadFlagBaseTransfers, 
        dataLoadFlagBaseTotals, 
        dataLoadFlagMeterTransfers, 
        dataLoadFlagMeterTotals
      );
      /* if (dataLoadFlagForm === 3 &&
        dataLoadFlagDrawTransfers === 3 &&
        dataLoadFlagBaseTransfers === 3 &&
        dataLoadFlagBaseTotals === 3 &&
        dataLoadFlagMeterTransfers === 3 &&
        dataLoadFlagMeterTotals === 3
      ) {
        resetLoadData();
      } */
    }
  }, [dataLoadFlagDrawTransfers]);

  useEffect(() => {
    if (dataLoadFlagBaseTransfers === 2) {
      console.log('MTmain: dataLoadFlagBaseTransfers', dataLoadFlagBaseTransfers);
      setDataLoadFlagBaseTransfers(3);
      //setDataLoadFlagBaseTotals(1);
      console.log('MT 3 - set Base Transfers done! start to set Base Totals', 
        dataLoadFlagForm, 
        dataLoadFlagDrawTransfers, 
        dataLoadFlagBaseTransfers, 
        dataLoadFlagBaseTotals, 
        dataLoadFlagMeterTransfers, 
        dataLoadFlagMeterTotals
      );
      /* if (dataLoadFlagForm === 3 &&
        dataLoadFlagDrawTransfers === 3 &&
        dataLoadFlagBaseTransfers === 3 &&
        dataLoadFlagBaseTotals === 3 &&
        dataLoadFlagMeterTransfers === 3 &&
        dataLoadFlagMeterTotals === 3
      ) {
        resetLoadData();
      } */
    }
  }, [dataLoadFlagBaseTransfers]);

  useEffect(() => {
    if (dataLoadFlagBaseTotals === 2) {
      console.log('MTmain: dataLoadFlagBaseTotals', dataLoadFlagBaseTotals);
      setDataLoadFlagBaseTotals(3);
      //setDataLoadFlagMeterTransfers(1);
      console.log('MT 4 - set Base Totals done! start to set Meter Transfers', 
        dataLoadFlagForm, 
        dataLoadFlagDrawTransfers, 
        dataLoadFlagBaseTransfers, 
        dataLoadFlagBaseTotals, 
        dataLoadFlagMeterTransfers, 
        dataLoadFlagMeterTotals
      );
      /* if (dataLoadFlagForm === 3 &&
        dataLoadFlagDrawTransfers === 3 &&
        dataLoadFlagBaseTransfers === 3 &&
        dataLoadFlagBaseTotals === 3 &&
        dataLoadFlagMeterTransfers === 3 &&
        dataLoadFlagMeterTotals === 3
      ) {
        resetLoadData();
      } */
    }
  }, [dataLoadFlagBaseTotals]);

  useEffect(() => {
    if (dataLoadFlagMeterTransfers === 2) {
      console.log('MTmain: dataLoadFlagMeterTransfers', dataLoadFlagMeterTransfers);
      setDataLoadFlagMeterTransfers(3);
      //setDataLoadFlagMeterTotals(1);
      console.log('MT 5 - set Meter Transfers done! start to set Meter Totals', 
        dataLoadFlagForm, 
        dataLoadFlagDrawTransfers, 
        dataLoadFlagBaseTransfers, 
        dataLoadFlagBaseTotals, 
        dataLoadFlagMeterTransfers, 
        dataLoadFlagMeterTotals
      );
      /* if (dataLoadFlagForm === 3 &&
        dataLoadFlagDrawTransfers === 3 &&
        dataLoadFlagBaseTransfers === 3 &&
        dataLoadFlagBaseTotals === 3 &&
        dataLoadFlagMeterTransfers === 3 &&
        dataLoadFlagMeterTotals === 3
      ) {
        resetLoadData();
      } */
    }
  }, [dataLoadFlagMeterTransfers]);

  useEffect(() => {
    if (dataLoadFlagMeterTotals === 2) {
      console.log('MTmain: dataLoadFlagMeterTotals', dataLoadFlagMeterTotals);
      setDataLoadFlagMeterTotals(3);
      console.log('MT 6 - set Meter Totals done! All data loaded! Clean the dataLoaded!', 
        dataLoadFlagForm, 
        dataLoadFlagDrawTransfers, 
        dataLoadFlagBaseTransfers, 
        dataLoadFlagBaseTotals, 
        dataLoadFlagMeterTransfers, 
        dataLoadFlagMeterTotals
      );
      /* if (dataLoadFlagForm === 3 &&
        dataLoadFlagDrawTransfers === 3 &&
        dataLoadFlagBaseTransfers === 3 &&
        dataLoadFlagBaseTotals === 3 &&
        dataLoadFlagMeterTransfers === 3 &&
        dataLoadFlagMeterTotals === 3
      ) {
        resetLoadData();
      } */
    }
  }, [dataLoadFlagMeterTotals]);

  useEffect(() => {
    console.log('MT 7 - All data loaded! Clean the dataLoaded!', 
      dataLoadFlagForm, 
      dataLoadFlagDrawTransfers, 
      dataLoadFlagBaseTransfers, 
      dataLoadFlagBaseTotals, 
      dataLoadFlagMeterTransfers, 
      dataLoadFlagMeterTotals
    );
    if (dataLoadFlagForm === 3 &&
      dataLoadFlagDrawTransfers === 3 &&
      dataLoadFlagBaseTransfers === 3 &&
      dataLoadFlagBaseTotals === 3 &&
      dataLoadFlagMeterTransfers === 3 &&
      dataLoadFlagMeterTotals === 3
    ) {
      notification.success({
        message: t('messages.loadSuccess'),
        description: t('descriptions.loadSuccess'),
      });
      // resetLoadData();
      /* setDataLoadFlagForm(0);
      setDataLoadFlagDrawTransfers(0);
      setDataLoadFlagBaseTransfers(0);
      setDataLoadFlagBaseTotals(0);
      setDataLoadFlagMeterTransfers(0);
      setDataLoadFlagMeterTotals(0); */
    }
  }, [dataLoadFlagForm, dataLoadFlagDrawTransfers, dataLoadFlagBaseTransfers, dataLoadFlagBaseTotals, dataLoadFlagMeterTransfers, dataLoadFlagMeterTotals]);

  /* // this may conflict with data retrieval
  useEffect(() => {
    console.log('MT selectedTrip, selectedOrder, selectedTanker', selectedTrip, selectedOrder, selectedTanker);
    resetFormGrids();
  }, [selectedTrip, selectedOrder, selectedTanker]); */

  useEffect(() => {
    if (params && popup && !repost) {
      setRepost(params?.repost);
    }
  }, [popup, params, repost]);

  /* useEffect(() => {
    if (params && popup) {
      form.setFieldsValue({
        source_type: params?.trans_type,
        supplier: params?.supplier,
        customer: params?.customer,
        order_no: params?.order_cust_no,
        trip_no: params?.trip_no,
      });
      setSourceType(params?.trans_type);
      setSelectedSupplier(params?.supplier);
      setSelectedCustomer(params?.customer);
      setSelectedOrder(params?.order_cust_no);
      setSelectedTrip(params?.trip_no);
    }
  }, [popup, params]); */

  const modifiers = (
    <>
      <Button type="primary" icon={<SyncOutlined />} onClick={onLoad} disabled={!access.canCreate || popup}>
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
          params={params}
          popup={popup}
          dataLoaded={dataLoaded}
          setOrderSeals={setOrderSeals}
          dataBoard={dataBoard}
          setDataBoard={setDataBoard}
          dataLoadFlag={dataLoadFlagForm}
          setDataLoadFlag={setDataLoadFlagForm}
          dataLoaded={dataLoaded}
          setDataLoaded={setDataLoaded}
          setProductArms={setProductArms}
          resetFormGrids={resetFormGrids}
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
          dataLoadFlagDrawTransfers={dataLoadFlagDrawTransfers}
          setDataLoadFlagDrawTransfers={setDataLoadFlagDrawTransfers}
          dataLoadFlagBaseTransfers={dataLoadFlagBaseTransfers}
          setDataLoadFlagBaseTransfers={setDataLoadFlagBaseTransfers}
          dataLoadFlagBaseTotals={dataLoadFlagBaseTotals}
          setDataLoadFlagBaseTotals={setDataLoadFlagBaseTotals}
          dataLoadFlagMeterTransfers={dataLoadFlagMeterTransfers}
          setDataLoadFlagMeterTransfers={setDataLoadFlagMeterTransfers}
          dataLoadFlagMeterTotals={dataLoadFlagMeterTotals}
          setDataLoadFlagMeterTotals={setDataLoadFlagMeterTotals}
          dataLoaded={dataLoaded}
          setDataLoaded={setDataLoaded}
          productArms={productArms}
          setProductArms={setProductArms}
        />
      </Form>
    </Page>
  );
};

//export default auth(ManualTransactions);
export default ManualTransactions;
