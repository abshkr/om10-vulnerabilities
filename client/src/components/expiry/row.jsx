import React from 'react';
import { Form } from 'antd';
import Context from './context';

const EditableRow = ({ form, index, ...props }) => (
  <Context.Provider value={form}>
    <tr {...props} />
  </Context.Provider>
);

const Row = Form.create()(EditableRow);

export default Row;
