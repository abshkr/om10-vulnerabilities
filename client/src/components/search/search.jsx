import React from "react";
import { Input } from "antd";

const Search = ({ value, search, isLoading }) => {
  return (
    <Input.Search
      placeholder="Filter..."
      value={value}
      onChange={query => search(query.target.value)}
      style={{ marginBottom: 5, width: 250, marginRight: 5 }}
      disabled={isLoading}
    />
  );
};

export default Search;
