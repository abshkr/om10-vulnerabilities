import React, { useState, useEffect, useCallback } from 'react';

import { Form, Select, InputNumber, Input, Divider, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { COMPANIES } from '../../../api';
import { generateMaxInt } from '../../../utils';
import { CheckGroupList } from '../../../components/';

const OtherForm = ({ value, form, config }) => {
  const { data: payload } = useSWR(`${COMPANIES.CONFIG}?cmpy_code=${value?.cmpy_code}`);
  const {
    maxLengthOrderNum,
    bolVersion,
    siteUseStagingBay,
    siteCmpyLoadOptionsDefault,
    siteCmpyLoadOptionsEditable,
  } = config;

  const { t } = useTranslation();
  const { TextArea } = Input;
  const { setFieldsValue } = form;

  const [cmpy_bay_loop_ch, setEqptMustInArea] = useState(value?.cmpy_bay_loop_ch);
  const [cmpy_mod_drawer, setModDrawer] = useState(value?.cmpy_mod_drawer);
  const [cmpy_tkr_cfg, setTnkrAutoConfig] = useState(value?.cmpy_tkr_cfg);
  const [cmpy_must_sealno, setMustHaveSeal] = useState(value?.cmpy_must_sealno);
  const [cmpy_tkr_activat, setTnkrAutoActive] = useState(value?.cmpy_tkr_activat);
  const [cmpy_req_pin_flag, setMustHavePin] = useState(value?.cmpy_req_pin_flag);
  const [cmpy_wipe_ordets, setHostUpdateOrder] = useState(value?.cmpy_wipe_ordets);
  const [cmpy_enable_expd, setEnableExpiryCheck] = useState(value?.cmpy_enable_expd);
  const [cmpy_bol_text_copies_value, setCmpyBolTextCopiesValue] = useState(1);
  const [cmpy_load_options, setCmpyLoadOptions] = useState(siteCmpyLoadOptionsDefault);

  const companyTypes = [
    { index: 1, code: 'SITE_MANAGER', title: t('fields.siteManager') },
    { index: 2, code: 'SUPPLIER', title: t('fields.schdSupplier') },
    { index: 3, code: 'CARRIER', title: t('fields.schdCarrier') },
    { index: 4, code: 'CUSTOMER', title: t('fields.customer') },
    { index: 5, code: 'DRAWER', title: t('fields.drawer') },
    { index: 6, code: 'ISSUER', title: t('fields.issuer') },
    { index: 7, code: 'EMPLOYER', title: t('fields.employer') },
    { index: 8, code: 'HOST', title: t('fields.host') },
  ];

  /*
    "stagingBayAnyLoads": "No Check",
    "": "Load Schedules",
    "": "Pickup Schedules",
    "stagingBayBothLoads": "Load and Pickup Schedules",
  */
  const loadTypes = [
    { index: 1, code: 'NORMAL_LOADS', title: t('fields.stagingBayNormalLoads') },
    { index: 2, code: 'PICKUP_LOADS', title: t('fields.stagingBayPickupLoads') },
  ];

  const emailValidate = (rule, input) => {
    const regEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const result = input.replace(/\s/g, '').split(/:|;/);
    for (let i = 0; i < result.length; i++) {
      if (!regEx.test(result[i])) {
        return Promise.reject(`${t('placeholder.incorrectFormat')} ─ ${t('placeholder.emailInvalid')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthEmail) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthEmail} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const onEqptMustInArea = (v) => {
    setEqptMustInArea(v);
    setFieldsValue({
      cmpy_bay_loop_ch: v,
    });
  };

  const onModDrawer = (v) => {
    setModDrawer(v);
    setFieldsValue({
      cmpy_mod_drawer: v,
    });
  };

  const onTnkrAutoConfig = (v) => {
    setTnkrAutoConfig(v);
    setFieldsValue({
      cmpy_tkr_cfg: v,
    });
  };

  const onMustHaveSeal = (v) => {
    setMustHaveSeal(v);
    setFieldsValue({
      cmpy_must_sealno: v,
    });
  };

  const onTnkrAutoActive = (v) => {
    setTnkrAutoActive(v);
    setFieldsValue({
      cmpy_tkr_activat: v,
    });
  };

  const onMustHavePin = (v) => {
    setMustHavePin(v);
    setFieldsValue({
      cmpy_req_pin_flag: v,
    });
  };

  const onHostUpdateOrder = (v) => {
    setHostUpdateOrder(v);
    setFieldsValue({
      cmpy_wipe_ordets: v,
    });
  };

  const onEnableExpiryCheck = (v) => {
    setEnableExpiryCheck(v);
    setFieldsValue({
      cmpy_enable_expd: v,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cmpy_ord_strt: value.cmpy_ord_strt,
        cmpy_ord_last: value.cmpy_ord_last,
        cmpy_ord_end: value.cmpy_ord_end,
        cmpy_vet: value.cmpy_vet,
        cmpy_bay_loop_ch: value.cmpy_bay_loop_ch,
        cmpy_rtn_prompt: value.cmpy_rtn_prompt,
        cmpy_mod_drawer: value.cmpy_mod_drawer,
        cmpy_tkr_cfg: value.cmpy_tkr_cfg,
        cmpy_must_sealno: value.cmpy_must_sealno,
        cmpy_tkr_activat: value.cmpy_tkr_activat,
        cmpy_req_pin_flag: value.cmpy_req_pin_flag,
        cmpy_wipe_ordets: value.cmpy_wipe_ordets,
        cmpy_enable_expd: value.cmpy_enable_expd,
        cmpy_schd_rev_repost: value.cmpy_schd_rev_repost,
        cmpy_movements_rev: value.cmpy_movements_rev,
        cmpy_report_receivers: value.cmpy_report_receivers,
      });

      setEqptMustInArea(value.cmpy_bay_loop_ch);
      setModDrawer(value.cmpy_mod_drawer);
      setTnkrAutoConfig(value.cmpy_tkr_cfg);
      setMustHaveSeal(value.cmpy_must_sealno);
      setTnkrAutoActive(value.cmpy_tkr_activat);
      setMustHavePin(value.cmpy_req_pin_flag);
      setHostUpdateOrder(value.cmpy_wipe_ordets);
      setEnableExpiryCheck(value.cmpy_enable_expd);
    }
    if (
      payload &&
      bolVersion === 'PLAIN_TEXT' &&
      (value?.supplier || value?.carrier || value?.customer || value?.drawer)
    ) {
      const bolTextCopiesConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_BOL_TEXT_COPIES';
      });

      setFieldsValue({
        cmpy_bol_text_copies: bolTextCopiesConfig?.config_value || 1,
      });
      setCmpyBolTextCopiesValue(bolTextCopiesConfig?.config_value || 1);
    }
    if (payload) {
      const cmpyLoadOptionsConfig = _.find(payload?.records, (item) => {
        return item.config_key === 'CMPY_LOAD_OPTIONS';
      });

      setFieldsValue({
        cmpy_load_options: cmpyLoadOptionsConfig?.config_value || siteCmpyLoadOptionsDefault,
      });
      setCmpyLoadOptions(cmpyLoadOptionsConfig?.config_value || siteCmpyLoadOptionsDefault);
    }
  }, [value, setFieldsValue, payload]);

  const changeCmpyLoadoptionsField = (options) => {
    setFieldsValue({
      cmpy_load_options: options,
    });
    setCmpyLoadOptions(options);
  };

  const leftItemLayout = {
    labelCol: { span: 18 },
    labelAlign: 'left',
    // marginRight: 10
    // wrapperCol: { span: 16 },
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
      {(value?.supplier || value?.drawer) && (
        <div>
          <Divider orientation="left">{t('fields.autoOrderNumbers')}</Divider>

          <Row justify="center" gutter="8">
            <Col span={7}>
              <Form.Item name="cmpy_ord_strt" label={t('fields.startAt')} rules={[{ required: true }]}>
                <InputNumber min={1} max={generateMaxInt(maxLengthOrderNum)} style={{ width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="cmpy_ord_end" label={t('fields.endAt')} rules={[{ required: true }]}>
                <InputNumber min={1} max={generateMaxInt(maxLengthOrderNum)} style={{ width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="cmpy_ord_last" label={t('fields.lastUsed')} rules={[{ required: true }]}>
                <InputNumber min={0} max={generateMaxInt(maxLengthOrderNum)} style={{ width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      )}

      <Divider orientation="left"></Divider>
      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_vet" label={t('fields.vetFlag')} {...leftItemLayout}>
            <Select
              popupMatchSelectWidth={false}
              allowClear
              style={{ width: '14vh' }}
              // onChange={handleVetChange}
            >
              <Select.Option key={-1} value="-1">
                {t('fields.vetNone')}
              </Select.Option>
              <Select.Option key={0} value="0">
                {t('fields.vetCarrier')}
              </Select.Option>
              <Select.Option key={1} value="1">
                {t('fields.vetPM')}
              </Select.Option>
              <Select.Option key={2} value="2">
                {t('fields.vetTrailer')}
              </Select.Option>
              <Select.Option key={3} value="3">
                {t('fields.vetAll')}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_bay_loop_ch" label={t('fields.equipMustInArea')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_bay_loop_ch}
              onChange={onEqptMustInArea}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_rtn_prompt" label={t('fields.returnLocationCarrier')} {...leftItemLayout}>
            <Select popupMatchSelectWidth={false} allowClear style={{ width: '14vh' }}>
              <Select.Option key={0} value="0">
                {t('fields.bayOnly')}
              </Select.Option>
              <Select.Option key={1} value="1">
                {t('fields.gateAndBay')}
              </Select.Option>
              <Select.Option key={2} value="2">
                {t('fields.gateAndDevice')}
              </Select.Option>
              <Select.Option key={3} value="3">
                {t('fields.gateOnly')}
              </Select.Option>
              <Select.Option key={4} value="4">
                {t('fields.deviceOnly')}
              </Select.Option>
              <Select.Option key={5} value="5">
                {t('fields.bayOrDevice')}
              </Select.Option>
              <Select.Option key={6} value="6">
                {t('fields.hostOnly')}
              </Select.Option>
              <Select.Option key={7} value="7">
                {t('fields.none')}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_mod_drawer" label={t('fields.drawerChangeForNew')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_mod_drawer}
              onChange={onModDrawer}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_tkr_cfg" label={t('fields.autoConfigTanker')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_tkr_cfg}
              onChange={onTnkrAutoConfig}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_must_sealno" label={t('fields.mustHaveSeal')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_must_sealno}
              onChange={onMustHaveSeal}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_tkr_activat" label={t('fields.activateTanker')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_tkr_activat}
              onChange={onTnkrAutoActive}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_req_pin_flag" label={t('fields.mustHavePin')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_req_pin_flag}
              onChange={onMustHavePin}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_wipe_ordets" label={t('fields.hostUpdateOrder')} {...leftItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_wipe_ordets}
              onChange={onHostUpdateOrder}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_enable_expd" label={t('fields.enableExpiryCheck')} {...rightItemLayout}>
            <Switch
              checkedChildren={t('operations.yes')}
              unCheckedChildren={t('operations.no')}
              checked={cmpy_enable_expd}
              onChange={onEnableExpiryCheck}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          {bolVersion === 'PLAIN_TEXT' &&
            (value?.supplier || value?.carrier || value?.customer || value?.drawer) && (
              <Form.Item name="cmpy_bol_text_copies" label={t('fields.bolTextCopies')} {...leftItemLayout}>
                <InputNumber min={1} max={99} style={{ width: 100 }} />
              </Form.Item>
            )}
        </Col>
        <Col span={12}></Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={24}>
          <Form.Item
            name="cmpy_report_receivers"
            label={t('fields.closeoutRptEmails')}
            {...singleLineLayout}
            rules={[{ validator: emailValidate }]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col offset={18} span={24}>
          <div>{t('fields.closeoutRptEmailsNote')}</div>
        </Col>
      </Row>

      {siteUseStagingBay && (
        <Row justify="center" gutter="8" style={{ marginTop: 10 }}>
          <Col span={24}>
            <Form.Item
              name="cmpy_load_options"
              label={t('fields.stagingBayCmpyLoadOptions')}
              {...singleLineLayout}
              // rules={[{ validator: emailValidate }]}
            >
              <Input value={cmpy_load_options} disabled={true} />
            </Form.Item>
          </Col>
          <Col offset={0} span={24}>
            <div>
              <CheckGroupList
                value={cmpy_load_options}
                defaultValue={siteCmpyLoadOptionsDefault}
                flags={siteCmpyLoadOptionsEditable}
                listOptions={companyTypes}
                checkOptions={loadTypes}
                onChange={changeCmpyLoadoptionsField}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OtherForm;
