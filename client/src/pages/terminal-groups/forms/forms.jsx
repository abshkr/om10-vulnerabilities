import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import {
  Form,
  Button,
  Tabs,
  notification,
  Modal,
  Input,
  Select,
  Drawer,
  Divider,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { TERMINAL_GROUPS } from '../../../api';
import { DataTable } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [groupedTerminals, setGroupedTerminals] = useState([]);
  const [selected, setSelected] = useState([]);
  const [pickups, setPicks] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [groupFlag, setGroupFlag] = useState(value?.trmgrp_active);

  const { data: items } = useSWR(`${TERMINAL_GROUPS.ITEMS}?trmgrp_code=${value?.trmgrp_code}`);
  // const { data: avilableTerminals } = useSWR(`${TERMINAL_GROUPS.AVAILABLES}?trmgrp_code=${trmgrp_code}`);
  const { data: avilableTerminals } = useSWR(`${TERMINAL_GROUPS.TERMINALS}`);

  const { setFieldsValue, resetFields, getFieldValue } = form;
  const IS_CREATING = !value;

  const fields = columns(t, value);

  const getGroupsAsync = async () => {
    const results = await api.get(`${TERMINAL_GROUPS.READ}`);

    return results?.data;
  };

  const onCheckGroupFlag = (v) => {
    setGroupFlag(v.target.checked);
    setFieldsValue({
      trmgrp_active: v.target.checked,
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    // console.log('..................onFinish', values);
    let terminal_items = [];
    for (let i = 0; i < values?.tgl_terminal_list?.length; i++) {
      const item = _.find(groupedTerminals, (o) => o?.term_code === values?.tgl_terminal_list?.[i]);
      terminal_items.push({
        tgl_term_code: values?.tgl_terminal_list?.[i],
        tgl_link_active: !item
          ? true
          : item?.tgl_link_active === '' || item?.tgl_link_active === undefined
          ? false
          : item?.tgl_link_active,
      });
    }
    values.terminal_items = terminal_items;
    delete values?.tgl_terminal_list;
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TERMINAL_GROUPS.CREATE : TERMINAL_GROUPS.UPDATE, values)
          .then((response) => {
            handleFormState(false, null);

            mutate(TERMINAL_GROUPS.READ);
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

  const onToggle = () => {
    /* const items=[];
    for (let i = 0; i < groupedTerminals.length; i++) {
      const item = groupedTerminals[i];
      if (item?.term_code === selected[0].term_code) {
        item.tgl_link_active = !item?.tgl_link_active;
      }
      console.log('.............', item, selected[0]);
      items.push(item);
    }
    setGroupedTerminals(items); */

    const option = selected[0];
    const flag =
      option?.tgl_link_active === '' || option?.tgl_link_active === undefined
        ? false
        : option?.tgl_link_active;
    option.tgl_link_active = !flag;

    setSelected([option]);

    tableAPI.updateRowData({ update: [option] });

    return;
    const toggleData = {
      trmgrp_code: value?.trmgrp_code,
      tgl_term_code: selected[0].term_code,
    };
    Modal.confirm({
      title: t('prompts.toggle'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TERMINAL_GROUPS.TOGGLE, toggleData)
          .then((response) => {
            mutate(TERMINAL_GROUPS.READ);
            handleFormState(false, null);
            notification.success({
              message: t('messages.updateSuccess'),
              description: `${t('descriptions.updateSuccess')}`,
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
          .post(TERMINAL_GROUPS.DELETE, value)
          .then((response) => {
            mutate(TERMINAL_GROUPS.READ);
            handleFormState(false, null);
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

  const handleTerminalChange = (value) => {
    const grpCode = getFieldValue('trmgrp_code');
    const grpName = getFieldValue('trmgrp_name');

    // value contains a list of terminal codes
    // check the existing terminals in current group and get the ones whose code still remains in list selection
    const payload = _.filter(groupedTerminals, (item) => {
      return value.includes(item.term_code);
    });
    // get the remaining terminal codes
    const remainingTerminals = payload.map((payload) => payload.term_code);
    // check the list selection and get the ones which are not in the remaining terminals, which should be newly added
    const newlyAdded = _.filter(value, (item) => {
      return !remainingTerminals.includes(item);
    });
    // if newly added found, add it to current group
    if (newlyAdded.length > 0) {
      const target = _.filter(pickups, ['term_code', newlyAdded[0]]);
      payload.push({
        term_code: target?.[0]?.term_code,
        term_name: target?.[0]?.term_name,
        tgl_link_active: true,
        trmgrp_code: value?.trmgrp_code || grpCode,
        trmgrp_name: value?.trmgrp_name || grpName,
      });
    }
    // reset the group
    setGroupedTerminals(payload);
  };

  useEffect(() => {
    if (avilableTerminals) {
      setPicks(avilableTerminals?.records || []);
    }
  }, [avilableTerminals]);

  useEffect(() => {
    if (value) {
      const payload = _.filter(items?.records, ['trmgrp_code', value.trmgrp_code]);

      setGroupedTerminals(payload);
    } else {
      setGroupedTerminals(items?.records || []);
    }
  }, [value, items]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tgl_terminal_list: value.trmgrp_sitecodes.trim().split(', '),
      });
      setFieldsValue({
        trmgrp_code: value.trmgrp_code,
        trmgrp_name: value.trmgrp_name,
        trmgrp_note: value.trmgrp_note,
        trmgrp_active: value.trmgrp_active,
      });
      setGroupFlag(value.trmgrp_active);
      setSelected([]);
    } else {
      resetFields();
    }
  }, [value, setFieldsValue, resetFields]);

  const validateCode = async (rule, input) => {
    // check if the group code is unique in CREATE mode
    if (IS_CREATING) {
      const groups = await getGroupsAsync();
      const item = _.find(groups?.records, (o) => o?.trmgrp_code === input.trim());
      console.log('..............validate uniqueness', groups, item, input);
      if (item) {
        return Promise.reject(t('descriptions.alreadyExists'));
      }
    }

    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.trmgrpCode')}`);
      }
    }
    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }
    const len = new TextEncoder().encode(input).length;
    if (input && len > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const validateName = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.trmgrpName')}`);
      }
    }
    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }
    const len = new TextEncoder().encode(input).length;
    if (input && len > 200) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 200 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
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

          {!IS_CREATING && (
            <Button
              htmlType="button"
              icon={<CheckOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={IS_CREATING || selected.length <= 0 || !access.canUpdate}
              onClick={onToggle}
            >
              {t('operations.toggle')}
            </Button>
          )}

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            onClick={onFinish}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            style={{ float: 'right', marginRight: 5 }}
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
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Row gutter={[8, 3]}>
              <Col span={12}>
                <Form.Item
                  name="trmgrp_code"
                  label={t('fields.trmgrpCode')}
                  rules={[{ required: true, validator: validateCode }]}
                >
                  <Input disabled={!!value}></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="trmgrp_name"
                  label={t('fields.trmgrpName')}
                  rules={[{ required: true, validator: validateName }]}
                >
                  <Input disabled={false}></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[8, 3]}>
              <Col span={20}>
                <Form.Item name="trmgrp_note" label={t('fields.trmgrpNote')} rules={[{ required: false }]}>
                  <Input disabled={false}></Input>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="trmgrp_active"
                  label={t('fields.trmgrpActive')}
                  rules={[{ required: false }]}
                >
                  <Checkbox disabled={false} checked={groupFlag} onChange={onCheckGroupFlag}></Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Divider>{t('fields.availableTerminals')}</Divider>

            <Form.Item name="tgl_terminal_list">
              <Select
                popupMatchSelectWidth={false}
                showSearch
                onChange={handleTerminalChange}
                mode="multiple"
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectTerminal') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {pickups.map((item, index) => (
                  <Select.Option key={index} value={item.term_code}>
                    {`${t('fields.terminal')}: ${item.term_desc} ( ${item.address_text} )`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Divider>{t('fields.terminalGroupMemebers')}</Divider>

            <DataTable
              height="60vh"
              data={groupedTerminals}
              columns={fields}
              handleSelect={setSelected}
              minimal
              apiContext={setTableAPI}
            />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
