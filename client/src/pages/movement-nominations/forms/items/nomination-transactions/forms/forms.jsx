import React, { useState, useEffect } from 'react';
import moment from 'dayjs';

import { QuestionCircleOutlined, CloseOutlined, CalculatorOutlined, SaveOutlined } from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, message, Divider, Row, Col, Card, InputNumber } from 'antd';

import { useTranslation } from 'react-i18next';

import _ from 'lodash';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import {
  NominationId,
  NominationKey,
  NominationTerminal,
  NominationItemId,
  NominationItemKey,
  NominationItemStatus,
  NominationItemType,
  NominationItemBol,
  ItemEffectTime,
  Carrier,
  Tanker,
  ItemExpiryTime,
} from './head-fields';

import {
  SourcePlant,
  SourceProduct,
  SourceArm,
  SourceTank,
  DestinationPlant,
  DestinationProduct,
  DestinationTank,
  Comment,
} from './move-fields';

import {
  PlanQty,
  AvailQty,
  ObsQty,
  StdQty,
  ObsMass,
  AirMass,
  ObsTemp,
  StdDensity,
  AltQty,
  AltQtyUnit,
} from './calc-fields';

import { DataTable } from '../../../../../../components';
import { SETTINGS } from '../../../../../../constants';
import api, { NOMINATION_TRANSACTIONS, MOVEMENT_NOMIATIONS, TANKS } from '../../../../../../api';
import BaseDetails from './base-details/base-details';
import MeterDetails from './meter-details/meter-details';
import { calcArmQuantity, calcWiA } from '../../../../../../utils';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  access,
  pageState,
  defaultTanker,
  config,
  cbFunction,
  closeForm,
}) => {
  const [drawerWidth, setDrawerWidth] = useState('80vw');
  const [mainTabOn, setMainTabOn] = useState(true);
  const [disableCalculation, setDisableCalculation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  /*
  											   (C_MovementNominationTransactions.TEMP_AMB.length>0)&amp;&amp;
											   (C_MovementNominationTransactions.DENS_COR.length>0)&amp;&amp;
											   (
											   ((C_MovementNominationTransactions.QTY_AMB.length>0))||
											   ((C_MovementNominationTransactions.QTY_COR.length>0))||
											   ((C_MovementNominationTransactions.MASS_AMB.length>0))
											   )											   

  */

  // console.log('value', value);

  // const { data: units } = useSWR(NOMINATION_TRANSACTIONS.UNIT_TYPES);
  const { data: products } = useSWR(MOVEMENT_NOMIATIONS.NOM_PRODUCTS, { revalidateOnFocus: false });

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields } = form;

  const [carrier, setCarrier] = useState(value?.mvitm_carrier);
  const [tanker, setTanker] = useState(value?.mvitm_tanker);
  const [tankFrom, setTankFrom] = useState([]); //value?.mvitm_tank_from);
  const [tankTo, setTankTo] = useState([]); //value?.mvitm_tank_to);
  const [tank, setTank] = useState([]); //value?.mvitm_tank_to);
  const [arm, setArm] = useState(value?.mvitm_arm);
  const [productItemFrom, setProductItemFrom] = useState(null);
  const [productItemTo, setProductItemTo] = useState(null);
  const [calcSource, setCalcSource] = useState(null);
  const [altQty, setAltQty] = useState(null);
  const [transfer, setTransfer] = useState({});
  const [productArms, setProductArms] = useState(undefined);

  const [temperature, setTemperature] = useState(null);
  const [density, setDensity] = useState(null);
  const [ambient, setAmbient] = useState(null);
  const [corrected, setCorrected] = useState(null);
  const [mass, setMass] = useState(null);
  const [armBases, setArmBases] = useState(null);

  const [selected, setSelected] = useState(null);

  const IS_CREATING = !value;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;
  const site_code = decoded?.site_code;

  // This function does not work for unknown reason and needs further investigation
  const changeTankTo = (value) => {
    setTankTo(value);
    if (pageState === 'receipt' || (pageState === 'transfer' && config?.siteTransferTankSource === 'TO')) {
      setTank(value);
    }
  };

  // This function does not work for unknown reason and needs further investigation
  const changeTankFrom = (value) => {
    setTankFrom(value);
    if (pageState === 'disposal' || (pageState === 'transfer' && config?.siteTransferTankSource !== 'TO')) {
      setTank(value);
    }
  };

  const doTabChanges = (tabPaneKey) => {
    if (tabPaneKey === '1') {
      setDrawerWidth('80vw');
      setMainTabOn(true);
    } else {
      setDrawerWidth('90vw');
      setMainTabOn(false);
    }
  };

  const onFormClosed = () => {
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
  };

  const onComplete = () => {
    console.log('start of onComplete');
    handleFormState(false, null);
    setDrawerWidth('80vw');
    setMainTabOn(true);
    setSelected(null);
    closeForm(false);
    console.log('end of onComplete');
  };

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      Modal.destroyAll();
      onComplete();
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
        Modal.destroyAll();
        onComplete();
      },
    });
  };

  const getArmTankCodes = (arms) => {
    let codes = '';
    _.forEach(arms, (arm) => {
      if (codes.length > 0) {
        codes = codes + ',';
      }
      codes = codes + arm?.stream_tankcode;
    });

    return codes;
  };

  const preparePayload = (values) => {
    const payload = {};

    payload.operator_code = user_code; //Will force to use 8888in backend because baiman uses 8888
    payload.tanker_code = values?.mvitm_tanker;
    payload.mvitm_item_id = values?.mvitm_item_id;
    payload.temperature = values?.mlitm_temp_amb;
    payload.amb_vol = values?.mlitm_qty_amb;
    payload.cor_vol = values?.mlitm_qty_cor;
    payload.liq_kg = values?.mlitm_qty_kg;
    payload.density = values?.mlitm_dens_cor;
    const serverCurrent = moment(config?.serverTime, SETTINGS.DATE_TIME_FORMAT);
    if (values?.mvitm_dtim_effect === null || values?.mvitm_dtim_effect === undefined) {
      payload.start_time = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
    } else {
      payload.start_time = values?.mvitm_dtim_effect?.format(SETTINGS.DATE_TIME_FORMAT);
    }
    if (values?.mvitm_dtim_expiry === null || values?.mvitm_dtim_expiry === undefined) {
      payload.end_time = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
    } else {
      payload.end_time = values?.mvitm_dtim_expiry?.format(SETTINGS.DATE_TIME_FORMAT);
    }

    // console.log('..................payload', payload, arm);
    if (!!values?.mvitm_arm) {
      payload.from_arm = arm?.[0]?.stream_armcode; // values?.mvitm_arm;
      // payload.from_tank = getArmTankCodes(arm); // values?.mvitm_tank_from;
      payload.from_supplier = value?.mvitm_prodcmpy_from;
      payload.from_product = value?.mvitm_prodcode_from;
      // payload.bases = values?.base_transfers;
      // payload.meters = values?.meter_transfers;
    }

    if (!!values?.mvitm_tank_from) {
      payload.from_tank = values?.mvitm_tank_from;
      payload.from_supplier = value?.mvitm_prodcmpy_from;
      payload.from_product = value?.mvitm_prodcode_from;
    }

    if (!!values?.mvitm_tank_to) {
      payload.to_tank = values?.mvitm_tank_to;
      payload.to_supplier = value?.mvitm_prodcmpy_to;
      payload.to_product = value?.mvitm_prodcode_to;
    }

    if (!!values?.mlitm_qty_rpt) {
      payload.alternate_qty = values?.mlitm_qty_rpt;
    }
    if (!!values?.mlitm_unit_rpt) {
      payload.alternate_unit = values?.mlitm_unit_rpt;
    }

    return payload;
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
      let errors = '';

      if (!values?.mvitm_arm) {
        let batch1 = true;
        let batch2 = true;
        // it is the tank-based transaction
        if (!!values?.mvitm_tank_from) {
          batch1 = await isTankBatchExist(values?.mvitm_tank_from, site_code);
          if (batch1 === false) {
            errors = t('descriptions.submitFailedTankBatchNull');
            errors = errors.replace('[[TANK]]', '"' + values?.mvitm_tank_from + '"');
            notification.warning({
              message: t('messages.submitFailed'),
              description: errors,
            });
          }
        }
        if (!!values?.mvitm_tank_to) {
          batch2 = await isTankBatchExist(values?.mvitm_tank_to, site_code);
          if (batch2 === false) {
            errors = t('descriptions.submitFailedTankBatchNull');
            errors = errors.replace('[[TANK]]', '"' + values?.mvitm_tank_to + '"');
            notification.warning({
              message: t('messages.submitFailed'),
              description: errors,
            });
          }
        }
        return batch1 && batch2;
      } else {
        // it is the arm-based transaction
        let batchOK = true;
        for (let i = 0; i < values?.base_transfers?.length; i++) {
          const tank_code = values?.base_transfers?.[i]?.trsf_bs_tk_cd;
          const batch3 = await isTankBatchExist(tank_code, site_code);
          if (batch3 === false) {
            errors = t('descriptions.submitFailedTankBatchNull');
            errors = errors.replace('[[TANK]]', '"' + tank_code + '"');
            notification.warning({
              message: t('messages.submitFailed'),
              description: errors,
            });
            batchOK = false;
          }
        }
        return batchOK;
      }
    } else {
      // do not need to check the tank batch number
      return true;
    }
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    console.log('..................onSubmit', values, arm);
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
          console.log('await values', values);
          console.log('await value', value);
          await api
            .post(NOMINATION_TRANSACTIONS.SUBMIT, preparePayload(values))
            .then((response) => {
              //Modal.destroyAll();
              onComplete();

              if (!!cbFunction) {
                cbFunction(values?.mvitm_key);
              }

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

  const onCalculate = () => {
    console.log('....................onCalculate', tank, arm);
    if (!(tank && tank.length > 0) && !(arm && arm.length > 0)) {
      notification.error({
        message: t('validate.select'),
        description:
          t('fields.fromTank') +
          t('descriptions.or') +
          t('fields.nomtranFromArm') +
          t('descriptions.or') +
          t('fields.toTank'),
      });
      return;
    }

    const payload = form.getFieldsValue([
      'mlitm_qty_amb',
      'mlitm_qty_cor',
      'mlitm_qty_kg',
      'mlitm_temp_amb',
      'mlitm_dens_cor',
    ]);

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

    if (!calcSource || String(calcSource?.qty).trim().length === 0 || _.toNumber(calcSource?.qty) === 0) {
      notification.error({
        message: t('validate.set'),
        description: !calcSource
          ? t(config?.siteLabelUser + 'fields.observedQuantity') +
            t('descriptions.or') +
            t(config?.siteLabelUser + 'fields.standardQuantity') +
            t('descriptions.or') +
            t(config?.siteLabelUser + 'fields.observedMass')
          : calcSource?.title,
      });
      return;
    }
    if (_.toNumber(calcSource?.qty) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: calcSource?.title,
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
      title: t('prompts.calculate'),
      title:
        t('prompts.calculate') + ' (' + t('descriptions.lastFieldChanged') + ': ' + calcSource?.title + ')',
      okText: t('operations.calculate'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      width: '30vw',
      centered: true,
      onOk: async () => {
        if (pageState !== 'disposal') {
          await onCalculateByOneBase();
        } else {
          if (arm && arm?.length > 1) {
            await onCalculateByMultiBases();
          } else {
            await onCalculateByOneBase();
          }
        }
      },
    });
  };

  const onCalculateByOneBase = async () => {
    try {
      const values = await form.validateFields();
      await api
        .post(NOMINATION_TRANSACTIONS.CALCULATE, {
          frm_baseCd: pageState === 'receipt' ? value?.mvitm_prodcode_to : value?.mvitm_prodcode_from,
          frm_drawer: pageState === 'receipt' ? value?.mvitm_prodcmpy_to : value?.mvitm_prodcmpy_from,
          frm_which_type: calcSource?.type, //'LT',
          frm_real_amount: calcSource?.qty, //values.mlitm_qty_amb,
          frm_real_temp: values?.mlitm_temp_amb,
          frm_real_dens: values?.mlitm_dens_cor,
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
                (pageState === 'receipt' ? value?.mvitm_prodcode_to : value?.mvitm_prodcode_from),
              description: errmsg,
            });
          } else {
            // const WIA =
            //   _.toNumber(response?.data?.real_kg) -
            //   _.toNumber(response?.data?.real_litre15) * config?.airBuoyancyFactor;
            const WIA = calcWiA(
              response?.data?.real_kg,
              response?.data?.real_litre15,
              values?.mlitm_dens_cor,
              config?.airBuoyancyFactor
            );
            form.setFieldsValue({
              mlitm_qty_amb: response?.data?.real_litre,
              mlitm_qty_cor: response?.data?.real_litre15,
              mlitm_qty_kg: response?.data?.real_kg,
              mlitm_air_kg: WIA,
              mlitm_vcf: _.round(response?.data?.real_cvf, config?.precisionVCF),
            });
            setAmbient(response?.data?.real_litre);
            setCorrected(response?.data?.real_litre15);
            setMass(response?.data?.real_kg);
            /* console.log('before change value', value);
            value.mlitm_qty_amb = response?.data?.real_litre;
            value.mlitm_qty_cor = response?.data?.real_litre15;
            value.mlitm_qty_kg = response?.data?.real_kg;
            value.mlitm_temp_amb = values?.mlitm_temp_amb;
            value.mlitm_dens_cor = values?.mlitm_dens_cor;
            console.log('after change value', value); */

            notification.success({
              message: t('messages.calculateSuccess'),
              description: t('descriptions.calculateSuccess'),
            });
          }
        });
    } catch (error) {
      message.error({
        key: 'calc',
        content: t('descriptions.validationFailed'),
      });
    }
  };

  const onCalculateByMultiBases = async () => {
    try {
      const values = await form.validateFields();
      const response = await calcArmQuantity(
        arm?.[0]?.stream_armcode,
        arm,
        calcSource?.qty,
        calcSource?.type,
        values?.mlitm_temp_amb
      );
      if (response?.result === false) {
        let errmsg = response?.message;
        if (!errmsg) {
          errmsg = t('descriptions.possibleReasonsToFailVCF');
        }
        if (errmsg?.indexOf('undefined') >= 0) {
          errmsg = errmsg.replace('undefined: undefined', t('descriptions.possibleReasonsToFailVCF'));
        }
        notification.error({
          message: t('descriptions.calculateFailed'),
          description: errmsg,
        });
      } else {
        // const WIA = _.toNumber(response?.load_kg) - _.toNumber(response?.qty_cor) * config?.airBuoyancyFactor;
        const WIA = calcWiA(
          response?.load_kg,
          response?.qty_cor,
          values?.mlitm_dens_cor,
          config?.airBuoyancyFactor
        );
        form.setFieldsValue({
          mlitm_qty_amb: response?.qty_amb,
          mlitm_qty_cor: response?.qty_cor,
          mlitm_qty_kg: response?.load_kg,
          mlitm_air_kg: WIA,
          mlitm_vcf: response?.prod_vcf,
        });
        setAmbient(response?.qty_amb);
        setCorrected(response?.qty_cor);
        setMass(response?.load_kg);
        setArmBases(response?.bases);

        notification.success({
          message: t('messages.calculateSuccess'),
          description: t('descriptions.calculateSuccess'),
        });
      }
    } catch (error) {
      message.error({
        key: 'calc',
        content: t('descriptions.validationFailed'),
      });
    }
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        icon={<SaveOutlined />}
        htmlType="button"
        disabled={isUpdating}
        onClick={onSubmit}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.submit')}
      </Button>

      <Button
        htmlType="button"
        icon={<CloseOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        onClick={onExitClicked}
      >
        {t('operations.cancel')}
      </Button>
    </>
  );

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setSelected(null);
    }
  }, [value, visible, resetFields, setSelected]);

  useEffect(() => {
    if (!!defaultTanker && !carrier) {
      setCarrier(defaultTanker.tnkr_carrier);
      if (value) {
        value.mvitm_carrier = defaultTanker.tnkr_carrier;
      }
    }
  }, [defaultTanker, value, carrier, setCarrier]);

  useEffect(() => {
    if (!!defaultTanker && !tanker) {
      setTanker(defaultTanker.tnkr_code);
      if (value) {
        value.mvitm_tanker = defaultTanker.tnkr_code;
      }
    }
  }, [defaultTanker, value, tanker, setTanker]);

  useEffect(() => {
    if (products && value && !productItemFrom && pageState !== 'receipt') {
      // console.log('products && value && !productItemFrom && pageState', products, value);
      const item = _.find(
        products?.records,
        (o) => o.prod_cmpy === value?.mvitm_prodcmpy_from && o.prod_code === value?.mvitm_prodcode_from
      );
      // console.log('products && value && !productItemFrom && pageState', item);
      setProductItemFrom(item);
    }
  }, [products, value, productItemFrom, setProductItemFrom, pageState]);

  useEffect(() => {
    if (products && value && !productItemTo && pageState !== 'disposal') {
      const item = _.find(
        products?.records,
        (o) => o.prod_cmpy === value?.mvitm_prodcmpy_to && o.prod_code === value?.mvitm_prodcode_to
      );
      setProductItemTo(item);
    }
  }, [products, value, productItemTo, setProductItemTo, pageState]);

  useEffect(() => {
    if (productItemTo && pageState !== 'disposal') {
      if (_.toNumber(productItemTo?.rat_count) > 1) {
        notification.error({
          // message: _.capitalize(pageState) + ': '
          message:
            value?.mvitm_type_name +
            ': ' +
            productItemTo.prod_cmpy +
            ' - ' +
            productItemTo.prod_code +
            ' - ' +
            productItemTo.prod_name +
            ' [' +
            productItemTo.rat_count +
            ']',
          description: t('descriptions.toProductNotBase'),
        });
        onComplete();
      }
    }
  }, [productItemTo, pageState]);

  useEffect(() => {
    // console.log('productItemFrom && pageState === \'transfer\'', productItemFrom, pageState);
    if (productItemFrom && pageState === 'transfer') {
      if (_.toNumber(productItemFrom?.rat_count) > 1) {
        notification.error({
          // message: _.capitalize(pageState) + ': '
          message:
            value?.mvitm_type_name +
            ': ' +
            productItemFrom.prod_cmpy +
            ' - ' +
            productItemFrom.prod_code +
            ' - ' +
            productItemFrom.prod_name +
            ' [' +
            productItemFrom.rat_count +
            ']',
          description: t('descriptions.fromProductNotBase'),
        });
        onComplete();
      }
    }
  }, [productItemFrom, pageState]);

  return (
    <Tabs defaultActiveKey="1" animated={false} tabBarExtraContent={modifiers}>
      <Tabs.TabPane tab={t('tabColumns.transactionForNomination')} forceRender={true} key="1">
        <Form
          layout="vertical"
          form={form}
          scrollToFirstError
          initialValues={{
            mvitm_move_id: value?.mvitm_move_id,
            mvitm_key: value?.mvitm_key,
            mvitm_terminal: value?.mvitm_terminal,
            mvitm_item_id: value?.mvitm_item_id,
            mvitm_item_key: value?.mvitm_item_key,
            mvitm_status: value?.mvitm_status,
            mvitm_type: value?.mvitm_type,
            mvitm_tas_ref: value?.mvitm_tas_ref,
            //mvitm_dtim_effect: value?.mvitm_dtim_effect,
            mvitm_carrier: value?.mvitm_carrier,
            mvitm_tanker: value?.mvitm_tanker,
            //mvitm_dtim_expiry: value?.mvitm_dtim_expiry,
            mvitm_plant_from: value?.mvitm_plant_from,
            //mvitm_prodcode_from: '400003057',
            mvitm_prodname_from: value?.mvitm_prodname_from,
            mvitm_arm: value?.mvitm_arm,
            mvitm_tank_from: value?.mvitm_tank_from,
            mvitm_plant_to: value?.mvitm_plant_to,
            //mvitm_prodcode_to: '400000257',
            mvitm_prodname_to: value?.mvitm_prodname_to,
            mvitm_tank_to: value?.mvitm_tank_to,
            mvitm_prod_qty: value?.mvitm_prod_qty,
            mvitm_avail_qty: 12345,
            //mvitm_avail_qty: (_.toNumber(value?.mvitm_prod_qty) - _.toNumber(value?.mvitm_qty_schd)),
          }}
        >
          <Row gutter={[8, 1]}>
            <Col span={8}>
              <NominationId form={form} value={value} pageState={pageState} />
            </Col>

            <Col span={8}>
              <NominationKey form={form} value={value} pageState={pageState} />
            </Col>

            <Col span={8}>
              <NominationTerminal form={form} value={value} pageState={pageState} />
            </Col>
          </Row>

          <Row gutter={[8, 1]}>
            <Col span={8}>
              <NominationItemId form={form} value={value} pageState={pageState} />
            </Col>

            <Col span={8}>
              <NominationItemKey form={form} value={value} pageState={pageState} />
            </Col>

            <Col span={8}>
              <NominationItemStatus form={form} value={value} pageState={pageState} />
            </Col>
          </Row>

          <Divider style={{ margin: '0px 0' }} />

          <Row gutter={[8, 1]}>
            <Col span={8}>
              <NominationItemType form={form} value={value} pageState={pageState} />
            </Col>

            <Col span={8}>
              <NominationItemBol form={form} value={value} pageState={pageState} />
            </Col>

            <Col span={8}>
              <ItemEffectTime form={form} value={value} pageState={pageState} />
            </Col>
          </Row>

          <Row gutter={[8, 1]}>
            <Col span={8}>
              <Carrier
                form={form}
                value={value}
                onChange={setCarrier}
                carrier={carrier}
                pageState={pageState}
              />
            </Col>

            <Col span={8}>
              <Tanker
                form={form}
                value={value}
                carrier={carrier}
                onChange={setTanker}
                pageState={pageState}
              />
            </Col>

            <Col span={8}>
              <ItemExpiryTime form={form} value={value} pageState={pageState} />
            </Col>
          </Row>

          {/* <Divider style={{ margin: '0px 0' }} /> */}

          <Row gutter={[8, 1]}>
            <Col span={16}>
              <Row gutter={[8, 1]}>
                <Col span={12}>
                  <Card size="small" title={t('fields.nomtranFromTitle')}>
                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <SourcePlant form={form} value={value} pageState={pageState} />
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <SourceProduct form={form} value={value} pageState={pageState} />
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <SourceArm
                          form={form}
                          value={value}
                          setArms={setProductArms}
                          onChange={setArm}
                          tank={tank}
                          pageState={pageState}
                        />
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <SourceTank
                          form={form}
                          value={value}
                          onChange={setTank}
                          arm={arm}
                          product={productItemFrom}
                          pageState={pageState}
                          config={config}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card size="small" title={t('fields.nomtranToTitle')}>
                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <DestinationPlant form={form} value={value} pageState={pageState} />
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <DestinationProduct form={form} value={value} pageState={pageState} />
                      </Col>
                    </Row>

                    <Row gutter={[8, 73]}>
                      <Col span={24}></Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <DestinationTank
                          form={form}
                          value={value}
                          onChange={setTank}
                          pageState={pageState}
                          config={config}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[8, 1]}>
                <Col span={24}>
                  <Comment form={form} value={value} pageState={pageState} />
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Card
                size="small"
                title={t('divider.calculation')}
                extra={
                  <Button
                    htmlType="button"
                    size="small"
                    icon={<CalculatorOutlined />}
                    style={{ marginRight: 5, marginTop: 0, marginBottom: 0, float: 'right' }}
                    onClick={onCalculate}
                  >
                    {t('operations.calculate')}
                  </Button>
                }
              >
                <Row gutter={[8, 1]}>
                  <Col span={12}>
                    <PlanQty form={form} value={value} pageState={pageState} config={config} />
                  </Col>

                  <Col span={12}>
                    <AvailQty form={form} value={value} pageState={pageState} config={config} />
                  </Col>
                </Row>

                <Row gutter={[8, 1]}>
                  <Col span={config?.siteUseVCF ? 8 : 12}>
                    <ObsQty
                      form={form}
                      value={value}
                      onChange={setCalcSource}
                      setValue={setAmbient}
                      pageState={pageState}
                      config={config}
                    />
                  </Col>

                  <Col span={config?.siteUseVCF ? 8 : 12}>
                    <StdQty
                      form={form}
                      value={value}
                      onChange={setCalcSource}
                      setValue={setCorrected}
                      pageState={pageState}
                      config={config}
                    />
                  </Col>
                  {config?.siteUseVCF && (
                    <Col span={8}>
                      <Form.Item name="mlitm_vcf" label={t('fields.vcf')}>
                        <InputNumber
                          min={0}
                          max={999999999}
                          precision={config.precisionVCF}
                          disabled={true}
                          style={{ width: '100%' }}
                          // onChange={handleCorVolFieldChange}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {/* <Col span={12}>
                    {!disableCalculation && (
                      <Form.Item 
                        name="mlitm_calc_btn"
                        label='   '
                      >
                        <Button
                          htmlType="button"
                          icon={<CalculatorOutlined />}
                          style={{ marginRight: 5, float: 'right' }}
                          onClick={onCalculate}
                        >
                          {t('operations.calculate')}
                        </Button>
                      </Form.Item>
                    )}
                  </Col> */}
                </Row>

                <Row gutter={[8, 1]}>
                  {config?.siteMassInVacuum && (
                    <Col span={config?.siteMassInAir ? 12 : 24}>
                      <ObsMass
                        form={form}
                        value={value}
                        onChange={setCalcSource}
                        setValue={setMass}
                        pageState={pageState}
                        config={config}
                      />
                    </Col>
                  )}

                  {config?.siteMassInAir && (
                    <Col span={config?.siteMassInVacuum ? 12 : 24}>
                      <AirMass
                        form={form}
                        value={value}
                        pageState={pageState}
                        config={config}
                        wiv={mass}
                        gsv={corrected}
                        dstd={density}
                      />
                    </Col>
                  )}
                </Row>

                <Row gutter={[8, 1]}>
                  <Col span={12}>
                    <ObsTemp
                      form={form}
                      value={value}
                      setValue={setTemperature}
                      tank={tank}
                      arm={arm}
                      pageState={pageState}
                      config={config}
                    />
                  </Col>

                  <Col span={12}>
                    <StdDensity
                      form={form}
                      value={value}
                      tank={tank}
                      arm={arm}
                      pageState={pageState}
                      config={config}
                      setValue={setDensity}
                    />
                  </Col>
                </Row>
              </Card>

              <Row gutter={[8, 1]}>
                <Col span={12}>
                  <AltQty
                    form={form}
                    value={value}
                    onChange={setAltQty}
                    pageState={pageState}
                    config={config}
                  />
                </Col>

                <Col span={12}>
                  <AltQtyUnit form={form} value={value} altQty={altQty} pageState={pageState} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Card size="small" title={t('divider.baseProducts')}>
            <Row gutter={[8, 1]}>
              <Col span={24}>
                <BaseDetails
                  form={form}
                  value={value}
                  pageState={pageState}
                  arm={arm}
                  temperature={temperature}
                  amb={ambient}
                  cor={corrected}
                  mass={mass}
                  bases={armBases}
                  config={config}
                />
              </Col>
            </Row>
          </Card>

          <Card size="small" title={t('divider.meters')}>
            <Row gutter={[8, 1]}>
              <Col span={24}>
                <MeterDetails
                  form={form}
                  value={value}
                  pageState={pageState}
                  arm={arm}
                  temperature={temperature}
                  amb={ambient}
                  cor={corrected}
                  mass={mass}
                  config={config}
                />
              </Col>
            </Row>
          </Card>

          <Divider style={{ margin: '0px 0' }} />
          {modifiers}
        </Form>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default FormModal;
