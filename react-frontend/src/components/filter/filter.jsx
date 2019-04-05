import React from "react";
import { Input } from "antd";

const Filter = ({ value, search, loading }) => {
  const { Search } = Input;
  return (
    <Search
      placeholder="Filter..."
      value={value}
      onChange={search}
      style={{ marginBottom: 10, width: 360 }}
      disabled={loading}
    />
  );
};

export default Filter;
