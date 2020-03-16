import React, { useState } from 'react';

import axios from 'axios';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, notification } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  PrinterOutlined,
  EyeOutlined,
  UndoOutlined
} from '@ant-design/icons';

import { LOAD_SCHEDULES, MOVEMENT_NOMIATIONS } from '../../../api';
import Nomination from './nomination';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, IS_NOMINATION }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(false);

  const IS_CREATING = !value;

  const onFinish = values => {
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? LOAD_SCHEDULES.CREATE : LOAD_SCHEDULES.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(LOAD_SCHEDULES.READ);

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('messages.updateSuccess')
            });
          });
      }
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
          .post(LOAD_SCHEDULES.DELETE, value)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(LOAD_SCHEDULES.READ);

              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed')
            });
          });
      }
    });
  };

  const onViewBOL = async () => {
    setLoading(true);

    await axios
      .get(MOVEMENT_NOMIATIONS.BOL, {
        params: {
          supplier: value?.supplier_code,
          trip_no: value?.shls_trip_no
        }
      })
      .then(response => {
        setLoading(false);

        Modal.info({
          centered: true,
          width: '40vw',
          content: (
            <div className="ant-tab-window">
              <pre>{response?.data}</pre>
            </div>
          )
        });
      });
  };

  const onViewLoadReport = async () => {
    setLoading(true);

    await axios
      .get(MOVEMENT_NOMIATIONS.REPORT, {
        params: {
          supplier: value?.supplier_code,
          trip_no: value?.shls_trip_no
        }
      })
      .then(response => {
        setLoading(false);

        Modal.info({
          centered: true,
          width: '40vw',
          content: (
            <div className="ant-tab-window">
              <pre>{response?.data}</pre>
            </div>
          )
        });
      });
  };

  const onBOLPrint = () => {
    Modal.confirm({
      title: t('prompts.printBOL'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(MOVEMENT_NOMIATIONS.PRINT_BOL, {
            supplier: value?.supplier_code,
            trip_no: value?.shls_trip_no
          })
          .then(response => {
            Modal.destroyAll();

            notification.success({
              message: t('messages.printBOLSuccess'),
              description: `${t('descriptions.printBOLSuccess')}`
            });
          })
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.printBOLFailed')
            });
          });
      }
    });
  };

  const onReverseTransaction = () => {
    Modal.confirm({
      title: t('prompts.reverseTransaction'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(MOVEMENT_NOMIATIONS.REVERSE, {
            supplier: value?.supplier_code,
            trip_no: value?.shls_trip_no
          })
          .then(response => {
            Modal.destroyAll();

            notification.success({
              message: t('messages.reverseSuccess'),
              description: `${t('descriptions.reverseSuccess')}`
            });
          })
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.reverseFailed')
            });
          });
      }
    });
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey={IS_NOMINATION ? '2' : '1'} animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} key="1" disabled={IS_NOMINATION}>
            test
          </TabPane>

          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.nominationSchedule')}
            key="2"
            disabled={!IS_NOMINATION}
          >
            <Nomination value={value} />
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

          {IS_NOMINATION && (
            <>
              <Button
                type="default"
                icon={<EyeOutlined />}
                style={{ marginRight: 5 }}
                onClick={onViewBOL}
                loading={isLoading}
              >
                {t('operations.viewBOL')}
              </Button>

              <Button
                type="primary"
                icon={<PrinterOutlined />}
                style={{ marginRight: 5 }}
                loading={isLoading}
                onClick={onBOLPrint}
              >
                {t('operations.printBOL')}
              </Button>

              <Button
                type="default"
                icon={<EyeOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                loading={isLoading}
                onClick={onViewLoadReport}
              >
                {t('operations.loadReport')}
              </Button>

              <Button
                type="danger"
                icon={<UndoOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                loading={isLoading}
                onClick={onReverseTransaction}
              >
                {t('operations.reverseTransactions')}
              </Button>
            </>
          )}

          {!IS_CREATING && !IS_NOMINATION && (
            <Button
              type="primary"
              icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
              htmlType="submit"
              style={{ float: 'right', marginRight: 5 }}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>
          )}

          {!IS_CREATING && !IS_NOMINATION && (
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
    </div>
  );
};

export default FormModal;
