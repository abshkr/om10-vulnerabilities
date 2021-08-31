import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Button, Tabs, notification, Modal, Drawer, Row, Col, Divider, Tag, Tooltip, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import moment from 'moment';

import _ from 'lodash';

import {
  Depot,
  Owner,
  Code,
  Name,
  EquipmentType,
  Carrier,
  TotalTrips,
  LastTrip,
  Comments,
  TankerPrompt,
  Pin,
  MaxKg,
  Destination,
  LastDepot,
  CurrentDepot,
  Locks,
  SLP,
  LegacyExpires,
  Number,
} from './fields';
import api, { TANKER_LIST } from '../../../api';
import Compartments from './compartments';
import Axles from './axles';
import { Expiry, CheckList } from '../../../components';
import columns from './columns';
import { SETTINGS } from '../../../constants';
import { useConfig } from 'hooks';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  setFilterValue,
  expiryDateMode,
  expiryTypes,
  config,
  tankers,
}) => {
  const { t } = useTranslation();
  const { carrcode_tankernum_tag } = useConfig();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [tagCount, setTagCount] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);
  const [carrier, setCarrier] = useState(null);

  const { data: payload } = useSWR(value?.tnkr_name ? `${TANKER_LIST.MATCHES_BY_NAME}?tnkr_name=${value?.tnkr_name}` : null);
  
  const [equipment, setEquipment] = useState(undefined);

  const { data: tags } = useSWR(value?.tnkr_code ? `${TANKER_LIST.CHECK_TANKER_TAGS}?tanker=${value?.tnkr_code}` : null, {
    refreshInterval: 0,
  });
  const { data: loads } = useSWR(value?.tnkr_code? `${TANKER_LIST.CHECK_TANKER_LOADS}?tanker=${value?.tnkr_code}` : null, {
    refreshInterval: 0,
  });
  const { data: trips } = useSWR(value?.tnkr_code? `${TANKER_LIST.CHECK_TANKER_TRIPS}?tanker=${value?.tnkr_code}` : null, {
    refreshInterval: 0,
  });

  const fields = columns(t);
  const IS_CREATING = !value;

  const onComplete = (tnkr_code) => {
    resetFields();
    handleFormState(false, null);
    mutate(TANKER_LIST.READ);
    if (tnkr_code) {
      setFilterValue('' + tnkr_code);
    } else {
      setFilterValue(' ');
    }
  };

  const onFormClosed = () => {
    resetFields();
    setEquipment(undefined);
    handleFormState(false, null);
  };

  const checkExpiry = (expiry) => {
    let invalid = false;
    if (expiry !== null && expiry !== '' && expiry !== undefined) {
      const expDate = moment(expiry, SETTINGS.DATE_TIME_FORMAT);
      const curDate = moment();
      if (curDate.isAfter(expDate)) {
        invalid = true;
      }
    }
    return invalid;
  };

  const onDatesValidation = (values) => {
    const errors = [];

    // expiryDateMode: '1', Legacy Expiry; '2', Customized Expiry
    if (expiryDateMode === '1') {
      if (checkExpiry(values?.tnkr_lic_exp)) {
        errors.push({
          field: expiryTypes?.records?.[0].expiry_date_titl,
          message: `${t('validate.expiryDateEarlierThanCurrentDate')}`,
          key: `${'tnkr_lic_exp'}`,
          line: errors.length,
        });
      }
      if (checkExpiry(values?.tnkr_dglic_exp)) {
        errors.push({
          field: expiryTypes?.records?.[1].expiry_date_titl,
          message: `${t('validate.expiryDateEarlierThanCurrentDate')}`,
          key: `${'tnkr_dglic_exp'}`,
          line: errors.length,
        });
      }
      if (checkExpiry(values?.tnkr_ins_exp)) {
        errors.push({
          field: expiryTypes?.records?.[2].expiry_date_titl,
          message: `${t('validate.expiryDateEarlierThanCurrentDate')}`,
          key: `${'tnkr_ins_exp'}`,
          line: errors.length,
        });
      }
    } else {
      _.forEach(values?.expiry_dates, (item) => {
        if (checkExpiry(item?.ed_exp_date)) {
          errors.push({
            field: item?.edt_type_desc,
            message: `${t('validate.expiryDateEarlierThanCurrentDate')}`,
            key: item?.edt_type_code,
            line: errors.length,
          });
        }
      });
    }

    return errors;
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    let matches = [];
    let bulk_edit = [];
    const setBulk = (bulk) => {
      bulk_edit = [...bulk];
    };

    let eqpt_selected = true;
    if (!values.tnkr_equips) {
      eqpt_selected = false;
    } else {
      _.forEach(values?.tnkr_equips, (equipment, index) => {
        if (!equipment.eqpt_id) {
          eqpt_selected = false;
        }
      });
    }

    const createPrompt = !eqpt_selected ? t('prompts.zeroEquipmentSelected') : t('prompts.create');

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, (object) => {
        return (
          object.tnkr_name === value.tnkr_name &&
          object.tnkr_code !== value.tnkr_code &&
          object.tnkr_name !== ''
        );
      });
    }

    values.tnkr_lic_exp = values?.tnkr_lic_exp?.format(SETTINGS.DATE_TIME_FORMAT);
    values.tnkr_dglic_exp = values?.tnkr_dglic_exp?.format(SETTINGS.DATE_TIME_FORMAT);
    values.tnkr_ins_exp = values?.tnkr_ins_exp?.format(SETTINGS.DATE_TIME_FORMAT);

    // validate the expiry dates and warn the users if any of expiry dates is/are earlier than current date
    // but allow the users to carry on if they insist.
    let errors = [];
    let lines = null;
    errors = onDatesValidation(values);
    if (errors.length > 0) {
      lines = (
        <Scrollbars
          style={{
            height: '300px',
            width: !eqpt_selected ? '36vw' : '26vw',
            marginTop: 15,
            padding: 5,
            marginBottom: 15,
          }}
        >
          <>
            {errors?.map((error, index) => (
              <Card size="small" title={error.field}>
                {error.message}
              </Card>
            ))}
          </>
        </Scrollbars>
      );
    }
    let submitPrompt = IS_CREATING ? createPrompt : t('prompts.update');
    if (errors.length > 0 && IS_CREATING) {
      submitPrompt += ' (' + String(errors.length) + ' ' + t('validate.warnings') + ')';
    }

    Modal.confirm({
      title: submitPrompt,
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      width: !eqpt_selected ? '40vw' : errors.length > 0 && IS_CREATING ? '30vw' : null,
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content: IS_CREATING ? (
        lines
      ) : matches.length > 0 ? (
        <CheckList form={form} matches={matches} columns={fields} rowKey="tnkr_code" setBulk={setBulk} />
      ) : null,
      onOk: async () => {
        values.bulk_edit = bulk_edit;
        await api
          .post(IS_CREATING ? TANKER_LIST.CREATE : TANKER_LIST.UPDATE, values)
          .then((response) => {
            onComplete(values.tnkr_code);

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

  const onUnlock = () => {
    Modal.confirm({
      title: t('prompts.unlockAll'),
      okText: t('operations.yes'),
      // okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        api
          .post(`${TANKER_LIST.UNLOCK_ALL}?tnkr_code=${value.tnkr_code}`)
          .then((response) => {
            onComplete(value.tnkr_code);

            notification.success({
              message: t('messages.unlockSuccess'),
              description: `${t('descriptions.unlockAllSuccess')}`,
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
          .post(TANKER_LIST.DELETE, value)
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

  useEffect(() => {
    if (!value && !visible) {
      form.resetFields();
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
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="60vw"
      visible={visible}
      footer={
        <>
          {!IS_CREATING && (
            <div style={{ float: 'left', marginRight: 5 }}>
              <Tooltip placement="topRight" title={t('descriptions.countTankerTags')}>
                <Tag color={tagCount > 0 ? 'red' : 'green'}>
                  {t('fields.countTankerTags') + ': ' + tagCount}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countTankerLoads')}>
                <Tag color={loadCount > 0 ? 'red' : 'green'}>
                  {t('fields.countTankerLoads') + ': ' + loadCount}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t('descriptions.countTankerTrips')}>
                <Tag color={tripCount > 0 ? 'red' : 'green'}>
                  {t('fields.countTankerTrips') + ': ' + tripCount}
                </Tag>
              </Tooltip>
            </div>
          )}

          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={onFormClosed}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="dashed"
              icon={<UnlockOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onUnlock}
              disabled={!access?.canUpdate}
            >
              {t('operations.unlockAll')}
            </Button>
          )}
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
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            tab={t('tabColumns.identification')}
            style={{ height: 'calc(100vh - 150px)', overflowY: 'scroll' }}
            forceRender={true}
            key="1"
          >
            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Depot form={form} value={value} />
              </Col>
              <Col span={8}>
                <Owner form={form} value={value} />
              </Col>
              <Col span={8}>
                <Carrier form={form} value={value} setCarrier={setCarrier} />
              </Col>
            </Row>

            {carrcode_tankernum_tag ? (
              <Row gutter={[8, 2]}>
                <Col span={6}>
                  <Code form={form} value={value} tankers={tankers} config={config} />
                </Col>
                <Col span={6}>
                  <Number form={form} value={value} carrier={carrier} tankers={tankers} />
                </Col>
                <Col span={6}>
                  <Name form={form} value={value} />
                </Col>
                <Col span={6}>
                  <TotalTrips form={form} value={value} />
                </Col>
              </Row>
            ) : (
              <Row gutter={[8, 2]}>
                <Col span={8}>
                  <Code form={form} value={value} tankers={tankers} config={config} />
                </Col>
                <Col span={8}>
                  <Name form={form} value={value} />
                </Col>
                <Col span={8}>
                  <TotalTrips form={form} value={value} />
                </Col>
              </Row>
            )}

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <LastTrip form={form} value={value} />
              </Col>
              <Col span={16}>
                <Comments form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <TankerPrompt form={form} value={value} />
              </Col>
              <Col span={8}>
                <Pin form={form} value={value} />
              </Col>
              <Col span={8}>
                <MaxKg form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <SLP form={form} value={value} />
              </Col>
              <Col span={16}>
                <Locks form={form} value={value} />
              </Col>
            </Row>

            <Divider>{t('tabColumns.configuration')} </Divider>

            <EquipmentType form={form} value={value} onChange={setEquipment} />
            <Compartments form={form} value={value} equipment={equipment} />

            <Divider>{t('tabColumns.expiryDates')} </Divider>

            {expiryDateMode === '1' ? (
              <LegacyExpires form={form} value={value} expiryTypes={expiryTypes?.records}></LegacyExpires>
            ) : (
              <Expiry form={form} value={value} type={TANKER_LIST.EXPIRY} />
            )}

            {config?.siteUseAxleWeightLimit && value && <Divider>{t('tabColumns.axleWeightLimit')}</Divider>}

            {config?.siteUseAxleWeightLimit && value && (
              <Row gutter={[8, 2]}>
                <Col span={24}>
                  <Axles form={form} value={value} />
                </Col>
              </Row>
            )}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
