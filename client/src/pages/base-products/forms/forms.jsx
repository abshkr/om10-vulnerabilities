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
  Classification,
  Group,
  Color,
  DensityRange,
  RefSpecTemp,
  CorrectionMethod,
  StockUnit,
  GainLossUnit,
  HotTempFlag,
  AdaptiveFlowControlFlag,
  AdaptiveFlowControlPriority,
  PidxCode,
  RefCode,
  ManualFlag,
} from './fields';

import api, { BASE_PRODUCTS, ADAPTIVE_FLOW_CONTROL, BASE_OWNERS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config, setFilterValue }) => {
  const { manageHotProduct, manageBaseProductDensityRange, siteUseAFC, siteUseProdOwnership } = config;
  const [classification, setClassification] = useState(undefined);
  const [afcEnabled, setAfcEnabled] = useState(value?.afc_enabled);

  const [afcEnabledNote, setAfcEnabledNote] = useState('');
  const [ratioCount, setRatioCount] = useState(0);
  const [tankCount, setTankCount] = useState(0);
  const [transCount, setTransCount] = useState(0);
  const [owners, setOwners] = useState([]);

  const url =
    value && value?.base_code
      ? `${ADAPTIVE_FLOW_CONTROL.MAX_FLOW_DETAILS}?base_code=${value?.base_code}`
      : null;
  const { data: payload } = useSWR(url);

  const url2 = value && value?.base_code ? `${BASE_OWNERS.READ}?base_code=${value?.base_code}` : null;
  const { data: payload2 } = useSWR(url2);

  const { data: ratios } = useSWR(`${BASE_PRODUCTS.CHECK_BASE_RATIOS}?base_code=${value?.base_code}`, {
    refreshInterval: 0,
  });
  const { data: tanks } = useSWR(`${BASE_PRODUCTS.CHECK_BASE_TANKS}?base_code=${value?.base_code}`, {
    refreshInterval: 0,
  });
  const { data: trans } = useSWR(`${BASE_PRODUCTS.CHECK_BASE_TRANS}?base_code=${value?.base_code}`, {
    refreshInterval: 0,
  });

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const onFormClosed = () => {
    setClassification(undefined);
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

  const onComplete = (base_code) => {
    setClassification(undefined);
    resetFields();
    handleFormState(false, null);
    mutate(BASE_PRODUCTS.READ);
    handleFormState(false, null);
    if (base_code) {
      setFilterValue('' + base_code);
    } else {
      setFilterValue(' ');
    }
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
            .post(IS_CREATING ? BASE_PRODUCTS.CREATE : BASE_PRODUCTS.UPDATE, values)
            .then(() => {
              onComplete(values.base_code);

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
          .post(BASE_PRODUCTS.DELETE, value)
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

  useEffect(() => {
    if (value && payload) {
      const tanks = value?.base_tank_list.split(', ');
      let rest = '';
      _.forEach(tanks, (tank) => {
        const found = _.find(payload?.records, (item) => item.tank_code === tank);
        if (!found) {
          if (rest.length > 0) {
            rest += ', ';
          }
          rest += tank;
        }
      });
      setAfcEnabledNote(rest);
    }
  }, [value, payload]);

  useEffect(() => {
    if (value && payload2) {
      setOwners(payload2.records);
    } else {
      setOwners([]);
    }
  }, [value, payload2]);

  useEffect(() => {
    if (ratios) {
      setRatioCount(ratios?.records?.[0]?.cnt);
    }
  }, [ratios]);

  useEffect(() => {
    if (tanks) {
      setTankCount(tanks?.records?.[0]?.cnt);
    }
  }, [tanks]);

  useEffect(() => {
    if (trans) {
      setTransCount(trans?.records?.[0]?.cnt);
    }
  }, [trans]);

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={onExitClicked}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width="50vw"
      open={visible}
      footer={
        <>
          {!IS_CREATING && (
            <div style={{ float: 'left', marginRight: 5 }}>
              <Tooltip placement="topRight" title={t('descriptions.countBaseRatios')}>
                <Tag color={ratioCount > 0 ? 'red' : 'green'}>
                  {t('fields.countBaseRatios') + ': ' + ratioCount}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countBaseTanks')}>
                <Tag color={tankCount > 0 ? 'red' : 'green'}>
                  {t('fields.countBaseTanks') + ': ' + tankCount}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countBaseTrans')}>
                <Tag color={transCount > 0 ? 'red' : 'green'}>
                  {t('fields.countBaseTrans') + ': ' + transCount}
                </Tag>
              </Tooltip>
            </div>
          )}

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
              disabled={!access?.canDelete || ratioCount > 0 || tankCount > 0 || transCount > 0}
              onClick={onDelete}
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
            <Row gutter={[12, 4]}>
              <Col span={config?.siteUseBaseRefCode ? 12 : 24}>
                <Code form={form} value={value} config={config} />
              </Col>
              {config?.siteUseBaseRefCode && (
                <Col span={12}>
                  <RefCode form={form} value={value} config={config} />
                </Col>
              )}
            </Row>

            <Name form={form} value={value} />

            <Row gutter={[12, 4]}>
              <Col span={config?.siteEnabledPIDX ? 12 : 24}>
                <Classification
                  form={form}
                  value={value}
                  onChange={setClassification}
                  classification={classification}
                />
              </Col>
              {config?.siteEnabledPIDX && (
                <Col span={12}>
                  <PidxCode form={form} value={value} />
                </Col>
              )}
            </Row>

            {manageBaseProductDensityRange && (
              <DensityRange form={form} value={value} classification={classification} config={config} />
            )}

            <Row gutter={[12, 4]}>
              <Col span={12}>
                <Group form={form} value={value} />
              </Col>
              <Col span={12}>
                <Color form={form} value={value} />
              </Col>
            </Row>

            <GainLossUnit form={form} value={value} tankCount={tankCount} />
            {siteUseProdOwnership && <StockUnit form={form} value={value} owners={owners} />}

            {/* <Divider style={{padding: 0, margin: 0}} /> */}

            <Row gutter={[12, 4]}>
              {manageHotProduct && (
                <Col span={12}>
                  <HotTempFlag form={form} value={value} />
                </Col>
              )}
              {config?.siteUseBaseManualFlag && (
                <Col span={12}>
                  <ManualFlag form={form} value={value} />
                </Col>
              )}
            </Row>

            <Row gutter={[12, 4]}>
              <Col span={12}>
                <RefSpecTemp form={form} value={value} />
              </Col>
              <Col span={12}>
                <CorrectionMethod form={form} value={value} />
              </Col>
            </Row>

            {siteUseAFC && (
              <>
                {/* <Divider style={{padding: 0, margin: 0}} /> */}
                <Row gutter={[12, 4]}>
                  <Col span={12}>
                    <AdaptiveFlowControlFlag
                      form={form}
                      value={value}
                      note={afcEnabledNote}
                      onChange={setAfcEnabled}
                    />
                  </Col>
                  <Col span={12}>
                    <AdaptiveFlowControlPriority
                      form={form}
                      value={value}
                      config={config}
                      flag={afcEnabled}
                    />
                  </Col>
                </Row>
              </>
            )}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
