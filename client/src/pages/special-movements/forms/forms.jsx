import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  CalculatorOutlined,
  ReloadOutlined,
  SaveOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import { MovementType, ReasonCode, MovementTime, Comments, To, From } from './fields';
import { SPECIAL_MOVEMENTS } from '../../../api';
import Calculate from './calculate';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [type, setType] = useState(null);

  const IS_CREATING = !value;
  const DISABLED = value?.mlitm_status === '5';

  const FROM = ['1', '2'];
  const TO = ['0', '2'];

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
          .post(IS_CREATING ? SPECIAL_MOVEMENTS.CREATE : SPECIAL_MOVEMENTS.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(SPECIAL_MOVEMENTS.READ);
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
          .post(SPECIAL_MOVEMENTS.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(SPECIAL_MOVEMENTS.READ);
              Modal.destroyAll();
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

  const onCalculate = () => {
    Modal.confirm({
      title: t('prompts.caclulate'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true
    });
  };

  const onSubmit = () => {
    Modal.confirm({
      title: t('prompts.submit'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true
    });
  };

  const onReverse = () => {
    Modal.confirm({
      title: t('prompts.onReverse'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true
    });
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <MovementType form={form} value={value} onChange={setType} disabled={DISABLED} />

            <ReasonCode form={form} value={value} type={type} disabled={DISABLED} />

            <MovementTime form={form} value={value} type={type} disabled={DISABLED} />

            <Comments form={form} value={value} type={type} disabled={DISABLED} />

            <Divider>{t('divider.directions')}</Divider>

            {TO.includes(type) && <To form={form} value={value} />}

            {FROM.includes(type) && <From form={form} value={value} />}

            <Divider>{t('divider.calculation')}</Divider>

            <Calculate form={form} value={value} type={type} disabled={DISABLED} />
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            disabled={DISABLED}
            icon={<CalculatorOutlined />}
            style={{ marginRight: 5 }}
            onClick={onCalculate}
          >
            {t('operations.calculate')}
          </Button>

          <Button disabled={!DISABLED} htmlType="button" onClick={onReverse} icon={<ReloadOutlined />}>
            {t('operations.reverse')}
          </Button>

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
            disabled={DISABLED}
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          <Button
            type="ghost"
            icon={<SaveOutlined />}
            htmlType="button"
            disabled={DISABLED}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.submit')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              disabled={DISABLED}
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
