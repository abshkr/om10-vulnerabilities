import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import {
  Form,
  Button,
  Tabs,
  Modal,
  notification,
  message,
  Drawer,
  Divider,
  Row,
  Col,
  Tag,
  Tooltip,
  Card,
} from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';

import _ from 'lodash';

import {
  Code,
  Name,
  BayType,
  BayLoadType,
  BayArea,
  BayLoadOption,
  BayStats,
  BayLockFlag,
  BayAuxiliary,
  BayChannel,
  BayHost,
  BayInstance,
  BayServer,
  BayDevice,
  BayDeviceType,
  BayDeviceLockFlag,
  BayDeviceAuxiliary,
  BayDeviceChannel,
  BayDeviceHost,
  BayDeviceInstance,
  BayDeviceServer,
} from './fields';

import api, { BAY_CONFIGURATION } from '../../../api';

const FormModal = ({ value, visible, handleFormState, access, config, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const disabledFlag = true;

  const { resetFields } = form;

  const onFormClosed = () => {
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

  const onComplete = (ba_code) => {
    resetFields();
    handleFormState(false, null);
    mutate(BAY_CONFIGURATION.READ);
    handleFormState(false, null);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      // now optional dropdown lists can be unselected and have the value of "undefined".
      // need to send blank string when it is undefined
      values.base_prod_group = !values?.base_prod_group ? '' : values?.base_prod_group;

      // added in OM5K-8358 and removed in OM5K-9497
      /* if (values?.afc_priority === undefined) {
        values.afc_priority = '';
      } */

      Modal.confirm({
        title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
        okText: IS_CREATING ? t('operations.create') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await api
            .post(IS_CREATING ? BAY_CONFIGURATION.CREATE : BAY_CONFIGURATION.UPDATE, values)
            .then(() => {
              onComplete(values.ba_code);

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
    } catch (error) {
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
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
          .post(BAY_CONFIGURATION.DELETE, value)
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
    if (!value && !visible) {
      resetFields();
    }
  }, [resetFields, value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={onExitClicked}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
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
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Card
          size="small"
          hoverable
          style={{ marginBottom: 5, marginTop: 5 }}
          bodyStyle={{ padding: 5 }}
          title={t('tabColumns.bayMain')}
        >
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <Code form={form} value={value} config={config} />
            </Col>
            <Col span={12}>
              <Name form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <BayType form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={12}>
              <BayLoadType form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <BayArea form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={12}>
              <BayLoadOption form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <BayLockFlag form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={12}>
              <BayStats form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <BayHost form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={12}>
              <BayServer form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={8}>
              <BayInstance form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={8}>
              <BayChannel form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={8}>
              <BayAuxiliary form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
        </Card>

        <Card
          size="small"
          hoverable
          style={{ marginBottom: 5, marginTop: 5 }}
          bodyStyle={{ padding: 5 }}
          title={t('tabColumns.bayDevice')}
        >
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <BayDevice form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={12}>
              <BayDeviceLockFlag form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={24}>
              <BayDeviceType form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={12}>
              <BayDeviceHost form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={12}>
              <BayDeviceServer form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
          <Row gutter={[12, 4]}>
            <Col span={8}>
              <BayDeviceInstance form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={8}>
              <BayDeviceChannel form={form} value={value} disabled={disabledFlag} />
            </Col>
            <Col span={8}>
              <BayDeviceAuxiliary form={form} value={value} disabled={disabledFlag} />
            </Col>
          </Row>
        </Card>
      </Form>
    </Drawer>
  );
};

export default FormModal;
/*
BAD_INSTANCE              VARCHAR2(24) 
BAD_CHANNEL               VARCHAR2(16) 
BAD_AUX                   VARCHAR2(40) 
BAD_HOSTNAME              VARCHAR2(28) 
BAD_SERVER                VARCHAR2(28) 

BA_INSTANCE               VARCHAR2(24)  
BA_CHANNEL                VARCHAR2(16)  
BA_AUX                    VARCHAR2(40)  
BA_HOSTNAME               VARCHAR2(28)  
BA_SERVER                 VARCHAR2(28)  
*/
