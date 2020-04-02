import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Select, DatePicker, Checkbox } from 'antd';
import _ from 'lodash';

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

  const save = async e => {
    const values = await form.validateFields();

    onEdit();

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
        rule_auth: record.rule_auth
      });
    }
  }, [record, setFieldsValue]);

  let childNode = children;

  if (editable) {
    if (dataIndex === 'rule_casename') {
      childNode = editing ? (
        <Form.Item name="rule_case" style={{ margin: 0 }}>
          <Select ref={inputRef} onChange={save}>
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
      childNode = editing ? (
        <Form.Item name="rule_etypname" style={{ margin: 0 }}>
          <Select ref={inputRef} onChange={save}>
            {types?.records?.map((item, index) => (
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

    if (dataIndex === 'rule_authname') {
      childNode = editing ? (
        <Form.Item name="rule_auth" style={{ margin: 0 }}>
          <Select ref={inputRef} onChange={save}>
            {roles?.records?.map((item, index) => (
              <Select.Option key={index} value={item.role_id}>
                {item.auth_level_name}
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
              required: true
            }
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
