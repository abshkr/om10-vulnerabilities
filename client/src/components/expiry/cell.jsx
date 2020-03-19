import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Select, DatePicker, Checkbox } from 'antd';
import _ from 'lodash';

import Context from './context';

const Cell = ({ title, editable, children, dataIndex, record, handleSave, data, expiry, ...restProps }) => {
  const form = useContext(Context);
  const inputRef = useRef();

  const [editing, setEditing] = useState(false);

  const { setFieldsValue } = form;

  const onEdit = () => {
    setEditing(!editing);
  };

  const save = async e => {
    const values = await form.validateFields();

    if (dataIndex === 'ed_exp_date') {
      values.ed_exp_date = values?.ed_exp_date?.format('YYYY-MM-DD 00:00:00');
    }

    if (!values?.ed_status) {
      values.ed_status = false;
    }

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
        ed_status: record.ed_status
      });
    }
  }, [record, setFieldsValue]);

  const unique = _.uniq(_.map(data, 'edt_type_desc'));

  let childNode = children;

  if (editable) {
    if (dataIndex === 'edt_type_desc') {
      childNode = editing ? (
        <Form.Item name="edt_type_desc" style={{ margin: 0 }}>
          <Select loading={expiry.length === 0} ref={inputRef} onChange={save}>
            {expiry?.map((item, index) => (
              <Select.Option
                key={index}
                value={item.edt_type_desc}
                disabled={unique.includes(item.edt_type_desc)}
              >
                {item.edt_type_desc}
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

    if (dataIndex === 'ed_status') {
      childNode = (
        <Form.Item name="ed_status" style={{ margin: 0 }} valuePropName="checked">
          <Checkbox ref={inputRef} onChange={save} />
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
