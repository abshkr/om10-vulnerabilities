import React, { useEffect } from 'react';

import {
  Drawer,
  Card,
  Button,
  List,
  Avatar,
  Tabs,
  Form,
  Input,
  Modal,
  notification,
  DatePicker,
  InputNumber,
  Select,
  Row,
  Col,
} from 'antd';

import {
  LoadingOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import _ from 'lodash';
import useSWR from 'swr';
import moment from 'moment';

import { FormModal } from '../../../../components/';
import { getDateTimeFormat } from '../../../../utils';
import { SETTINGS } from '../../../../constants';
import api, { ORDER_LISTINGS } from '../../../../api';

const { TabPane } = Tabs;

const PeriodForm = ({ value, units, parent, revalidate, data, form }) => {
  const { t } = useTranslation();

  //const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const FORMAT = getDateTimeFormat();

  const IS_CREATING = !value;

  const onFinish = (values) => {
    const record = {
      oprd_order_id: parent?.oitem_order_id,
      oprd_prod_code: parent?.oitem_prod_code,
      oprd_prod_cmpy: parent?.oitem_prod_cmpy,
      //oprd_prod_unit: parent?.oitem_prod_unit,
      ...values,
      oprd_prod_unit: !values?.oprd_prod_unit ? 5 : values?.oprd_prod_unit,
      oprd_period_start: values.oprd_period_start?.format(SETTINGS.DATE_TIME_FORMAT),
      oprd_period_end: values.oprd_period_end?.format(SETTINGS.DATE_TIME_FORMAT),
    };

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? ORDER_LISTINGS.PERIOD_CREATE : ORDER_LISTINGS.PERIOD_UPDATE, record)
          .then((response) => {
            Modal.destroyAll();

            revalidate();
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
          .post(ORDER_LISTINGS.PERIOD_DELETE, value)
          .then(() => {
            Modal.destroyAll();

            revalidate();
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
    if (!IS_CREATING) {
      setFieldsValue({
        oprd_period_no: value.oprd_period_no,
        oprd_prod_qty: value.oprd_prod_qty,
        oprd_prod_unit: value.oprd_prod_unit,
        oprd_period_start: moment(value.oprd_period_start, SETTINGS.DATE_TIME_FORMAT) || null,
        oprd_period_end: moment(value.oprd_period_end, SETTINGS.DATE_TIME_FORMAT) || null,
      });
    } else {
      setFieldsValue({
        oprd_period_start: moment(),
        oprd_period_end: moment().add(7, 'days'),
        oprd_period_no: data?.records?.length + 1 || 1,
      });
    }
  }, [IS_CREATING, value, data, setFieldsValue]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{ oprd_prod_unit: String(parent?.oitem_prod_unit) }}
    >
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab={t('tabColumns.general')} key="1">
          <Form.Item name="oprd_period_no" label={t('fields.oprdPeriodNo')}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="oprd_prod_qty" label={t('fields.oprdProdQty')}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="oprd_prod_unit" label={t('fields.oprdUnitName')}>
            <Select
              dropdownMatchSelectWidth={false}
              allowClear
              loading={!units}
              showSearch
              optionFilterProp="children"
              placeholder={t('placeholder.selectQtyUnit')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {units.map((item, index) => (
                <Select.Option key={index} value={item.unit_id}>
                  {item.description}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="oprd_period_start" label={t('fields.oprdPeriodStart')}>
            <DatePicker format={FORMAT} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="oprd_period_end" label={t('fields.oprdPeriodEnd')}>
            <DatePicker format={FORMAT} style={{ width: '100%' }} />
          </Form.Item>
        </TabPane>
      </Tabs>

      <Form.Item>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {IS_CREATING ? t('operations.create') : t('operations.update')}
        </Button>

        {!IS_CREATING && (
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            style={{ float: 'right', marginRight: 5 }}
            onClick={onDelete}
          >
            {t('operations.delete')}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

const Period = ({ visible, setVisibility, selected, order, form }) => {
  //const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const SHOULD_FETCH = !!selected;

  const { data, isValidating, revalidate } = useSWR(
    SHOULD_FETCH
      ? `${ORDER_LISTINGS.PERIOD_READ}?oprd_order_id=${selected?.oitem_order_id}&oprd_prod_cmpy=${selected?.oitem_prod_cmpy}&oprd_prod_code=${selected?.oitem_prod_code}`
      : null
  );

  const { data: options } = useSWR(ORDER_LISTINGS.UNIT_TYPES);

  const { t } = useTranslation();

  const onMutation = (value) => {
    FormModal({
      value,
      form: (
        <PeriodForm
          value={value}
          units={options?.records || []}
          parent={selected}
          revalidate={revalidate}
          data={data}
          form={form}
        />
      ),
      id: value?.oitem_prod_code,
      name: value?.oitem_prod_name,
      t,
    });
  };

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        oitem_supp_name: order.order_supp_name,
        oitem_cust_name: order.order_cust_name,
        oitem_cust_no: order.order_cust_no,
        oitem_prod_code: selected.oitem_prod_code,
        oitem_prod_name: selected.oitem_prod_name,
        //oitem_prod_unit: selected.oitem_prod_unit,
      });
    }
  }, [selected, setFieldsValue]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      width="40vw"
      onClose={() => setVisibility(false)}
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ float: 'right', marginRight: 5 }}
            onClick={() => onMutation(null)}
          >
            {t('operations.create')}
          </Button>
        </>
      }
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane key="1" tab={t('operations.orderPeriod')}>
          <Form layout="vertical" form={form}>
            <Form.Item name="oitem_cust_no" label={t('fields.orderCustNo')}>
              <Input readOnly />
            </Form.Item>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="oitem_supp_name" label={t('fields.orderSuppName')}>
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="oitem_cust_name" label={t('fields.orderCustName')}>
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="oitem_prod_code" label={t('fields.oitemProdCode')}>
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="oitem_prod_name" label={t('fields.oitemProdName')}>
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>

            <List
              size="small"
              style={{ height: '60vh', overflowY: 'auto', marginTop: 10 }}
              itemLayout="horizontal"
              dataSource={data?.records}
              loading={{
                indicator: <LoadingOutlined />,
                spinning: isValidating,
              }}
              renderItem={(item) => (
                <Card
                  size="small"
                  hoverable
                  style={{ marginBottom: 5, marginTop: 5 }}
                  bodyStyle={{ padding: 5 }}
                >
                  <List.Item
                    actions={[
                      <Button
                        icon={<EditOutlined />}
                        type="primary"
                        shape="circle"
                        onClick={() => onMutation(item)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar>{item.oprd_period_no}</Avatar>}
                      // eslint-disable-next-line
                      title={
                        <Row gutter={[8, 8]}>
                          <Col span={12} style={{ color: '#00FF00' }}>
                            {`${t('fields.oprdProdQty')}: ${item.oprd_prod_qty} ${item.oprd_unit_name}`}{' '}
                          </Col>
                          <Col span={12} style={{ color: '#FF0000' }}>
                            {`${t('fields.oprdProdUsed')}: ${item.oprd_prod_used} ${item.oprd_unit_name}`}{' '}
                          </Col>
                        </Row>
                      }
                      description={`${t('fields.oprdPeriodStart')}: ${moment(
                        item.oprd_period_start,
                        SETTINGS.DATE_TIME_FORMAT
                      ).format(getDateTimeFormat())} -> ${t('fields.oprdPeriodEnd')}: ${moment(
                        item.oprd_period_end,
                        SETTINGS.DATE_TIME_FORMAT
                      ).format(getDateTimeFormat())}`}
                    />
                  </List.Item>
                </Card>
              )}
            />
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
};

export default Period;
