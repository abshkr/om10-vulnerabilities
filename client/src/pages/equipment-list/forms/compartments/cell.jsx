import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Select, Input } from 'antd';

import Context from './context';

const { Option } = Select;

const Cell = ({ title, editable, children, dataIndex, record, handleSave, data, ...restProps }) => {
  const form = useContext(Context);
  const inputRef = useRef();

  const [editing, setEditing] = useState(false);

  const onEdit = () => {
    setEditing(!editing);
  };

  const save = async e => {
    let values = await form.validateFields();

    values = values.sfl === undefined ? 0 : values.sfl;
    values = values.safefill === undefined ? 0 : values.safefill;

    onEdit();

    handleSave({ ...record, ...values });
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  let childNode = children;

  if (editable) {
    if (dataIndex === 'adj_cmpt_lock') {
      childNode = editing ? (
        <Form.Item name="adj_cmpt_lock" style={{ margin: 0 }}>
          <Select ref={inputRef} onChange={save} onPressEnter={save} onBlur={save}>
            <Option key={0} value={true}>
              Locked
            </Option>
            <Option key={1} value={false}>
              Unlocked
            </Option>
          </Select>
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={onEdit}>
          {children}
        </div>
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
