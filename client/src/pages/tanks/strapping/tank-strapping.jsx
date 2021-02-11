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
import _ from 'lodash';

import { DataTable } from '../../../components';
import api, { TANK_STRAPPING } from '../../../api';
import columns from './columns';
import StrapImportManager from './import';

const { TabPane } = Tabs;

const TankStrapping = ({ terminal, code, isLoading, access, tanks }) => {
  const url = code ? `${TANK_STRAPPING.READ}?strap_tankcode=${code}` : null;

  const { data } = useSWR(url);
  const { data: types } = useSWR(TANK_STRAPPING.TYPES);
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
        await api
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
        await api
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
    StrapImportManager(
      t('operations.importStrapping'),
      { tank_code: code, tank_terminal: terminal, strap_types: types },
      loadStraps,
      '60vw',
      '50vh'
    );
  };

  const modifiers = (
    <>
      <Button
        style={{ marginRight: 10 }}
        type="primary"
        loading={isLoading}
        disabled={!access.canCreate}
        onClick={handleImport}
      >
        {t('operations.importStrapping')}
      </Button>

      <Button
        type="primary"
        loading={isLoading}
        disabled={!access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.addStrapping')}
      </Button>
    </>
  );

  useEffect(() => {
    if (code && !selected) {
      form.resetFields();

      setFieldsValue({
        strap_tankcode: code,
        strap_type: 0,
      });
    }
  }, [resetFields, setFieldsValue, code, selected]);

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        strap_tankcode: selected?.strap_tankcode,
        strap_height: selected?.strap_height,
        strap_volume: selected?.strap_volume,
        strap_type: selected?.strap_type,
      });
    } else {
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
                name="strap_tankcode"
                label={t('fields.tank')}
                rules={[{ required: true, validator: validate, label: t('fields.tank') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  loading={isLoading}
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
                name="strap_height"
                label={t('fields.level')}
                rules={[{ required: true, validator: validate, label: t('fields.level') }]}
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
                name="strap_volume"
                label={t('fields.observedVolume')}
                rules={[{ required: true, validator: validate, label: t('fields.observedVolume') }]}
              >
                <Input type="number" style={{ width: '100%' }} min={0} addonAfter={t('units.litres')} />
              </Form.Item>

              <Form.Item
                name="strap_type"
                label={t('fields.strapType')}
                rules={[{ required: true, validator: validate, label: t('fields.strapType') }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  loading={isLoading}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {types?.records.map((item, index) => (
                    <Select.Option key={index} value={_.toNumber(item.strap_type_id)}>
                      {item.strap_type_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default TankStrapping;
