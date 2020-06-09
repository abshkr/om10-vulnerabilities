import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Spin, Button, Drawer, Tabs, Form, Select, InputNumber, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';

import { LOAD_SCHEDULES } from '../../../../api';

const { useForm } = Form;

const AdditionalHostData = ({ value }) => {
  const url = value
    ? `${LOAD_SCHEDULES.HOST_DATA}?supplier=${value.supplier_code}&trip_no=${value?.shls_trip_no}`
    : null;

  const { data: payload, revalidate } = useSWR(url);
  const { data: types, isValidating } = useSWR(LOAD_SCHEDULES.HOST_DATA_TYPES);

  const { t } = useTranslation();

  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { setFieldsValue } = form;

  const fields = columns(t);

  const handleFormState = (visibility, record) => {
    setVisible(visibility);
    setSelected(record);
  };

  const onComplete = () => {
    handleFormState(false, null);
    revalidate();
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    const record = {
      ...selected,
      ...values,
    };

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(LOAD_SCHEDULES.HOST_DATA_UPDATE, record)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.updateSuccess'),
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
          .post(LOAD_SCHEDULES.HOST_DATA_DELETE, selected)
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

  useEffect(() => {
    if (selected) {
      setFieldsValue({
        dh_dor_type: selected?.dh_dor_type,
        dh_dor_origin: selected?.dh_dor_origin,
      });
    }
  }, [selected]);

  return (
    <>
      <DataTable
        data={payload?.records}
        columns={fields}
        onClick={(payload) => handleFormState(true, payload)}
      />

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        width="33vw"
        onClose={() => handleFormState(false, null)}
        visible={visible}
        footer={
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onFinish}
            >
              {t('operations.update')}
            </Button>

            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          </>
        }
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane key="1" tab={t('tabCoumns.hostData')}>
            <Form layout="vertical" form={form}>
              <Form.Item name="dh_dor_type" label={t('fields.additionalHostDataType')}>
                <Select
                  loading={isValidating}
                  showSearch
                  optionFilterProp="children"
                  placeholder={!value ? t('placeholder.selectHostDataType') : null}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {types?.records.map((item, index) => (
                    <Select.Option key={index} value={item?.type}>
                      {item?.type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="dh_dor_origin" label={t('fields.additionalHostData')}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default AdditionalHostData;
