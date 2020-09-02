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
import moment from 'moment';
import { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import { MovementType, ReasonCode, MovementTime, Comments, To, From } from './fields';
import { SPECIAL_MOVEMENTS } from '../../../api';
import Calculate from './calculate';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateSpecialMv, config }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;

  const [type, setType] = useState(null);
  const [tab, setTab] = useState('1');
  const [supplierFrom, setSupplierFrom] = useState(undefined);
  const [supplierTo, setSupplierTo] = useState(undefined);
  const [tankFrom, setTankFrom] = useState(undefined);
  const [tankTo, setTankTo] = useState(undefined);
  const [productFrom, setProductFrom] = useState(undefined);
  const [productTo, setProductTo] = useState(undefined);
  const [quantitySource, setQuantitySource] = useState(null);

  /* const changeToTank = (tank) => {
    if (type !== '2') {
      setTank(tank);
    }
  }; */
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;
  const site_code = decoded?.site_code

  const IS_CREATING = !value;
  const DISABLED = value?.mlitm_status === '5';

  const FROM = ['1', '2'];
  const TO = ['0', '2'];

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
    resetFields();
    handleFormState(false, null);
  };

  const onComplete = (mlitm_id) => {
    setType(null);
    setTankFrom(undefined);
    setTankTo(undefined);
    resetFields();
    handleFormState(false, null);
    if (mlitm_id) {
      locateSpecialMv(mlitm_id);
    } else {
      mutate(url);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    let found = false;
    console.log('spec onFinish', values);
    if (values?.mlitm_qty_amb && _.toNumber(values?.mlitm_qty_amb) > 0 &&
      values?.mlitm_qty_cor && _.toNumber(values?.mlitm_qty_cor) > 0 && 
      values?.mlitm_qty_kg && _.toNumber(values?.mlitm_qty_kg) > 0 && 
      (values?.mlitm_temp_amb===0 || values?.mlitm_temp_amb) && 
      values?.mlitm_dens_cor) {
      found = true;
    }
    if (found === false) {
      notification.warning({
        message: IS_CREATING ? t('descriptions.createFailed') :  t('descriptions.updateFailed'),
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
        values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
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
          await api.get(`${SPECIAL_MOVEMENTS.NEXT_ID}`)
          .then((response) => {
            const payload = response.data?.records || [];
            values.mlitm_id = payload[0].next_id;
          });
        }

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
      'mlitm_prodcode',
      'mlitm_prodcode_to',
    ]);

    console.log('spec onCalculate', payload, quantitySource);

    if (String(payload?.mlitm_qty_amb).trim().length === 0 && 
      String(payload?.mlitm_qty_cor).trim().length === 0 && 
      String(payload?.mlitm_qty_kg).trim().length === 0) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedQuantity')+' or '+t('fields.standardQuantity')+' or '+t('fields.observedMass'),
      });
      return;
    }

    if (!payload?.mlitm_qty_amb && !payload?.mlitm_qty_cor && !payload?.mlitm_qty_kg) {
      notification.error({
        message: t('validate.set'),
        description: t('fields.observedQuantity')+' or '+t('fields.standardQuantity')+' or '+t('fields.observedMass'),
      });
      return;
    }


    if (!quantitySource || String(quantitySource?.qty).trim().length === 0 || _.toNumber(quantitySource?.qty) === 0) {
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

  const onSubmit = async () => {
    const values = await form.validateFields();
    let found = false;
    if (values?.mlitm_qty_amb && _.toNumber(values?.mlitm_qty_amb) > 0 &&
      values?.mlitm_qty_cor && _.toNumber(values?.mlitm_qty_cor) > 0 && 
      values?.mlitm_qty_kg && _.toNumber(values?.mlitm_qty_kg) > 0 && 
      (values?.mlitm_temp_amb===0 || values?.mlitm_temp_amb) && 
      values?.mlitm_dens_cor) {
      found = true;
    }
    if (found === false) {
      notification.warning({
        message: t('messages.submitFailed'),
        description: t('descriptions.noTransferDetailsSpec'),
      });
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

          if (IS_CREATING) {
            await api.get(`${SPECIAL_MOVEMENTS.NEXT_ID}`)
              .then((response) => {
                const payload = response.data?.records || [];
                values.mlitm_id = payload[0].next_id;
              });

            values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
            await api
              .post(SPECIAL_MOVEMENTS.CREATE, values)
              .then(
                () => {
                  // console.log("Created");
                }
              )
              .catch((errors) => {
                _.forEach(errors.response.data.errors, (error) => {
                  notification.error({
                    message: error.type,
                    description: error.message,
                  });
                });
                return;
              });
          } else {
            values.mlitm_dtim_start = values?.mlitm_dtim_start?.format(SETTINGS.DATE_TIME_FORMAT);
            await api
              .post(SPECIAL_MOVEMENTS.UPDATE, values)
              .then(
                () => {
                  // console.log("Created");
                }
              )
              .catch((errors) => {
                _.forEach(errors.response.data.errors, (error) => {
                  notification.error({
                    message: error.type,
                    description: error.message,
                  });
                });
                return;
              });
          }
  
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
              onComplete(value?.mlitm_id);

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
      onClose={onFormClosed}
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
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            // disabled={DISABLED}
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || value.mlitm_status !== '0'}
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

            {FROM.includes(type) && (
              <From
                type={type}
                supplier={supplierFrom}
                setSupplier={setSupplierFrom}
                tank={tankFrom}
                setTank={setTankFrom}
                product={productFrom}
                setProduct={setProductFrom}
                // onChange={setTankFrom}
                form={form}
                value={value}
                disabled={DISABLED}
              />
            )}

            {TO.includes(type) && (
              <To
                type={type}
                supplier={supplierTo}
                setSupplier={setSupplierTo}
                tank={tankTo}
                setTank={setTankTo}
                product={productTo}
                setProduct={setProductTo}
                // onChange={setTankTo}
                form={form}
                value={value}
                disabled={DISABLED}
              />
            )}

            <Divider>{t('divider.calculation')}</Divider>

            <Calculate
              form={form}
              value={value}
              type={type}
              disabled={DISABLED}
              tank={type==='0' ? tankTo : tankFrom}
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
