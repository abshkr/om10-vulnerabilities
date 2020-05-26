import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';

import { Type, Company, Supplier, LockType, Period as PeriodItem, Unit } from './fields';
import { DataTable } from '../../../components';
import { ALLOCATIONS } from '../../../api';
import columns from './columns';
import Period from './period';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState }) => {
  const { data: units } = useSWR(ALLOCATIONS.PERIOD_TYPES);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [type, setType] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [supplier, setSupplier] = useState(undefined);
  const [lockType, setLockType] = useState(undefined);
  const [selected, setSelected] = useState(null);

  const [allocations, setAllocations] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);

  const { resetFields } = form;

  const IS_CREATING = !value;
  const CAN_ALLOCATE_PERIOD = selected && value && lockType === '4';

  const onComplete = () => {
    handleFormState(false, null);
    mutate(ALLOCATIONS.READ);
  };

  const getAllocations = useCallback(() => {
    axios
      .get(`${ALLOCATIONS.ITEMS}?alloc_type=${type}&alloc_cmpycode=${company}&alloc_suppcode=${supplier}`)
      .then((response) => {
        const payload = response.data?.records || [];

        form.setFieldsValue({
          allocs: payload,
        });

        setAllocations(payload);
      });
  }, [company, type, supplier]);

  const onFinish = async () => {
    const values = await form.validateFields();
    const allocs = [];

    _.forEach(values?.allocs, (alloc) => {
      allocs.push({
        aitem_prodcode: alloc.aitem_prodcode,
        aitem_qtylimit: _.toNumber(alloc.aitem_qtylimit),
        aitem_produnit: _.toNumber(alloc.aitem_produnit),
      });
    });

    values.allocs = allocs;

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? ALLOCATIONS.CREATE : ALLOCATIONS.UPDATE, values)
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
          .post(ALLOCATIONS.DELETE, value)
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

  const onReset = () => {
    Modal.confirm({
      title: t('prompts.reset'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(ALLOCATIONS.RESET, {
            alloc_type: type,
            alloc_cmpycode: company,
            alloc_suppcode: supplier,
          })
          .then(() => {
            getAllocations();
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
    if (!value && !visible) {
      resetFields();

      setType(undefined);
      setCompany(undefined);
      setSupplier(undefined);
      setLockType(undefined);
      setAllocations([]);
    }
  }, [resetFields, value, visible]);

  useEffect(() => {
    if (type && company) {
      getAllocations();
    }
  }, [type, company, supplier, getAllocations]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button type="primary" disabled={IS_CREATING} icon={<RedoOutlined />} onClick={onReset}>
            {t('operations.reset')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<ClockCircleOutlined />}
              style={{ marginLeft: 5 }}
              disabled={!CAN_ALLOCATE_PERIOD}
              onClick={() => setShowPeriod(true)}
            >
              {t('operations.allocationPeriod')}
            </Button>
          )}

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
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Type form={form} value={value} onChange={setType} />
            <Company form={form} value={value} onChange={setCompany} />
            <Supplier form={form} value={value} type={type} onChange={setSupplier} />
            <LockType form={form} value={value} onChange={setLockType} />
            <PeriodItem form={form} value={value} lockType={lockType} />
            <Divider />
            <Form.Item name="allocs">
              <DataTable
                data={allocations}
                height="60vh"
                minimal
                columns={columns(t, IS_CREATING, form, units)}
                handleSelect={(value) => setSelected(value[0])}
                components={{
                  UnitEditor: Unit,
                }}
              />
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
      <Period visible={showPeriod && CAN_ALLOCATE_PERIOD} setVisibility={setShowPeriod} selected={selected} />
    </Drawer>
  );
};

export default FormModal;
