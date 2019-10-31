import React from "react";
import { Form } from "antd";
import EditableContext from "./editableContext";

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const Row = Form.create()(EditableRow);

export default Row;
