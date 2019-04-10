import React from "react";
import { Button } from "antd";

const CreateButton = ({ action, type, style }) => {
  return <Button type="primary" onClick={action} style={style}>{`Create ${type}`}</Button>;
};

export default CreateButton;
