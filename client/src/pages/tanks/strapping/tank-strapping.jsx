import React, { useState, useEffect } from 'react';

import { Card, Button, Drawer, Modal, Form, Tabs, Input, Select, notification } from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../components';
import { TANK_STRAPPING } from '../../../api';
import columns from './columns';

const { TabPane } = Tabs;

const TankStrapping = ({ code, isLoading, access, tanks }) => {
  const url = code ? `${TANK_STRAPPING.READ}?strap_tankcode=${code}` : null;

  const { data } = useSWR(url);
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

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

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? TANK_STRAPPING.CREATE : TANK_STRAPPING.UPDATE, values)
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
        await axios
          .post(TANK_STRAPPING.DELETE, selected)
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

  const modifiers = (
    <Button
      type="primary"
      loading={isLoading}
      disabled={!access.canCreate}
      onClick={() => handleFormState(true, null)}
    >
      {t('operations.addStrapping')}
    </Button>
  );

  useEffect(() => {
    if (code && !selected) {
      form.resetFields();

      setFieldsValue({
        strap_tankcode: code,
        strap_height: 0,
        strap_volume: 0,
      });
    }
  }, [resetFields, code, selected]);

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        strap_tankcode: selected?.strap_tankcode,
        strap_height: selected?.strap_height,
        strap_volume: selected?.strap_volume,
      });
    }
  }, [resetFields, selected]);

  return (
    <>
      <Card hoverable loading={isLoading}>
        <DataTable
          columns={fields}
          data={data?.records}
          height="305px"
          extra={modifiers}
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
        />
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
              onClick={() => Modal.destroyAll()}
            >
              {t('operations.cancel')}
            </Button>

            <Button
              type="primary"
              icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
              htmlType="submit"
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>
          </>
        }
      >
        <Form layout="vertical" form={form} scrollToFirstError>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('tabColumns.general')} key="1">
              <Form.Item name="strap_tankcode" label={t('fields.tank')}>
                <Select
                  loading={isLoading}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {tanks?.records.map((item, index) => (
                    <Select.Option key={index} value={item.tank_code}>
                      {item.tank_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="strap_height" label={t('fields.level')}>
                <Input type="number" style={{ width: '100%' }} min={0} addonAfter="mm" />
              </Form.Item>

              <Form.Item name="strap_volume" label={t('fields.observedVolume')}>
                <Input type="number" style={{ width: '100%' }} min={0} addonAfter="Litres" />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default TankStrapping;
