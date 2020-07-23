import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, List, Avatar, Tag, Card, Button, Modal, Divider, Input, Select } from 'antd';

import useSWR from 'swr';
import _ from 'lodash';

import api, { AREA } from '../../../../api';

const FormModal = ({ visible, onCreate, onCancel, gates }) => {
  const { data: devices, isValidating: devicesLoading } = useSWR(AREA.DEVICES);
  const { data: timeCodes, isValidating: timeLoading } = useSWR(AREA.TIME_CODES);

  const isLoading = devicesLoading || timeLoading;

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onCodeValidation = (rule, input) => {
    const match = _.find(gates, (object) => {
      return object.gate_k.toLowerCase() === input?.toLowerCase();
    });

    if (input && !!match) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (!input || input === '') {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.deviceCode')}`);
    }

    return Promise.resolve();
  };

  const onDeviceCodeValidation = (rule, input) => {
    if (!input || input === '') {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.deviceCode')}`);
    }

    return Promise.resolve();
  };

  const onTimeCodeValidation = (rule, input) => {
    if (!input || input === '') {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.timeCode')}`);
    }

    return Promise.resolve();
  };

  const onDeviceChange = (key) => {
    form.setFieldsValue({
      krdc_type: key.type,
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    onCreate(values);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title={t('prompts.createNewGate')}
      okText={t('operations.create')}
      cancelText={t('operations.close')}
      onCancel={onCancel}
      onOk={onFinish}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="gate_k"
          label={t('fields.gateCode')}
          rules={[{ required: true, validator: onCodeValidation }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gate_dvce"
          label={t('fields.deviceCode')}
          rules={[{ required: true, validator: onDeviceCodeValidation }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            loading={isLoading}
            showSearch
            onChange={(value, key) => onDeviceChange(key)}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {devices?.records.map((item, index) => (
              <Select.Option key={index} value={item.adv_code} type={item.krdc_type}>
                {item.adv_code}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="g_tcd"
          label={t('fields.timeCode')}
          rules={[{ required: true, validator: onTimeCodeValidation }]}
        >
          <Select
            loading={isLoading}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {timeCodes?.records.map((item, index) => (
              <Select.Option key={index} value={item.tcd_title}>
                {item.tcd_title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="krdc_type" noStyle />
      </Form>
    </Modal>
  );
};

const Gates = ({ form, value }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const Description = ({ time, type }) => (
    <div>
      <Tag>{`${t('fields.timeCode')} - ${time}`}</Tag>
      <Tag>{`${t('fields.deviceType')} - ${type}`}</Tag>
    </div>
  );

  const getGates = useCallback(
    (area) => {
      setLoading(true);
      api
        .get(AREA.GATES, {
          params: {
            area_k: area,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res.data?.records || []);

          form.setFieldsValue({
            gates: res.data?.records || [],
          });
        });
    },
    [form]
  );

  const onGateCreate = (values) => {
    let payload = [...data, values];

    setData(payload);

    form.setFieldsValue({
      gates: payload,
    });
  };

  const onRemove = (item) => {
    let payload = [...data];

    const values = _.reject(payload, { gate_k: item.gate_k });

    setData(values);

    form.setFieldsValue({
      gates: values,
    });
  };

  useEffect(() => {
    if (value) {
      getGates(value.area_k);
    }
  }, [getGates, value]);

  return (
    <>
      <FormModal visible={visible} onCreate={onGateCreate} onCancel={() => setVisible(false)} gates={data} />

      <Divider> {t('tabColumns.gates')} </Divider>

      <Form.Item name="gates" noStyle>
        <List
          size="small"
          style={{ height: '50vh', overflowY: 'auto', marginTop: 10 }}
          itemLayout="horizontal"
          dataSource={data}
          loading={{
            indicator: <LoadingOutlined />,
            spinning: isLoading,
          }}
          renderItem={(item) => (
            <Card size="small" hoverable style={{ marginBottom: 5, marginTop: 5 }} bodyStyle={{ padding: 5 }}>
              <List.Item
                actions={[
                  <Button
                    icon={<DeleteOutlined />}
                    type="danger"
                    shape="circle"
                    onClick={() => onRemove(item)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.gate_dvce}</Avatar>}
                  // eslint-disable-next-line
                  title={<a>{item.gate_k}</a>}
                  description={<Description time={item.g_tcd} type={item.krdc_type} />}
                />
              </List.Item>
            </Card>
          )}
        />
      </Form.Item>

      <Button
        type="primary"
        block
        onClick={() => {
          setVisible(true);
        }}
      >
        {t('operations.add')}
      </Button>
    </>
  );
};

export default Gates;
