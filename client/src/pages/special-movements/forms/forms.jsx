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

import { Form, Button, Tabs, notification, Modal, Divider, message, Drawer, Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import { MovementType, ReasonCode, MovementTime, Comments, To, From } from './fields';
import { SPECIAL_MOVEMENTS, TANKS } from '../../../api';
import Calculate from './calculate';
import { SETTINGS } from '../../../constants';
import { calcWiA } from '../../../utils';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateSpecialMv, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields, getFieldsValue, setFieldsValue } = form;

  const [type, setType] = useState(null);
  const [tab, setTab] = useState('1');
  const [supplierFrom, setSupplierFrom] = useState(undefined);
  const [supplierTo, setSupplierTo] = useState(undefined);
  const [tankFrom, setTankFrom] = useState(undefined);
  const [tankTo, setTankTo] = useState(undefined);
  const [lastChangedTank, setLastChangedTank] = useState(undefined);
  const [productFrom, setProductFrom] = useState(undefined);
  const [productTo, setProductTo] = useState(undefined);
  const [quantitySource, setQuantitySource] = useState(null);
  const [tankSelected, setTankSelected] = useState(false);
  const [spmTime, setSpmTime] = useState(undefined);

  /* const changeToTank = (tank) => {
    if (type !== '2') {
      setTank(tank);
    }
  }; */
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;
  const site_code = decoded?.site_code;

  const IS_CREATING = !value;
  // status: 0 - 'Entering', 5 - 'Completed', 9 - 'Reversed', 4 - 'Outstanding'
  const DISABLED = value?.mlitm_status === '5' || value?.mlitm_status === '9' || value?.mlitm_status === '4';

  const FROM = ['1', '2'];
  const TO = ['0', '2'];

  const changeTankTo = (value) => {
    setTankTo(value);
    if (type === '0' || (type === '2' && config?.siteTransferTankSource === 'TO')) {
      setLastChangedTank(value);
    }
  };

  const changeTankFrom = (value) => {
    setTankFrom(value);
    if (type === '1' || (type === '2' && config?.siteTransferTankSource !== 'TO')) {
      setLastChangedTank(value);
    }
  };

  const onTypeChange = (value) => {
    setType(value);

    /* setFieldsValue({
      mlitm_reason_code: undefined,
      mlitm_dtim_start: moment(),
      mlitm_comment: '',
      mlitm_prodcmpy: undefined,
      mlitm_tankcode: undefined,
      mlitm_prodcode: undefined,
      mlitm_prodcmpy_to: undefined,
      mlitm_tankcode_to: undefined,
      mlitm_prodcode_to: undefined,
      mlitm_qty_amb: '',
      mlitm_qty_cor: '',
      mlitm_qty_kg: '',
      mlitm_temp_amb: '',
      mlitm_dens_cor: '',
      mlitm_qty_rpt: '',
      mlitm_unit_rpt: undefined,
    }); */

    // setSupplierFrom(undefined);
    // setSupplierTo(undefined);
    // setTankFrom(undefined);
    // setTankTo(undefined);
    // setProductFrom(undefined);
    // setProductTo(undefined);

    // resetFields();
  };

  const onFormClosed = () => {
    setType(null);
    setTankFrom(undefined);
    setTankTo(undefined);
    setLastChangedTank(undefined);
    resetFields();
    handleFormState(false, null);
  };

  const onComplete = (mlitm_id) => {
    setType(null);
    setTankFrom(undefined);
    setTankTo(undefined);
    setLastChangedTank(undefined);
    resetFields();
    handleFormState(false, null);
    if (mlitm_id) {
      locateSpecialMv(mlitm_id);
    } else {
      mutate(url);
    }
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

  const onFinish = async () => {
    const values = await form.validateFields();
    let found = false;
    console.log('spec onFinish', values);
    if (
      values?.mlitm_qty_amb &&
      _.toNumber(values?.mlitm_qty_amb) > 0 &&
      values?.mlitm_qty_cor &&
      _.toNumber(values?.mlitm_qty_cor) > 0 &&
      values?.mlitm_qty_kg &&
      _.toNumber(values?.mlitm_qty_kg) > 0 &&
      (values?.mlitm_temp_amb === 0 || values?.mlitm_temp_amb) &&
      values?.mlitm_dens_cor
    ) {
      found = true;
    }
    if (found === false) {
      notification.warning({
        message: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
        description: t('descriptions.noTransferDetailsSpec'),
      });
      return;
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
        if (values?.mlitm_dtim_start === null || values?.mlitm_dtim_start === undefined) {
          values.mlitm_dtim_start = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
        } else {
          values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
        }
        values.mlitm_dtim_end = values.mlitm_dtim_start;
        if (type === '0') {
          values.mlitm_prodcmpy = '';
          values.mlitm_tankcode = '';
          values.mlitm_prodcode = '';
        }
        if (type === '1') {
          values.mlitm_prodcmpy_to = '';
          values.mlitm_tankcode_to = '';
          values.mlitm_prodcode_to = '';
        }
        values.mlitm_terminal = site_code;

        if (IS_CREATING) {
          await api.get(`${SPECIAL_MOVEMENTS.NEXT_ID}`).then((response) => {
            const payload = response.data?.records || [];
            values.mlitm_id = payload[0].next_id;
          });
        }

        // now optional dropdown lists can be unselected and have the value of "undefined".
        // need to send blank string when it is undefined
        values.mlitm_unit_rpt = !values?.mlitm_unit_rpt ? '' : values?.mlitm_unit_rpt;

        await api
          .post(IS_CREATING ? SPECIAL_MOVEMENTS.CREATE : SPECIAL_MOVEMENTS.UPDATE, values)
          .then(() => {
            onComplete(values?.mlitm_id);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message:
                  error.code === 500
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

  const onCalculate = () => {
    // const { getFieldsValue } = form;

    const payload = getFieldsValue([
      'mlitm_qty_amb',
      'mlitm_qty_cor',
      'mlitm_qty_kg',
      'mlitm_temp_amb',
      'mlitm_dens_cor',
      'mlitm_prodcode',
      'mlitm_prodcode_to',
    ]);

    console.log('spec onCalculate', payload, quantitySource);

    if (
      String(payload?.mlitm_qty_amb).trim().length === 0 &&
      String(payload?.mlitm_qty_cor).trim().length === 0 &&
      String(payload?.mlitm_qty_kg).trim().length === 0
    ) {
      notification.error({
        message: t('validate.set'),
        description:
          t(config?.siteLabelUser + 'fields.observedQuantity') +
          t('descriptions.or') +
          t(config?.siteLabelUser + 'fields.standardQuantity') +
          t('descriptions.or') +
          t(config?.siteLabelUser + 'fields.observedMass'),
      });
      return;
    }

    if (!payload?.mlitm_qty_amb && !payload?.mlitm_qty_cor && !payload?.mlitm_qty_kg) {
      notification.error({
        message: t('validate.set'),
        description:
          t(config?.siteLabelUser + 'fields.observedQuantity') +
          t('descriptions.or') +
          t(config?.siteLabelUser + 'fields.standardQuantity') +
          t('descriptions.or') +
          t(config?.siteLabelUser + 'fields.observedMass'),
      });
      return;
    }

    if (
      !quantitySource ||
      String(quantitySource?.qty).trim().length === 0 ||
      _.toNumber(quantitySource?.qty) === 0
    ) {
      notification.error({
        message: t('validate.set'),
        description: !quantitySource
          ? t(config?.siteLabelUser + 'fields.observedQuantity') +
            t('descriptions.or') +
            t(config?.siteLabelUser + 'fields.standardQuantity') +
            t('descriptions.or') +
            t(config?.siteLabelUser + 'fields.observedMass')
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
    if (
      (!payload?.mlitm_temp_amb && payload?.mlitm_temp_amb !== 0) ||
      String(payload?.mlitm_temp_amb).trim().length === 0
    ) {
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
          const values = payload; // await form.validateFields();
          await api
            .post(SPECIAL_MOVEMENTS.CALCULATE, {
              frm_baseCd: TO.includes(type) ? values.mlitm_prodcode_to : values.mlitm_prodcode,
              frm_which_type: quantitySource?.type,
              frm_real_amount: quantitySource?.qty,
              frm_real_temp: values.mlitm_temp_amb,
              frm_real_dens: values.mlitm_dens_cor,
            })
            .then((response) => {
              if (!response?.data?.real_litre) {
                let errmsg = t('descriptions.possibleReasonsToFailVCF');
                if (!response?.data?.msg_code || !response?.data?.msg_desc) {
                  errmsg = t('descriptions.possibleReasonsToFailVCF');
                } else {
                  errmsg = response?.data?.msg_code + ': ' + response?.data?.msg_desc;
                }
                notification.error({
                  message:
                    t('descriptions.calculateFailed') +
                    ': ' +
                    (TO.includes(type) ? values.mlitm_prodcode_to : values.mlitm_prodcode),
                  description: errmsg,
                });
              } else {
                // const WIA =
                //   _.toNumber(response?.data?.real_kg) -
                //   _.toNumber(response?.data?.real_litre15) * config?.airBuoyancyFactor;
                const WIA = calcWiA(
                  response?.data?.real_kg,
                  response?.data?.real_litre15,
                  values.mlitm_dens_cor,
                  config?.airBuoyancyFactor
                );
                setFieldsValue({
                  mlitm_qty_amb: response?.data?.real_litre,
                  mlitm_qty_cor: response?.data?.real_litre15,
                  mlitm_qty_kg: response?.data?.real_kg,
                  mlitm_air_kg: WIA,
                  // backend used real_cvf which is a typo, anyway keep it for now
                  mlitm_vcf: _.round(response?.data?.real_cvf, config?.precisionVCF),
                });
              }
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

  const isTankBatchExist = async (tank, terminal) => {
    const values = {
      tank_code: tank,
      tank_terminal: terminal,
    };

    const results = await api.post(TANKS.TANK_BATCHES, values);

    if (results?.data) {
      const batch = results?.data?.records[0]?.tank_batch_no;
      if (!batch) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const checkTankBatches = async (values) => {
    if (config?.siteUseTankBatch && config?.siteTankBatchStrictMode) {
      let batch1 = true;
      let batch2 = true;
      let errors = '';
      if (type === '0' || type === '2') {
        batch1 = await isTankBatchExist(values.mlitm_tankcode_to, site_code);
        if (batch1 === false) {
          errors = t('descriptions.submitFailedTankBatchNull');
          errors = errors.replace('[[TANK]]', '"' + values.mlitm_tankcode_to + '"');
          notification.warning({
            message: t('messages.submitFailed'),
            description: errors,
          });
        }
      }
      if (type === '1' || type === '2') {
        batch2 = await isTankBatchExist(values.mlitm_tankcode, site_code);
        if (batch2 === false) {
          errors = t('descriptions.submitFailedTankBatchNull');
          errors = errors.replace('[[TANK]]', '"' + values.mlitm_tankcode + '"');
          notification.warning({
            message: t('messages.submitFailed'),
            description: errors,
          });
        }
      }

      return batch1 && batch2;
    } else {
      // do not need to check the tank batch number
      return true;
    }
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    let found = false;
    if (
      values?.mlitm_qty_amb &&
      _.toNumber(values?.mlitm_qty_amb) > 0 &&
      values?.mlitm_qty_cor &&
      _.toNumber(values?.mlitm_qty_cor) > 0 &&
      values?.mlitm_qty_kg &&
      _.toNumber(values?.mlitm_qty_kg) > 0 &&
      (values?.mlitm_temp_amb === 0 || values?.mlitm_temp_amb) &&
      values?.mlitm_dens_cor
    ) {
      found = true;
    }
    if (found === false) {
      notification.warning({
        message: t('messages.submitFailed'),
        description: t('descriptions.noTransferDetailsSpec'),
      });
      return;
    }

    const tankBatchValid = await checkTankBatches(values);
    if (tankBatchValid === false) {
      return;
    }

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
          const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
          if (values?.mlitm_dtim_start === null || values?.mlitm_dtim_start === undefined) {
            values.mlitm_dtim_start = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
          } else {
            values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
          }
          values.mlitm_dtim_end = values.mlitm_dtim_start;

          if (type === '0') {
            values.mlitm_prodcmpy = '';
            values.mlitm_tankcode = '';
            values.mlitm_prodcode = '';
          }
          if (type === '1') {
            values.mlitm_prodcmpy_to = '';
            values.mlitm_tankcode_to = '';
            values.mlitm_prodcode_to = '';
          }

          // now optional dropdown lists can be unselected and have the value of "undefined".
          // need to send blank string when it is undefined
          values.mlitm_unit_rpt = !values?.mlitm_unit_rpt ? '' : values?.mlitm_unit_rpt;

          if (IS_CREATING) {
            await api.get(`${SPECIAL_MOVEMENTS.NEXT_ID}`).then((response) => {
              const payload = response.data?.records || [];
              values.mlitm_id = payload[0].next_id;
            });

            // values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
            await api
              .post(SPECIAL_MOVEMENTS.CREATE, values)
              .then(() => {
                // console.log("Created");
              })
              .catch((errors) => {
                _.forEach(errors.response.data.errors, (error) => {
                  notification.error({
                    message: error.code === 500 ? t('messages.createFailed') : error.type,
                    description: error.message,
                  });
                });
                return;
              });
          } else {
            // values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
            await api
              .post(SPECIAL_MOVEMENTS.UPDATE, values)
              .then(() => {
                // console.log("Created");
              })
              .catch((errors) => {
                _.forEach(errors.response.data.errors, (error) => {
                  notification.error({
                    message: error.code === 500 ? t('messages.updateFailed') : error.type,
                    description: error.message,
                  });
                });
                return;
              });
          }

          await api
            .post(SPECIAL_MOVEMENTS.SUBMIT, values)
            .then(() => {
              onComplete(values?.mlitm_id);

              notification.success({
                message: t('messages.submitSuccess'),
                description: t('descriptions.submitSuccess'),
              });
            })
            .catch((errors) => {
              _.forEach(errors.response.data.errors, (error) => {
                notification.error({
                  message: error.code === 500 ? t('messages.submitFailed') : error.type,
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
          .then(() => {
            onComplete(value?.mlitm_id);

            notification.success({
              message: t('messages.reverseSuccessSPM'),
              description: `${t('descriptions.reverseSuccessSPM')}`,
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.code === 500 ? t('messages.reverseFailedSPM') : error.type,
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
  }, [value, visible, resetFields]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={onExitClicked}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width="60vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={onExitClicked}
          >
            {t('operations.cancel')}
          </Button>

          {!DISABLED && value?.mlitm_status !== '9' && (
            <Button
              htmlType="button"
              icon={<CalculatorOutlined />}
              style={{ marginRight: 5 }}
              onClick={onCalculate}
            >
              {t('operations.calculate')}
            </Button>
          )}

          {value?.mlitm_status === '5' && (
            <Button
              htmlType="button"
              onClick={onReverse}
              icon={<ReloadOutlined />}
              disabled={
                !access?.canUpdate ||
                value?.mlitm_status !== '5' ||
                (value?.mlitm_type === '2' && value?.mlitm_reason_code === '0')
              }
            >
              {t('operations.reverse')}
            </Button>
          )}

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            // disabled={DISABLED}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || value?.mlitm_status !== '0'}
          >
            {IS_CREATING ? t('operations.save') : t('operations.update')}
          </Button>

          <Button
            type="ghost"
            icon={<SaveOutlined />}
            htmlType="button"
            // disabled={DISABLED}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || value?.mlitm_status !== '0'}
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
              disabled={!access?.canDelete || value?.mlitm_status !== '0'}
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
                <MovementTime
                  form={form}
                  value={value}
                  type={type}
                  disabled={DISABLED}
                  onChange={setSpmTime}
                />
              </Col>
            </Row>

            <Comments form={form} value={value} type={type} disabled={DISABLED} />

            {type && <Divider>{t('divider.directions')}</Divider>}

            {FROM.includes(type) && (
              <From
                type={type}
                supplier={supplierFrom}
                setSupplier={setSupplierFrom}
                tank={tankFrom}
                setTank={changeTankFrom}
                product={productFrom}
                setProduct={setProductFrom}
                // onChange={setTankFrom}
                form={form}
                value={value}
                disabled={DISABLED}
                setTankSelected={setTankSelected}
                config={config}
                spmTime={spmTime}
              />
            )}

            {TO.includes(type) && (
              <To
                type={type}
                supplier={supplierTo}
                setSupplier={setSupplierTo}
                tank={tankTo}
                setTank={changeTankTo}
                product={productTo}
                setProduct={setProductTo}
                // onChange={setTankTo}
                form={form}
                value={value}
                disabled={DISABLED}
                setTankSelected={setTankSelected}
                config={config}
                spmTime={spmTime}
              />
            )}

            <Divider>{t('divider.calculation')}</Divider>

            <Calculate
              form={form}
              value={value}
              type={type}
              disabled={DISABLED}
              tank={lastChangedTank}
              config={config}
              pinQuantity={setQuantitySource}
              tankSelected={tankSelected}
              setTankSelected={setTankSelected}
            />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
