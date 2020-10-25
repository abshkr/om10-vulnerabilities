import React, { useEffect, useState } from 'react';
import { Form, Button, Tabs, notification, Modal, Drawer, Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
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
  Lock,
  LegacyExpires,
} from './fields';

import { CheckList, PasswordReset, Expiry } from '../../../components';
import api, { PERSONNEL } from '../../../api';
import columns from './columns';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  setFilterValue,
  expiryDateMode,
  expiryTypes,
}) => {
  const [passwordResetVisible, setPasswordResetVisible] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const { data: payload } = useSWR(PERSONNEL.READ);

  const fields = columns(t);

  const IS_CREATING = !value;

  const onComplete = (per_code) => {
    handleFormState(false, null);
    mutate(PERSONNEL.READ);
    if (per_code) {
      setFilterValue('' + per_code);
    } else {
      setFilterValue(' ');
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    let matches = [];

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, (object) => {
        return (
          object.per_name === value.per_name && object.per_code !== value.per_code && object.per_name !== ''
        );
      });
    }

    values.per_exp_d1_dmy = values?.per_exp_d1_dmy?.format(SETTINGS.DATE_TIME_FORMAT);
    values.per_exp_d2_dmy = values?.per_exp_d2_dmy?.format(SETTINGS.DATE_TIME_FORMAT);
    values.per_exp_d3_dmy = values?.per_exp_d3_dmy?.format(SETTINGS.DATE_TIME_FORMAT);

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
        await api
          .post(IS_CREATING ? PERSONNEL.CREATE : PERSONNEL.UPDATE, values)
          .then((response) => {
            onComplete(values.per_code);

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
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PERSONNEL.DELETE, value)
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

  const onUserStatusChange = (flag) => {
    Modal.confirm({
      title: flag ? t('prompts.activate') : t('prompts.lock'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(PERSONNEL.UPDATE_STATUS, {
            per_code: value?.per_code,
            user_status_flag: flag ? '1' : '2',
          })
          .then(() => {
            onComplete(value?.per_code);

            notification.success({
              message: flag ? t('messages.activateSuccess') : t('messages.lockSuccess'),
              description: flag ? t('descriptions.activateSuccess') : t('descriptions.lockSuccess'),
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
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="60vw"
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
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
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
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}

          {!IS_CREATING && value?.user_status_flag === '2' && (
            <Button
              type="primary"
              disabled={IS_CREATING || !access?.canUpdate}
              icon={<UnlockOutlined />}
              style={{ marginLeft: 5 }}
              onClick={() => onUserStatusChange(true)}
            >
              {t('operations.activate')}
            </Button>
          )}

          {!IS_CREATING && value?.user_status_flag === '1' && (
            <Button
              type="primary"
              disabled={IS_CREATING || !access?.canUpdate}
              icon={<LockOutlined />}
              style={{ marginLeft: 5 }}
              onClick={() => onUserStatusChange(false)}
            >
              {t('operations.lock')}
            </Button>
          )}

          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<SafetyCertificateOutlined />}
              style={{ float: 'left', marginLeft: 5 }}
              onClick={() => setPasswordResetVisible(true)}
              disabled={!access?.canUpdate}
            >
              {t('operations.resetPassword')}
            </Button>
          )}

          {passwordResetVisible && (
            <Drawer
              title={t('tabColumns.resetPassword')}
              placement="right"
              bodyStyle={{ paddingTop: 25 }}
              onClose={() => setPasswordResetVisible(false)}
              visible={passwordResetVisible}
              width="36vw"
            >
              <Form layout="vertical">
                <PasswordReset value={value} />
              </Form>
            </Drawer>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Employer form={form} value={value} />
              </Col>
              <Col span={8}>
                <Code form={form} value={value} />
              </Col>
              <Col span={8}>
                <Name form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Role form={form} value={value} />
              </Col>
              <Col span={8}>
                <TimeCode form={form} value={value} />
              </Col>
              <Col span={8}>
                <Department form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Email form={form} value={value} />
              </Col>
              <Col span={8}>
                <DriverLicence form={form} value={value} />
              </Col>
              <Col span={8}>
                <SLP form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={4}>
                <Status form={form} value={value} />
              </Col>
              <Col span={20}>
                <Comment form={form} value={value} />
              </Col>
            </Row>

            {/* <Divider>{t('tabColumns.areaAccess')}</Divider> */}

            <Lock form={form} value={value} />

            <Divider>{t('tabColumns.expiryDates')}</Divider>

            {expiryDateMode === '1' ? (
              <LegacyExpires form={form} value={value} expiryTypes={expiryTypes}></LegacyExpires>
            ) : (
              <Expiry form={form} value={value} type={PERSONNEL.EXPIRY_TYPES} />
            )}
          </TabPane>

          {/* access?.canUpdate && 
            <TabPane
              // className="ant-tab-window"
              tab={t('tabColumns.resetPassword')}
              forceRender={true}
              key="4"
              disabled={!value}
            >
              <PasswordReset value={value} />
            </TabPane>
           */}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
