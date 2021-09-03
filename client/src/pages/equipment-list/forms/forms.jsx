import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import {
  Form,
  Button,
  Tabs,
  notification,
  Modal,
  Drawer,
  Divider,
  Row,
  Col,
  Tag,
  Tooltip,
  Card,
} from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { EQUIPMENT_LIST } from '../../../api';
import Compartments from './compartments';
import Axles from './axles';
import { SETTINGS } from '../../../constants';

import {
  Owner,
  Code,
  Title,
  EquipmentType,
  Area,
  LoadType,
  EmptyWeight,
  PullingLimit,
  Comments,
  Locks,
  LegacyExpires,
  AxleGroupNumber,
  AxleLimitTypes,
  // FrontWeightLimit,
  // RearWeightLimit,
  // FrontAxleGroups,
  // RearAxleGroups,
} from './fields';
import { Expiry, CheckList, Equipment } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  setEqptCode,
  expiryDateMode,
  expiryTypes,
  config,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const { data: payload } = useSWR(value?.eqpt_code ? `${EQUIPMENT_LIST.MATCHES_BY_TITLE}?eqpt_title=${value?.eqpt_title}` : null);
  const [eqptType, setEqptType] = useState(undefined);
  const [image, setImage] = useState(null);
  const [massLimitType, setMassLimitType] = useState(1);
  const [axleGroupNumber, setAxleGroupNumber] = useState(0);

  const fields = columns(t);
  const IS_CREATING = !value;

  const onComplete = (eqpt_code) => {
    handleFormState(false, null);
    if (eqpt_code) {
      setEqptCode(eqpt_code);
    }
  };

  const checkCompartments = (cmpts) => {
    const errors = [];

    _.forEach(cmpts, (item) => {
      if (item?.safefill > item?.sfl) {
        errors.push({
          field: `${t('fields.compartment')} ${item.cmpt_no}: ${t('fields.safeFill')} ${item.safefill} > ${t(
            'fields.capacity'
          )} ${item.sfl} ${item.cmpt_units}`,
          message: t('validate.cmptSafefillHigh'),
          key: `${'safefill'}${item.cmpt_no}`,
          line: item.cmpt_no,
        });
      }
    });

    if (errors.length > 0) {
      const lines = (
        <>
          {errors?.map((error, index) => (
            <Card size="small" title={error.message}>
              {error.field}
            </Card>
          ))}
        </>
      );

      notification.error({
        message: t('messages.validationFailed'),
        description: lines,
        style: {
          width: '33vw',
          height: 'calc(100vh - 400px)',
          overflowY: 'scroll',
        },
      });
    }

    return errors;
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    console.log('............values in onFinish', values);

    const errors = checkCompartments(values?.compartments);
    if (errors.length > 0) {
      return;
    }

    let matches = [];
    let bulk_edit = [];
    const setBulk = (bulk) => {
      bulk_edit = [...bulk];
    };

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, (object) => {
        return (
          object.eqpt_title === value.eqpt_title &&
          object.eqpt_code !== value.eqpt_code &&
          object.eqpt_title !== ''
        );
      });
    }

    values.eqpt_exp_d1_dmy = values?.eqpt_exp_d1_dmy?.format(SETTINGS.DATE_TIME_FORMAT);
    values.eqpt_exp_d2_dmy = values?.eqpt_exp_d2_dmy?.format(SETTINGS.DATE_TIME_FORMAT);
    values.eqpt_exp_d3_dmy = values?.eqpt_exp_d3_dmy?.format(SETTINGS.DATE_TIME_FORMAT);

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content:
        matches.length > 0 ? (
          <CheckList form={form} matches={matches} columns={fields} rowKey="eqpt_code" setBulk={setBulk} />
        ) : null,
      onOk: async () => {
        values.bulk_edit = bulk_edit;
        await api
          .post(IS_CREATING ? EQUIPMENT_LIST.CREATE : EQUIPMENT_LIST.UPDATE, values)
          .then((response) => {
            onComplete(values?.eqpt_code);

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
    api
      .post(`${EQUIPMENT_LIST.TOGGLE_LOCKS}?eqpt_id=${value.eqpt_id}`)
      .then((response) => {
        onComplete(value.eqpt_id);

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
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible]);

  const onDelete = () => {
    if (value.eqpt_lock) {
      notification.error({
        message: t('descriptions.deleteFailed'),
        description: t('descriptions.cannotDeleteLocked'),
      });
      return;
    }

    if (value.eqp_must_tare_in) {
      notification.error({
        message: t('descriptions.deleteFailed'),
        description: t('descriptions.cannotDeleteTareIn'),
      });
      return;
    }

    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(EQUIPMENT_LIST.DELETE, value)
          .then((response) => {
            onComplete(null);

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

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5, overflowY: 'hidden' }}
      onClose={() => handleFormState(false, null)}
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
              <Tooltip placement="topRight" title={t('descriptions.countEqptTanker')}>
                <Tag color={value?.tnkr_count > 0 ? 'red' : 'green'}>
                  {t('fields.countEqptTanker') + ': ' + value?.tnkr_count}
                </Tag>
              </Tooltip>
            </div>
          )}

          <Button
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="button"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
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
              disabled={!access?.canDelete || value?.tnkr_count > 0}
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
                <Owner form={form} value={value} />
              </Col>
              <Col span={8}>
                <Code form={form} value={value} config={config} />
              </Col>
              <Col span={8}>
                <Title form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Area form={form} value={value} />
              </Col>
              <Col span={8}>
                <EmptyWeight form={form} value={value} />
              </Col>
              <Col span={8}>
                <PullingLimit form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Locks form={form} value={value} />
              </Col>
              <Col span={16}>
                <Comments form={form} value={value} />
              </Col>
            </Row>

            {/* config?.siteUseAxleWeightLimit && (
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <FrontAxleGroups form={form} value={value} etype={equipment} />
                </Col>
                <Col span={12}>
                  <RearAxleGroups form={form} value={value} etype={equipment} />
                </Col>
              </Row>
            ) */}

            <Divider>{t('tabColumns.equipmentAndSafefill')}</Divider>

            <Equipment image={image} showName={value?.eqpt_etp_title} />

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <LoadType form={form} value={value} />
              </Col>
              <Col span={16}>
                <EquipmentType form={form} value={value} onChange={setEqptType} />
              </Col>
            </Row>

            <Compartments
              form={form}
              value={value}
              eqptType={eqptType}
              onChange={setImage}
              config={config}
            />

            <Divider>{t('tabColumns.expiryDates')}</Divider>

            {expiryDateMode === '1' ? (
              <LegacyExpires form={form} value={value} expiryTypes={expiryTypes}></LegacyExpires>
            ) : (
              <Expiry form={form} value={value} type={EQUIPMENT_LIST.EXPIRY} />
            )}

            {config?.siteUseAxleWeightLimit && <Divider>{t('tabColumns.axleWeightLimit')}</Divider>}

            {config?.siteUseAxleWeightLimit && (
              <Row gutter={[8, 2]}>
                <Col span={6}>
                  <Row gutter={[8, 2]}>
                    <Col span={24}>
                      <AxleGroupNumber form={form} value={value} onChange={setAxleGroupNumber} />
                    </Col>
                  </Row>
                  <Row gutter={[8, 2]}>
                    <Col span={24}>
                      <AxleLimitTypes form={form} value={value} config={config} onChange={setMassLimitType} />
                    </Col>
                  </Row>
                </Col>
                <Col span={18}>
                  <Axles
                    form={form}
                    value={value}
                    equipment={!value ? -1 : value?.eqpt_id}
                    type={massLimitType}
                    count={axleGroupNumber}
                  />
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
