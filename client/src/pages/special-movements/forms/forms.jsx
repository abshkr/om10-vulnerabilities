import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  CalculatorOutlined,
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider, message, Drawer, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';

import { MovementType, ReasonCode, MovementTime, Comments, To, From } from './fields';
import { SPECIAL_MOVEMENTS } from '../../../api';
import Calculate from './calculate';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateSpecialMv, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [type, setType] = useState(null);
  const [tab, setTab] = useState('1');
  const [tank, setTank] = useState(undefined);
  const [quantitySource, setQuantitySource] = useState(null);

  const changeToTank = (tank) => {
    if (type !== '2') {
      setTank(tank);
    }
  };

  const IS_CREATING = !value;
  const DISABLED = value?.mlitm_status === '5';

  const FROM = ['1', '2'];
  const TO = ['0', '2'];

  const onComplete = (mlitm_id) => {
    handleFormState(false, null);
    if (mlitm_id) {
      locateSpecialMv(mlitm_id);
    } else {
      mutate(url);
    }
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
        values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);

        await api
          .post(IS_CREATING ? SPECIAL_MOVEMENTS.CREATE : SPECIAL_MOVEMENTS.UPDATE, values)
          .then(
            () => {
              onComplete(values?.mlitm_id);

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.createSuccess'),
              });
            }
          )
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
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        await api
          .post(SPECIAL_MOVEMENTS.DELETE, value)
          .then(
            () => {
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

  const onCalculate = () => {
    const { getFieldsValue } = form;

    const payload = getFieldsValue([
      'mlitm_qty_amb',
      'mlitm_qty_cor',
      'mlitm_qty_kg',
      'mlitm_temp_amb',
      'mlitm_dens_cor',
    ]);

    if (String(payload?.mlitm_qty_amb).trim().length === 0 && 
      String(payload?.mlitm_qty_cor).trim().length === 0 && 
      String(payload?.mlitm_qty_kg).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedQuantity')+' or '+t('fields.standardQuantity')+' or '+t('fields.observedMass'),
      });
      return;
    }


    if (!quantitySource || String(quantitySource?.qty).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: !quantitySource 
          ? (t('fields.observedQuantity')+' or '+t('fields.standardQuantity')+' or '+t('fields.observedMass'))
          : quantitySource?.title,
      });
      return;
    }
    if (_.toNumber(quantitySource?.qty) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: quantitySource?.title,
      });
      return;
    }
    if ((!payload?.mlitm_temp_amb && payload?.mlitm_temp_amb !== 0) || String(payload?.mlitm_temp_amb).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedTemperature'),
      });
      return;
    }
    /* if (_.toNumber(payload?.mlitm_temp_amb) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.observedTemperature'),
      });
      return;
    } */
    if (!payload?.mlitm_dens_cor || String(payload?.mlitm_dens_cor).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.standardDensity'),
      });
      return;
    }
    if (_.toNumber(payload?.mlitm_dens_cor) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: t('fields.standardDensity'),
      });
      return;
    }

    Modal.confirm({
      title:
        t('prompts.calculate') +
        ' (' +
        t('descriptions.lastFieldChanged') +
        ': ' +
        quantitySource?.title +
        ')',
      okText: t('operations.calculate'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      width: '30vw',
      centered: true,
      onOk: async () => {
        try {
          const values = await form.validateFields();
          await api
            .post(SPECIAL_MOVEMENTS.CALCULATE, {
              frm_baseCd: TO.includes(type) ? values.mlitm_prodcode_to : values.mlitm_prodcode,
              frm_which_type: quantitySource?.type,
              frm_real_amount: quantitySource?.qty,
              frm_real_temp: values.mlitm_temp_amb,
              frm_real_dens: values.mlitm_dens_cor,
            })
            .then((response) => {
              form.setFieldsValue({
                mlitm_qty_amb: response?.data?.real_litre,
                mlitm_qty_cor: response?.data?.real_litre15,
                mlitm_qty_kg: response?.data?.real_kg,
              });
            });
        } catch (error) {
          message.error({
            key: 'calc',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  const onSubmit = () => {
    Modal.confirm({
      title: t('prompts.submit'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        try {
          const values = await form.validateFields();

          await api
            .post(SPECIAL_MOVEMENTS.SUBMIT, values)
            .then(()=> {
                onComplete(values?.mlitm_id);

                notification.success({
                  message: t('messages.submitSuccess'),
                  description: t('descriptions.submitSuccess'),
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
        } catch (error) {
          message.error({
            key: 'submit',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  const onReverse = () => {
    Modal.confirm({
      title: t('prompts.onReverse'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        await api
          .post(SPECIAL_MOVEMENTS.REVERSE, value)
          .then(
            () => {
              onComplete();

              notification.success({
                message: t('messages.movementReverseSuccess'),
                description: `${t('descriptions.movementReverseSuccess')}`,
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

          {!DISABLED && (
            <Button
              htmlType="button"
              icon={<CalculatorOutlined />}
              style={{ marginRight: 5 }}
              onClick={onCalculate}
            >
              {t('operations.calculate')}
            </Button>
          )}

          {DISABLED && (
            <Button htmlType="button" onClick={onReverse} icon={<ReloadOutlined />}>
              {t('operations.reverse')}
            </Button>
          )}

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            // disabled={DISABLED}
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || value.mlitm_status !== '0'}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          <Button
            type="ghost"
            icon={<SaveOutlined />}
            htmlType="button"
            // disabled={DISABLED}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || value.mlitm_status !== '0'}
          >
            {t('operations.submit')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              // disabled={DISABLED}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete || value.mlitm_status !== '0'}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey={tab} onChange={setTab} animated={false}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <MovementType form={form} value={value} onChange={setType} disabled={DISABLED} />
              </Col>
              <Col span={8}>
                <ReasonCode form={form} value={value} type={type} disabled={DISABLED} />
              </Col>
              <Col span={8}>
                <MovementTime form={form} value={value} type={type} disabled={DISABLED} />
              </Col>
            </Row>

            <Comments form={form} value={value} type={type} disabled={DISABLED} />

            {type && <Divider>{t('divider.directions')}</Divider>}

            {FROM.includes(type) && <From onChange={setTank} form={form} value={value} disabled={DISABLED} />}

            {TO.includes(type) && (
              <To type={type} onChange={changeToTank} form={form} value={value} disabled={DISABLED} />
            )}

            <Divider>{t('divider.calculation')}</Divider>

            <Calculate
              form={form}
              value={value}
              type={type}
              disabled={DISABLED}
              tank={tank}
              config={config}
              pinQuantity={setQuantitySource}
            />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
