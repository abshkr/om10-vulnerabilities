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

  const onChange = (v) => {
    console.log("onChange")
    console.log(v.target.checked)
    const IS_OVERRIDE = v.target.checked;
    console.log(IS_OVERRIDE)
    console.log(curDate)
    const values = IS_OVERRIDE ? {
      repeat_interval: curDate
    } : {
      window_name: "ONCE_WINDOW",
      description: "Set From Calendar",
      repeat_interval: curDate,
      status: 1
    }

    // axios.post(FOLIO_SCHEDULING.CREATE_OVERRIDE, values)
    // .then(() => {
    //   onComplete();

    //   notification.success({
    //     message: t('messages.createSuccess'),
    //     description: t('descriptions.createSuccess'),
    //   });
    // })
    // .catch((errors) => {
    //   _.forEach(errors.response.value.errors, (error) => {
    //     notification.error({
    //       message: error.type,
    //       description: error.message,
    //     });
    //   });
    // });

    
    Modal.confirm({
      title: IS_OVERRIDE ? t('prompts.createOverride') : t('prompts.createOnceOffDate'),
      okText: t('operations.create') ,
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_OVERRIDE ? FOLIO_SCHEDULING.CREATE_OVERRIDE : FOLIO_SCHEDULING.CREATE, values)
          .then(() => {
            onComplete()
            notification.success({
              message: t('messages.createSuccess'),
              description: t('descriptions.createSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.value.errors, (error) => {
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
    for (let i = 0; i < value.length; i++) {
      if (value[i].window_name === "MONTH_WINDOW") {
        if (v.format("D") === value[i].repeat_interval) {
          return false;
        }
      } 

      if (value[i].window_name === "WEEK_WINDOW") {
        if (v.format("dddd") === value[i].repeat_interval) {
          return false;
        }
      } 

      if (value[i].window_name === "DATE_YEAR_WINDOW") {
        if (v.format("D_M") === value[i].repeat_interval) {
          return false;
        }
      }

      if (value[i].window_name === "YEAR_WINDOW") {
        let interval = value[i].repeat_interval.split("_");
        if (v.format('dddd') != interval[1]) {
          continue;
        } else if (v.format('M') != interval[2]) {
          continue;
        }
        
        for (let j = 1; j <= 5; j ++) {
          const cloneMoment = v.clone();
          if (cloneMoment.subtract(7 * j, 'days').format('M') != v.format('M') 
            && interval[0] == j) {
              return false;
          }
        }
      }

      if (value[i].window_name === "ONCE_WINDOW") {
        if (v.format("D_M_YYYY") === value[i].repeat_interval) {
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
