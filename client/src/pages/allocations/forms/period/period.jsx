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
import moment from 'dayjs';
import useSWR from 'swr';
import _ from 'lodash';

import { SETTINGS } from '../../../../constants';
import { FormModal } from '../../../../components/';
import { getDateTimeFormat } from '../../../../utils';
import api, { ALLOCATIONS } from '../../../../api';

const { TabPane } = Tabs;

const PeriodForm = ({ value, units, parent, revalidate, data, onChange }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const FORMAT = getDateTimeFormat();

  const IS_CREATING = !value;

  const onFinish = (values) => {
    const tmp_start = values.aiprd_daystart?.format(SETTINGS.DATE_TIME_FORMAT);
    const tmp_end = values.aiprd_dayend?.format(SETTINGS.DATE_TIME_FORMAT);
    if (tmp_start >= tmp_end) {
      notification.error({
        key: 'date-range-warning',
        message: t('messages.seqDateRange'),
        description: `${t('descriptions.seqDateRange')}`,
      });
      return;
    }
    if (
      _.find(data?.records, (item) => {
        return (
          item.aiprd_index != values.aiprd_index &&
          ((tmp_start < item.aiprd_dayend && tmp_end > item.aiprd_daystart) ||
            (tmp_end > item.aiprd_daystart && tmp_start < item.aiprd_dayend))
        );
      })
    ) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.periodOverlap'),
      });
      return;
    }

    const record = {
      aiprd_seq: parent?.aitem_index,
      aiprd_type: parent?.aitem_type,
      aiprd_cmpycode: parent?.aitem_cmpycode,
      aiprd_prodcode: parent?.aitem_prodcode,
      aiprd_suppcode: parent?.aitem_suppcode,
      ...values,
      aiprd_dayend: values.aiprd_dayend?.format(SETTINGS.DATE_TIME_FORMAT),
      aiprd_daystart: values.aiprd_daystart?.format(SETTINGS.DATE_TIME_FORMAT),
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
          .post(IS_CREATING ? ALLOCATIONS.PERIOD_CREATE : ALLOCATIONS.PERIOD_UPDATE, record)
          .then(() => {
            Modal.destroyAll();

            revalidate();
            onChange();
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
          .post(ALLOCATIONS.PERIOD_DELETE, value)
          .then(() => {
            Modal.destroyAll();

            revalidate();
            onChange();
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
      form.setFieldsValue({
        aiprd_index: value.aiprd_index,
        aiprd_qtylimit: value.aiprd_qtylimit,
        aiprd_produnit: value.aiprd_produnit,
        aiprd_daystart: moment(value.aiprd_daystart, SETTINGS.DATE_TIME_FORMAT) || null,
        aiprd_dayend: moment(value.aiprd_dayend, SETTINGS.DATE_TIME_FORMAT) || null,
      });
    } else {
      form.setFieldsValue({
        aiprd_daystart: moment(),
        aiprd_dayend: moment().add(7, 'days'),
        aiprd_index: data?.records?.length + 1 || 1,
      });
    }
  }, [IS_CREATING]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab={t('tabColumns.general')} key="1">
          <Form.Item name="aiprd_index" label={t('fields.period')}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="aiprd_qtylimit" label={t('fields.quantityAllocated')} rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="aiprd_produnit" label={t('fields.unit')} rules={[{ required: true }]}>
            <Select
              popupMatchSelectWidth={false}
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

          <Form.Item name="aiprd_daystart" label={t('fields.startDate')} rules={[{ required: true }]}>
            <DatePicker format={FORMAT} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="aiprd_dayend" label={t('fields.endDate')} rules={[{ required: true }]}>
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

const Period = ({ selected, setVisibility, visible, onChange }) => {
  const [form] = Form.useForm();

  const SHOULD_FETCH = !!selected;

  const {
    data,
    isValidating,
    mutate: revalidate,
  } = useSWR(
    SHOULD_FETCH
      ? `${ALLOCATIONS.PERIOD_READ}?aiprd_seq=${selected?.aitem_index}&aiprd_type=${selected?.aitem_type}&aiprd_cmpycode=${selected?.aitem_cmpycode}&aiprd_prodcode=${selected?.aitem_prodcode}&aiprd_suppcode=${selected?.aitem_suppcode}`
      : null
  );

  const { data: options } = useSWR(ALLOCATIONS.PERIOD_TYPES);

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
          onChange={onChange}
        />
      ),
      id: value?.aitem_prodcode,
      name: value?.aitem_prodname,
      t,
    });
  };

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        aitem_prodcode: selected.aitem_prodcode,
        aitem_prodname: selected.aitem_prodname,
      });
    }
  }, [selected]);

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      width="33vw"
      onClose={() => setVisibility(false)}
      open={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => setVisibility(false)}
          >
            {t('operations.cancel')}
          </Button>

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
        <Tabs.TabPane key="1" tab={t('operations.allocationPeriod')}>
          <Form layout="vertical" form={form}>
            <Form.Item name="aitem_prodcode" label={t('fields.productCode')}>
              <Input readOnly />
            </Form.Item>

            <Form.Item name="aitem_prodname" label={t('fields.productName')}>
              <Input readOnly />
            </Form.Item>

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
                      avatar={
                        <Avatar style={{ backgroundColor: item.active ? 'red' : null }}>
                          {item.aiprd_index}
                        </Avatar>
                      }
                      // eslint-disable-next-line
                      title={
                        <a>
                          {`${t('fields.quantityAllocated')}: ${item.aiprd_qtylimit} ${item.aiprd_unitname}`}{' '}
                        </a>
                      }
                      description={`${t('fields.startDate')}: ${moment(
                        item.aiprd_daystart,
                        SETTINGS.DATE_TIME_FORMAT
                      ).format(getDateTimeFormat())} -> ${t('fields.endDate')}: ${moment(
                        item.aiprd_dayend,
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
