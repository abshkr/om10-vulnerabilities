import React, { useState, useEffect } from 'react';

import {
  Card,
  Button,
  Drawer,
  Modal,
  Form,
  Tabs,
  Input,
  Select,
  notification,
  Row,
  Col,
  Descriptions,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../components';
import api, { ADAPTIVE_FLOW_CONTROL } from '../../../api';
import columns from './columns';

const { TabPane } = Tabs;

const TankAdaptiveFlowControl = ({ terminal, code, value, access, tanks }) => {
  const url = code ? `${ADAPTIVE_FLOW_CONTROL.MAX_FLOW_DETAILS}?tank_code=${code}` : null;

  const { data } = useSWR(url);
  const { data: currentRate } = useSWR(ADAPTIVE_FLOW_CONTROL.CURRENT_FLOW, { refreshInterval: 1000 });

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currTankLevel, setCurrTankLevel] = useState(value?.tank_prod_lvl);
  const [currFlowRate, setCurrFlowRate] = useState(0);

  const IS_CREATING = !selected;

  const { resetFields, setFieldsValue } = form;

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    values.id = IS_CREATING ? '-1' : selected?.id;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? ADAPTIVE_FLOW_CONTROL.CREATE : ADAPTIVE_FLOW_CONTROL.UPDATE, values)
          .then(() => {
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
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ADAPTIVE_FLOW_CONTROL.DELETE, selected)
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

  const validate = (rule, input) => {
    const limit = rule?.max || 256;

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const loadStraps = async (value) => {
    console.log('Forms: loadStraps', value);
  };

  const handleImport = () => {
    // pop up the dialog to manage straping data import
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        style={{ float: 'right' }}
        disabled={!access.canCreate || data?.records?.length >= 4}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.addFlowRate')}
      </Button>
    </>
  );

  useEffect(() => {
    if (code && currentRate) {
      const item = _.find(currentRate, (o) => o.tank_code === code);
      if (item) {
        setCurrTankLevel(item?.tank_level);
        setCurrFlowRate(_.round(item?.flow_rate, 0));
      }
    }
  }, [code, currentRate]);

  useEffect(() => {
    if (code && !selected) {
      form.resetFields();

      setFieldsValue({
        tank_code: code,
      });
    }
  }, [resetFields, setFieldsValue, code, selected]);

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        tank_code: selected?.tank_code,
        tank_level: selected?.tank_level,
        flow_rate: selected?.tank_flowrate,
      });
    } else {
    }
  }, [resetFields, selected]);

  return (
    <>
      <Card hoverable>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }}>
              <Descriptions.Item label={t('fields.tankCode')} span={24}>
                {value?.tank_code}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.tankName')} span={24}>
                {value?.tank_name}
              </Descriptions.Item>
              <Descriptions.Item label={`${t('fields.currentTankLevel')} (${t('units.mm')})`} span={24}>
                {currTankLevel}
              </Descriptions.Item>
              <Descriptions.Item label={`${t('fields.currentFlowRate')} (${t('units.lpm')})`} span={24}>
                {currFlowRate}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.baseProductCode')} span={24}>
                {value?.tank_base}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.baseProductName')} span={24}>
                {value?.tank_base_name}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.adaptiveFlowControl')} span={24}>
                {value?.afc_enabled === 'Y' ? (
                  <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
                ) : (
                  <CloseCircleOutlined style={{ fontSize: 18, color: '#ec6e68' }} />
                )}
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.adaptiveArmPriority')} span={24}>
                {value?.afc_priority}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          {/* </Row>
        <Row gutter={[12, 12]}> */}
          <Col span={12}>
            <Row gutter={[12, 8]}>
              <Col span={24}>{modifiers}</Col>
            </Row>
            <Row gutter={[12, 8]}>
              <Col span={24}>
                <DataTable
                  minimal={true}
                  columns={fields}
                  data={data?.records}
                  // extra={modifiers}
                  parentHeight="272px"
                  onClick={(payload) => handleFormState(true, payload)}
                  handleSelect={(payload) => handleFormState(true, payload[0])}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="30vw"
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

            <Button
              type="primary"
              icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
              htmlType="submit"
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>

            {!IS_CREATING && (
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                style={{ float: 'right', marginRight: 5 }}
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
              <Form.Item
                name="tank_code"
                label={t('fields.tank')}
                rules={[{ required: true, validator: validate, label: t('fields.tank') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  disabled={true}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {tanks.map((item, index) => (
                    <Select.Option key={index} value={item.tank_code}>
                      {item.tank_code +
                        ': ' +
                        item.tank_name +
                        ' [' +
                        item.tank_base +
                        ' - ' +
                        item.tank_base_name +
                        ' - ' +
                        item.tank_bclass_name +
                        ']'}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="tank_level"
                label={t('fields.tankLevel')}
                rules={[{ required: true, validator: validate, label: t('fields.tankLevel') }]}
              >
                <Input
                  type="number"
                  disabled={!IS_CREATING}
                  style={{ width: '100%' }}
                  min={0}
                  addonAfter={t('units.mm')}
                />
              </Form.Item>

              <Form.Item
                name="flow_rate"
                label={t('fields.flowRate')}
                rules={[{ required: true, validator: validate, label: t('fields.flowRate') }]}
              >
                <Input type="number" style={{ width: '100%' }} min={0} addonAfter={t('units.lpm')} />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default TankAdaptiveFlowControl;
