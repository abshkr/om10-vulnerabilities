import React, { useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { Company, Customer, Partner } from './fields';
import { PARTNERSHIP } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [company, setCompany] = useState(undefined);
  
  const IS_CREATING = !value;
  const IS_CUST = (value && value.partner_cust_acct.length > 0)
  
  const onComplete = () => {
    handleFormState(false, null);
    mutate(PARTNERSHIP.READ);
  };

  const onFinish = (values) => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(PARTNERSHIP.UPDATE, _.omit(values, ['partner']))
          .then(
            axios.spread((response) => {
              onComplete();

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
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
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(PARTNERSHIP.UPDATE, {
            partner_cust_acct: value.partner_cust_acct,
            partner_cmpy_code: value.partner_cmpy_code,
            partners: [],
          })
          .then(
            axios.spread((response) => {
              mutate(PARTNERSHIP.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`,
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed'),
            });
          });
      },
    });
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="40vw"
      visible={visible}>
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Company form={form} value={value} onChange={setCompany} disable={!IS_CREATING}/>
            <Customer form={form} value={value} company={company} disable={!IS_CREATING}/>
            <Partner form={form} value={value} company={company} disable={!IS_CUST && !IS_CREATING}/>
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || !IS_CUST }
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormModal;
