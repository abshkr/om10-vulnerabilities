import React from 'react';
import { Form } from 'antd';
import Context from './context';

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <Context.Provider value={form}>
        <tr {...props} />
      </Context.Provider>
    </Form>
  );
};

export default EditableRow;
