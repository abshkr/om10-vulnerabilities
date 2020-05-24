import React, { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Checkbox, notification, Calendar } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import './calendar.css';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import { FOLIO_SCHEDULING } from '../../../api';


const FolioCalendar = ({ form, value }) => {
  console.log("Start")
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(FOLIO_SCHEDULING.READ);
  // const { data: roles, isValidating: isRolesLoading } = useSWR(GATE_PERMISSION.ROLE_TYPES);
  // const { data: cases, isValidating: isCasesLoading } = useSWR(GATE_PERMISSION.RULE_CASES);
  // const { data: types, isValidating: isTypesLoading } = useSWR(GATE_PERMISSION.EQUIPMENT_TYPES);
  // const { data: next, isValidating: isNextLoading } = useSWR(GATE_PERMISSION.NEXT_PRM_ID);


  const [data, setData] = useState(payload?.records);
  console.log("Check Data")
  console.log(data)
  let curDate = null;
  let checkStatus = false;
  
  // const { setFieldsValue } = form;

  const onComplete = () => {
    setData([])
  }

  useEffect(() => {
    console.log("useEffect")
  }, [data]);
  
  const handleSave = (row) => {
    // const payload = [...data];
    // const toUpdate = payload.find(x => x.rule_id === row.rule_id);

    // Object.assign(toUpdate, row);
    
    // setData(payload);

    // setFieldsValue({
    //   rules: payload,
    // });
  };

  const onChange = (value) => {
    console.log("onChange")
    console.log(value.target.checked)
    checkStatus = value.target.checked;
    console.log(curDate)
    const values = {
      repeat_interval: curDate
    }
    axios.post(FOLIO_SCHEDULING.CREATE_OVERRIDE, values)
    .then(() => {
      onComplete();

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
    
    // Modal.confirm({
    //   title: t('prompts.create'),
    //   okText: t('operations.createOverride') ,
    //   okType: 'primary',
    //   icon: <QuestionCircleOutlined />,
    //   cancelText: t('operations.no'),
    //   centered: true,
    //   onOk: async () => {
    //     await axios
    //       .post(FOLIO_SCHEDULING.CREATE_OVERRIDE)
    //       .then(() => {
    //         // onComplete();

    //         notification.success({
    //           message: t('messages.createSuccess'),
    //           description: t('descriptions.createSuccess'),
    //         });
    //       })
    //       .catch((errors) => {
    //         _.forEach(errors.response.data.errors, (error) => {
    //           notification.error({
    //             message: error.type,
    //             description: error.message,
    //           });
    //         });
    //       });
    //   },
    // });
  }

  const checkDate = (value) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].window_name === "MONTH_WINDOW") {
        if (value.format("D") === data[i].repeat_interval) {
          return false;
        }
      } 

      if (data[i].window_name === "WEEK_WINDOW") {
        if (value.format("dddd") === data[i].repeat_interval) {
          return false;
        }
      } 

      if (data[i].window_name === "DATE_YEAR_WINDOW") {
        if (value.format("D_M") === data[i].repeat_interval) {
          return false;
        }
      }

      if (data[i].window_name === "YEAR_WINDOW") {
        let interval = data[i].repeat_interval.split("_");
        if (value.format('dddd') != interval[1]) {
          continue;
        } else if (value.format('M') != interval[2]) {
          continue;
        }
        
        for (let j = 1; j <= 5; j ++) {
          const cloneMoment = value.clone();
          if (cloneMoment.subtract(7 * j, 'days').format('M') != value.format('M') 
            && interval[0] == j) {
              return false;
          }
        }
      }

      if (data[i].window_name === "ONCE_WINDOW") {
        if (value.format("D_M_YYYY") === data[i].repeat_interval) {
          return false;
        }
      }
    }

    return true;
  }
 
  const dateCellRender = (value) => {
    const isPast = value.diff(moment()) < 0;
    const isChecked = checkDate(value);
    return (
      <div className={isPast? "past":"future"}>
      <Checkbox checked={isChecked} onChange={onChange} disabled={isPast}>
      </Checkbox>
      </div>
    )
  }

  const monthCellRender = (value) => {
    console.log("monthCellRender")
    console.log(value)
    // console.log(mode)
    // setData([]);
  }

  const onPanelChange = (value) => {
    console.log("onPanelChange")
    console.log(value)
    // console.log(mode)
    // setData([]);
  }

  const onAdd = () => {
    // let prmssn_k;
    // if (!value) {
    //   prmssn_k = next.records[0].next_prm_id;
    // } else {
    //   prmssn_k = value.prmssn_k
    // }
    
    // const payload = {
    //   rule_id: data.length == 0? prmssn_k : prmssn_k * 1000 + data.length + 1,
    //   rule_case: '',
    //   rule_casename: '',
    //   rule_etyp: '',
    //   rule_etypname: '',
    //   rule_auth: '',
    //   rule_authname: '',
    //   rule_first: data.length === 0,
    //   rule_parent: prmssn_k,
    //   rule_expiry_check: false,
    //   is_new: true,
    // };

    // setData([...data, payload]);
    // setFieldsValue({
    //   rules: [...data, payload],
    // });
  };

  const onSelect = (value) => {
    console.log(value)
    console.log(value.format("D/M/YYYY"));
    // setData({
    //   curDate: value.format("D/M/YYYY")
    // })
    curDate = value.format("D/M/YYYY")
  }

  const handleDelete = (key) => {
    // const payload = [...data];
    // const source = payload.filter((item) => item.rule_id !== key);

    // setFieldsValue({
    //   rules: source,
    // });

    // setData(source);
  };

  return (
    <Calendar 
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      monthCellRender={monthCellRender}
      onPanelChange={onPanelChange}
    >
    </Calendar>
  );
};

export default FolioCalendar;
