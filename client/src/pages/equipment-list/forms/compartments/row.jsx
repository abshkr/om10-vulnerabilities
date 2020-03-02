import React from 'react';
import EditableContext from './editableContext';
import { Form } from 'antd';

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
};

export default EditableRow;
