import React, { useEffect, useState, Fragment } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  PrinterOutlined,
  RedoOutlined,
  CloseOutlined,
  AuditOutlined,
  CaretDownOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';

import {
  Form,
  Button,
  Card,
  Tabs,
  Modal,
  notification,
  Drawer,
  Row,
  Col,
  Radio,
  Checkbox,
  InputNumber,
  Tooltip,
  Divider,
} from 'antd';

import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useSWR, { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';

import {
  Supplier,
  Drawer as DrawerForm,
  Customer,
  Carrier,
  Tanker,
  Priority,
  Shift,
  HostData,
  Dates,
  SoldTo,
  ShipTo,
  LoadSecurityInformation,
  SpecialInstructions,
  Terminal,
} from './fields';

import { SelectInput, PartnershipManager } from '../../../components';
import { SETTINGS } from '../../../constants';
import { LOAD_SCHEDULES, SITE_CONFIGURATION, TANKER_LIST, ORDER_LISTINGS } from '../../../api';

import { useConfig } from '../../../hooks';

import Products from './products';
import LoadReport from './load-report';
import DeliveryDetails from '../../delivery-details';
import DriverInstructions from './driver-instructions';
import AdditionalHostData from './additional-host-data';
import Compartments from './compartments';
import Transactions from './transactions';
import Summary from './summary';
import Seals from './seals';
import BOL from './bol';
import Axles from './axles';
import { ManualTransactionsPopup } from '../../manual-transactions';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateTrip, default_shls_ld_type }) => {
  // const { manageMakeManualTransaction, showSeals, manageAdditionalHostData, manageViewDeliveryDetails } = useConfig();
  const config = useConfig();
  const {
    manageMakeManualTransaction,
    showSeals,
    manageAdditionalHostData,
    manageViewDeliveryDetails,
    site_customer_product,
    site_customer_carrier,
    siteUseSpecIns,
    showLSI,
  } = config;

  const popupMT = config?.popupManualTransaction;

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [tab, setTab] = useState('0');
  const [createTranTabOn, setCreateTranTabOn] = useState(false);
  const [repostTranTabOn, setRepostTranTabOn] = useState(false);
  const [showCreateTransactions, setShowCreateTransactions] = useState(false);
  const [showRepostTransactions, setShowRepostTransactions] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState('75vw');

  const [mode, setMode] = useState(default_shls_ld_type);
  const [unload, setUnload] = useState(false);
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(undefined);
  const [customer, setCustomer] = useState(undefined);
  const [carrier, setCarrier] = useState(undefined);
  const [tanker, setTanker] = useState(undefined);
  const [redoBOL, setRedoBOL] = useState(0);
  const [exportBOL, setExportBOL] = useState(0);
  const [exportLDReport, setExportLDReport] = useState(0);
  const [exportDLI, setExportDLI] = useState(0);
  const [redoDLI, setRedoDLI] = useState(false);
  const [shipTo, setShipTo] = useState(value?.shls_ship_to_num);
  const [soldTo, setSoldTo] = useState(value?.shls_sold_to_num);
  const [expHour, setExpHour] = useState(undefined); // SITE.SITE_SHLS_EXP_H
  const [activeTrips, setActiveTrips] = useState(0);

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_CREATING = !value;
  const CAN_PRINT = ['2', '3', '4'].includes(tab);
  const READ_ONLY = value?.status !== 'F' && !IS_CREATING;
  const CAN_VIEW_REPORTS = value?.shlsload_load_id !== '0';
  const CAN_VIEW_TRANSACTIONS = value?.status !== 'F';
  const CAN_DELIVERY_DETAIL = value !== null && value !== undefined && manageViewDeliveryDetails;

  const CAN_REVERSE =
    (value?.load_reverse_flag === '0' || value?.load_reverse_flag === '2') &&
    value?.status !== 'A' &&
    value?.status !== 'L' &&
    value?.cmpy_schd_rev_repost;
  const CAN_ARCHIVE =
    (value?.load_reverse_flag === '0' ||
      value?.load_reverse_flag === '1' ||
      value?.load_reverse_flag === '2') &&
    value?.status !== 'A' &&
    value?.status !== 'L' &&
    value?.cmpy_schd_archive;
  const CAN_MAKE =
    access.canCreate &&
    (value?.load_reverse_flag === '' || value?.load_reverse_flag === '0') &&
    value?.status !== 'D' &&
    value?.status !== 'E';
  const CAN_REPOST =
    value?.load_reverse_flag === '1' &&
    value?.status !== 'A' &&
    value?.status !== 'L' &&
    value?.cmpy_schd_rev_repost;

  const CAN_MAKE_TRANSACTIONS = CAN_MAKE && manageMakeManualTransaction;
  const CAN_REPOST_TRANSACTIONS = CAN_REPOST && manageMakeManualTransaction;
  const CAN_ADD_HOST_DATA = value?.shls_ld_type === '2' && manageAdditionalHostData;

  const { data: siteData } = useSWR(SITE_CONFIGURATION.GET_SITE);

  const { data: trips } = useSWR(`${TANKER_LIST.CHECK_TANKER_ACTIVE_TRIPS}?tanker=${tanker}`, {
    refreshInterval: 0,
  });

  const { resetFields, setFieldsValue } = form;

  const validateTripNumber = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.tripNumber')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const onFormClosed = () => {
    setCreateTranTabOn(false);
    setRepostTranTabOn(false);
    setDrawerWidth('75vw');
    handleFormState(false, null);
  };

  const onComplete = (value) => {
    setCreateTranTabOn(false);
    setRepostTranTabOn(false);
    setDrawerWidth('75vw');
    handleFormState(false, null);
    if (value) {
      locateTrip(value);
    } else {
      mutate(url);
    }
  };

  const changeSupplier = (supplier) => {
    if (IS_CREATING) {
      api
        .get(LOAD_SCHEDULES.NEXT_TRIP, {
          params: {
            supplier_code: supplier,
          },
        })
        .then((res) => {
          const trip = res.data?.records[0]?.next_trip_no;

          setFieldsValue({
            shls_trip_no: trip,
          });
        });
    }

    setSupplier(supplier);
    setDrawer(supplier);
  };

  const changeCustomer = (customer) => {
    setCustomer(customer);
    setFieldsValue({
      tnkr_code: undefined,
      carrier_code: undefined,
    });
  };

  const isOrderValid = async (order, supp) => {
    const results = await api.get(`${ORDER_LISTINGS.VALIDATE_ORDER}?order_cust_no=${order}&supplier=${supp}`);
    console.log('.....................isOrderValid', results);

    const valid = _.toNumber(results?.data?.records?.[0]?.cnt) > 0;

    return valid;
  };

  const isOrderProductValid = async (order, supp, prodCode, prodCmpy) => {
    const results = await api.get(
      `${ORDER_LISTINGS.VALIDATE_ORDER_PROD}?order_cust_no=${order}&supplier=${supp}&prod_code=${prodCode}&prod_cmpy=${prodCmpy}`
    );

    const valid = _.toNumber(results?.data?.records?.[0]?.cnt) > 0;

    return valid;
  };

  const checkCompartmentOrders = async (compartments, supplier, drawer) => {
    const errors = [];
    let i = undefined;
    for (i = 0; i < compartments?.length; i++) {
      const cmpt = compartments[i];
      if (
        cmpt?.order_cust_ordno === undefined ||
        cmpt?.order_cust_ordno === null ||
        _.trim(cmpt?.order_cust_ordno) === ''
      ) {
        continue;
      }
      if (cmpt?.prod_code === undefined || cmpt?.prod_code === null || _.trim(cmpt?.prod_code) === '') {
        continue;
      }
      const orderValid = await isOrderValid(cmpt?.order_cust_ordno, supplier);
      if (orderValid) {
        const orderProdValid = await isOrderProductValid(
          cmpt?.order_cust_ordno,
          supplier,
          cmpt?.prod_code,
          drawer
        );
        if (!orderProdValid) {
          let title = t('descriptions.orderProdNotExist');
          title = title.replace('[[ORDER]]', '"' + cmpt?.order_cust_ordno + '"');
          title = title.replace('[[PRODUCT]]', '"' + cmpt?.prod_code + ' - ' + cmpt?.prod_name + '"');

          errors.push({
            field: `${t('fields.product')} (${t('fields.compartment')} ${cmpt?.compartment})`,
            message: title,
            key: `${'compartment'}${cmpt?.compartment}`,
            line: cmpt?.compartment,
          });
        }
      } else {
        let title = t('descriptions.orderNotExist');
        title = title.replace('[[ORDER]]', '"' + cmpt?.order_cust_ordno + '"');

        errors.push({
          field: `${t('fields.orderNo')} (${t('fields.compartment')} ${cmpt?.compartment})`,
          message: title,
          key: `${'compartment'}${cmpt?.compartment}`,
          line: cmpt?.compartment,
        });
      }
    }

    if (errors.length > 0) {
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
        // message: t('validate.lineItemValidation'),
        message: t('messages.validationFailed'),
        description: lines,
        // duration: 0,
        style: {
          height: 'calc(100vh - 400px)',
          overflowY: 'scroll',
        },
      });

      return false;
    } else {
      return true;
    }
  };

  const onFinish = async () => {
    const record = await form.validateFields();
    if (record?.shls_ld_type === '3' /* Preorder*/) {
      let findResult = _.find(record.products, (item) => {
        return item.qty_scheduled > 0;
      });
      if (!findResult) {
        notification.error({
          message: t('messages.validationFailed'),
          description: t('descriptions.preOrderReady'),
        });
        return;
      }

      findResult = _.find(record.products, (item) => {
        return item.qty_scheduled > 99999999;
      });
      if (findResult) {
        notification.error({
          message: t('messages.validationFailed'),
          description: t('descriptions.scheduledTooHigh') + ': ' + findResult.qty_scheduled,
        });
        return;
      }

      findResult = _.find(record.products, (item) => {
        return item.qty_scheduled > 0 && item.unit_code === '';
      });

      if (findResult) {
        notification.error({
          message: t('messages.validationFailed'),
          description: `${t('descriptions.preOrderProdUnit')} ${findResult.prod_code}/${
            findResult.prod_name
          } `,
        });
        return;
      }
    } else if (record?.shls_ld_type === '2' /* PreSchedule*/) {
      const orderFlag = await checkCompartmentOrders(
        record?.compartments,
        record?.supplier_code,
        record?.drawer_code
      );
      if (!orderFlag) {
        return orderFlag;
      }
      let findResult = _.find(record.compartments, (item) => {
        return item.prod_code !== '';
      });

      if (!findResult) {
        notification.error({
          message: t('messages.validationFailed'),
          description: config?.siteAllowDragDrop
            ? t('descriptions.prescheduleReadyByDragDrop')
            : t('descriptions.prescheduleReady'),
        });
        return;
      }

      findResult = _.find(record.compartments, (item) => {
        return item.qty_scheduled > 0 && item.unit_code === '';
      });

      if (findResult) {
        notification.error({
          message: t('messages.validationFailed'),
          description: `${t('descriptions.preSchedProdUnit')} ${findResult.compartment} `,
        });
        return;
      }

      findResult = _.find(record.compartments, (item) => {
        return item.qty_scheduled > 0 && item.prod_code === '';
      });

      if (findResult) {
        notification.error({
          message: t('messages.validationFailed'),
          description: `${t('descriptions.preSchedProd')} ${findResult.compartment} `,
        });
        return;
      }
    }

    if (record.unload) {
      record.shls_ld_type = '6';
    }

    /* if (!siteUseSpecIns) {
      record.shls_spec_ins = value?.shls_spec_ins;
    } */

    const values = {
      ...record,
      shls_caldate: record?.shls_caldate?.format(SETTINGS.DATE_TIME_FORMAT),
      shls_exp2: !record?.shls_exp2 ? '' : record?.shls_exp2?.format(SETTINGS.DATE_TIME_FORMAT),
    };

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? LOAD_SCHEDULES.CREATE : LOAD_SCHEDULES.UPDATE, values)
          .then(() => {
            onComplete(values);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
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
      },
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(LOAD_SCHEDULES.DELETE, value)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
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
      },
    });
  };

  const onReverse = () => {
    Modal.confirm({
      title: t('prompts.confirmReverse'),
      okText: t('operations.yes'),
      okType: 'primary',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .get(LOAD_SCHEDULES.REVERSE, {
            params: {
              supplier: value.supplier_code,
              trip_no: value.shls_trip_no,
            },
          })
          .then(() => {
            notification.success({
              message: t('messages.reverseSuccess'),
            });
            onComplete(value);
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onArchive = () => {
    Modal.confirm({
      title: t('prompts.confirmArchive'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <EditOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .get(LOAD_SCHEDULES.ARCHIVE, {
            params: {
              supplier: value.supplier_code,
              trip_no: value.shls_trip_no,
            },
          })
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.archiveSuccess'),
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
      },
    });
  };

  const onExport = () => {
    if (tab === '3') {
      setExportBOL(exportBOL + 1);
    } else if (tab === '4') {
      setExportLDReport(exportLDReport + 1);
    } else if (tab === '2') {
      setExportDLI(exportDLI + 1);
    }
  };

  const onPrint = () => {
    const printEnumerator = {
      2: {
        prompt: t('prompts.printDriverInstruction'),
        url: LOAD_SCHEDULES.PRINT_DLI,
        message: t('messages.printDriverInstructionSuccess'),
      },

      3: {
        prompt: t('prompts.printBOL'),
        url: LOAD_SCHEDULES.PRINT_BOL,
        message: t('messages.printBOLSuccess'),
      },

      4: {
        prompt: t('prompts.printLoadReport'),
        url: LOAD_SCHEDULES.PRINT_LOAD_REPORT,
        message: t('messages.printLoadReportSuccess'),
      },
    };

    const selected = printEnumerator[tab];

    Modal.confirm({
      title: selected?.prompt,
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <PrinterOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .get(selected?.url, {
            params: {
              supplier: value.supplier_code,
              trip_no: value.shls_trip_no,
              supermode: !!form.getFieldValue('supermode') ? 'on' : 'off',
              dcsmode: !!form.getFieldValue('dcsmode') ? 'on' : 'off',
            },
          })
          .then(() => {
            notification.success({
              message: selected?.message,
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
      },
    });
  };

  const onView = () => {
    if (tab === '3') {
      setRedoBOL(redoBOL + 1);
    }
  };

  const onSealUpdate = () => {
    setRedoDLI(!redoDLI);
  };

  const setCurStatus = (status) => {
    if (value) {
      value.status = status;
    }
  };

  const onTabChange = (v) => {
    if (v === '8') {
      setCreateTranTabOn(true);
      setTab(v);
    } else {
      setCreateTranTabOn(false);
    }
    if (v === '9') {
      setRepostTranTabOn(true);
      setTab(v);
    } else {
      setRepostTranTabOn(false);
    }

    if (v === '3' || v === '4') {
      if (value?.status === 'A') {
        Modal.confirm({
          title: t('prompts.completeTrip'),
          icon: <QuestionCircleOutlined />,
          okText: t('operations.yes'),
          cancelText: t('operations.no'),
          // content: 'Some descriptions',
          onOk() {
            setTab(v);
          },
        });
      } else {
        setTab(v);
      }
    } else {
      setTab(v);
    }

    if (v === '6' || v === '8' || v === '9') {
      setDrawerWidth('90vw');
    } else {
      setDrawerWidth('75vw');
    }
  };

  //Unload is preorder only, confirmed with old flash screen
  const onUnload = (v) => {
    if (v.target.checked) {
      setMode('3');
      setFieldsValue({
        shls_ld_type: '3',
      });
    }

    setUnload(v.target.checked);
  };

  const exportPDF = () => {
    if (IS_CREATING) {
      return false;
    }

    if (tab === '2') {
      //DLI
      return true;
    }

    if (tab === '3') {
      //BOL
      return config?.bolVersion !== 'JASPER';
    }

    if (tab === '4') {
      //BOL
      return config?.ldReportVersion !== 'JASPER';
    }

    return false;
  };

  useEffect(() => {
    if (!value) {
      setTab('0');
    }
  }, [value]);

  useEffect(() => {
    if (siteData) {
      setExpHour(siteData?.records?.[0].site_shls_exp_h);
    }
  }, [siteData, setExpHour]);

  useEffect(() => {
    if (value) {
      setTab('0');

      setFieldsValue({
        shls_ld_type: value.shls_ld_type ? value.shls_ld_type : '4',
        unload: value?.shls_ld_type === '6',
        shls_trip_no: value?.shls_trip_no,
      });
      setMode(value.shls_ld_type === '6' ? '3' : value.shls_ld_type);
    }
  }, [setFieldsValue, value]);

  useEffect(() => {
    if (!value && !visible) {
      setSupplier(undefined);
      setDrawer(undefined);
      setCarrier(undefined);
      setTanker(undefined);

      resetFields();

      setMode(default_shls_ld_type);
      setUnload(false);
      setFieldsValue({
        shls_ld_type: default_shls_ld_type,
      });

      /* setFieldsValue({
        shls_caldate: moment(),
        shls_exp2: !expHour ? moment() : moment().add(_.toNumber(expHour), 'hours'),
      }); */
    }
  }, [resetFields, setFieldsValue, visible, value, expHour]);

  useEffect(() => {
    if (trips) {
      const count = trips?.records?.[0]?.cnt;
      if (value?.status === 'A' || value?.status === 'L') {
        setActiveTrips(count - 1);
      } else {
        setActiveTrips(count);
      }
    }
  }, [trips]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onFormClosed()}
      maskClosable={IS_CREATING}
      mask={IS_CREATING || tab === '8' || tab === '9'}
      destroyOnClose
      placement="right"
      width={drawerWidth}
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onFormClosed()}
          >
            {t('operations.cancel')}
          </Button>

          {!READ_ONLY && tab !== '6' && tab !== '7' && tab !== '8' && tab !== '9' && tab !== '10' && (
            <Button
              type="primary"
              icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>
          )}

          {!IS_CREATING &&
            !READ_ONLY &&
            tab !== '6' &&
            tab !== '7' &&
            tab !== '8' &&
            tab !== '9' &&
            tab !== '10' && (
              <>
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  style={{ float: 'right', marginRight: 5 }}
                  disabled={!access?.canDelete}
                  onClick={onDelete}
                >
                  {t('operations.delete')}
                </Button>
              </>
            )}

          {tab === '3' && !IS_CREATING && (
            <Checkbox onChange={(e) => setFieldsValue({ supermode: e.target.checked })}>
              {t('descriptions.ignoreTolerance')}
            </Checkbox>
          )}

          {tab === '3' && !IS_CREATING && config?.externalBlendAllowed && (
            <Checkbox onChange={(e) => setFieldsValue({ dcsmode: e.target.checked })}>
              {t('descriptions.ignoreDCSCheck')}
            </Checkbox>
          )}

          {CAN_PRINT && !IS_CREATING && tab === '3' && (
            <Button
              type="primary"
              icon={<AuditOutlined />}
              onClick={onView}
              style={{ marginRight: 5 }}
              // disabled={!access?.canUpdate}
              disabled={!CAN_VIEW_REPORTS}
            >
              {t('operations.view')}
            </Button>
          )}

          {CAN_PRINT && !IS_CREATING && (
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={onPrint}
              style={{ marginRight: 5 }}
              // disabled={!access?.canUpdate}
              disabled={!CAN_VIEW_REPORTS && !(tab === '2' && access?.canUpdate)}
            >
              {t('operations.print')}
            </Button>
          )}

          {exportPDF() && (
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              onClick={onExport}
              style={{ marginRight: 5 }}
              // disabled={!access?.canUpdate}
              disabled={!CAN_VIEW_REPORTS && !(tab === '2' && access?.canUpdate)}
            >
              {t('operations.exportPDF')}
            </Button>
          )}

          {!CAN_PRINT && !IS_CREATING && (
            <>
              {/* <Button
                type="primary"
                icon={<RedoOutlined />}
                disabled={!access?.canUpdate}
                style={{ marginRight: 5 }}
              >
                {t('operations.repost')}
              </Button> */}

              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={onReverse}
                disabled={!access?.canUpdate || !CAN_REVERSE}
                style={{ marginRight: 5 }}
              >
                {t('operations.reverse')}
              </Button>

              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={onArchive}
                disabled={!access?.canUpdate || !CAN_ARCHIVE}
              >
                {t('operations.archive')}
              </Button>
            </>
          )}

          {!(
            IS_CREATING ||
            !CAN_MAKE_TRANSACTIONS ||
            !access.canCreate ||
            value?.shls_ld_type === '6' ||
            activeTrips > 0
          ) &&
            popupMT &&
            tab === '0' && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginLeft: 5 }}
                disabled={!CAN_MAKE_TRANSACTIONS}
                onClick={() => setShowCreateTransactions(true)}
              >
                {t('tabColumns.createTripTransactions')}
              </Button>
            )}

          {!(IS_CREATING || !CAN_REPOST_TRANSACTIONS || !access.canUpdate) && popupMT && tab === '0' && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ marginLeft: 5 }}
              disabled={!CAN_REPOST_TRANSACTIONS}
              onClick={() => setShowRepostTransactions(true)}
            >
              {t('tabColumns.repostTripTransactions')}
            </Button>
          )}
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={{ shls_ld_type: default_shls_ld_type }}
      >
        <Tabs defaultActiveKey="1" activeKey={tab} onChange={onTabChange} animated={false}>
          <TabPane tab={t('tabColumns.general')} key="0">
            <Form.Item name="supermode" noStyle />
            <Form.Item name="dcsmode" noStyle />

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="shls_ld_type" style={{ display: 'inline-block' }}>
                  <Radio.Group
                    buttonStyle="solid"
                    style={{ marginBottom: 10 }}
                    onChange={(event) => setMode(event.target.value)}
                    disabled={!!value}
                  >
                    {(IS_CREATING || value?.shls_ld_type === '3' || value?.shls_ld_type === '6') && (
                      <Radio.Button value="3">{t('operations.preOrder')}</Radio.Button>
                    )}
                    {(IS_CREATING || value?.shls_ld_type === '2') && !unload && (
                      <Radio.Button value="2">{t('operations.preSchedule')}</Radio.Button>
                    )}
                    {/* {(IS_CREATING || value?.shls_ld_type === '6') && <Radio.Button value="6">{t('fields.unload')}</Radio.Button>} */}
                    {!IS_CREATING && !['2', '3', '6'].includes(value?.shls_ld_type) && (
                      <Radio.Button value="4">{t('operations.openOrder')}</Radio.Button>
                    )}
                    {/* <Radio.Button value="3">{t('operations.preOrder')}</Radio.Button>
                    <Radio.Button value="2">{t('operations.preSchedule')}</Radio.Button> */}
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="unload"
                  style={{ marginLeft: 20, display: 'inline-block' }}
                  valuePropName="checked"
                >
                  <Checkbox disabled={!IS_CREATING} onChange={onUnload}>
                    {t('fields.unload')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Terminal form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Supplier form={form} value={value} onChange={changeSupplier} />
              </Col>

              {site_customer_product || site_customer_carrier ? (
                <Fragment>
                  <Col span={6}>
                    <DrawerForm
                      form={form}
                      drawer={drawer ? drawer : value?.drawer_code}
                      value={value}
                      onChange={setDrawer}
                    />
                  </Col>
                  <Col span={6}>
                    <Customer
                      form={form}
                      supplier={value ? value.supplier_code : supplier}
                      value={value}
                      onChange={changeCustomer}
                    />
                  </Col>
                </Fragment>
              ) : (
                <Col span={12}>
                  <DrawerForm
                    form={form}
                    drawer={drawer ? drawer : value?.drawer_code}
                    value={value}
                    onChange={setDrawer}
                  />
                </Col>
              )}
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Carrier
                  form={form}
                  customer={site_customer_carrier ? customer : undefined}
                  value={value}
                  onChange={setCarrier}
                />
              </Col>

              <Col span={12}>
                <Tanker
                  form={form}
                  value={value}
                  carrier={carrier}
                  onChange={setTanker}
                  activeTrips={activeTrips}
                />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Dates form={form} value={value} expiry={expHour} />

              <Col span={6}>
                {/* <SoldTo form={form} value={value} mode={mode} /> */}
                <SelectInput
                  form={form}
                  value={value}
                  name="shls_sold_to_num"
                  label={t('fields.soldTo')}
                  required={false}
                  allowClear={true}
                  maxLength={20}
                  disabled={mode === '2' || (value && value?.status !== 'F')}
                  onChange={setSoldTo}
                  popupManager={PartnershipManager}
                  popupTitle={t('fields.soldTo') + ' - ' + t('pageNames.partnership')}
                  popupDisabled={!(value ? value.supplier_code : supplier)}
                  popupIcon={<CaretDownOutlined />}
                  popupLabel={''}
                  popupParams={{
                    partner_code: soldTo,
                    partner_type: 'AG',
                    partner_cmpy_code: value ? value.supplier_code : supplier,
                    partner_cust_acct: '',
                  }}
                />
              </Col>

              <Col span={6}>
                {/* <ShipTo form={form} value={value} mode={mode} carrier={carrier} /> */}
                <SelectInput
                  form={form}
                  value={value}
                  name="shls_ship_to_num"
                  label={t('fields.shipTo')}
                  required={false}
                  allowClear={true}
                  maxLength={20}
                  disabled={mode === '2' || (value && value?.status !== 'F')}
                  onChange={setShipTo}
                  popupManager={PartnershipManager}
                  popupTitle={t('fields.shipTo') + ' - ' + t('pageNames.partnership')}
                  popupDisabled={!(value ? value.supplier_code : supplier)}
                  popupIcon={<CaretDownOutlined />}
                  popupLabel={''}
                  popupParams={{
                    partner_code: shipTo,
                    partner_type: 'WE',
                    partner_cmpy_code: value ? value.supplier_code : supplier,
                    partner_cust_acct: '',
                  }}
                />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                {/* <TripNumber form={form} value={value} supplier={supplier} onChange={setTrip} /> */}
                <Form.Item
                  name="shls_trip_no"
                  label={t('fields.tripNumber')}
                  rules={[{ required: true, validator: validateTripNumber }]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} disabled={!supplier || !!value} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Shift form={form} value={value} />
              </Col>

              <Col span={6}>
                <Priority form={form} value={value} />
              </Col>

              <Col span={6}>
                <HostData form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              {siteUseSpecIns && (
                <Col span={showLSI ? 12 : 24}>
                  <SpecialInstructions form={form} value={value} />
                </Col>
              )}
              {showLSI && (
                <Col span={siteUseSpecIns ? 12 : 24}>
                  <LoadSecurityInformation form={form} value={value} />
                </Col>
              )}
            </Row>

            {mode === '2' && !READ_ONLY && (
              <Compartments
                form={form}
                value={value}
                drawer={value ? value.supplier_code : supplier} //Same as v9, when supplier != drawer, use supplier product
                tanker={!tanker ? value?.tnkr_code : tanker}
                supplier={value ? value.supplier_code : supplier}
                customer={site_customer_product ? customer : undefined}
                config={config}
              />
            )}

            {mode === '3' && !READ_ONLY && (
              <Products
                form={form}
                value={value}
                drawer={value ? value.supplier_code : supplier}
                customer={site_customer_product ? customer : undefined}
                access={access}
              />
            )}

            {READ_ONLY && <Summary value={value} />}
          </TabPane>

          <TabPane
            tab={t('tabColumns.transactions')}
            disabled={IS_CREATING || !CAN_VIEW_TRANSACTIONS}
            key="1"
          >
            <Transactions value={value} config={config} />
          </TabPane>

          <TabPane tab={t('tabColumns.driverInstructions')} disabled={IS_CREATING} key="2">
            <DriverInstructions value={value} redoDLI={redoDLI} exportPDF={exportDLI} />
          </TabPane>

          <TabPane tab={t('tabColumns.bol')} disabled={IS_CREATING || !CAN_VIEW_REPORTS} key="3">
            <BOL
              value={value}
              redo={redoBOL}
              supermode={form.getFieldValue('supermode')}
              dcsmode={form.getFieldValue('dcsmode')}
              locateTrip={locateTrip}
              setCurStatus={setCurStatus}
              exportPDF={exportBOL}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.loadReport')} disabled={IS_CREATING || !CAN_VIEW_REPORTS} key="4">
            <LoadReport value={value} exportPDF={exportLDReport} />
          </TabPane>

          <TabPane
            tab={t('tabColumns.seals')}
            disabled={IS_CREATING || !showSeals || value.shls_ld_type === '6'}
            key="5"
          >
            <Seals value={value} sealUpated={onSealUpdate} />
          </TabPane>

          <TabPane
            tab={t('tabColumns.deliveryDetails')}
            disabled={IS_CREATING || !CAN_DELIVERY_DETAIL}
            key="6"
          >
            <DeliveryDetails
              access={access}
              params={{
                dd_supp_code: value?.supplier_code,
                dd_tripord_no: value?.shls_trip_no,
                dd_ld_type: mode === '3' ? '1' : '2',
              }}
            />
          </TabPane>

          <TabPane
            tab={t('tabColumns.additionalHostData')}
            disabled={IS_CREATING || !CAN_ADD_HOST_DATA}
            key="7"
          >
            <AdditionalHostData value={value} />
          </TabPane>

          {!popupMT && (
            <TabPane
              tab={
                !IS_CREATING && activeTrips > 0 ? (
                  <Tooltip placement="topRight" title={t('descriptions.countTankerActiveTrips')}>
                    {t('tabColumns.createTripTransactions')}
                  </Tooltip>
                ) : (
                  t('tabColumns.createTripTransactions')
                )
              }
              disabled={
                IS_CREATING ||
                !CAN_MAKE_TRANSACTIONS ||
                !access.canCreate ||
                value.shls_ld_type === '6' ||
                activeTrips > 0
              }
              key="8"
            >
              {createTranTabOn && (
                <ManualTransactionsPopup
                  popup={true}
                  params={{
                    supplier: value?.supplier_code,
                    trip_no: value?.shls_trip_no,
                    carrier: value?.carrier_code,
                    tanker: value?.tnkr_code,
                    trans_type: 'SCHEDULE',
                    repost: false,
                    title: t('tabColumns.createTripTransactions'),
                    onComplete: onComplete,
                  }}
                />
              )}
            </TabPane>
          )}

          {!popupMT && (
            <TabPane
              tab={t('tabColumns.repostTripTransactions')}
              disabled={IS_CREATING || !CAN_REPOST_TRANSACTIONS || !access.canUpdate}
              key="9"
            >
              {repostTranTabOn && (
                <ManualTransactionsPopup
                  popup={true}
                  params={{
                    supplier: value?.supplier_code,
                    trip_no: value?.shls_trip_no,
                    trans_type: 'SCHEDULE',
                    repost: true,
                    title: t('tabColumns.repostTripTransactions'),
                    onComplete: onComplete,
                  }}
                />
              )}
            </TabPane>
          )}

          {config?.siteUseAxleWeightLimit && value && (
            <TabPane tab={t('tabColumns.axleWeighInOut')} disabled={IS_CREATING} key="10">
              <Axles value={value} />
            </TabPane>
          )}
        </Tabs>
      </Form>

      {!(
        IS_CREATING ||
        !CAN_MAKE_TRANSACTIONS ||
        !access.canCreate ||
        value?.shls_ld_type === '6' ||
        activeTrips > 0
      ) &&
        popupMT && (
          <Drawer
            title={t('tabColumns.createTripTransactions')}
            placement="right"
            bodyStyle={{ paddingTop: 5 }}
            onClose={() => setShowCreateTransactions(false)}
            visible={showCreateTransactions}
            width="100vw"
            destroyOnClose={true}
          >
            <ManualTransactionsPopup
              popup={true}
              params={{
                supplier: value?.supplier_code,
                trip_no: value?.shls_trip_no,
                carrier: value?.carrier_code,
                tanker: value?.tnkr_code,
                trans_type: 'SCHEDULE',
                repost: false,
                title: t('tabColumns.createTripTransactions'),
                onComplete: onComplete,
              }}
            />
          </Drawer>
        )}

      {!(IS_CREATING || !CAN_REPOST_TRANSACTIONS || !access.canUpdate) && popupMT && (
        <Drawer
          title={t('tabColumns.repostTripTransactions')}
          placement="right"
          bodyStyle={{ paddingTop: 5 }}
          onClose={() => setShowRepostTransactions(false)}
          visible={showRepostTransactions}
          width="100vw"
          destroyOnClose={true}
        >
          <ManualTransactionsPopup
            popup={true}
            params={{
              supplier: value?.supplier_code,
              trip_no: value?.shls_trip_no,
              trans_type: 'SCHEDULE',
              repost: true,
              title: t('tabColumns.repostTripTransactions'),
              onComplete: onComplete,
            }}
          />
        </Drawer>
      )}
    </Drawer>
  );
};

export default FormModal;
