import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

import _ from 'lodash';

import {
  Flag,
  Code,
  Name,
  Grid,
  Address,
  DocumentType,
  TransportType,
  QuantityType,
  EquipmentType,
  TripTime,
  Distance,
  Tarrif,
  Contact,
  Phone,
  Profile,
} from './fields';

import { LocationCode, LocationName, CustomerSupplier, CustomerCategory, CustomerLink } from './links';
import { AddressesPopup } from 'pages/addresses';

import api, { DELV_LOCATIONS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const [flag, setFlag] = useState(undefined);
  const [supplier, setSupplier] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [drawerWidth, setDrawerWidth] = useState('50vw');
  const [mainTabOn, setMainTabOn] = useState(true);

  if (!!value) {
    value.delv_cust_suppcode = null;
    value.delv_cust_catgcode = null;
  }

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === '1') {
      setDrawerWidth('50vw');
      setMainTabOn(true);
    } else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  };

  const onFormClosed = () => {
    resetFields();
    handleFormState(false, null);
    setDrawerWidth('50vw');
    setMainTabOn(true);
  };

  const onComplete = (delv_code) => {
    resetFields();
    handleFormState(false, null);
    mutate(DELV_LOCATIONS.READ);
    setDrawerWidth('50vw');
    setMainTabOn(true);
    if (delv_code) {
      setFilterValue("" + delv_code);
    } else {
      setFilterValue(' ');
    }

  };

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? DELV_LOCATIONS.CREATE : DELV_LOCATIONS.UPDATE, values)
          .then(() => {
            onComplete(values?.delv_code);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
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
          .post(DELV_LOCATIONS.DELETE, value)
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

  /* useEffect(() => {
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]); */

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
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

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={(IS_CREATING ? !access?.canCreate : !access?.canUpdate) || !mainTabOn}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete || !mainTabOn}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={{
          delv_qty_typeid: '0',
          delv_trsp_typeid: '0',
          delv_doc_typeid: '0',
          delv_trip_time: 0,
          delv_distance: 0,
          delv_tarrif: 0,
        }}
      >
        <Tabs onChange={doTabChanges}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Row gutter={[8, 2]}>
              <Col span={24}>
                <Flag form={form} value={value} onChange={setFlag} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Code form={form} value={value} />
              </Col>
              <Col span={12}>
                <Name form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Address form={form} value={value} reload={mainTabOn} />
              </Col>
              <Col span={12}>
                <Grid form={form} value={value} flag={flag} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <TransportType form={form} value={value} />
              </Col>
              <Col span={12}>
                <DocumentType form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <QuantityType form={form} value={value} />
              </Col>
              <Col span={12}>
                <EquipmentType form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <TripTime form={form} value={value} />
              </Col>
              <Col span={12}>
                <Distance form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Tarrif form={form} value={value} />
              </Col>
              <Col span={12}>
                <Contact form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 2]}>
              <Col span={12}>
                <Phone form={form} value={value} />
              </Col>
              <Col span={12}>
                <Profile form={form} value={value} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={t('tabColumns.linkToCustomers')} disabled={IS_CREATING} key="2">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <LocationCode form={form} value={value} />
              </Col>
              <Col span={12}>
                <LocationName form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <CustomerSupplier form={form} value={value} onChange={setSupplier} />
              </Col>
              <Col span={12}>
                <CustomerCategory form={form} value={value} onChange={setCategory} />
              </Col>
            </Row>
            <Divider />
            <CustomerLink
              form={form}
              value={value}
              supplier={supplier}
              category={category}
              location={value?.delv_code}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.addresses')} key="3">
            <AddressesPopup popup={true} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
