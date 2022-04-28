import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider, Drawer, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { Name, Code, Terminal, Product, Density, Flags, DailyVariance, MontlhyVariance } from './fields';
import api, { TANKS, BASE_PRODUCTS } from '../../../api';

import TankAdaptiveFlowControl from '../../tanks/afc';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [tab, setTab] = useState('1');
  const [product, setProduct] = useState(undefined);

  const { data: baseItem } = useSWR(`${BASE_PRODUCTS.READ}?base_code=${product}`);

  const IS_CREATING = !value;

  const onFormClosed = () => {
    setTab('1');
    setProduct(undefined);
    handleFormState(false, null);
  };

  const onComplete = (tank_code) => {
    setTab('1');
    setProduct(undefined);
    handleFormState(false, null);
    mutate(TANKS.READ);
    if (tank_code) {
      setFilterValue('' + tank_code);
    } else {
      setFilterValue(' ');
    }
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

  const onFinish = async () => {
    const values = await form.validateFields();

    let lines = null;
    if (!IS_CREATING && values?.tank_base !== value?.tank_base) {
      lines = (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.warningTankBaseChange')}
        </Card>
      );
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content: lines,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANKS.CREATE : TANKS.UPDATE, values)
          .then((response) => {
            onComplete(values?.tank_code);

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
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANKS.DELETE, value)
          .then((response) => {
            onComplete(null);

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
    }
  }, [value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width="55vw"
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
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || tab !== '1'}
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
        <Tabs defaultActiveKey="1" animated={false} onChange={setTab}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Terminal form={form} value={value} />
            <Code form={form} value={value} config={config} />
            <Name form={form} value={value} />
            <Product form={form} value={value} onChange={setProduct} />
            <Density form={form} value={value} product={product} config={config} />
            <Divider>{t('divider.variances')}</Divider>
            <DailyVariance form={form} value={value} base={baseItem?.records?.[0]} />
            <MontlhyVariance form={form} value={value} base={baseItem?.records?.[0]} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags form={form} value={value} />
          </TabPane>

          {config.siteUseAFC && !IS_CREATING && (
            <TabPane key="2" tab={t('tabColumns.adaptiveFlowControl')}>
              <TankAdaptiveFlowControl
                terminal={value?.tank_terminal}
                code={value?.tank_code}
                tanks={[value]}
                access={access}
                value={value}
              />
            </TabPane>
          )}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
