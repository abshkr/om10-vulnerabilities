import React, { useEffect, useState, useRef } from 'react';

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
  Monitor,
  Source,
  Destination,
  BatchCode,
  Quantity,
  Class,
  BaseProduct,
  StartFolio,
  EndFolio,
  BayLoaded,
} from './fields';
import ProgressTable from './progress-table/progress-table';

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
  Tag,
} from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import MakeNomination from './make-nomination';

import api, { PRODUCT_MOVEMENTS } from 'api';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  // setFilterValue,
  refresh,
  onLocate,
  setPage,
  config,
  maskFlag,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const IS_CREATING = !value;

  const [base, setBase] = useState(null);
  const [srcBase, setSrcBase] = useState(null);
  const [dstBase, setDstBase] = useState(null);
  const [srcType, setSrcType] = useState(undefined);
  const [dstType, setDstType] = useState(undefined);
  const [movementType, setMovementType] = useState('NEW');
  const [mvModalVisbile, setMvModalVisible] = useState(false);
  const [dstTankLoading, setDstTankLoading] = useState(false);

  /** Status:
  0	NEW
  1 In progress
  2 Halted
  3 COMPLETE
  4 Does not exist */

  // for testing of GUI only
  // if (value) value.pmv_status = '3';

  const monitoringTank = () => {
    let status = value?.pmv_monitor;
    if (!status) {
      status = srcType === '3' ? 'S' : dstType === '3' ? 'D' : '';
    }

    const statusText = status === 'S' ? t('fields.source') : status === 'D' ? t('fields.destination') : '';
    const tankText = status === 'S' ? value?.pmv_srccode : status === 'D' ? value?.pmv_dstcode : '';

    return `${t('fields.monitoring')}: ${statusText} ${tankText}`;
  };

  const onComplete = (pmv_number) => {
    // resetFields();
    handleFormState(false, null);
    if (pmv_number) {
      onLocate(pmv_number);
    } else {
      onLocate('');
    }
    setPage(1);
    refresh();
    setMovementType('NEW');
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (values?.pmv_srctype !== '3' && values?.pmv_dsttype !== '3') {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('validate.prodMoveSrcAndDst'),
      });
      return;
    }

    if (movementType === 'COMPLETE') {
      values.pmv_status = 3;
    }

    // assign value to pmv_prdctlnk
    // if it is a RECEIPT type, the destination is a tank, the PMV_DST_BASE has the value and PMV_SRC_BASE is NULL,
    // assign the value of PMV_DST_BASE to PMV_PRDCTLNK
    if (values?.pmv_srctype !== '3' && values?.pmv_dsttype === '3') {
      values.pmv_prdctlnk = values?.pmv_dst_base;
    }
    // if it is a DISPOSAL type, the source is a tank, the PMV_SRC_BASE has the value and PMV_DST_BASE is NULL,
    // assign the value of PMV_SRC_BASE to PMV_PRDCTLNK
    if (values?.pmv_srctype === '3' && values?.pmv_dsttype !== '3') {
      values.pmv_prdctlnk = values?.pmv_src_base;
    }
    // if it is a TRANSFER type, both the source and destination are tanks, the PMV_SRC_BASE and PMV_DST_BASE both have the values,
    // assign the value of PMV_SRC_BASE to PMV_PRDCTLNK considering TPMMAN process currently writes the data of source tank to PRODUCT_MVMNTS table.
    if (values?.pmv_srctype === '3' && values?.pmv_dsttype === '3') {
      values.pmv_prdctlnk = values?.pmv_src_base;
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
            console.log('.......response data....', response?.data?.result?.[0]?.id);
            onComplete(response?.data?.result?.[0]?.id);

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
            onComplete(value?.pmv_number);

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
      title: dstTankLoading ? t('descriptions.pmvDstTankBayLoaded') : t('prompts.pmvStart'),
      okText: t('operations.start'),
      okType: 'primary',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PRODUCT_MOVEMENTS.START, value)
          .then((response) => {
            onComplete(value?.pmv_number);

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
            onComplete(value?.pmv_number);

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
            onComplete(value?.pmv_number);

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

  return IS_CREATING || value?.pmv_status === '0' ? (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={maskFlag}
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

          {!IS_CREATING && value.pmv_status === '0' /* New */ && (
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
            {/* <BaseProduct form={form} value={value} setBase={setBase} /> */}

            <Row gutter={[8, 8]}>
              <Source form={form} value={value} base={srcBase} setBase={setSrcBase} setType={setSrcType} />
            </Row>
            <Row gutter={[8, 8]}>
              <Destination
                form={form}
                value={value}
                base={dstBase}
                setBase={setDstBase}
                setType={setDstType}
                setLoading={setDstTankLoading}
              />
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={8}>
                <BatchCode form={form} value={value} config={config} />
              </Col>
              <Col span={8}>
                <Class form={form} value={value} />
              </Col>
              <Col span={8}>
                <Quantity form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Unit form={form} value={value} />
              </Col>
              <Col span={8}></Col>
              <Col span={8}>
                <Monitor form={form} value={value} srcType={srcType} dstType={dstType} />
              </Col>
            </Row>

            {IS_CREATING && movementType === 'COMPLETE' && (
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    name="pmv_opening_qty"
                    label={t('fields.initialStandardVolume')}
                    rules={[{ required: true, validator: validateInitial }]}
                  >
                    <Input disabled={!!value} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="pmv_obsvd_dens"
                    label={t('fields.prodMovDens')}
                    rules={[{ required: true, validator: validateDens }]}
                  >
                    <InputNumber min={0} disabled={!!value} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  ) : (
    //Modify/View
    <React.Fragment>
      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        forceRender
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={maskFlag}
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

            {!IS_CREATING && value.pmv_status === '2' /* Halted */ && (
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

            {!IS_CREATING && value.pmv_status === '3' /* Complete */ && config.prodmvmnt_to_movement && (
              <Button
                type="primary"
                style={{ float: 'right', marginRight: 5 }}
                onClick={() => setMvModalVisible(true)}
                disabled={value?.pmv_mv_id > 0 || value?.pmv_moved_qty <= 0}
              >
                {t('operations.createNomination')}
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
              <Divider style={{ marginBottom: 5, marginTop: 5 }} orientation="left">
                {t('fields.beginMovement')} ({monitoringTank()})
              </Divider>
              {/* <StartFolioDes form={form} value={value} /> */}
              <StartFolio form={form} value={value} />
              <Divider style={{ marginBottom: 5, marginTop: 5 }} orientation="left">
                {t('fields.details')} ({monitoringTank()})
              </Divider>
              <Row gutter={[8, 1]}>
                {/* <Col span={6}>
                  <BaseProduct form={form} value={value} setBase={setBase} />
                </Col> */}
                <BayLoaded form={form} value={value} />
              </Row>
              <Row gutter={[8, 1]}>
                <Source form={form} value={value} base={srcBase} setBase={setSrcBase} setType={setSrcType} />
              </Row>
              <Row gutter={[8, 1]}>
                <Destination
                  form={form}
                  value={value}
                  base={dstBase}
                  setBase={setDstBase}
                  setType={setDstType}
                  setLoading={setDstTankLoading}
                />
              </Row>
              <Row gutter={[8, 1]}>
                <Col span={8}>
                  <BatchCode form={form} value={value} config={config} />
                </Col>
                <Col span={8}>
                  <Class form={form} value={value} />
                </Col>
                <Col span={4}>
                  <Quantity form={form} value={value} />
                </Col>
                <Col span={4}>
                  <Unit form={form} value={value} />
                </Col>
              </Row>
              <Row gutter={[8, 1]}>
                <Col span={4}>
                  <Tag color="#0097df" style={{ width: '100%', textAlign: 'center' }}>
                    {t('fields.progress')}
                  </Tag>
                </Col>
                <Col span={18}>
                  <Progress
                    strokeWidth={15}
                    // strokeColor={value?.percentage > 100 ? "red" : null}
                    percent={value?.percentage}
                    showInfo={false}
                    status={
                      value?.percentage < 100 ? 'active' : value?.percentage > 120 ? 'exception' : 'success'
                    }
                  />
                </Col>
                <Col span={2}>
                  <Tag style={{ width: '100%', textAlign: 'center' }}>{value?.percentage + '%'} </Tag>
                </Col>
              </Row>
              <Divider style={{ marginBottom: 5 }} orientation="left">
                {t('fields.endMovement')} ({monitoringTank()})
              </Divider>
              <EndFolio form={form} value={value} />
            </TabPane>
            {value.pmv_status === '3' && ( //Only display this tab when it is COMPLETE
              <TabPane tab={t('tabColumns.summary')} key="2">
                <ProgressTable value={value} config={config} />
              </TabPane>
            )}
          </Tabs>
        </Form>
      </Drawer>
      {mvModalVisbile && (
        <MakeNomination
          value={value}
          config={config}
          t={t}
          visible={mvModalVisbile}
          setVisible={setMvModalVisible}
          onComplete={onComplete}
        />
      )}
    </React.Fragment>
  );
};

export default FormModal;
