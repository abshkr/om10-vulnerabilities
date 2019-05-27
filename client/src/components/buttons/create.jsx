import React from "react";
import { Button } from "antd";

const CreateButton = ({ action, type, style }) => {
  return <Button shape="round" type="primary" onClick={action} style={style}>{`Create ${type}`}</Button>;
};

export default CreateButton;
