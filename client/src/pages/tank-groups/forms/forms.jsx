import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Input, Select, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { TANK_GROUPS } from '../../../api';
import { DataTable } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [tanks, setTanks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [pickups, setPicks] = useState([]);

  const tgr_name = value?.tgr_name;
  const old_active = value?.tgr_tankcode;

  const { data: items } = useSWR(`${TANK_GROUPS.ITEMS}?tgr_name=${tgr_name}`);
  const { data: avilableTanks } = useSWR(`${TANK_GROUPS.AVAILABLES}?tgr_name=${tgr_name}`);

  const { setFieldsValue, resetFields } = form;
  const IS_CREATING = !value;

  const fields = columns(t);

  const onFinish = async () => {
    const values = await form.validateFields();
    let tank_items = [];
    for (let i = 0; i < values.tgr_tanklist.length; i++) {
      tank_items.push({
        tgr_tankcode: values.tgr_tanklist[i],
        tgr_ntk: values.tgr_tanklist[i] == old_active ? 1 : 0,
      });
    }
    values.tank_items = tank_items;
    // values.tgr_tankcode = old_active;
    delete values.tgr_tanklist;
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANK_GROUPS.CREATE : TANK_GROUPS.UPDATE, values)
          .then((response) => {
            handleFormState(false, null);

            mutate(TANK_GROUPS.READ);
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

  const onActivate = () => {
    const activateData = {
      tgr_name: tgr_name,
      tgr_tankcode: selected[0].tank_code,
      // "old_active": old_active,
      old_active: old_active || selected[0].tank_code,
    };
    Modal.confirm({
      title: t('prompts.activate'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANK_GROUPS.ACTIVATE, activateData)
          .then((response) => {
            mutate(TANK_GROUPS.READ);
            handleFormState(false, null);
            notification.success({
              message: t('messages.saveSuccess'),
              description: `${t('descriptions.saveSuccess')}`,
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
          .post(TANK_GROUPS.DELETE, value)
          .then((response) => {
            mutate(TANK_GROUPS.READ);
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

  const handleTankChange = (value) => {
    const base = _.find(avilableTanks?.records, ['tank_code', value[0]]);
    if (base?.tank_basecode) {
      const payload = _.filter(avilableTanks?.records, ['tank_basecode', base?.tank_basecode]);

      setPicks(payload);
    } else {
      setPicks(avilableTanks?.records);
    }

    const payload = _.filter(tanks, (item) => {
      return value.includes(item.tank_code);
    });
    const remainingTanks = payload.map((payload) => payload.tank_code);
    const newlyAdded = _.filter(value, (item) => {
      return !remainingTanks.includes(item);
    });
    if (newlyAdded.length > 0) {
      const target = _.filter(pickups, ['tank_code', newlyAdded[0]]);
      payload.push({
        ...target[0],
        tank_active: false,
        tank_group: tgr_name,
      });
    }
    setTanks(payload);
  };

  useEffect(() => {
    // let picks = []
    if (value) {
      const payload = _.filter(avilableTanks?.records, ['tank_basecode', value.tgr_basecode]);
      setPicks(payload);
    } else {
      setPicks(avilableTanks?.records || []);
    }
  }, [value, avilableTanks]);

  useEffect(() => {
    if (value) {
      const payload = _.filter(items?.records, ['tank_basecode', value.tgr_basecode]);

      setTanks(payload);
    } else {
      setTanks(items?.records || []);
    }
  }, [value, items]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tgr_tanklist: value.tgr_tanklist.trim().split(', '),
      });
      setFieldsValue({
        tgr_name: value.tgr_name,
      });
    } else {
      resetFields();
    }
  }, [value, setFieldsValue]);

  return (
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

          {!IS_CREATING && (
            <Button
              htmlType="button"
              icon={<CheckOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={IS_CREATING || selected.length <= 0 || selected[0].tank_code == old_active}
              onClick={onActivate}
            >
              {t('operations.activate')}
            </Button>
          )}

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
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
            <Form.Item name="tgr_name" label={t('fields.groupName')}>
              <Input disabled={!!value}></Input>
            </Form.Item>

            <Divider >{t('fields.availableTanks')}</Divider>

            <Form.Item name="tgr_tanklist" >
              <Select
                dropdownMatchSelectWidth={false}
                showSearch
                onChange={handleTankChange}
                mode="multiple"
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectBaseProduct') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {pickups.map((item, index) => (
                  <Select.Option key={index} value={item.tank_code}>
                    {`${t('fields.baseProduct')}: [ ${item.tank_basecode} - ${item.tank_basename} ] - ${t('fields.tank')}: [ ${item.tank_code} ]`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Divider>{t('fields.tankGroupMemebers')}</Divider>

            <DataTable height="60vh" data={tanks} columns={fields} handleSelect={setSelected} minimal />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
