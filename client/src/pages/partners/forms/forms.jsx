import React, { useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Select, Input, Drawer, Tag, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { PARTNERS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;

  const IS_CREATING = !value;

  const { data: suppliers, isValidating: suppliersLoading } = useSWR(PARTNERS.SUPPLIERS);
  const { data: addresses, isValidating: addressLoading } = useSWR(PARTNERS.ADDRESSES);
  const { data: types, isValidating: typeLoading } = useSWR(PARTNERS.PARTNER_TYPE);
  const { data: payload, isValidating: readLoading } = useSWR(PARTNERS.READ);

  const isLoading = suppliersLoading || typeLoading || addressLoading || readLoading;

  const validate = (rule, input) => {
    const map = {
      prtnr_code: t('fields.partnerCode'),
      prtnr_cmpy: t('fields.company'),
      prtnr_type: t('fields.partnerType'),
      prtnr_name1: t('fields.partnerName'),
      prtnr_addr: t('fields.partnerAddress'),
    };

    const action = {
      prtnr_code: t('validate.set'),
      prtnr_cmpy: t('validate.select'),
      prtnr_type: t('validate.select'),
      prtnr_name1: t('validate.select'),
      prtnr_addr: t('validate.select'),
    };

    if (rule.field === 'prtnr_code') {
      const match = _.find(payload?.records, (record) => {
        return record?.prtnr_code === input;
      });

      if (!!match && !value) {
        return Promise.reject(t('descriptions.alreadyExists'));
      }
    }

    if (input === '' || !input) {
      return Promise.reject(`${action[rule.field]} ─ ${map[rule.field]}`);
    }

    return Promise.resolve();
  };

  const onComplete = (prtnr_code) => {
    handleFormState(false, null);
    mutate(PARTNERS.READ);
    if (prtnr_code) {
      setFilterValue("" + prtnr_code);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!IS_CREATING) {
      values.prtnr_seq = value.prtnr_seq;
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? PARTNERS.CREATE : PARTNERS.UPDATE, values)
          .then((response) => {
            onComplete(values.prtnr_code);

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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PARTNERS.DELETE, value)
          .then((response) => {
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

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prtnr_code: value.prtnr_code,
        prtnr_cmpy: value.prtnr_cmpy,
        prtnr_type: value.prtnr_type,
        prtnr_name1: value.prtnr_name1,
        prtnr_name2: value.prtnr_name2,
        prtnr_name3: value.prtnr_name3,
        prtnr_name4: value.prtnr_name4,
        prtnr_name5: value.prtnr_name5,
        prtnr_addr: value.prtnr_addr,
      });
    } else {
      resetFields();
    }
  }, [value]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="35vw"
      visible={visible}
      footer={
        <>
          {!IS_CREATING && value?.mr_status !== '2' && (
            <div
              style={{ float: 'left', marginRight: 5 }}
            >
              <Tooltip placement="topRight" title={t("descriptions.countPartnerPartnership")} >
                <Tag color={value?.pshp_count>0 ? 'red' : 'green'}>
                  {t('fields.countPartnerPartnership') + ': ' + value?.pshp_count}
                </Tag>
              </Tooltip>
            </div>
          )}

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
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete || value?.pshp_count > 0}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Form.Item
              name="prtnr_code"
              label={t('fields.partnerCode')}
              rules={[{ required: true, validator: validate }]}
            >
              <Input disabled={!!value} />
            </Form.Item>

            <Form.Item
              name="prtnr_cmpy"
              label={t('fields.company')}
              rules={[{ required: true, validator: validate }]}
            >
              <Select
                dropdownMatchSelectWidth={false}
                loading={isLoading}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectCompany') : null}
                disabled={!!value}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {suppliers?.records.map((item, index) => (
                  <Select.Option key={index} value={item.cmpy_code}>
                    {item.cmpy_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="prtnr_type"
              label={t('fields.partnerType')}
              rules={[{ required: true, validator: validate }]}
            >
              <Select
                dropdownMatchSelectWidth={false}
                loading={isLoading}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectType') : null}
                disabled={!!value}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {types?.records.map((item, index) => (
                  <Select.Option key={index} value={item.partner_type_code}>
                    {item.partner_type_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="prtnr_name1"
              label={t('fields.partnerName')}
              rules={[{ required: true, validator: validate }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="prtnr_name2">
              <Input />
            </Form.Item>

            <Form.Item name="prtnr_name3">
              <Input />
            </Form.Item>

            <Form.Item name="prtnr_name4">
              <Input />
            </Form.Item>

            <Form.Item name="prtnr_name5">
              <Input />
            </Form.Item>

            <Form.Item
              name="prtnr_addr"
              label={t('fields.partnerAddress')}
              rules={[{ required: true, validator: validate }]}
            >
              <Select
                dropdownMatchSelectWidth={false}
                loading={isLoading}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectAddress') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {addresses?.records.map((item, index) => (
                  <Select.Option key={index} value={item.db_address_key}>
                    {item.address_text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
