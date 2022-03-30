import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  ClockCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';
import useSWR from 'swr';

import { DataTable } from '../../../components';
import api, { ALLOCATIONS } from '../../../api';
import { SETTINGS } from '../../../constants';
import {
  AllocIndex,
  Type,
  Company,
  Supplier,
  LockType,
  Period as PeriodItem,
  Unit,
  Comments,
  EffectiveFrom,
  ExpiredAfter,
} from './fields';
import columns from './columns';
import Period from './period';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateLockal, config }) => {
  const { data: units } = useSWR(ALLOCATIONS.PERIOD_TYPES);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [allocIndex, setAllocIndex] = useState(value?.alloc_index);
  const [type, setType] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [supplier, setSupplier] = useState(undefined);
  const [lockType, setLockType] = useState(undefined);
  const [selected, setSelected] = useState(null);

  const [allocations, setAllocations] = useState([]);
  const [showPeriod, setShowPeriod] = useState(false);

  const { resetFields } = form;

  const IS_CREATING = !value;
  const CAN_ALLOCATE_PERIOD = selected && value && lockType === '4' && selected?.aitem_qtylimit > 0;

  const checkAllocation = async (type, cmpy, supp) => {
    const values = {
      at_type: type,
      at_cmpy: cmpy,
      supplier: supp,
    };

    const results = await api.post(ALLOCATIONS.CHECK_ALLOC, values);
    // console.log('............checkAllocation', results);

    if (results?.data) {
      return _.toNumber(results?.data?.records[0]?.cnt);
    } else {
      return 0;
    }
  };

  const checkMultiAllocation = async (type, cmpy, supp, lock, period) => {
    const values = {
      at_type: type,
      at_cmpy: cmpy,
      supplier: supp,
      lock_type: lock,
      period_type: period,
    };

    const results = await api.post(ALLOCATIONS.CHECK_MULTI_ALLOC, values);
    // console.log('............checkMultiAllocation', results);

    if (results?.data) {
      return _.toNumber(results?.data?.records[0]?.cnt);
    } else {
      return 0;
    }
  };

  const nextAllocIndex = async (type, cmpy, supp) => {
    const values = {
      alloc_type: type,
      alloc_cmpycode: cmpy,
      alloc_suppcode: supp,
    };

    const results = await api.post(ALLOCATIONS.NEXT_ALLOC_INDEX, values);
    // console.log('............checkMultiAllocation', results);

    if (results?.data) {
      return _.toNumber(results?.data?.records[0]?.next_no);
    } else {
      return 1;
    }
  };

  const onComplete = (value) => {
    handleFormState(false, null);
    if (value) {
      locateLockal(value);
    } else {
      mutate(url);
    }
  };

  const getAllocations = useCallback(() => {
    let customer = null;
    if (type == 3) {
      customer = company;
    }
    const url = IS_CREATING
      ? `${ALLOCATIONS.ITEMS}?supplier=${supplier}&customer=${customer}`
      : `${ALLOCATIONS.ITEMS}?alloc_index=${
          allocIndex === undefined ? value?.alloc_index : allocIndex
        }&alloc_type=${type}&alloc_cmpycode=${company}&alloc_suppcode=${supplier}&customer=${customer}`;

    api.get(url).then((response) => {
      const payload = response.data?.records || [];
      setAllocations([]);

      form.setFieldsValue({
        allocs: payload,
      });

      setAllocations(payload);
    });
  }, [company, type, supplier, allocIndex]);

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!values?.alloc_start_date) {
      values.alloc_start_date = '';
    } else {
      values.alloc_start_date = values.alloc_start_date?.format(SETTINGS.DATE_TIME_FORMAT);
    }
    if (!values?.alloc_end_date) {
      values.alloc_end_date = '';
    } else {
      values.alloc_end_date = values.alloc_end_date?.format(SETTINGS.DATE_TIME_FORMAT);
    }

    if (IS_CREATING) {
      values.alloc_index =
        _.toInteger(values?.alloc_lock) * 100 +
        (!values?.alloc_period ? 0 : _.toInteger(values?.alloc_period));
    } else {
      if (values?.alloc_index === undefined) {
        values.alloc_index = value?.alloc_index;
      }
    }

    // check if the allocation is unique in CREATE mode
    if (IS_CREATING) {
      if (config?.siteAllowMultiAllocations === true) {
        const counter = await checkMultiAllocation(
          values?.alloc_type,
          values?.alloc_cmpycode,
          values?.alloc_suppcode,
          values?.alloc_lock,
          values?.alloc_period
        );
        if (counter > 0) {
          let notes = t('descriptions.alreadyExistsRecord');
          notes = notes.replace(
            '[[PKEY]]',
            '"' +
              t('fields.type') +
              ': ' +
              values?.alloc_type +
              ', ' +
              t('fields.company') +
              ': ' +
              values?.alloc_cmpycode +
              ', ' +
              t('fields.allocLock') +
              ': ' +
              values?.alloc_lock +
              ', ' +
              t('fields.allocPeriod') +
              ': ' +
              values?.alloc_period +
              ', ' +
              t('fields.supplier') +
              ': ' +
              values?.alloc_suppcode +
              '"'
          );
          notification.error({
            message: t('messages.validationFailed'),
            description: notes,
          });
          return;
        }
      } else {
        const counter = await checkAllocation(
          values?.alloc_type,
          values?.alloc_cmpycode,
          values?.alloc_suppcode
        );
        if (counter > 0) {
          let notes = t('descriptions.alreadyExistsRecord');
          notes = notes.replace(
            '[[PKEY]]',
            '"' +
              t('fields.type') +
              ': ' +
              values?.alloc_type +
              ', ' +
              t('fields.company') +
              ': ' +
              values?.alloc_cmpycode +
              ', ' +
              t('fields.supplier') +
              ': ' +
              values?.alloc_suppcode +
              '"'
          );
          notification.error({
            message: t('messages.validationFailed'),
            description: notes,
          });
          return;
        }
      }
    }

    // check if the allocation is unique in UPDATE mode
    if (
      !IS_CREATING &&
      (String(value?.alloc_lock) !== String(values?.alloc_lock) ||
        (String(value?.alloc_lock) === '3' && String(value?.alloc_period) !== String(values?.alloc_period)))
    ) {
      if (config?.siteAllowMultiAllocations === true) {
        const counter = await checkMultiAllocation(
          values?.alloc_type,
          values?.alloc_cmpycode,
          values?.alloc_suppcode,
          values?.alloc_lock,
          values?.alloc_period
        );
        if (counter > 0) {
          let notes = t('descriptions.alreadyExistsRecord');
          notes = notes.replace(
            '[[PKEY]]',
            '"' +
              t('fields.type') +
              ': ' +
              values?.alloc_type +
              ', ' +
              t('fields.company') +
              ': ' +
              values?.alloc_cmpycode +
              ', ' +
              t('fields.allocLock') +
              ': ' +
              values?.alloc_lock +
              ', ' +
              t('fields.allocPeriod') +
              ': ' +
              values?.alloc_period +
              ', ' +
              t('fields.supplier') +
              ': ' +
              values?.alloc_suppcode +
              '"'
          );
          notification.error({
            message: t('messages.validationFailed'),
            description: notes,
          });
          return;
        }
      }
    }

    const allocs = [];

    console.log(values);

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
        await api
          .post(IS_CREATING ? ALLOCATIONS.CREATE : ALLOCATIONS.UPDATE, values)
          .then(() => {
            onComplete(values);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING
                ? t('descriptions.createSuccess')
                : `${t('descriptions.updateSuccess')} ${values?.alloc_type}`,
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
          .post(ALLOCATIONS.DELETE, value)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')} ${value?.alloc_type}`,
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
    if (!selected) {
      notification.error({
        message: t('pageNames.allocations'),
        description: t('descriptions.selectAllocationItem'),
      });
      return;
    }

    if (selected.aitem_qtyused === 0) {
      notification.error({
        message: t('pageNames.allocations'),
        description: t('descriptions.deliveredBeingZero'),
      });
      return;
    }

    Modal.confirm({
      title: t('prompts.reset'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <RedoOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api

          .post(ALLOCATIONS.RESET, selected)
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

      setAllocIndex(undefined);
      setType(undefined);
      setCompany(undefined);
      setSupplier(undefined);
      setLockType(undefined);
      setAllocations([]);
    }
    setSelected(null);
  }, [resetFields, value, visible]);

  useEffect(() => {
    // console.log('................getAllocs', type, company, supplier);
    if ((IS_CREATING && supplier) || (!IS_CREATING && type && company && supplier && allocIndex)) {
      getAllocations();
    }
  }, [IS_CREATING, type, company, supplier, allocIndex, getAllocations]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            disabled={IS_CREATING || !selected}
            icon={<RedoOutlined />}
            onClick={onReset}
          >
            {t('operations.reset')}
          </Button>

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
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access.canCreate : !access.canUpdate}
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
              disabled={!access.canDelete}
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
            <Row gutter={[8, 3]}>
              <Col span={12}>
                <Type form={form} value={value} onChange={setType} onSupplier={setSupplier} />
              </Col>
              <Col span={12}>
                {config?.siteAllowMultiAllocations && (
                  <AllocIndex form={form} value={value} onChange={setAllocIndex} />
                )}
              </Col>
            </Row>

            <Row gutter={[8, 3]}>
              <Col span={12}>
                <Company form={form} value={value} type={type} onChange={setCompany} />
              </Col>
              <Col span={12}>
                <Supplier form={form} value={value} type={type} onChange={setSupplier} />
              </Col>
            </Row>

            <Row gutter={[8, 3]}>
              <Col span={12}>
                <LockType form={form} value={value} onChange={setLockType} enableWhenEdit={false} />
              </Col>
              <Col span={12}>
                <PeriodItem form={form} value={value} lockType={lockType} enableWhenEdit={false} />
              </Col>
            </Row>

            {config?.siteAllocResetPeriodDateRanges &&
              (String(lockType) === '3' || String(lockType) === '4') && (
                <Row gutter={[8, 3]}>
                  <Col span={12}>
                    <EffectiveFrom form={form} value={value} />
                  </Col>
                  <Col span={12}>
                    <ExpiredAfter form={form} value={value} />
                  </Col>
                </Row>
              )}

            <Comments form={form} value={value} />

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
      <Period
        visible={showPeriod && CAN_ALLOCATE_PERIOD}
        setVisibility={setShowPeriod}
        selected={selected}
        onChange={getAllocations} //Because period update may change allocation quantity
      />
    </Drawer>
  );
};

export default FormModal;
