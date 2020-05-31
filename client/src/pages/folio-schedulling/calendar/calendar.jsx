import React, { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Checkbox, notification, Calendar } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { mutate } from 'swr';
import './calendar.css';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import { FOLIO_SCHEDULING } from '../../../api';


const FolioCalendar = ({ value }) => {
  console.log("Start")
  const { t } = useTranslation();
  // const { value: payload, isValidating } = useSWR(FOLIO_SCHEDULING.READ);
  // const { value: roles, isValidating: isRolesLoading } = useSWR(GATE_PERMISSION.ROLE_TYPES);
  // const { value: cases, isValidating: isCasesLoading } = useSWR(GATE_PERMISSION.RULE_CASES);
  // const { value: types, isValidating: isTypesLoading } = useSWR(GATE_PERMISSION.EQUIPMENT_TYPES);
  // const { value: next, isValidating: isNextLoading } = useSWR(GATE_PERMISSION.NEXT_PRM_ID);


  // const [value, setData] = useState(value?value:[]);
  console.log(value)
  console.log("Check Data")
  // console.log(value)
  let curDate = null;
  // let checkStatus = false;
  
  // const { setFieldsValue } = form;

  const onComplete = () => {
    console.log("onComplete")
    mutate(FOLIO_SCHEDULING.READ)
    // const { value: payload } = useSWR(FOLIO_SCHEDULING.READ);
    // setData(payload?.records);
  }

  // useEffect(() => {
  //   console.log("useEffect")
  //   // setData(value)
  // }, [value]);
  
  const handleSave = (row) => {
    // const payload = [...value];
    // const toUpdate = payload.find(x => x.rule_id === row.rule_id);

    // Object.assign(toUpdate, row);
    
    // setData(payload);

    // setFieldsValue({
    //   rules: payload,
    // });
  };

  const override_exist = (d) => {
    const overrides = _.filter(value, function(item) {
      return item.window_name === 'OVERRIDE'})
    for (let i = 0; i < overrides.length; i++) {
      if (curDate === overrides[i].repeat_interval) {
        return true;
      }
    }

    return false;
  }

  const onChange = (v) => {
    const overrideExists = override_exist(curDate);
    const ADD_OVERRIDE = v.target.checked && !overrideExists
    const ADD_EXCEPTION = !v.target.checked && !overrideExists
    const DELETE_OVERRIDE = !v.target.checked && overrideExists
    const values = (ADD_OVERRIDE || DELETE_OVERRIDE) ? {
      repeat_interval: curDate
    } : {
      window_name: "ONCE_WINDOW",
      description: "Set From Calendar",
      repeat_interval: curDate,
      status: 1
    }

    Modal.confirm({
      title: ADD_OVERRIDE ? t('prompts.createOverride') : 
        (ADD_EXCEPTION? t('prompts.createOnceOffDate') :t('prompts.deleteOverride')),
      okText: t('operations.create') ,
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(ADD_OVERRIDE ? FOLIO_SCHEDULING.CREATE_OVERRIDE : 
            (ADD_EXCEPTION ? FOLIO_SCHEDULING.CREATE : FOLIO_SCHEDULING.DELETE_OVERRIDE), values)
          .then(() => {
            onComplete()
            notification.success({
              message: t('messages.createSuccess'),
              description: t('descriptions.createSuccess'),
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
  }

  const checkDate = (v) => {
    //Override overrides exceptions
    const overrides = _.filter(value, function(item) {
      return item.window_name === 'OVERRIDE'})
    for (let i = 0; i < overrides.length; i++) {
      if (v.format("D_M_YYYY") === overrides[i].repeat_interval) {
        return true;
      }
    }

    const exceptions = _.filter(value, function(item) {
      return item.window_name != 'OVERRIDE'})
    for (let i = 0; i < exceptions.length; i++) {
      if (exceptions[i].window_name === "MONTH_WINDOW") {
        if (v.format("D") === exceptions[i].repeat_interval) {
          return false;
        }
      } 

      if (exceptions[i].window_name === "WEEK_WINDOW") {
        if (v.format("dddd") === exceptions[i].repeat_interval) {
          return false;
        }
      } 

      if (exceptions[i].window_name === "DATE_YEAR_WINDOW") {
        if (v.format("D_M") === exceptions[i].repeat_interval) {
          return false;
        }
      }

      if (exceptions[i].window_name === "YEAR_WINDOW") {
        let interval = exceptions[i].repeat_interval.split("_");
        if (v.format('dddd') !== interval[1]) {
          continue;
        } else if (v.format('M') != interval[2]) {
          continue;
        }
        
        for (let j = 1; j <= 5; j ++) {
          const cloneMoment = v.clone();
          if (cloneMoment.subtract(7 * j, 'days').format('M') != v.format('M') 
            && interval[0] === j) {
              return false;
          }
        }
      }

      if (exceptions[i].window_name === "ONCE_WINDOW") {
        if (v.format("D_M_YYYY") === exceptions[i].repeat_interval) {
          return false;
        }
      }
    }

    return true;
  }
 
  const dateCellRender = (v) => {
    // console.log("dateCellRender")
    // console.log(value.format("YYYY-MM-DD"))
    const isPast = v.diff(moment()) < 0;
    const isChecked = checkDate(v);
    return (
      <div className={isPast? "past":"future"}>
      <Checkbox checked={isChecked} onChange={onChange} disabled={isPast}>
      </Checkbox>
      </div>
    )
  }

  const monthCellRender = (v) => {
    console.log("monthCellRender")
    console.log(v)
    // console.log(mode)
    // setData([]);
  }

  const onSelect = (v) => {
    curDate = v.format("D_M_YYYY")
  }

  return (
    <Calendar 
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      monthCellRender={monthCellRender}
      // onPanelChange={onPanelChange}
    >
    </Calendar>
  );
};

export default FolioCalendar;
