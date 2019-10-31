import React from "react";
import EditableContext from "./editableContext";
import { Form } from "antd";

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const Row = Form.create()(EditableRow);

export default Row;
