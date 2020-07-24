import React, { useEffect, useState } from 'react';

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
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col, Radio, Checkbox } from 'antd';

import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useSWR, { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';

import {
  Supplier,
  Drawer as DrawerForm,
  Carrier,
  Tanker,
  TripNumber,
  Priority,
  Shift,
  HostData,
  Dates,
  SoldTo,
  ShipTo,
  LoadSecurityInformation,
} from './fields';

import { SelectInput, PartnershipManager } from '../../../components';
import { SETTINGS } from '../../../constants';
import { LOAD_SCHEDULES, SITE_CONFIGURATION } from '../../../api';

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
import { ManualTransactionsPopup } from '../../manual-transactions';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateTrip }) => {
  const { manageMakeManualTransaction, showSeals, manageAdditionalHostData } = useConfig();

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [tab, setTab] = useState('0');

  const [mode, setMode] = useState('3');
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(undefined);
  const [carrier, setCarrier] = useState(undefined);
  const [tanker, setTanker] = useState(undefined);
  const [trip, setTrip] = useState(undefined);
  const [redoBOL, setRedoBOL] = useState(0);
  const [redoDLI, setRedoDLI] = useState(false);
  const [shipTo, setShipTo] = useState(value?.shls_ship_to_num);
  const [soldTo, setSoldTo] = useState(value?.shls_sold_to_num);
  const [expHour, setExpHour] = useState(undefined); // SITE.SITE_SHLS_EXP_H
  
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

  const CAN_REVERSE = 
    (value?.load_reverse_flag === '0' || value?.load_reverse_flag === '2') &&
    (value?.status !== 'A' && value?.status !== 'L');
  const CAN_ARCHIVE = 
    (value?.load_reverse_flag === '0' || value?.load_reverse_flag === '1' || value?.load_reverse_flag === '2') &&
    (value?.status !== 'A' && value?.status !== 'L') &&
    value?.cmpy_schd_archive;
  const CAN_MAKE = 
    access.canCreate && 
    (value?.load_reverse_flag === '' || value?.load_reverse_flag === '0') && 
    (value?.status !== 'D' && value?.status !== 'E');
  const CAN_REPOST = 
    value?.load_reverse_flag === '1' && 
    (value?.status !== 'A' && value?.status !== 'L') &&
    value?.cmpy_schd_rev_repost;

  const CAN_MAKE_TRANSACTIONS = CAN_MAKE && manageMakeManualTransaction;
  const CAN_REPOST_TRANSACTIONS = CAN_REPOST && manageMakeManualTransaction;
  const CAN_ADD_HOST_DATA = value?.shls_ld_type === '2' && manageAdditionalHostData;

  const { data: siteData } = useSWR(SITE_CONFIGURATION.GET_SITE);


  const { resetFields, setFieldsValue } = form;

  const onComplete = (value) => {
    handleFormState(false, null);
    if (value) {
      locateTrip(value);
    } else {
      mutate(url);
    }
  };

  const changeSupplier = (supplier) => {
    setSupplier(supplier);
    setDrawer(supplier);
    setFieldsValue({
      drawer_code: supplier,
    });
  };

  const onFinish = async () => {
    const record = await form.validateFields();
    
    if (record?.shls_ld_type === "3" /* Preorder*/) {
      let findResult = _.find(record.products, (item) => {
        return item.qty_scheduled > 0;
      });
      if (!findResult) {
        notification.error({
          message: t("messages.validationFailed"),
          description: t("descriptions.preOrderReady"),
        });
        return;
      }

      findResult = _.find(record.products, (item) => {
        return item.qty_scheduled > 0 && item.unit_code === "";
      });
      
      if (findResult) {
        notification.error({
          message: t("messages.validationFailed"),
          description: `${t("descriptions.preOrderProdUnit")} ${findResult.prod_code}/${findResult.prod_name} `,
        });
        return;
      }
    } else if (record?.shls_ld_type === "2" /* PreSchedule*/) {
      let findResult = _.find(record.compartments, (item) => {
        return item.prod_code !== "";
      });

      if (!findResult) {
        notification.error({
          message: t("messages.validationFailed"),
          description: t("descriptions.prescheduleReady"),
        });
        return;
      }

      findResult = _.find(record.compartments, (item) => {
        return item.qty_scheduled > 0 && item.unit_code === "";
      });
      
      if (findResult) {
        notification.error({
          message: t("messages.validationFailed"),
          description: `${t("descriptions.preSchedProdUnit")} ${findResult.compartment} `,
        });
        return;
      }

      findResult = _.find(record.compartments, (item) => {
        return item.qty_scheduled > 0 && item.prod_code === "";
      });
      
      if (findResult) {
        notification.error({
          message: t("messages.validationFailed"),
          description: `${t("descriptions.preSchedProd")} ${findResult.compartment} `,
        });
        return;
      }
    }

    const values = {
      ...record,
      shls_caldate: record?.shls_caldate?.format(SETTINGS.DATE_TIME_FORMAT),
      shls_exp2: record?.shls_exp2?.format(SETTINGS.DATE_TIME_FORMAT),
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

  const onPrint = () => {
    const printEnumerator = {
      '2': {
        prompt: t('prompts.printDriverInstruction'),
        url: LOAD_SCHEDULES.PRINT_DLI,
        message: t('messages.printDriverInstructionSuccess'),
      },

      '3': {
        prompt: t('prompts.printBOL'),
        url: LOAD_SCHEDULES.PRINT_BOL,
        message: t('messages.printBOLSuccess'),
      },

      '4': {
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
              supermode: !!form.getFieldValue('supermode') ? "on":"off",
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
    if (tab === "3") {
      setRedoBOL(redoBOL + 1);
    }
  };

  const onSealUpdate = () => {
    setRedoDLI(!redoDLI);
  } 

  const setCurStatus = (status) => {
    if (value) {
      value.status = status;
    }
  }

  const onTabChange = (v) => {
    if (v === '3') {
      if (value?.status === 'A') {
        Modal.confirm({
          title: t('prompts.completeTrip'),
          icon: <QuestionCircleOutlined />,
          okText: t('operations.yes'),
          cancelText: t('operations.no'),
          // content: 'Some descriptions',
          onOk() {
            setTab(v);
          }
        });
      } else {
        setTab(v);
      }
    } else {
      setTab(v);
    }
  }

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
        shls_ld_type: value.shls_ld_type? value.shls_ld_type : "4",
      });
      setMode(value.shls_ld_type);
    }
  }, [setFieldsValue, value]);

  useEffect(() => {
    if (!value && !visible) {
      setSupplier(undefined);
      setDrawer(undefined);
      setCarrier(undefined);
      setTanker(undefined);
      setTrip(undefined);

      resetFields();

      setMode('2');   //By default, set preschedule
      setFieldsValue({
        shls_ld_type: '2',
      });

      setFieldsValue({
        shls_caldate: moment(),
        shls_exp2: !expHour ? moment() : moment().add(_.toNumber(expHour), 'hours'),
      });
    }
  }, [resetFields, visible, value, expHour]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      mask={IS_CREATING}
      destroyOnClose
      placement="right"
      width="75vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          {!READ_ONLY && tab !== "6" && tab !== "7" && tab !== "8" && tab !== "9" && (
            <Button
              type="primary"
              icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>
          )}

          {!IS_CREATING && !READ_ONLY && tab !== "6" && tab !== "7" && tab !== "8" && tab !== "9" && (
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

          {CAN_PRINT && !IS_CREATING && tab === "3" && (
            <Button type="primary" 
              icon={<AuditOutlined />} 
              onClick={onView} 
              style={{ marginRight: 5 }}
              disabled={!access?.canUpdate}
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
              disabled={!access?.canUpdate}
            >
              {t('operations.print')}
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
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError initialValues={{ shls_ld_type: '3' }}>
        <Tabs 
          defaultActiveKey="1" 
          activeKey={tab} 
          onChange={onTabChange} 
          animated={false}
        >
          <TabPane tab={t('tabColumns.general')} key="0">
            <Form.Item name="supermode" noStyle />
            <Form.Item name="shls_ld_type">
              <Radio.Group
                buttonStyle="solid"
                style={{ marginBottom: 10 }}
                onChange={(event) => setMode(event.target.value)}
                disabled={!!value}
              >
                {(IS_CREATING || value?.shls_ld_type === '3') && <Radio.Button value="3">{t('operations.preOrder')}</Radio.Button>}
                {(IS_CREATING || value?.shls_ld_type === '2') && <Radio.Button value="2">{t('operations.preSchedule')}</Radio.Button>}
                {/* {(IS_CREATING || value?.shls_ld_type === '6') && <Radio.Button value="6">{t('fields.unload')}</Radio.Button>} */}
                {(!IS_CREATING && !['2', '3'].includes(value?.shls_ld_type)) && 
                  <Radio.Button value="4">{t('operations.openOrder')}</Radio.Button>}
                {/* <Radio.Button value="3">{t('operations.preOrder')}</Radio.Button>
                <Radio.Button value="2">{t('operations.preSchedule')}</Radio.Button> */}
              </Radio.Group>
            </Form.Item>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Supplier form={form} value={value} onChange={changeSupplier} />
              </Col>

              <Col span={12}>
                <DrawerForm form={form} value={value} onChange={setDrawer} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Carrier form={form} value={value} onChange={setCarrier} />
              </Col>

              <Col span={12}>
                <Tanker form={form} value={value} carrier={carrier} onChange={setTanker} />
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
                  popupDisabled={!supplier}
                  popupIcon={<CaretDownOutlined />}
                  popupLabel={''}
                  popupParams={{
                    partner_code: soldTo,
                    partner_type: 'AG',
                    partner_cmpy_code: supplier,
                    partner_cust_acct: ''
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
                  popupDisabled={!supplier}
                  popupIcon={<CaretDownOutlined />}
                  popupLabel={''}
                  popupParams={{
                    partner_code: shipTo,
                    partner_type: 'WE',
                    partner_cmpy_code: supplier,
                    partner_cust_acct: ''
                  }}
                />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <TripNumber form={form} value={value} supplier={supplier} onChange={setTrip} />
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

            <Row gutter={[2, 2]}>
              <Col span={24}>
                <LoadSecurityInformation form={form} value={value} />
              </Col>
            </Row>

            {mode === '2' && !READ_ONLY && (
              <Compartments form={form} value={value} drawer={drawer} tanker={tanker} />
            )}

            {mode === '3' && !READ_ONLY && <Products form={form} value={value} drawer={drawer} access={access} />}

            {READ_ONLY && <Summary value={value} />}
          </TabPane>

          <TabPane
            tab={t('tabColumns.transactions')}
            disabled={IS_CREATING || !CAN_VIEW_TRANSACTIONS}
            key="1"
          >
            <Transactions value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.driverInstructions')} disabled={IS_CREATING} key="2">
            <DriverInstructions value={value} redoDLI={redoDLI} />
          </TabPane>

          <TabPane tab={t('tabColumns.bol')} disabled={IS_CREATING || !CAN_VIEW_REPORTS} key="3">
            <BOL 
              value={value} 
              redo={redoBOL} 
              supermode={form.getFieldValue('supermode')} 
              locateTrip={locateTrip} 
              setCurStatus={setCurStatus}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.loadReport')} disabled={IS_CREATING || !CAN_VIEW_REPORTS} key="4">
            <LoadReport value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.seals')} disabled={IS_CREATING || !showSeals} key="5">
            <Seals value={value} sealUpated={onSealUpdate} />
          </TabPane>

          <TabPane tab={t('tabColumns.deliveryDetails')} disabled={IS_CREATING} key="6">
            <DeliveryDetails
              params={{
                dd_supp_code: value?.supplier_code,
                dd_tripord_no: value?.shls_trip_no,
                dd_ld_type: value?.shls_ld_type,
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

          <TabPane 
            tab={t('tabColumns.createTripTransactions')} 
            disabled={IS_CREATING || !CAN_MAKE_TRANSACTIONS || !access.canCreate} 
            key="8"
          >
            <ManualTransactionsPopup 
              popup={true}
              params={{
                supplier: value?.supplier_code,
                trip_no: value?.shls_trip_no,
                trans_type: 'SCHEDULE',
                repost: false,
                title: t('tabColumns.createTripTransactions'),
                onComplete: onComplete,
              }}
            />
          </TabPane>

          <TabPane 
            tab={t('tabColumns.repostTripTransactions')} 
            disabled={IS_CREATING || !CAN_REPOST_TRANSACTIONS || !access.canUpdate} 
            key="9"
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
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
