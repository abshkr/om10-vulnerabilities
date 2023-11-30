import React, { useEffect, useState } from 'react';
import { Form, Button, Tabs, notification, Modal, Drawer, Row, Col, Divider, Card, Tag, Tooltip } from 'antd';
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
  CompassOutlined,
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
  Phone,
} from './fields';

import { CheckList, PasswordReset, Expiry } from '../../../components';
import api, { PERSONNEL } from '../../../api';
import columns from './columns';
import { SETTINGS } from '../../../constants';
import ChangeArea from './change-area';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  // setFilterValue,
  revalidate,
  expiryDateMode,
  expiryTypes,
  config,
  onLocate,
  setPage,
  maskFlag,
}) => {
  const [passwordResetVisible, setPasswordResetVisible] = useState(false);
  const [areaVisible, setAreaVisible] = useState(false);
  const [tagCount, setTagCount] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const { data: payload } = useSWR(PERSONNEL.READ);

  const { data: tags } = useSWR(
    value?.per_code ? `${PERSONNEL.CHECK_PERSONNEL_TAGS}?psnl_code=${value?.per_code}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: loads } = useSWR(
    value?.per_code ? `${PERSONNEL.CHECK_PERSONNEL_LOADS}?psnl_code=${value?.per_code}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: trips } = useSWR(
    value?.per_code ? `${PERSONNEL.CHECK_PERSONNEL_TRIPS}?psnl_code=${value?.per_code}` : null,
    {
      refreshInterval: 0,
    }
  );

  const fields = columns(t);

  const IS_CREATING = !value;

  const onFormClosed = () => {
    handleFormState(false, null);
  };

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      onFormClosed();
      return;
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        onFormClosed();
      },
    });
  };

  const onComplete = (per_code) => {
    // resetFields();
    handleFormState(false, null);
    /* if (per_code) {
      setFilterValue('' + per_code);
      revalidate();
    } else {
      setFilterValue(' ');
    } */
    if (per_code) {
      onLocate(per_code);
    } else {
      onLocate('');
    }
    setPage(1);
    revalidate();
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    let matches = [];
    let bulk_edit = [];
    const setBulk = (bulk) => {
      bulk_edit = [...bulk];
    };

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
          <CheckList form={form} matches={matches} columns={fields} rowKey="per_code" setBulk={setBulk} />
        ) : null,
      onOk: async () => {
        values.bulk_edit = bulk_edit;
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

  useEffect(() => {
    if (tags) {
      setTagCount(tags?.records?.[0]?.cnt);
    }
  }, [tags]);

  useEffect(() => {
    if (loads) {
      setLoadCount(loads?.records?.[0]?.cnt);
    }
  }, [loads]);

  useEffect(() => {
    if (trips) {
      setTripCount(trips?.records?.[0]?.cnt);
    }
  }, [trips]);

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : maskFlag}
      placement="right"
      width="80vw"
      open={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onExitClicked()}
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
              disabled={!access?.canDelete || tagCount > 0 || loadCount > 0 || tripCount > 0}
            >
              {t('operations.delete')}
            </Button>
          )}

          {!IS_CREATING && (
            <div style={{ float: 'right', marginRight: 5 }}>
              <Tooltip placement="topRight" title={t('descriptions.countPersonnelTags')}>
                <Tag color={tagCount > 0 ? 'red' : 'green'}>
                  {t('fields.countPersonnelTags') + ': ' + tagCount}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countPersonnelLoads')}>
                <Tag color={loadCount > 0 ? 'red' : 'green'}>
                  {t('fields.countPersonnelLoads') + ': ' + loadCount}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countPersonnelTrips')}>
                <Tag color={tripCount > 0 ? 'red' : 'green'}>
                  {t('fields.countPersonnelTrips') + ': ' + tripCount}
                </Tag>
              </Tooltip>
            </div>
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

          {!IS_CREATING && (value?.user_status_flag === '1' || value?.user_status_flag === '0') && (
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

          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<CompassOutlined />}
              style={{ float: 'left', marginLeft: 5 }}
              onClick={() => setAreaVisible(true)}
              disabled={!access?.canUpdate}
            >
              {t('operations.changeArea')}
            </Button>
          )}

          {passwordResetVisible && (
            <Drawer
              title={t('tabColumns.resetPassword')}
              placement="right"
              styles={{ body: { paddingTop: 25 } }}
              onClose={() => setPasswordResetVisible(false)}
              open={passwordResetVisible}
              width="36vw"
            >
              <Form layout="vertical">
                <PasswordReset value={value} setHide={() => setPasswordResetVisible(false)} />
              </Form>
            </Drawer>
          )}

          {areaVisible && (
            <Drawer
              title={t('tabColumns.changeArea')}
              placement="right"
              styles={{ body: { paddingTop: 25 } }}
              onClose={() => setAreaVisible(false)}
              open={areaVisible}
              width="36vw"
            >
              <ChangeArea value={value} setHide={() => setAreaVisible(false)} />
            </Drawer>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Row gutter={[8, 2]}>
              <Col span={6}>
                <Employer form={form} value={value} />
              </Col>
              <Col span={6}>
                <Code form={form} value={value} config={config} />
              </Col>
              <Col span={6}>
                <Name form={form} value={value} />
              </Col>
              <Col span={6}>
                <Role form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={6}>
                <TimeCode form={form} value={value} />
              </Col>
              <Col span={6}>
                <Department form={form} value={value} />
              </Col>
              <Col span={6}>
                <DriverLicence form={form} value={value} />
              </Col>
              <Col span={6}>
                <Phone form={form} value={value} isMandatory={config.site2FAMethod === 'SMS'} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              {config?.driver_slp_enabled && (
                <Col span={8}>
                  <SLP form={form} value={value} config={config} />
                </Col>
              )}
              <Col span={config?.driver_slp_enabled ? 16 : 24}>
                <Email form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}></Row>

            <Row gutter={[8, 2]}>
              <Col span={6}>
                <Status form={form} value={value} />
              </Col>
              <Col span={18}>
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
