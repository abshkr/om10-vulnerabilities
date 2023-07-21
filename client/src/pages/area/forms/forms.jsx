import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Popover, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';

import _ from 'lodash';

import { Area, AreaName, Gates } from './fields';

import api, { AREA } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();

  const [tankCount, setTankCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [gateCount, setGateCount] = useState(0);
  const [printerCount, setPrinterCount] = useState(0);
  const [trailerCount, setTrailerCount] = useState(0);
  const [personCount, setPersonCount] = useState(0);
  const [movementCount, setMovementCount] = useState(0);
  const [hasChild, setHasChild] = useState(false);

  const { data: tanks } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_TANKS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: devices } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_DEVICES}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: gates } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_GATES}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: printers } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_PRINTERS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: trailers } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_TRAILERS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: persons } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_PERSONS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: movements } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_MOVEMENTS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );

  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(AREA.READ);
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
          .post(IS_CREATING ? AREA.CREATE : AREA.UPDATE, values)
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
                message:
                  error.code === 400 || error.code === 500
                    ? IS_CREATING
                      ? t('messages.createFailed')
                      : t('messages.updateFailed')
                    : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onDelete = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(AREA.DELETE, values)
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
                message: error.code === 500 ? t('messages.deleteFailed') : error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]);

  useEffect(() => {
    if (tanks) {
      setTankCount(_.toNumber(tanks?.records?.[0]?.cnt));
    }
  }, [tanks]);

  useEffect(() => {
    if (devices) {
      setDeviceCount(_.toNumber(devices?.records?.[0]?.cnt));
    }
  }, [devices]);

  useEffect(() => {
    if (gates) {
      setGateCount(_.toNumber(gates?.records?.[0]?.cnt));
    }
  }, [gates]);

  useEffect(() => {
    if (printers) {
      setPrinterCount(_.toNumber(printers?.records?.[0]?.cnt));
    }
  }, [printers]);

  useEffect(() => {
    if (trailers) {
      setTrailerCount(_.toNumber(trailers?.records?.[0]?.cnt));
    }
  }, [trailers]);

  useEffect(() => {
    if (persons) {
      setPersonCount(_.toNumber(persons?.records?.[0]?.cnt));
    }
  }, [persons]);

  useEffect(() => {
    if (movements) {
      setMovementCount(_.toNumber(movements?.records?.[0]?.cnt));
    }
  }, [movements]);

  useEffect(() => {
    if (
      tankCount === 0 &&
      deviceCount === 0 &&
      gateCount === 0 &&
      printerCount === 0 &&
      trailerCount === 0 &&
      personCount === 0 &&
      movementCount === 0
    ) {
      setHasChild(false);
    } else {
      setHasChild(true);
    }
  }, [tankCount, deviceCount, gateCount, printerCount, trailerCount, personCount, movementCount]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
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
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Popover
              placement="topRight"
              title={
                <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{t('fields.countChildRecords')}</span>
              }
              content={
                <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
                  <Descriptions.Item
                    key={1}
                    style={{ color: tankCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaTanks')}
                    span={1}
                  >
                    {tankCount}
                  </Descriptions.Item>
                  <Descriptions.Item
                    key={1}
                    style={{ color: deviceCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaDevices')}
                    span={1}
                  >
                    {deviceCount}
                  </Descriptions.Item>
                  <Descriptions.Item
                    key={1}
                    style={{ color: gateCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaGates')}
                    span={1}
                  >
                    {gateCount}
                  </Descriptions.Item>
                  <Descriptions.Item
                    key={1}
                    style={{ color: printerCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaPrinters')}
                    span={1}
                  >
                    {printerCount}
                  </Descriptions.Item>
                  <Descriptions.Item
                    key={1}
                    style={{ color: trailerCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaTrailers')}
                    span={1}
                  >
                    {trailerCount}
                  </Descriptions.Item>
                  <Descriptions.Item
                    key={1}
                    style={{ color: personCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaPersons')}
                    span={1}
                  >
                    {personCount}
                  </Descriptions.Item>
                  <Descriptions.Item
                    key={1}
                    style={{ color: movementCount > 0 ? 'red' : 'green' }}
                    label={t('fields.countAreaMovements')}
                    span={1}
                  >
                    {movementCount}
                  </Descriptions.Item>
                </Descriptions>
              }
            >
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete || hasChild}
                onClick={onDelete}
              >
                {t('operations.delete')}
              </Button>
            </Popover>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Area form={form} value={value} />
            <AreaName form={form} value={value} />
            <Gates form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
