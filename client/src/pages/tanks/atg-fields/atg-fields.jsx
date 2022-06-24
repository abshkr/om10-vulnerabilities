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

const AtgFields = ({ access, config }) => {
  const { t, i18n } = useTranslation();

  const [records, setRecords] = useState([]);
  const [availFields, setAvailFields] = useState([]);
  const [activeFlag, setActiveFlag] = useState(undefined);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const url = `${ATG_FIELDS.READ}`;

  const { data: payload } = useSWR(url);
  const { data: atgLabels } = useSWR(ATG_FIELDS.GET_LABELS);
  const { data: atgFields, loading: isValidating } = useSWR(ATG_FIELDS.GET_FIELDS);

  const lang3 = { en: 'ENG', cn: 'CHN' };

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const IS_CREATING = !selected;
  const percentPrecision = 4;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const fields = columns(t, config);

  const checkFieldUsage = async () => {
    const values = {
      field_code: selected?.atg_field_code,
    };

    const results = await api.post(TANK_ATG_FIELDS.CHECK_FIELD_BY_CODE, values);
    console.log('............checkFieldUsage', results);

    if (results?.data) {
      return _.toNumber(results?.data?.records?.[0]?.cnt);
    } else {
      return 0;
    }
  };

  const getTanksByCode = async () => {
    const values = {
      field_code: selected?.atg_field_code,
    };

    const results = await api.post(TANK_ATG_FIELDS.GET_TANKS_BY_CODE, values);
    console.log('............checkFieldUsage', results);

    if (results?.data) {
      return results?.data?.records;
    } else {
      return [];
    }
  };

  const getTankList = (list, code) => {
    let txt = '';
    for (let i = 0; i < list?.length; i++) {
      if (txt?.length > 0) {
        txt += ', ';
      }
      txt += list?.[i]?.[code];
    }

    return txt;
  };

  const onCheck = async (v) => {
    if (!v.target.checked) {
      // need check if the field has been used by the particular tank(s)
      // const used = await checkFieldUsage();
      // if (used > 0) {
      const used = await getTanksByCode();
      if (used?.length > 0) {
        const lst = getTankList(used, 'atg_field_tank');
        notification.warning({
          message: t('messages.atgFieldUsedByTank'),
          description: `${t('descriptions.atgFieldUsedByTank')}: [${lst}]`,
        });
        return;
      }
    }

    setActiveFlag(v.target.checked);
    setFieldsValue({
      atg_field_active: v.target.checked,
    });
  };

  const handleFormState = (visibility, value) => {
    if (!visibility) {
      setActiveFlag(false);
      setFieldsValue({
        atg_field_code: null,
        atg_field_active: null,
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

    const item = availFields?.find((o) => o.atg_field_code === values?.atg_field_code);

    values.atg_field_name = item.atg_field_name;
    values.atg_field_label = values?.atg_field_code;
    values.atg_field_type = item.atg_field_type;
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
          .post(IS_CREATING ? ATG_FIELDS.CREATE : ATG_FIELDS.UPDATE, values)
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

  const onDelete = async () => {
    // need check if the field has been used by the particular tank(s)
    // const used = await checkFieldUsage();
    // if (used > 0) {
    const used = await getTanksByCode();
    if (used?.length > 0) {
      const lst = getTankList(used, 'atg_field_tank');
      notification.warning({
        message: t('messages.atgFieldUsedByTank'),
        description: `${t('descriptions.atgFieldCannotDelete')}: [${lst}]`,
      });
      return;
    }

    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(ATG_FIELDS.DELETE, selected)
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
        disabled={!access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.addAtgField')}
      </Button>
    </>
  );

  useEffect(() => {
    if (payload && atgLabels && i18n) {
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
  }, [payload, atgLabels, i18n]);

  useEffect(() => {
    if (payload && atgFields && atgLabels && i18n) {
      // console.log('......................payload and labels', i18n, payload, atgLabels);
      const list = [];
      for (let i = 0; i < atgFields?.records?.length; i++) {
        const item = atgFields?.records?.[i];
        const used = payload?.records?.find((o) => o?.atg_field_code === item['column_name']);
        const field = {
          atg_field_code: item['column_name'],
          atg_field_name: atgLabels?.records?.[0]?.['ENG'][item['column_name']],
          // atg_field_label: item['column_name'] + ': ' + atgLabels?.records?.[0]?.[lang3[i18n.language||'en']][item['column_name']],
          atg_field_label: atgLabels?.records?.[0]?.[lang3[i18n.language || 'en']][item['column_name']],
          atg_field_type: item['data_type'],
          atg_field_used: !used ? false : true,
        };
        list.push(field);
      }
      setAvailFields(list);
    }
  }, [payload, atgFields, atgLabels, i18n]);

  useEffect(() => {
    if (selected) {
      resetFields();
      setActiveFlag(selected?.atg_field_active);
      setFieldsValue({
        atg_field_code: selected?.atg_field_code,
        atg_field_active: selected?.atg_field_active,
      });
    } else {
      resetFields();
    }
  }, [resetFields, setFieldsValue, selected]);

  return (
    <>
      <Card hoverable>
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
              data={records}
              parentHeight="70vh"
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])}
            />
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
        width="40vw"
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
                  dropdownMatchSelectWidth={false}
                  allowClear
                  loading={isValidating}
                  showSearch
                  disabled={!IS_CREATING}
                  // onChange={onChange}
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectAtgField')}
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

              <Form.Item name="atg_field_active" label={''}>
                <Checkbox checked={activeFlag} onChange={onCheck}>
                  {t('fields.atgFieldActive')}
                </Checkbox>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default AtgFields;
