import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { mutate } from 'swr';
import moment from 'moment';
import _ from 'lodash';

import { Type, Period, InventoryDate, SelectAllTanks, Terminal } from './fields';
import api, { INVENTORY_REQUESTS } from '../../../api';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config, refresh }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [requestType, setRequestType] = useState(value?.tkrq_type);
  const [periodType, setPeriodType] = useState(value?.tkrq_period);
  const [terminal, setTerminal] = useState(value?.tkrq_depot);

  const { data: tank_counts } = useSWR(`${INVENTORY_REQUESTS.COUNT_TANKS}?terminal=${terminal}`);

  const IS_CREATING = !value;

  const onFormClosed = () => {
    setRequestType(undefined);
    setPeriodType(undefined);
    setTerminal(undefined);
    resetFields();
    handleFormState(false, null);
  };

  const onExitClicked = () => {
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

  const onComplete = () => {
    setRequestType(undefined);
    setPeriodType(undefined);
    setTerminal(undefined);
    handleFormState(false, null);
    // mutate(INVENTORY_REQUESTS.READ);
    if (refresh) {
      refresh();
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (values.tkrq_period === '0') {
      if (values?.tkrq_due < moment().add(10, 'minutes')) {
        values.tkrq_due = moment().add(10, 'minutes');
      }
    }

    values.tkrq_due = values?.tkrq_due?.format(SETTINGS.DATE_TIME_FORMAT);
    values.tkrq_key = IS_CREATING ? values?.tkrq_due : value?.tkrq_key;
    values.tkrq_first = values?.tkrq_due;
    values.tkrq_allflag = !values?.tkrq_allflag ? false : values?.tkrq_allflag;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? INVENTORY_REQUESTS.CREATE : INVENTORY_REQUESTS.UPDATE, values)
          .then((response) => {
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
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(INVENTORY_REQUESTS.DELETE, value)
          .then((response) => {
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
    if (!value && !visible) {
      resetFields();
    } else {
      console.log('...................here it is again...', value);
      setRequestType(value?.tkrq_type);
      setPeriodType(value?.tkrq_period);
      setTerminal(value?.tkrq_depot);
    }
  }, [value, visible]);

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={onExitClicked}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="40vw"
      open={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={onExitClicked}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={
              (IS_CREATING ? !access?.canCreate : !access?.canUpdate) ||
              (terminal !== undefined && tank_counts?.records?.[0]?.cnt === '0')
            }
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" style={{ height: '80vh' }}>
          <TabPane tab={t('tabColumns.general')} key="1">
            <Terminal
              form={form}
              value={value}
              terminal={terminal}
              onChange={setTerminal}
              counts={tank_counts?.records?.[0]?.cnt}
            />
            <Type form={form} value={value} type={requestType} onChange={setRequestType} />
            <Period form={form} value={value} onChange={setPeriodType} />
            <InventoryDate form={form} value={value} config={config} period={periodType} />
            <div style={{ margin: 20 }}></div>
            <SelectAllTanks form={form} value={value} type={requestType} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
