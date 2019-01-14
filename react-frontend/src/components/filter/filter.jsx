import React, { Component } from "react";
import { Input } from "antd";

const SearchInput = Input.Search;

export default class Filter extends Component {
  render() {
    const { value, search } = this.props;
    return (
      <SearchInput
        placeholder="Filter..."
        value={value}
        onChange={search}
        style={{ marginBottom: 10, width: 360 }}
      />
    );
  }
}
