import React, { useEffect, useState } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import {
  Account,
  Supplier,
  Customer,
  Address
} from './fields';

import { CUSTOMERS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const [supplier, setSupplier] = useState(undefined);
  const [drawerWidth, setDrawerWidth] = useState('60vw');
  const [mainTabOn, setMainTabOn] = useState(true);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === "1") {
      setDrawerWidth('60vw');
      setMainTabOn(true);
    }
    else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  }

  const onFormClosed = () => {
    handleFormState(false, null);
    setDrawerWidth('60vw');
    setMainTabOn(true);
};

  const onComplete = () => {
    handleFormState(false, null);
    mutate(CUSTOMERS.READ);
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
        await axios
          .post(IS_CREATING ? CUSTOMERS.CREATE : CUSTOMERS.UPDATE, values)
          .then(() => {
            onComplete();

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
        await axios
          .post(CUSTOMERS.DELETE, value)
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

  useEffect(() => {
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]);


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
              disabled={(!access?.canDelete) ||  !mainTabOn}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError 
      initialValues={{ cust_account: '', cust_supp_code:null, cust_cmpy_code:null, cust_addr_code:null}}>
        <Tabs onChange={doTabChanges}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Account form={form} value={value} />
            <Supplier form={form} value={value} onChange={setSupplier} />
            <Customer form={form} value={value} supplier={supplier} />
            <Address form={form} value={value} />
          </TabPane>
          <TabPane tab={t('tabColumns.addresses')} key="2">
          </TabPane>
          <TabPane tab={t('tabColumns.customerCategories')} disabled={IS_CREATING} key="3">
          </TabPane>
          <TabPane tab={t('tabColumns.allocations')} disabled={IS_CREATING} key="4">
          </TabPane>
          <TabPane tab={t('tabColumns.orderListing')} disabled={IS_CREATING} key="5">
          </TabPane>
          <TabPane tab={t('tabColumns.deliveryLocations')} disabled={IS_CREATING} key="6">
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
