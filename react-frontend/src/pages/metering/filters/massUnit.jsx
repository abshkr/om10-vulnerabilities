import React from "react";
import { Select } from "antd";

const Option = Select.Option;

const MassUnit = ({ change }) => {
  return (
    <Select defaultValue="kg" style={{ width: 180 }} onChange={change}>
      <Option value="kg">Kg</Option>
      <Option value="lb">Pound</Option>
      <Option value="IMP">Imperial Ton</Option>
      <Option value="ton">Ton</Option>
    </Select>
  );
};

export default MassUnit;
