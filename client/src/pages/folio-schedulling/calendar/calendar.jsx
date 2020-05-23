import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Checkbox, Form, Calendar } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

// import { GATE_PERMISSION } from '../../../../api';


const FolioCalendar = ({ form, value }) => {
  const { t } = useTranslation();
  // const { data: roles, isValidating: isRolesLoading } = useSWR(GATE_PERMISSION.ROLE_TYPES);
  // const { data: cases, isValidating: isCasesLoading } = useSWR(GATE_PERMISSION.RULE_CASES);
  // const { data: types, isValidating: isTypesLoading } = useSWR(GATE_PERMISSION.EQUIPMENT_TYPES);
  // const { data: next, isValidating: isNextLoading } = useSWR(GATE_PERMISSION.NEXT_PRM_ID);
  
  const IS_LOADING = false


  const [data, setData] = useState(value ? value.rules : []);
  
  // const { setFieldsValue } = form;
  
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
  }

  const dateCellRender = (value) => {
    return (
      <div>
      <Checkbox onChange={onChange} >
        ------
      </Checkbox>
      </div>
    );
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
      // onSelect={onClick}
    >
    </Calendar>
  );
};

export default FolioCalendar;
