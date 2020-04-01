import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Checkbox, Input } from 'antd';

import Context from './context';

const Cell = ({ title, editable, children, dataIndex, record, handleSave, data, ...restProps }) => {
  const form = useContext(Context);
  const inputRef = useRef();

  const [editing, setEditing] = useState(false);

  const { setFieldsValue } = form;

  const onEdit = () => {
    setEditing(!editing);
  };

  const save = async e => {
    let values = await form.validateFields();

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
        adj_cmpt_lock: record.adj_cmpt_lock
      });
    }
  }, [record, setFieldsValue]);

  let childNode = children;

  if (editable) {
    if (dataIndex === 'adj_cmpt_lock') {
      childNode = (
        <Form.Item name="adj_cmpt_lock" style={{ margin: 0 }} valuePropName="checked">
          <Checkbox ref={inputRef} onChange={save} />
        </Form.Item>
      );
    } else {
      childNode = editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
