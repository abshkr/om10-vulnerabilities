import React from "react";
import { Select } from "antd";

const Option = Select.Option;

const VolumeUnit = ({ change }) => {
  return (
    <Select defaultValue="IMP.GAL" style={{ width: 180 }} onChange={change}>
      <Option value="IMP.GAL">Imperial Gallon</Option>
      <Option value="CUBIC">Cubic Metre</Option>
      <Option value="LITRE">Litre</Option>
      <Option value="US.GAL">US Gallon</Option>
      <Option value="KG">Kg</Option>
    </Select>
  );
};

export default VolumeUnit;
