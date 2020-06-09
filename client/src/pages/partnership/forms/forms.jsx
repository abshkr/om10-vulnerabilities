import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';


import { Company, Customer, Partner } from './fields';
import { PARTNERSHIP } from '../../../api';

const TabPane = Tabs.TabPane;

const PartnerForm = ({ value, visible, handleFormState, auth }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;
  
  const [company, setCompany] = useState(value?.partner_cmpy_code);
  const [selected, setSelected] = useState(null);
  
  const IS_CREATING = !value;
  
  const onComplete = () => {
    handleFormState(false, null);
    mutate(PARTNERSHIP.READ);
  };
  
  const onFinish = async () => {
    const values = await form.validateFields();
    values.partners = selected
    
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
              onComplete();

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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setCompany(null);
    }
  }, [value]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="40vw"
      visible={visible}footer={
        <>
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
            disabled={IS_CREATING ? !auth?.canCreate : !auth?.canUpdate}
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!auth?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Company form={form} value={value} onChange={setCompany} disable={!IS_CREATING}/>
            <Customer form={form} value={value} company={company} />
            <Divider>{t("pageNames.partners")}</Divider>
            <Partner form={form} value={value} company={company} setSelected={setSelected}/>
            {/* <Form.Item name="partners" noStyle >
              <DataTable
                data={partnersData}
                height="78vh"
                minimal
                columns={columns(t)}
                handleSelect={handleSelect}
              />
            </Form.Item> */}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default PartnerForm;
