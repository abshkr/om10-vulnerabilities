import React, { useState, useEffect, useCallback } from 'react';

import { Form, Select, InputNumber, Input, Divider, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { COMPANIES } from '../../../api';

const OtherForm = ({ value, form }) => {
  const { data: payload } = useSWR(`${COMPANIES.CONFIG}?cmpy_code=${value?.cmpy_code}`);
  
  const { t } = useTranslation();
  const { TextArea } = Input;
  const { setFieldsValue } = form;
  
  const [ cmpy_bay_loop_ch, setReconc ] = useState(value?.cmpy_bay_loop_ch)
  const [ cmpy_mod_drawer, setFlag2 ] = useState(value?.cmpy_mod_drawer)
  const [ cmpy_auto_reconc, setLogDel ] = useState(value?.cmpy_auto_reconc)
  const [ cmpy_must_sealno, setLoadTol ] = useState(value?.cmpy_must_sealno)
  const [ cmpy_tkr_activat, setAutoLoad ] = useState(value?.cmpy_tkr_activat)
  const [ cmpy_req_pin_flag, setBlendTol ] = useState(value?.cmpy_req_pin_flag)
  const [ cmpy_wipe_ordets, setOrdCarrier ] = useState(value?.cmpy_wipe_ordets)
  const [ cmpy_enable_expd, setWghComplete ] = useState(value?.cmpy_enable_expd)
  
  const emailValidate = (rule, input) => {
    const regEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const result = input.replace(/\s/g, "").split(/:|;/);   
    for(let i = 0; i < result.length; i++) {
        
      if(!regEx.test(result[i])) {
        return Promise.reject(`${t('fields.closeoutRptEmails')}`);
      }
    }

    return Promise.resolve();
  };

  const onAutoReconcChange = v => {
    setReconc(v)
    setFieldsValue({
      cmpy_bay_loop_ch: v,
    });
  }

  const onFlag2 = v => {
    setFlag2(v)
    setFieldsValue({
      cmpy_mod_drawer: v,
    });
  }

  const onLogDel = v => {
    setLogDel(v)
    setFieldsValue({
      cmpy_auto_reconc: v,
    });
  }

  const onLoadTol = v => {
    setLoadTol(v)
    setFieldsValue({
      cmpy_must_sealno: v,
    });
  }

  const onAutoLoad = v => {
    setAutoLoad(v)
    setFieldsValue({
      cmpy_tkr_activat: v,
    });
  }

  const onBlendTol = v => {
    setBlendTol(v)
    setFieldsValue({
      cmpy_req_pin_flag: v,
    });
  }

  const onOrdCarrier = v => {
    setOrdCarrier(v)
    setFieldsValue({
      cmpy_wipe_ordets: v,
    });
  }

  const onWghComplete = v => {
    setWghComplete(v)
    setFieldsValue({
      cmpy_enable_expd: v,
    });
  }

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
        cmpy_auto_reconc: value.cmpy_auto_reconc,
        cmpy_must_sealno: value.cmpy_must_sealno,
        cmpy_tkr_activat: value.cmpy_tkr_activat,
        cmpy_req_pin_flag: value.cmpy_req_pin_flag,
        cmpy_wipe_ordets: value.cmpy_wipe_ordets,
        cmpy_enable_expd: value.cmpy_enable_expd,
        cmpy_schd_rev_repost: value.cmpy_schd_rev_repost,
        cmpy_movements_rev: value.cmpy_movements_rev,
        cmpy_report_receivers: value.cmpy_report_receivers,
      })
  
      setReconc(value.cmpy_bay_loop_ch)
      setFlag2(value.cmpy_mod_drawer)
      setLogDel(value.cmpy_auto_reconc)
      setLoadTol(value.cmpy_must_sealno)
      setAutoLoad(value.cmpy_tkr_activat)
      setBlendTol(value.cmpy_req_pin_flag)
      setOrdCarrier(value.cmpy_wipe_ordets)
      setWghComplete(value.cmpy_enable_expd)
    }
  }, [value, setFieldsValue, payload]);

  const leftItemLayout = {
    labelCol: { span: 18 },
    labelAlign: "left",
    // marginRight: 10
    // wrapperCol: { span: 16 },
  };

  const rightItemLayout = {
    labelCol: { span: 20 },
    labelAlign: "left",
    // marginLeft: 10,
    // wrapperCol: { span: 16 },
  };

  const singleLineLayout = {
    labelCol: { span: 9 },
    labelAlign: "left",
    // wrapperCol: { span: 16 },
  };

  return (
    <div>    
      <Divider orientation="left">{t('fields.autoOrderNumbers')}</Divider>
      <Row justify="center" gutter="8">
        <Col span={7}>
          <Form.Item name="cmpy_ord_strt" label={t('fields.startAt')} rules={[{ required: true }]}>
            <InputNumber min={1} max={999999999} style={{width:'11vh'}}/>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item name="cmpy_ord_end" label={t('fields.endAt')} rules={[{ required: true }]}>
            <InputNumber min={1} max={999999999} style={{width:'11vh'}}/>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item name="cmpy_ord_last" label={t('fields.lastUsed')} rules={[{ required: true }]}>
            <InputNumber min={1} max={999999999} style={{width:'11vh'}}/>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left"></Divider>
      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_vet" label={t('fields.vetFlag')} {...leftItemLayout} >
            <Select
              style={{width:"14vh"}}
              // onChange={handleVetChange}
            >
              <Select.Option key={-1} value="-1">Vet None</Select.Option>
              <Select.Option key={0} value="0">Vet Carrier</Select.Option>
              <Select.Option key={1} value="1">Vet Prime Mover</Select.Option>
              <Select.Option key={2} value="2">Vet Trailer</Select.Option>
              <Select.Option key={3} value="3">Vet All</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_bay_loop_ch" label={t('fields.equipMustInArea')} {...rightItemLayout} >
            <Switch checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_bay_loop_ch} 
              onChange={onAutoReconcChange}/>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_rtn_prompt" label={t('fields.returnLocationCarrier')} {...leftItemLayout} >
            <Select
              style={{width:"14vh"}}
            >
              <Select.Option key={0} value="0">{t('fields.bayOnly')}</Select.Option>
              <Select.Option key={1} value="1">{t('fields.gateAndBay')}</Select.Option>
              <Select.Option key={2} value="2">{t('fields.gateAndDevice')}</Select.Option>
              <Select.Option key={3} value="3">{t('fields.gateOnly')}</Select.Option>
              <Select.Option key={4} value="4">{t('fields.deviceOnly')}</Select.Option>
              <Select.Option key={5} value="5">{t('fields.bayOrDevice')}</Select.Option>
              <Select.Option key={6} value="6">{t('fields.hostOnly')}</Select.Option>
              <Select.Option key={7} value="7">{t('fields.none')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_mod_drawer" label={t('fields.drawerChangeForNew')} {...rightItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_mod_drawer} 
              onChange={onFlag2}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_auto_reconc" label={t('fields.autoConfigTanker')} {...leftItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_auto_reconc} 
              onChange={onLogDel}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_must_sealno" label={t('fields.mustHaveSeal')} {...rightItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_must_sealno} 
              onChange={onLoadTol}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_tkr_activat" label={t('fields.activateTanker')} {...leftItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_tkr_activat} 
              onChange={onAutoLoad}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_req_pin_flag" label={t('fields.mustHavePin')} {...rightItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_req_pin_flag}
              onChange={onBlendTol}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center" gutter="8">
        <Col span={12}>
          <Form.Item name="cmpy_wipe_ordets" label={t('fields.hostUpdateOrder')} {...leftItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_wipe_ordets} 
              onChange={onOrdCarrier}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cmpy_enable_expd" label={t('fields.enableExpiryCheck')} {...rightItemLayout} >
            <Switch 
              checkedChildren={t('operations.yes')} 
              unCheckedChildren={t('operations.no')} 
              checked={cmpy_enable_expd} 
              onChange={onWghComplete}
            />
          </Form.Item>
        </Col>
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
    </div>
  );
};

export default OtherForm;