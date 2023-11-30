import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import {
  Card,
  Checkbox,
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
import api, { ATG_FIELDS, TANK_ATG_FIELDS } from '../../../api';
import columns from './columns';

const { TabPane } = Tabs;

const TankAtgFields = ({ terminal, code, value, access, config }) => {
  const { t, i18n } = useTranslation();

  const [records, setRecords] = useState([]);
  const [availFields, setAvailFields] = useState([]);
  const [autoMode, setAutoMode] = useState(undefined);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const url = code && terminal ? `${TANK_ATG_FIELDS.READ}?tank=${code}&terminal=${terminal}` : null;

  const { data: payload } = useSWR(url);
  const { data: atgLabels } = useSWR(ATG_FIELDS.GET_LABELS);
  const { data: atgFields, loading: isValidating } = useSWR(TANK_ATG_FIELDS.GET_FIELDS);

  const lang3 = { en: 'ENG', cn: 'CHN' };

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const IS_CREATING = !selected;
  const percentPrecision = 4;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const fields = columns(t, config);

  const onCheck = (v) => {
    setAutoMode(v.target.checked);
    setFieldsValue({
      atg_field_auto: v.target.checked,
    });
  };

  const handleFormState = (visibility, value) => {
    if (!visibility) {
      setAutoMode(false);
      setFieldsValue({
        atg_field_code: null,
        atg_field_auto: null,
      });
    }
    setSelected(value);
    setVisible(visibility);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    values.atg_field_tank = code;
    values.atg_field_terminal = terminal;
    values.atg_field_user = user_code;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANK_ATG_FIELDS.CREATE : TANK_ATG_FIELDS.UPDATE, values)
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
                message:
                  error.code === 400 || error.code === 500
                    ? IS_CREATING
                      ? t('messages.createFailed')
                      : t('messages.updateFailed')
                    : error.type,
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
          .post(TANK_ATG_FIELDS.DELETE, selected)
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
                // message: error.type,
                message: error.code === 500 ? t('messages.deleteFailed') : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const validateList = (rule, input) => {
    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    return Promise.resolve();
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        style={{ float: 'right' }}
        disabled={!(code && terminal) || !access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.addTankAtgField')}
      </Button>
    </>
  );

  useEffect(() => {
    if (code && terminal && payload && atgLabels && i18n) {
      // console.log('......................payload and labels', i18n, payload, atgLabels);
      const list = [];
      for (let i = 0; i < payload?.records?.length; i++) {
        const item = payload?.records?.[i];
        item['atg_field_name'] = atgLabels?.records?.[0]?.['ENG'][item['atg_field_code']];
        // item['atg_field_label'] = item['atg_field_label'] + ': ' + atgLabels?.records?.[0]?.[lang3[i18n.language||'en']][item['atg_field_code']];
        item['atg_field_label'] =
          atgLabels?.records?.[0]?.[lang3[i18n.language || 'en']][item['atg_field_code']];
        list.push(item);
      }
      setRecords(list);
    }
  }, [code, terminal, payload, atgLabels, i18n]);

  useEffect(() => {
    if (payload && atgFields && atgLabels && i18n) {
      // console.log('......................payload and labels', i18n, payload, atgLabels);
      const list = [];
      for (let i = 0; i < atgFields?.records?.length; i++) {
        const item = atgFields?.records?.[i];
        item['atg_field_name'] = atgLabels?.records?.[0]?.['ENG'][item['atg_field_code']];
        // item['atg_field_label'] = item['atg_field_label'] + ': ' + atgLabels?.records?.[0]?.[lang3[i18n.language||'en']][item['atg_field_code']];
        item['atg_field_label'] =
          atgLabels?.records?.[0]?.[lang3[i18n.language || 'en']][item['atg_field_code']];
        const used = payload?.records?.find((o) => o?.atg_field_code === item['atg_field_code']);
        item['atg_field_used'] = !used ? false : true;
        list.push(item);
      }
      setAvailFields(list);
    }
  }, [payload, atgFields, atgLabels, i18n]);

  useEffect(() => {
    if (code && terminal && !selected) {
      resetFields();
    }
  }, [resetFields, setFieldsValue, code, terminal, selected]);

  useEffect(() => {
    if (selected) {
      resetFields();
      setAutoMode(selected?.atg_field_auto);
      setFieldsValue({
        atg_field_code: selected?.atg_field_code,
        atg_field_auto: selected?.atg_field_auto,
      });
    } else {
    }
  }, [resetFields, selected]);

  return (
    <>
      <Card hoverable>
        <Row gutter={[2, 12]}>
          <Col span={10}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.tank')} span={1}>
                {code && terminal && value?.tank_code + ' - ' + value?.tank_name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={14}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.terminal')} span={1}>
                {code && terminal && value?.tank_terminal + ' - ' + value?.tank_sitename}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div>{modifiers}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              data={!(code && terminal) ? [] : records}
              parentHeight="272px"
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        styles={{ body: { paddingTop: 5 } }}
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="30vw"
        open={visible}
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
              disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>

            {!IS_CREATING && (
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
          </>
        }
      >
        <Form layout="vertical" form={form} scrollToFirstError>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('tabColumns.general')} key="1">
              <Form.Item
                name="atg_field_code"
                label={t('fields.atgFieldCode')}
                rules={[{ required: true, validator: validateList, label: t('fields.atgFieldCode') }]}
              >
                <Select
                  popupMatchSelectWidth={false}
                  allowClear
                  loading={isValidating}
                  showSearch
                  disabled={!IS_CREATING}
                  // onChange={onChange}
                  optionFilterProp="children"
                  placeholder={!value ? t('placeholder.selectAtgField') : null}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {availFields?.map((item, index) => (
                    <Select.Option key={index} value={item.atg_field_code} disabled={item?.atg_field_used}>
                      {`[${item.atg_field_code}] - [${item.atg_field_label}] - [${item.atg_field_type}]`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="atg_field_auto" label={''}>
                <Checkbox checked={autoMode} onChange={onCheck}>
                  {t('fields.atgFieldAuto')}
                </Checkbox>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default TankAtgFields;
