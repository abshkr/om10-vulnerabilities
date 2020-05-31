import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Select, InputNumber, Input, Divider, Row, Col, Switch } from 'antd';
import { DataTable } from '../../../components';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import columns from './columns';
import _ from 'lodash';

import { COMPANIES } from '../../../api';

const TemplateForm = ({ value, form }) => {
  const { data: payload, isValidating } = useSWR(`${COMPANIES.TEMPLATES}?cmpy_code=${value?.cmpy_code}`);
  console.log(payload?.records);

  const { t } = useTranslation();
  const fields = columns(t);
  const { TextArea } = Input;
  const { resetFields, setFieldsValue, getFieldDecorator } = form;
  // const [ pitem_bltol_flag, setFlag ] = useState(value?.pitem_bltol_flag)

  
  const [ cmpy_bol_vp_name, setReconc ] = useState(value?.cmpy_bol_vp_name)
  const [ cmpy_vet, setHostDocs ] = useState(value?.cmpy_vet)
  const [ cmpy_rtn_prompt, setComms ] = useState(value?.cmpy_rtn_prompt)
  const [ cmpy_mod_drawer, setFlag2 ] = useState(value?.cmpy_mod_drawer)
  const [ cmpy_auto_reconc, setLogDel ] = useState(value?.cmpy_auto_reconc)
  const [ cmpy_must_sealno, setLoadTol ] = useState(value?.cmpy_must_sealno)
  const [ cmpy_tkr_activat, setAutoLoad ] = useState(value?.cmpy_tkr_activat)
  const [ cmpy_req_pin_flag, setBlendTol ] = useState(value?.cmpy_req_pin_flag)
  const [ cmpy_wipe_ordets, setOrdCarrier ] = useState(value?.cmpy_wipe_ordets)
  const [ cmpy_enable_expd, setWghComplete ] = useState(value?.cmpy_enable_expd)
  const [ cmpy_schd_rev_repost, setReverseRepost ] = useState(value?.cmpy_schd_rev_repost)
  const [ cmpy_movements_rev, setMovementRev ] = useState(value?.cmpy_movements_rev)
  const [ cmpy_report_receivers, setArchive ] = useState(value?.cmpy_report_receivers)
  const [auto_complete_non_preschd_loads, setAutoNonSchedule] = useState(false)
  const [safefill_tolerance_check, setSafefillCheck] = useState(false)
  const [validate_schedule_max_weight, setValidateScheduleWeight] = useState(false)
  const [auth_at_gate, setAuthAtGate] = useState(false)
  const [validate_schedule_availabitilty, setValidateSchd] = useState(false)
  const [weightTolerance, setWeightTol] = useState(0)
  
  // const [ auto_complete_non_preschd_loads, setAutoNonSchedule ] = useState(cmpy_configs?_.find(cmpy_configs, (item) => {
  //     item.config_key === "AUTO_COMPLETE_NON_PRESCHD_LOADS"
  //   }).config_value === : null)
  // const [ auto_complete_non_preschd_loads, setAutoNonSchedule ] = 
  //   useState(autoNonSchduleConfig && autoNonSchduleConfig.config_value === "Y" ? true:false)

  const IS_CREATING = !value;
  
  const onAutoReconcChange = v => {
    setReconc(v)
    setFieldsValue({
      cmpy_bol_vp_name: v,
    });
  }

  const onHostDocChange = v => {
    setHostDocs(v)
    setFieldsValue({
      cmpy_vet: v,
    });
  }

  const onComms = v => {
    setHostDocs(v)
    setFieldsValue({
      cmpy_rtn_prompt: v,
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
  const onAuthAtGate = v => {
    setAuthAtGate(v)
    setFieldsValue({
      auth_at_gate: v,
    });
  }
  
  const onAutoNonPreschedule = v => {
    setAutoNonSchedule(v)
    setFieldsValue({
      auto_complete_non_preschd_loads: v,
    });
  }

  const onSafefillCheck = v => {
    setSafefillCheck(v)
    setFieldsValue({
      safefill_tolerance_check: v,
    });
  }

  const onReverseRepost = v => {
    setReverseRepost(v)
    setFieldsValue({
      cmpy_schd_rev_repost: v,
    });
  }

  const onValidateScheduleWeight = v => {
    setValidateScheduleWeight(v)
    setFieldsValue({
      validate_schedule_max_weight: v,
    });
  }

  const onMovementRev = v => {
    setMovementRev(v)
    setFieldsValue({
      cmpy_movements_rev: v,
    });
  }

  const onArchive = v => {
    setArchive(v)
    setFieldsValue({
      cmpy_report_receivers: v,
    });
  }

  const onValidateSchd = v => {
    setValidateSchd(v)
    setFieldsValue({
      validate_schedule_availabitilty: v,
    });
  }

  useEffect(() => {
    console.log("useEffect")
    console.log(value.cmpy_rtn_prompt)
    if (value) {
      setFieldsValue({
        cmpy_ord_strt: value.cmpy_ord_strt,
        cmpy_ord_last: value.cmpy_ord_last,
        cmpy_ord_end: value.cmpy_ord_end,
        cmpy_vet: value.cmpy_vet,
        cmpy_bol_vp_name: value.cmpy_bol_vp_name,
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
  
      setReconc(value.cmpy_bol_vp_name)
      setHostDocs(value.cmpy_vet)
      setComms(value.cmpy_rtn_prompt)
      setFlag2(value.cmpy_mod_drawer)
      setLogDel(value.cmpy_auto_reconc)
      setLoadTol(value.cmpy_must_sealno)
      setAutoLoad(value.cmpy_tkr_activat)
      setBlendTol(value.cmpy_req_pin_flag)
      setOrdCarrier(value.cmpy_wipe_ordets)
      setWghComplete(value.cmpy_enable_expd)
      setReverseRepost(value.cmpy_schd_rev_repost)
      setMovementRev(value.cmpy_movements_rev)
      setArchive(value.cmpy_report_receivers)
    }
  }, [value, setFieldsValue, payload]);

  const validate = (rule, input) => {
    // if (input === '' || !input) {
    //   return Promise.reject(`${t('fields.loadToleranceCheck')}`);
    // }

    return Promise.resolve();
  };

  const onCheck = v => {
    // setFlag(v.target.checked)
    setFieldsValue({
      pitem_bltol_flag: v.target.checked,
    });
  }

  const onFinish = values => {
    // values.pitem_base_name = _.filter(baseProducts, (item) => {
    //   return item.base_code === values.pitem_base_code;
    // })[0].base_name
    // values.to_create = true
    // handleBaseCallBack(values)
    // Modal.destroyAll();
  };

  const onDelete = values => {
    values.to_delete = true
    // handleBaseCallBack(values)
    Modal.destroyAll();
  };

  const swithLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };

  const singleLineLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };

  return (
    <DataTable 
      height="70vh"
      columns={fields} 
      data={payload?.records} 
      isLoading={isValidating} 
      // onClick={(payload) => handleFormState(true, payload)}
      // handleSelect={(payload) => handleFormState(true, payload[0])}
    />
  );
};

export default TemplateForm;
