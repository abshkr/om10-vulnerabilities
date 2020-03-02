import React from 'react';
import { Form } from 'antd';
import Context from './context';

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Context.Provider value={form}>
      <tr {...props} />
    </Context.Provider>
  );
};

export default EditableRow;
