import React from 'react';
import { Input } from 'antd';

const Search = ({ value, search, loading }) => {
  return (
    <Input.Search
      placeholder="Search..."
      value={value}
      onChange={query => search(query.target.value)}
      style={{ marginBottom: 5, width: 250, marginRight: 5 }}
      disabled={loading}
    />
  );
};

export default Search;
