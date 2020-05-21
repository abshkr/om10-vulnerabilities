import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Select, DatePicker, Checkbox, Input } from 'antd';

import Context from './context';

const Cell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  data,
  roles,
  cases,
  types,
  ...restProps
}) => {
  const form = useContext(Context);
  const inputRef = useRef();

  const [editing, setEditing] = useState(false);

  const { setFieldsValue } = form;

  const onEdit = () => {
    setEditing(!editing);
  };

  const save = async (e) => {
    const values = await form.validateFields();
    if (values.hasOwnProperty("rule_case")) {
      values.rule_casename = cases.records.find(x => x.case_code === values.rule_case).case_name
      if (values.rule_case === "PRM_PRSSNL") {
        values.rule_etyp = "";
        values.rule_etypname = "";
      } else {
        values.rule_auth = "";
        values.rule_authname = "";
      }
    } else if (values.hasOwnProperty("rule_auth")) {
      values.rule_authname = roles.records.find(x => x.role_id === values.rule_auth).auth_level_name
    } else if (values.hasOwnProperty("rule_etyp")) {
      values.rule_etypname = types.records.find(x => x.etyp_id === values.rule_etyp).etyp_title
    }

    // onEdit();
    setEditing(false)

    handleSave({ ...record, ...values });
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (record) {
      setFieldsValue({
        rule_case: record.rule_case,
        rule_expiry_check: record.rule_expiry_check,
        rule_first: record.rule_first,
        rule_auth: record.rule_auth,
        rule_etyp: record.rule_etyp,
        rule_id: record.rule_id
      });
    }
  }, [record, setFieldsValue]);

  let childNode = children;

  if (editable) {
    if (dataIndex === 'rule_casename') {
      childNode = editing ? (
        <Form.Item name="rule_case" style={{ margin: 0 }}>
          <Select ref={inputRef} onChange={save} >
            {cases?.records?.map((item, index) => (
              <Select.Option key={index} value={item.case_code}>
                {item.case_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={onEdit}>
          {children}
        </div>
      );
    }

    if (dataIndex === 'rule_etypname') {
      childNode = record.rule_case ==="PRM_EQPT" && editing ? (
        <Form.Item name="rule_etyp" style={{ margin: 0 }} >
          <Select ref={inputRef} onChange={save} >
            {types?.records?.map((item, index) => (
              <Select.Option key={index} value={item.etyp_id}>
                {item.etyp_title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <div className={record.rule_case ==="PRM_PRSSNL" ? "" : "editable-cell-value-wrap"} 
          style={{ paddingRight: 24 }} 
          onClick={onEdit}>
          {children}
        </div>
      );
    }

    if (dataIndex === 'rule_authname') {
      childNode = record.rule_case ==="PRM_PRSSNL" && editing ? (
        <Form.Item name="rule_auth" style={{ margin: 0 }} >
          <Select ref={inputRef} onChange={save}>
            {roles?.records?.map((item, index) => (
              <Select.Option key={index} value={item.role_id}>
                {item.auth_level_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <div className={record.rule_case ==="PRM_EQPT" ? "" : "editable-cell-value-wrap"} 
          style={{ paddingRight: 24 }} 
          onClick={onEdit}>
          {children}
        </div>
      );
    }
    if (dataIndex === 'rule_first' || dataIndex === 'rule_expiry_check') {
      childNode = (
        <Form.Item name={dataIndex} style={{ margin: 0 }} valuePropName="checked">
          <Checkbox ref={inputRef} onChange={save} disabled={dataIndex === 'rule_first'} />
        </Form.Item>
      );
    }
    
    if (dataIndex === 'ed_exp_date') {
      childNode = editing ? (
        <Form.Item
          name="ed_exp_date"
          style={{ margin: 0 }}
          rules={[
            {
              type: 'object',
              required: true,
            },
          ]}
        >
          <DatePicker ref={inputRef} onChange={save} format="DD/MM/YYYY" />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={onEdit}>
          {children}
        </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

export default Cell;
