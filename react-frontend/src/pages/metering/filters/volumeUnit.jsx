import React from "react";
import { Select } from "antd";

const Option = Select.Option;

const VolumeUnit = ({ change }) => {
  return (
    <Select defaultValue="Litre" style={{ width: 180, marginLeft: 5 }} onChange={change}>
      <Option value="litre">Litre</Option>
      <Option value="m3">Cubic</Option>
      <Option value="gal.imp">Imperial Gallon</Option>
      <Option value="gal.us">US Gallon</Option>
      <Option value="bbl.imp">Imperial Barrel</Option>
      <Option value="bbl.us">US Barrel</Option>
    </Select>
  );
};

export default VolumeUnit;
