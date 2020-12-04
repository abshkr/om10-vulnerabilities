import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  WarningOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  RedoOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';

import { 
  MovementType, 
  Unit, 
  Source, 
  Destination,
  BatchCode, 
  Quantity, 
  Class, 
  BaseProduct,
  StartFolio,
  EndFolio,
  BayLoaded
} from './fields';

import { 
  Form, 
  Button, 
  Tabs, 
  Modal, 
  notification, 
  Drawer, 
  Input, 
  InputNumber, 
  Divider, 
  Row, 
  Col,
  Progress,
  Tag
} from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import api, { PRODUCT_MOVEMENTS } from 'api';
import useSWR from 'swr';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const IS_CREATING = !value;

  const [base, setBase] = useState(null);
  const [movementType, setMovementType] = useState('NEW');

  /** Status:
  0	NEW
  1 In progress
  2 Halted
  3 COMPLETE
  4 Does not exist */

  const onComplete = (pmv_batchcode) => {
    handleFormState(false, null);
    mutate(PRODUCT_MOVEMENTS.READ);
    setMovementType('NEW');
    if (pmv_batchcode) {
      setFilterValue('' + pmv_batchcode);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (values.pmv_srctype !== '3' && values.pmv_dsttype !== '3') {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('validate.prodMoveSrcAndDst'),
      });
      return;
    }

    if (movementType === 'COMPLETE') {
      values.pmv_status = 3;
    }

    Modal.confirm({
      title: t('prompts.create'),
      okText: t('operations.create'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.CREATE, values)
          .then((response) => {
            onComplete(values?.pmv_batchcode);

            notification.success({
              message: t('messages.createSuccess'),
              description: t('descriptions.createSuccess'),
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

  const onHalt = () => {
    Modal.confirm({
      title: t('prompts.pmvHalt'),
      okText: t('operations.halt'),
      okType: 'primary',
      icon: <WarningOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.HALT, value)
          .then((response) => {
            onComplete(value?.pmv_batchcode);

            notification.success({
              message: t('messages.haltSuccess'),
              description: t('descriptions.haltSuccess'),
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

  const onStart = () => {
    Modal.confirm({
      title: t('prompts.pmvStart'),
      okText: t('operations.start'),
      okType: 'primary',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.START, value)
          .then((response) => {
            onComplete(value?.pmv_batchcode);

            notification.success({
              message: t('messages.startSuccess'),
              description: t('descriptions.startSuccess'),
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

  const onCompletePmv = () => {
    Modal.confirm({
      title: t('prompts.pmvComplete'),
      okText: t('operations.complete'),
      okType: 'primary',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.COMPLETE, value)
          .then((response) => {
            onComplete(value?.pmv_batchcode);

            notification.success({
              message: t('messages.startSuccess'),
              description: t('descriptions.startSuccess'),
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

  const onCompleteBatch = () => {
    Modal.confirm({
      title: t('prompts.pmvCompleteBatch'),
      okText: t('operations.start'),
      okType: 'primary',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.COMPLETE_BATCH, value)
          .then((response) => {
            onComplete(value?.pmv_batchcode);

            notification.success({
              message: t('messages.submitSuccess'),
              description: t('descriptions.pmvBatchCompleted'),
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
      icon: <DeleteOutlined />,
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.DELETE, value)
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

  const validateInitial = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.initialStandardVolume')}`);
    }

    return Promise.resolve();
  };

  const validateDens = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.prodMovDens')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible]);

  // const layout = {
  //   labelCol: {
  //     span: 6,
  //   },
  //   wrapperCol: {
  //     span: 18,
  //   },
  // };

  return (
    IS_CREATING || value?.pmv_status === '0' ? 
      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        forceRender
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="50vw"
        visible={visible}
        footer={
          <>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              style={{ float: 'right' }}
              onClick={() => handleFormState(false, null)}
            >
              {t('operations.cancel')}
            </Button>

            {IS_CREATING && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                htmlType="submit"
                style={{ float: 'right', marginRight: 5 }}
                onClick={onFinish}
                disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
              >
                {t('operations.create')}
              </Button>
            )}

            {!IS_CREATING && (value.pmv_status === '0') /* New */ && (
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={onStart}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete}
              >
                {t('operations.start')}
              </Button>
            )}

          </>
        }
      >
        <Form
          layout="vertical"
          // layout={{...layout}}
          form={form}
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{
            pmv_state_name: 'NEW',
            pmv_unit_name: 'l',
            pmv_unit: '28',
          }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('tabColumns.general')} key="1">
              <MovementType value={value} onChange={setMovementType} />
              <BaseProduct form={form} value={value} setBase={setBase} />
              <Source form={form} value={value} base={base} />
              <Destination form={form} value={value} base={base} />
              <BatchCode form={form} value={value} />
              <Class form={form} value={value} />
              <Quantity form={form} value={value} />
              <Unit form={form} value={value} />
              {IS_CREATING && movementType === 'COMPLETE' && (
                <Form.Item
                  name="pmv_opening_qty"
                  label={t('fields.initialStandardVolume')}
                  rules={[{ required: true, validator: validateInitial }]}
                >
                  <Input disabled={!!value} />
                </Form.Item>
              )}
              {IS_CREATING && movementType === 'COMPLETE' && (
                <Form.Item
                  name="pmv_obsvd_dens"
                  label={t('fields.prodMovDens')}
                  rules={[{ required: true, validator: validateDens }]}
                >
                  <InputNumber min={0} disabled={!!value} />
                </Form.Item>
              )}
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    :
    //Modify/View
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          {IS_CREATING && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              htmlType="submit"
              style={{ float: 'right', marginRight: 5 }}
              onClick={onFinish}
              disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            >
              {t('operations.create')}
            </Button>
          )}

          {!IS_CREATING && (value.pmv_status === '2') /* Halted */ && (
              <Button
                type="primary"
                icon={<StepForwardOutlined />}
                onClick={onCompletePmv}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete}
              >
                {t('operations.complete')}
              </Button>
            )}

          {!IS_CREATING && (value.pmv_status === '0' || value.pmv_status === '2') /* New Or Halted */ && (
            <Button
              type="primary"
              icon={<RedoOutlined />}
              onClick={onStart}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
            >
              {t('operations.start')}
            </Button>
          )}

          {!IS_CREATING && value.pmv_status === '0' /* New */ && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={onDelete}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}

          {!IS_CREATING && value.pmv_status === '3' /* Complete */ && (
            <Button
              type="primary"
              icon={<WarningOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onCompleteBatch}
            >
              {t('operations.completeBatch')}
            </Button>
          )}

          {!IS_CREATING && value.pmv_status === '1' /* In Progress */ && (
            <Button
              type="danger"
              icon={<WarningOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onHalt}
            >
              {t('operations.halt')}
            </Button>
          )}
        </>
      }
    >
      <Form
        layout="vertical"
        // layout={{...layout}}
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{
          pmv_state_name: 'NEW',
          pmv_unit_name: 'l',
          pmv_unit: '28',
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Divider orientation="left">{t('fields.beginMovement')}</Divider>
            {/* <StartFolioDes form={form} value={value} /> */}
            <StartFolio form={form} value={value} />
            <Divider orientation="left">{t('fields.details')}</Divider>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <BaseProduct form={form} value={value} setBase={setBase} />
              </Col>
              <BayLoaded form={form} value={value} />
            </Row>
            <Row gutter={[8, 8]}>
              <Source form={form} value={value} base={base} />
              <Destination form={form} value={value} base={base} />
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={6}>
                <BatchCode form={form} value={value} />
              </Col>
              <Col span={6}>
                <Class form={form} value={value} />
              </Col>
              <Col span={6}>
                <Quantity form={form} value={value} />
              </Col>
              <Col span={6}>
                <Unit form={form} value={value} />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={4}>
                <Tag color="#0097df" style={{width: '100%', textAlign: 'center'}}>{t('fields.progress')}</Tag>
              </Col>
              <Col span={20}>
                <Progress 
                  strokeWidth={15} 
                  // strokeColor="#0097df"
                  percent={value?.percentage} 
                  status={value?.percentage < 100 ? 'active' : 'success'}
                />
              </Col>
            </Row>
            <Divider orientation="left">{t('fields.endMovement')}</Divider>
            <EndFolio form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
