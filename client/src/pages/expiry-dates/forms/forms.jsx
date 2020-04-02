import React from 'react';

import axios from 'axios';
import { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, Divider, notification, Tooltip } from 'antd';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { ExpiryDateTarget, TypeCode, TypeDescription, DateTimeFormat, DefaultValue, Flags } from './fields';
import { EXPIRY_DATES } from '../../../api';

import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const onFinish = values => {
    if (values?.edt_def_exp_date !== '') {
      values.edt_def_exp_date = values?.edt_def_exp_date?.format(SETTINGS.DATE_TIME_FORMAT);
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? EXPIRY_DATES.CREATE : EXPIRY_DATES.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(EXPIRY_DATES.READ);

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed')
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
          .post(EXPIRY_DATES.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(EXPIRY_DATES.READ);
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

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} key="1">
            <ExpiryDateTarget form={form} value={value} />
            <TypeCode form={form} value={value} />
            <TypeDescription form={form} value={value} />

            <Divider>{t('divider.flags')}</Divider>

            <Flags form={form} value={value} />

            <Divider>{t('divider.dateTime')}</Divider>

            <DefaultValue form={form} value={value} />

            <DateTimeFormat form={form} value={value} />
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

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Tooltip title={value?.child_count > 0 && 'Disabled Due to the Existence of Child Records.'}>
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={onDelete}
                disabled={value?.child_count > 0}
              >
                {t('operations.delete')}
              </Button>
            </Tooltip>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
