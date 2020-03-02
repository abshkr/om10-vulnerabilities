import React from 'react';
import { Form, Button, Tabs, notification, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import {
  Employer,
  Code,
  Name,
  SLP,
  Department,
  Email,
  Role,
  TimeCode,
  DriverLicence,
  Status,
  Comment,
  Lock
} from './fields';

import { CheckList, PasswordReset, Expiry } from '../../../components';
import { PERSONNEL } from '../../../api';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: payload } = useSWR(PERSONNEL.READ);

  const fields = columns(t);

  const IS_CREATING = !value;

  const onFinish = values => {
    let matches = [];

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, object => {
        return (
          object.per_name === value.per_name && object.per_code !== value.per_code && object.per_name !== ''
        );
      });
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content:
        matches.length > 0 ? (
          <CheckList form={form} matches={matches} columns={fields} rowKey="per_code" />
        ) : null,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? PERSONNEL.CREATE : PERSONNEL.UPDATE, values)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(PERSONNEL.READ);
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
          .post(PERSONNEL.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(PERSONNEL.READ);
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
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            {/* <Employer form={form} value={value} />
            <Code form={form} value={value} />
            <Name form={form} value={value} />
            <SLP form={form} value={value} />
            <Department form={form} value={value} />
            <Email form={form} value={value} />
            <Role form={form} value={value} />
            <TimeCode form={form} value={value} />
            <DriverLicence form={form} value={value} />
            <Status form={form} value={value} />
            <Comment form={form} value={value} /> */}
          </TabPane>
          <TabPane className="ant-tab-window" tab={t('tabColumns.expiryDates')} forceRender={true} key="2">
            <Expiry form={form} value={value} type={PERSONNEL.EXPIRY_TYPES} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t('tabColumns.areaAccess')} forceRender={true} key="3">
            <Lock form={form} value={value} />
          </TabPane>

          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.resetPassword')}
            forceRender={true}
            key="4"
            disabled={!value}
          >
            <PasswordReset value={value} />
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
