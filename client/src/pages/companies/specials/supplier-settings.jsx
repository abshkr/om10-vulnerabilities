import React, { useState, useEffect } from 'react';

import { Form, notification, Select, InputNumber, Divider, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import _ from 'lodash';
// import { useConfig } from 'hooks';

import api, { COMPANIES } from '../../../api';
import { generateMaxInt } from '../../../utils';

const SupplierForm = ({ value, form, config }) => {
  const { data: payload } = useSWR(`${COMPANIES.CONFIG}?cmpy_code=${value?.cmpy_code}`);
  const {
    externalBlendAllowed,
    maxLengthTripNum,
    siteEnabledCOPS,
    siteEnabledPIDX,
    siteTripExpiryHours,
    siteUseStagingBay,
    sitePickupTripStart,
    sitePickupTripEnd,
  } = config;

  const { t } = useTranslation();
  const { resetFields, setFieldsValue, getFieldDecorator } = form;

  const [cmpy_auto_reconc, setReconc] = useState(value?.cmpy_auto_reconc);
  const [cmpy_host_docs, setHostDocs] = useState(value?.cmpy_host_docs);
  const [cmpy_comms_ok, setComms] = useState(value?.cmpy_comms_ok);
  const [cmpy_flag_2, setFlag2] = useState(value?.cmpy_flag_2);
  const [cmpy_log_ld_del, setLogDel] = useState(value?.cmpy_log_ld_del);
  const [cmpy_ldtol_flag, setLoadTol] = useState(value?.cmpy_ldtol_flag);
  const [cmpy_auto_ld, setAutoLoad] = useState(value?.cmpy_auto_ld);
  const [cmpy_bltol_flag, setBlendTol] = useState(value?.cmpy_bltol_flag);
  const [cmpy_ord_carrier, setOrdCarrier] = useState(value?.cmpy_ord_carrier);
  const [cmpy_wgh_complet, setWghComplete] = useState(value?.cmpy_wgh_complet);
  const [cmpy_schd_rev_repost, setReverseRepost] = useState(value?.cmpy_schd_rev_repost);
  const [cmpy_movements_rev, setMovementRev] = useState(value?.cmpy_movements_rev);
  const [cmpy_schd_archive, setArchive] = useState(value?.cmpy_schd_archive);
  const [auto_complete_non_preschd_loads, setAutoNonSchedule] = useState(false);
  const [safefill_tolerance_check, setSafefillCheck] = useState(false);
  const [validate_schedule_max_weight, setValidateScheduleWeight] = useState(false);
  const [auth_at_gate, setAuthAtGate] = useState(false);
  const [validate_schedule_availabitilty, setValidateSchd] = useState(false);
  const [cmpy_2nd_drawer_flag, setCmpy2ndDrawerFlag] = useState(false);
  const [axle_needed, setAlxeNeeded] = useState(false);
  const [weightTolerance, setWeightTol] = useState(0);
  const [drawers, setDrawers] = useState([]);
  const [cmpy_guardmaster_product_flag, setCmpyGuardmasterProductFlag] = useState(false);
  const [cmpy_rtl_authorize_load, setCmpyRtlAuthorizeLoad] = useState(false);
  const [cmpy_rtl_bol_send, setCmpyRtlBolSend] = useState(false);
  const [cmpy_trip_expiry_hours, setCmpyTripExpiryHours] = useState(siteTripExpiryHours);
  const [cmpy_no_customer_allowed_flag, setCmpyNoCustomerAllowedFlag] = useState(false);
  const [cmpy_pickup_trip_start, setCmpyPickupTripStart] = useState(sitePickupTripStart);
  const [cmpy_pickup_trip_end, setCmpyPickupTripEnd] = useState(sitePickupTripEnd);
  const [cmpy_pickup_trip_last, setCmpyPickupTripLast] = useState(sitePickupTripStart);

  const IS_CREATING = !value;

  const onAutoReconcChange = (v) => {
    setReconc(v);
    setFieldsValue({
      cmpy_auto_reconc: v,
    });
  };

  const onHostDocChange = (v) => {
    setHostDocs(v);
    setFieldsValue({
      cmpy_host_docs: v,
    });
  };

  const onComms = (v) => {
    setHostDocs(v);
    setFieldsValue({
      cmpy_comms_ok: v,
    });
  };

  const onFlag2 = (v) => {
    setFlag2(v);
    setFieldsValue({
      cmpy_flag_2: v,
    });
  };

  const onLogDel = (v) => {
    setLogDel(v);
    setFieldsValue({
      cmpy_log_ld_del: v,
    });
  };

  const onLoadTol = (v) => {
    setLoadTol(v);
    setFieldsValue({
      cmpy_ldtol_flag: v,
    });
  };

  const onAutoLoad = (v) => {
    setAutoLoad(v);
    setFieldsValue({
      cmpy_auto_ld: v,
    });
  };

  const onBlendTol = (v) => {
    setBlendTol(v);
    setFieldsValue({
      cmpy_bltol_flag: v,
    });
  };

  const onOrdCarrier = (v) => {
    setOrdCarrier(v);
    setFieldsValue({
      cmpy_ord_carrier: v,
    });
  };

  const onWghComplete = (v) => {
    setWghComplete(v);
    setFieldsValue({
      cmpy_wgh_complet: v,
    });
  };
  const onAuthAtGate = (v) => {
    setAuthAtGate(v);
    setFieldsValue({
      auth_at_gate: v,
    });
  };

  const onAutoNonPreschedule = (v) => {
    setAutoNonSchedule(v);
    setFieldsValue({
      auto_complete_non_preschd_loads: v,
    });
  };

  const onSafefillCheck = (v) => {
    setSafefillCheck(v);
    setFieldsValue({
      safefill_tolerance_check: v,
    });
  };

  const onReverseRepost = (v) => {
    setReverseRepost(v);
    setFieldsValue({
      cmpy_schd_rev_repost: v,
    });
  };

  const onValidateScheduleWeight = (v) => {
    setValidateScheduleWeight(v);
    setFieldsValue({
      validate_schedule_max_weight: v,
    });
  };

  const onMovementRev = (v) => {
    setMovementRev(v);
    setFieldsValue({
      cmpy_movements_rev: v,
    });
  };

  const onArchive = (v) => {
    setArchive(v);
    setFieldsValue({
      cmpy_schd_archive: v,
    });
  };

  const onAxleChanged = (v) => {
    setAlxeNeeded(v);
    setFieldsValue({
      axle_needed: v,
    });
  };

  const onLink2ndDrawer = (v) => {
    setCmpy2ndDrawerFlag(v);
    setFieldsValue({
      cmpy_2nd_drawer_flag: v,
    });
  };

  const onValidateSchd = (v) => {
    setValidateSchd(v);
    setFieldsValue({
      validate_schedule_availabitilty: v,
    });
  };

  const onGuardmasterProductFlag = (v) => {
    setCmpyGuardmasterProductFlag(v);
    setFieldsValue({
      cmpy_guardmaster_product_flag: v,
    });
  };

  const onRtlAuthorizeLoad = (v) => {
    setCmpyRtlAuthorizeLoad(v);
    setFieldsValue({
      cmpy_rtl_authorize_load: v,
    });
  };

  const onRtlBolSend = (v) => {
    setCmpyRtlBolSend(v);
    setFieldsValue({
      cmpy_rtl_bol_send: v,
    });
  };

  const onTripExpiryHours = (v) => {
    setCmpyTripExpiryHours(v);
    setFieldsValue({
      cmpy_trip_expiry_hours: v,
    });
  };

  const onNoCustomerAllowedFlag = (v) => {
    setCmpyNoCustomerAllowedFlag(v);
    setFieldsValue({
      cmpy_no_customer_allowed_flag: v,
    });
  };

  const onCmpyPickupTripStart = (v) => {
    setCmpyPickupTripStart(v);
    setFieldsValue({
      cmpy_pickup_trip_start: v,
    });
  };

  const onCmpyPickupTripEnd = (v) => {
    setCmpyPickupTripEnd(v);
    setFieldsValue({
      cmpy_pickup_trip_end: v,
    });
  };

  const onCmpyPickupTripLast = (v) => {
    setCmpyPickupTripLast(v);
    setFieldsValue({
      cmpy_pickup_trip_last: v,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cmpy_trip_strt: value.cmpy_trip_strt,
        cmpy_trip_last: value.cmpy_trip_last,
        cmpy_trip_end: value.cmpy_trip_end,
        cmpy_host_docs: value.cmpy_host_docs,
        cmpy_auto_reconc: value.cmpy_auto_reconc,
        cmpy_comms_ok: value.cmpy_comms_ok,
        cmpy_flag_2: value.cmpy_flag_2,
        cmpy_log_ld_del: value.cmpy_log_ld_del,
        cmpy_ldtol_flag: value.cmpy_ldtol_flag,
        cmpy_auto_ld: value.cmpy_auto_ld,
        cmpy_bltol_flag: value.cmpy_bltol_flag,
        cmpy_ord_carrier: value.cmpy_ord_carrier,
        cmpy_wgh_complet: value.cmpy_wgh_complet,
        cmpy_schd_rev_repost: value.cmpy_schd_rev_repost,
        cmpy_movements_rev: value.cmpy_movements_rev,
        cmpy_schd_archive: value.cmpy_schd_archive,
      });

      setReconc(value.cmpy_auto_reconc);
      setHostDocs(value.cmpy_host_docs);
      setComms(value.cmpy_comms_ok);
      setFlag2(value.cmpy_flag_2);
      setLogDel(value.cmpy_log_ld_del);
      setLoadTol(value.cmpy_ldtol_flag);
      setAutoLoad(value.cmpy_auto_ld);
      setBlendTol(value.cmpy_bltol_flag);
      setOrdCarrier(value.cmpy_ord_carrier);
      setWghComplete(value.cmpy_wgh_complet);
      setReverseRepost(value.cmpy_schd_rev_repost);
      setMovementRev(value.cmpy_movements_rev);
      setArchive(value.cmpy_schd_archive);
    }

    if (payload) {
      const autoNonSchduleConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'AUTO_COMPLETE_NON_PRESCHD_LOADS';
      });
      const safefillConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'SAFEFILL_TOLERANCE_CHECK';
      });
      const validateWeightConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'VALIDATE_SCHEDULE_MAX_WEIGHT';
      });
      const authAtGateConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'AUTH_AT_GATE';
      });
      const validateSchdConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'VALIDATE_SCHEDULE_AVAILABITILTY';
      });
      const weightTolConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'LOAD_VEHICLE_WEIGHT_TOLERANCE';
      });
      const cmpy2ndDrawerConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_2ND_DRAWER_FLAG';
      });
      const axleConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'AXLE_REQUIRED';
      });
      const secondDrawerConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_2ND_DRAWER';
      });
      const guardmasterProductConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_GUARDMASTER_PRODUCT_FLAG';
      });
      const rtlAuthorizeLoadConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_RTL_AUTHORIZE_LOAD';
      });
      const rtlBolSendConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_RTL_BOL_SEND';
      });
      const tripExpiryHoursConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_TRIP_EXPIRY_HOURS';
      });
      const noCustomerAllowedConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'NO_CUSTOMER_ALLOWED';
      });
      const cmpyPickupTripStartConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_PICKUP_TRIP_START';
      });
      const cmpyPickupTripEndConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_PICKUP_TRIP_END';
      });
      const cmpyPickupTripLastConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_PICKUP_TRIP_LAST';
      });

      setFieldsValue({
        auto_complete_non_preschd_loads:
          autoNonSchduleConfig && autoNonSchduleConfig.config_value === 'Y' ? true : false,
        safefill_tolerance_check: safefillConfig && safefillConfig.config_value === 'Y' ? true : false,
        validate_schedule_max_weight:
          validateWeightConfig && validateWeightConfig.config_value === 'Y' ? true : false,
        auth_at_gate: authAtGateConfig && authAtGateConfig.config_value === 'Y' ? true : false,
        validate_schedule_availabitilty:
          validateSchdConfig && validateSchdConfig.config_value === 'Y' ? true : false,
        weightTolerance: weightTolConfig?.config_value,
        cmpy_2nd_drawer_flag: cmpy2ndDrawerConfig && cmpy2ndDrawerConfig.config_value === 'Y' ? true : false,
        axle_needed: axleConfig && axleConfig.config_value === 'Y' ? true : false,
        cmpy_2nd_drawer: secondDrawerConfig?.config_value,
        cmpy_guardmaster_product_flag:
          guardmasterProductConfig && guardmasterProductConfig.config_value === 'Y' ? true : false,
        cmpy_rtl_authorize_load:
          rtlAuthorizeLoadConfig && rtlAuthorizeLoadConfig.config_value === 'Y' ? true : false,
        cmpy_rtl_bol_send: rtlBolSendConfig && rtlBolSendConfig.config_value === 'Y' ? true : false,
        cmpy_trip_expiry_hours: tripExpiryHoursConfig?.config_value,
        cmpy_no_customer_allowed_flag:
          noCustomerAllowedConfig && noCustomerAllowedConfig.config_value === 'Y' ? true : false,
        cmpy_pickup_trip_start: cmpyPickupTripStartConfig?.config_value,
        cmpy_pickup_trip_end: cmpyPickupTripEndConfig?.config_value,
        cmpy_pickup_trip_last: cmpyPickupTripLastConfig?.config_value,
      });
      setAutoNonSchedule(autoNonSchduleConfig && autoNonSchduleConfig.config_value === 'Y' ? true : false);
      setSafefillCheck(safefillConfig && safefillConfig.config_value === 'Y' ? true : false);
      setValidateScheduleWeight(
        validateWeightConfig && validateWeightConfig.config_value === 'Y' ? true : false
      );
      setAuthAtGate(authAtGateConfig && authAtGateConfig.config_value === 'Y' ? true : false);
      setValidateSchd(validateSchdConfig && validateSchdConfig.config_value === 'Y' ? true : false);
      setWeightTol(weightTolConfig?.config_value);
      setCmpy2ndDrawerFlag(cmpy2ndDrawerConfig && cmpy2ndDrawerConfig.config_value === 'Y' ? true : false);
      setAlxeNeeded(axleConfig && axleConfig.config_value === 'Y' ? true : false);
      setCmpyGuardmasterProductFlag(
        guardmasterProductConfig && guardmasterProductConfig.config_value === 'Y' ? true : false
      );
      setCmpyRtlAuthorizeLoad(
        rtlAuthorizeLoadConfig && rtlAuthorizeLoadConfig.config_value === 'Y' ? true : false
      );
      setCmpyRtlBolSend(rtlBolSendConfig && rtlBolSendConfig.config_value === 'Y' ? true : false);
      setCmpyTripExpiryHours(tripExpiryHoursConfig?.config_value);
      setCmpyNoCustomerAllowedFlag(
        noCustomerAllowedConfig && noCustomerAllowedConfig.config_value === 'Y' ? true : false
      );
      setCmpyPickupTripStart(cmpyPickupTripStartConfig?.config_value);
      setCmpyPickupTripEnd(cmpyPickupTripEndConfig?.config_value);
      setCmpyPickupTripLast(cmpyPickupTripLastConfig?.config_value);
    }
  }, [value, setFieldsValue, payload, resetFields]);

  useEffect(() => {
    if (externalBlendAllowed) {
      api
        .get(`${COMPANIES.DRAWERS}`)
        .then((response) => {
          const payload = response.data?.records || [];
          setDrawers(payload);
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    }
  }, [externalBlendAllowed]);

  const validate = (rule, input) => {
    // if (input === '' || !input) {
    //   return Promise.reject(`${t('fields.loadToleranceCheck')}`);
    // }

    return Promise.resolve();
  };

  const leftItemLayout = {
    labelCol: { span: 18 },
    labelAlign: 'left',
  };

  const rightItemLayout = {
    labelCol: { span: 20 },
    labelAlign: 'left',
    // marginLeft: 10,
    // wrapperCol: { span: 16 },
  };

  const singleLineLayout = {
    labelCol: { span: 9 },
    labelAlign: 'left',
    // wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Divider orientation="left">{t('fields.autoTripNumbers')}</Divider>
      <Row justify="center">
        <Col span={7}>
          <Form.Item
            name="cmpy_trip_strt"
            label={t('fields.startAt')}
            rules={[
              {
                required: true,
                message: `${t('validate.select')} ─ ${t('fields.startAt')}`,
              },
            ]}
          >
            <InputNumber min={1} max={generateMaxInt(maxLengthTripNum)} style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="cmpy_trip_end"
            label={t('fields.endAt')}
            rules={[
              {
                required: true,
                message: `${t('validate.select')} ─ ${t('fields.endAt')}`,
              },
            ]}
          >
            <InputNumber min={1} max={generateMaxInt(maxLengthTripNum)} style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="cmpy_trip_last"
            label={t('fields.lastUsed')}
            rules={[
              {
                required: true,
                message: `${t('validate.select')} ─ ${t('fields.lastUsed')}`,
              },
            ]}
          >
            <InputNumber min={0} max={generateMaxInt(maxLengthTripNum)} style={{ width: 200 }} />
          </Form.Item>
        </Col>
      </Row>

      {siteUseStagingBay && (
        <>
          <Divider orientation="left">{t('fields.autoPickupNumbers')}</Divider>
          <Row justify="center">
            <Col span={7}>
              <Form.Item
                name="cmpy_pickup_trip_start"
                label={t('fields.startAt')}
                rules={[
                  {
                    required: true,
                    message: `${t('validate.select')} ─ ${t('fields.startAt')}`,
                  },
                ]}
              >
                <InputNumber min={1} max={generateMaxInt(maxLengthTripNum)} style={{ width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="cmpy_pickup_trip_end"
                label={t('fields.endAt')}
                rules={[
                  {
                    required: true,
                    message: `${t('validate.select')} ─ ${t('fields.endAt')}`,
                  },
                ]}
              >
                <InputNumber min={1} max={generateMaxInt(maxLengthTripNum)} style={{ width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="cmpy_pickup_trip_last"
                label={t('fields.lastUsed')}
                rules={[
                  {
                    required: true,
                    message: `${t('validate.select')} ─ ${t('fields.lastUsed')}`,
                  },
                ]}
              >
                <InputNumber min={0} max={generateMaxInt(maxLengthTripNum)} style={{ width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Divider orientation="left"></Divider>
      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_host_docs" label={t('fields.hostPrintDoc')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_host_docs}
              onChange={onHostDocChange}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_auto_reconc" label={t('fields.reconcilePrev')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_auto_reconc}
              onChange={onAutoReconcChange}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_comms_ok" label={t('fields.hostCommUp')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_comms_ok}
              onChange={onComms}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_flag_2" label={t('fields.autoTankConfig')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_flag_2}
              onChange={onFlag2}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_log_ld_del" label={t('fields.loadDeletionLog')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_log_ld_del}
              onChange={onLogDel}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_ldtol_flag" label={t('fields.doLoadTolCheck')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_ldtol_flag}
              onChange={onLoadTol}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_auto_ld" label={t('fields.autoCompletePreschedule')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_auto_ld}
              onChange={onAutoLoad}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_bltol_flag" label={t('fields.doBlendTolCheck')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_bltol_flag}
              onChange={onBlendTol}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_ord_carrier" label={t('fields.ignoreCarrierForPreorder')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_ord_carrier}
              onChange={onOrdCarrier}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_wgh_complet" label={t('fields.mustEndOnWB')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_wgh_complet}
              onChange={onWghComplete}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item
            name="auto_complete_non_preschd_loads"
            label={t('fields.autoCompleteNonPreschedule')}
            {...leftItemLayout}
          >
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={auto_complete_non_preschd_loads}
              onChange={onAutoNonPreschedule}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="safefill_tolerance_check" label={t('fields.doSafeTolCheck')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={safefill_tolerance_check}
              onChange={onSafefillCheck}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_schd_rev_repost" label={t('fields.reverseRepost')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_schd_rev_repost}
              onChange={onReverseRepost}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="validate_schedule_max_weight"
            label={t('fields.maxWeightDLICheck')}
            {...rightItemLayout}
          >
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={validate_schedule_max_weight}
              onChange={onValidateScheduleWeight}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_movements_rev" label={t('fields.reverseMovement')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_movements_rev}
              onChange={onMovementRev}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="auth_at_gate" label={t('fields.authAtDLI')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={auth_at_gate}
              onChange={onAuthAtGate}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="cmpy_schd_archive" label={t('fields.archiveSchedules')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_schd_archive}
              onChange={onArchive}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="validate_schedule_availabitilty"
            label={t('fields.validateSchdAtDLI')}
            {...rightItemLayout}
          >
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={validate_schedule_availabitilty}
              onChange={onValidateSchd}
            ></Switch>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          <Form.Item name="weightTolerance" label={t('fields.weightTolerance')} {...leftItemLayout}>
            <InputNumber
              min={0}
              max={20}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="axle_needed" label={t('fields.axleNeeded')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={axle_needed}
              onChange={onAxleChanged}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          {externalBlendAllowed && (
            <Form.Item name="cmpy_2nd_drawer_flag" label={t('fields.linkToSecondDrawer')} {...leftItemLayout}>
              <Switch
                checkedChildren={t('operations.yes')}
                unCheckedChildren={t('operations.no')}
                checked={cmpy_2nd_drawer_flag}
                onChange={onLink2ndDrawer}
              />
            </Form.Item>
          )}
        </Col>
        <Col span={12}>
          {externalBlendAllowed && (
            <Form.Item name="cmpy_2nd_drawer" label={t('fields.linkedDrawer')} {...rightItemLayout}>
              <Select
                popupMatchSelectWidth={false}
                allowClear
                // loading={isValidating}
                // style={{ width: '14vh' }}
                showSearch
                optionFilterProp="children"
                disabled={!cmpy_2nd_drawer_flag}
                // placeholder={!value ? t('placeholder.selectHostDataType') : null}
                filterOption={(value, option) =>
                  option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                }
              >
                {drawers.map((item, index) => (
                  <Select.Option key={index} value={item?.cmpy_code}>
                    {item?.cmpy_desc}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          {siteEnabledPIDX && (
            <Form.Item
              name="cmpy_rtl_authorize_load"
              label={t('fields.cmpyPidxRtlAuthorizeLoad')}
              {...leftItemLayout}
            >
              <Switch
                checkedChildren={t('operations.yes')}
                unCheckedChildren={t('operations.no')}
                checked={cmpy_rtl_authorize_load}
                onChange={onRtlAuthorizeLoad}
              />
            </Form.Item>
          )}
        </Col>
        <Col span={12}>
          {siteEnabledPIDX && (
            <Form.Item name="cmpy_rtl_bol_send" label={t('fields.cmpyPidxRtlBolSend')} {...rightItemLayout}>
              <Switch
                checkedChildren={t('operations.yes')}
                unCheckedChildren={t('operations.no')}
                checked={cmpy_rtl_bol_send}
                onChange={onRtlBolSend}
              />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          {siteEnabledCOPS && (
            <Form.Item
              name="cmpy_guardmaster_product_flag"
              label={t('fields.copsGuardMasterProdFlag')}
              {...leftItemLayout}
            >
              <Switch
                checkedChildren={t('operations.yes')}
                unCheckedChildren={t('operations.no')}
                checked={cmpy_guardmaster_product_flag}
                onChange={onGuardmasterProductFlag}
              />
            </Form.Item>
          )}
        </Col>
        <Col span={12}>
          <Form.Item
            name="cmpy_trip_expiry_hours"
            label={t('fields.cmpyTripExpiryHours')}
            {...rightItemLayout}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={12}>
          {siteUseStagingBay && (
            <Form.Item
              name="cmpy_no_customer_allowed_flag"
              label={t('fields.stagingBayNoCustomerAllowed')}
              {...leftItemLayout}
            >
              <Switch
                checkedChildren={t('operations.yes')}
                unCheckedChildren={t('operations.no')}
                checked={cmpy_no_customer_allowed_flag}
                onChange={onNoCustomerAllowedFlag}
              />
            </Form.Item>
          )}
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};

export default SupplierForm;
