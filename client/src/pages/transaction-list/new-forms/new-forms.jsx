import React, { useEffect, useState, Fragment } from 'react';

import { WarningOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { Form, Button, Card, Tabs, Modal, notification, Drawer } from 'antd';

import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { TRANSACTION_LIST } from '../../../api';

import { useConfig } from '../../../hooks';

import Transactions from './transactions';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(true);

  const onFormClosed = () => {
    handleFormState(false, null);
  };

  const onComplete = (value) => {
    handleFormState(false, null);
    mutate(url);
  };

  const onExitClicked = () => {
    onFormClosed();
    return;

    if (!config?.siteFormCloseAlert) {
      onFormClosed();
      return;
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        onFormClosed();
      },
    });
  };

  const onClose = () => {
    Modal.confirm({
      title: t('prompts.closeTransaction'),
      okText: t('operations.close'),
      okType: 'danger',
      icon: <WarningOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        setLoading(true);
        await api
          .post(TRANSACTION_LIST.CANCEL_TRANSACTION, {
            trsa_id: value?.trsa_id,
          })
          .then((response) => {
            onComplete(value?.trsa_id);
            notification.success({
              message: t('messages.closeSuccess'),
              description: t('descriptions.closeSuccess'),
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.closeFailed'),
            });
          })
          .finally(() => {
            //setSelected([]);
            setLoading(false);
          });
      },
    });
  };

  // const MASK_CLOSE_FLAG = config?.siteFormCloseAlert ? false : IS_CREATING;
  // const MASK_FLAG = config?.siteFormCloseAlert ? true : (IS_CREATING || tab === '8' || tab === '9');
  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={false}
      mask={false}
      destroyOnClose
      placement="right"
      width={'75vw'}
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onExitClicked()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="danger"
            icon={<WarningOutlined />}
            style={{ marginRight: 5, float: 'right' }}
            onClick={onClose}
            disabled={value?.trsa_ed_dmy !== '' || !access.canUpdate}
            loading={isLoading}
          >
            {t('operations.closeTransaction')}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.transactions')} key="1">
            <Transactions value={value} config={config} isLoading={isLoading} setLoading={setLoading} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
