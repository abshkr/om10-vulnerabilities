import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { TANK_GROUPS } from '../../../api';
import { DataTable } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [tanks, setTanks] = useState([]);

  const { data: items } = useSWR(TANK_GROUPS.ITEMS);

  const { setFieldsValue } = form;
  const IS_CREATING = !value;

  const fields = columns(t);

  const onFinish = (values) => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? TANK_GROUPS.CREATE : TANK_GROUPS.UPDATE, values)
          .then(
            axios.spread((response) => {
              Modal.destroyAll();

              mutate(TANK_GROUPS.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
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
        await axios
          .post(TANK_GROUPS.DELETE, value)
          .then(
            axios.spread((response) => {
              mutate(TANK_GROUPS.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`,
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed'),
            });
          });
      },
    });
  };

  const handleTankChange = (value) => {
    const base = _.find(items?.records, ['tank_code', value[0]]);

    if (base?.tank_basecode) {
      const payload = _.filter(items?.records, ['tank_basecode', base?.tank_basecode]);

      setTanks(payload);
    } else {
      setTanks(items?.records);
    }
  };

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
    }
  }, [value, setFieldsValue]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError initialValues={value}>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
          <Form.Item name="tgr_name" label={t('fields.groupName')}>
            <Input disabled={!!value} />
          </Form.Item>

          <Form.Item name="tgr_tanklist">
            <Select
              showSearch
              onChange={handleTankChange}
              mode="multiple"
              optionFilterProp="children"
              placeholder={!value ? t('placeholder.selectBaseProduct') : null}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tanks.map((item, index) => (
                <Select.Option key={index} value={item.tank_code}>
                  {`${t('fields.baseProductCode')}: ${item.tank_basecode} - ${t('fields.tankCode')}: ${
                    item.tank_code
                  }`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <DataTable height="60vh" data={[]} columns={fields} minimal />
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
          icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
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

export default FormModal;
