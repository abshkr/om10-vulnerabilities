import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  PrinterOutlined,
  RedoOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col, Radio, Checkbox } from 'antd';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { mutate } from 'swr';
import axios from 'axios';
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

import { SETTINGS, ROUTES } from '../../../constants';
import { LOAD_SCHEDULES } from '../../../api';

import { useConfig } from '../../../hooks';

import Products from './products';
import LoadReport from './load-report';
import DriverInstructions from './driver-instructions';
import AdditionalHostData from './additional-host-data';
import Compartments from './compartments';
import Transactions from './transactions';
import Summary from './summary';
import Seals from './seals';
import BOL from './bol';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { manageMakeManualTransaction, showSeals, manageAdditionalHostData } = useConfig();

  let history = useHistory();

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [tab, setTab] = useState('0');

  const [mode, setMode] = useState('3');
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(undefined);
  const [carrier, setCarrier] = useState(undefined);
  const [tanker, setTanker] = useState(undefined);
  const [trip, setTrip] = useState(undefined);

  const IS_CREATING = !value;
  const CAN_PRINT = ['2', '3', '4'].includes(tab);
  const READ_ONLY = value?.shls_status !== 'NEW SCHEDULE' && !IS_CREATING;
  const CAN_VIEW_REPORTS = value?.shlsload_load_id !== '0';
  const CAN_MAKE_TRANSACTIONS = value?.shls_status !== 'NEW SCHEDULE' && manageMakeManualTransaction;
  const CAN_ADD_HOST_DATA = value?.shls_ld_type === '2' && manageAdditionalHostData;

  const { resetFields, setFieldsValue } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(LOAD_SCHEDULES.READ);
  };

  const onFinish = async () => {
    const record = await form.validateFields();

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
        await axios
          .post(IS_CREATING ? LOAD_SCHEDULES.CREATE : LOAD_SCHEDULES.UPDATE, values)
          .then(() => {
            onComplete();

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
        await axios
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
        await axios
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
        await axios
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

  const onShowDeliveryDetails = () => {
    history.push({
      pathname: ROUTES.DELIVERY_DETAILS,
      state: {
        dd_supp_code: value?.supplier_code,
        dd_tripord_no: value?.shls_trip_no,
        dd_ld_type: value?.shls_ld_type,
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
      content: tab === '3' && (
        <Checkbox onChange={(e) => setFieldsValue({ supermode: e.target.checked })}>
          Ignore Tolerance Check
        </Checkbox>
      ),
      onOk: async () => {
        await axios
          .get(selected?.url, {
            params: {
              supplier: value.supplier_code,
              trip_no: value.shls_trip_no,
              supermode: form.getFieldValue('supermode'),
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

  useEffect(() => {
    if (value) {
      setTab('0');

      setFieldsValue({
        shls_ld_type: value.shls_ld_type,
      });
      setMode(value.shls_ld_type);
    }
  }, [setFieldsValue, value]);

  useEffect(() => {
    if (!value) {
      setSupplier(undefined);
      setDrawer(undefined);
      setCarrier(undefined);
      setTanker(undefined);
      setTrip(undefined);

      resetFields();
    }
  }, [resetFields, visible, value]);

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
          {!READ_ONLY && (
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

          {!IS_CREATING && !READ_ONLY && (
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

          {!IS_CREATING && (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={onShowDeliveryDetails}
              disabled={!access?.canUpdate}
              style={{ marginRight: 5 }}
            >
              {t('operations.showDeliveryDetails')}
            </Button>
          )}

          {CAN_PRINT && !IS_CREATING && (
            <Button type="primary" icon={<PrinterOutlined />} onClick={onPrint} disabled={!access?.canUpdate}>
              {t('operations.print')}
            </Button>
          )}

          {!CAN_PRINT && !IS_CREATING && (
            <>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={onPrint}
                disabled={!access?.canUpdate}
                style={{ marginRight: 5 }}
              >
                {t('operations.repost')}
              </Button>

              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={onReverse}
                disabled={!access?.canUpdate || !CAN_MAKE_TRANSACTIONS}
                style={{ marginRight: 5 }}
              >
                {t('operations.reverse')}
              </Button>

              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={onArchive}
                disabled={!access?.canUpdate || !CAN_MAKE_TRANSACTIONS || READ_ONLY}
              >
                {t('operations.archive')}
              </Button>
            </>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError initialValues={{ shls_ld_type: '3' }}>
        <Tabs defaultActiveKey="1" activeKey={tab} onChange={setTab} animated={false}>
          <TabPane tab={t('tabColumns.general')} key="0">
            <Form.Item name="supermode" noStyle />
            <Form.Item name="shls_ld_type">
              <Radio.Group
                buttonStyle="solid"
                style={{ marginBottom: 10 }}
                onChange={(event) => setMode(event.target.value)}
                disabled={!!value}
              >
                <Radio.Button value="3">{t('operations.preOrder')}</Radio.Button>
                <Radio.Button value="2">{t('operations.preSchedule')}</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Supplier form={form} value={value} onChange={setSupplier} />
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
              <Dates form={form} value={value} />

              <Col span={6}>
                <SoldTo form={form} value={value} mode={mode} />
              </Col>

              <Col span={6}>
                <ShipTo form={form} value={value} mode={mode} carrier={carrier} />
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

            {mode === '3' && !READ_ONLY && <Products form={form} value={value} drawer={drawer} />}

            {READ_ONLY && <Summary value={value} />}
          </TabPane>

          <TabPane
            tab={t('tabColumns.transactions')}
            disabled={IS_CREATING || !CAN_MAKE_TRANSACTIONS}
            key="1"
          >
            <Transactions value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.driverInstructions')} disabled={IS_CREATING} key="2">
            <DriverInstructions value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.bol')} disabled={IS_CREATING || !CAN_VIEW_REPORTS} key="3">
            <BOL value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.loadReport')} disabled={IS_CREATING || !CAN_VIEW_REPORTS} key="4">
            <LoadReport value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.seals')} disabled={IS_CREATING || !showSeals} key="5">
            <Seals value={value} />
          </TabPane>

          <TabPane
            tab={t('tabColumns.additionalHostData')}
            disabled={IS_CREATING || !CAN_ADD_HOST_DATA}
            key="7"
          >
            <AdditionalHostData value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
