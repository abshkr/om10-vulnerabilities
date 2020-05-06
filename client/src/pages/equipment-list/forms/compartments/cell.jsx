import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Checkbox, InputNumber, message } from 'antd';
import _ from 'lodash';

import Context from './context';

const Cell = ({ title, editable, children, dataIndex, record, handleSave, data, ...restProps }) => {
  const form = useContext(Context);
  const inputRef = useRef();

  const [editing, setEditing] = useState(false);

  const { setFieldsValue } = form;

  const onEdit = () => {
    setEditing(!editing);
  };

  const save = async (e) => {
    let values = await form.validateFields();

    const max = values?.sfl ? values?.sfl : record?.sfl;

    if (values?.safefill) {
      if (_.toNumber(values?.safefill) <= max) {
        onEdit();

        handleSave({ ...record, ...values });
      } else {
        onEdit();
        message.error('Safefill Cannot be higher than capacity');
      }
    } else {
      onEdit();

      handleSave({ ...record, ...values });
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (record) {
      setFieldsValue({
        adj_cmpt_lock: record.adj_cmpt_lock,
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
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: '100%' }} />
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
