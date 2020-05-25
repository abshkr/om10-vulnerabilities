import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Row, Col, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

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
} from './fields';
import { LOAD_SCHEDULES } from '../../../api';
import Compartments from './compartments';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [tab, setTab] = useState('0');

  const [mode, setMode] = useState('1');
  const [supplier, setSupplier] = useState(undefined);
  const [drawer, setDrawer] = useState(undefined);
  const [carrier, setCarrier] = useState(undefined);
  const [tanker, setTanker] = useState(undefined);

  const IS_CREATING = !value;
  const CAN_PRINT = ['2', '3', '4'].includes(tab);

  const { resetFields, setFieldsValue } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(LOAD_SCHEDULES.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    console.log(values);
    // Modal.confirm({
    //   title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
    //   okText: IS_CREATING ? t('operations.create') : t('operations.update'),
    //   okType: 'primary',
    //   icon: <QuestionCircleOutlined />,
    //   cancelText: t('operations.no'),
    //   centered: true,
    //   onOk: async () => {
    //     await axios
    //       .post(IS_CREATING ? LOAD_SCHEDULES.CREATE : LOAD_SCHEDULES.UPDATE, values)
    //       .then(() => {
    //         onComplete();

    //         notification.success({
    //           message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
    //           description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
    //         });
    //       })
    //       .catch((errors) => {
    //         _.forEach(errors.response.data.errors, (error) => {
    //           notification.error({
    //             message: error.type,
    //             description: error.message,
    //           });
    //         });
    //       });
    //   },
    // });
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

  const onPrint = () => {
    console.log('printing');
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_ld_type: value.shls_ld_type,
      });
      setMode(value.shls_ld_type);
    }
  }, [setFieldsValue, value]);

  useEffect(() => {
    if (!value) {
      resetFields();
      setSupplier(undefined);
      setDrawer(undefined);
      setCarrier(undefined);
      setTanker(undefined);
    }
  }, [resetFields, value]);

  console.log(mode);
  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="60vw"
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}

          {CAN_PRINT && !IS_CREATING && (
            <Button type="dashed" icon={<PrinterOutlined />} onClick={onPrint} disabled={!access?.canUpdate}>
              {t('operations.print')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey={tab} onChange={setTab}>
          <TabPane tab={t('tabColumns.general')} key="0">
            <Form.Item name="shls_ld_type">
              <Radio.Group
                buttonStyle="solid"
                style={{ marginBottom: 10 }}
                onChange={(event) => setMode(event.target.value)}
                defaultValue="1"
                disabled={!!value}
              >
                <Radio.Button value="1">{t('operations.preOrder')}</Radio.Button>
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

            {mode === '1' && (
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <SoldTo form={form} value={value} />
                </Col>

                <Col span={12}>
                  <ShipTo form={form} value={value} carrier={carrier} />
                </Col>
              </Row>
            )}

            <Row gutter={[8, 8]}>
              <Dates form={form} value={value} />
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={6}>
                <TripNumber form={form} value={value} supplier={supplier} />
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

            {mode === '2' && <Compartments form={form} value={value} drawer={drawer} tanker={tanker} />}
          </TabPane>

          <TabPane tab={t('tabColumns.transactions')} disabled={IS_CREATING} key="1"></TabPane>

          <TabPane tab={t('tabColumns.driverInstructions')} disabled={IS_CREATING} key="2"></TabPane>

          <TabPane tab={t('tabColumns.bol')} disabled={IS_CREATING} key="3"></TabPane>

          <TabPane tab={t('tabColumns.loadReport')} disabled={IS_CREATING} key="4"></TabPane>

          <TabPane tab={t('tabColumns.additionalHostData')} disabled={IS_CREATING} key="5"></TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
