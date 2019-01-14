import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Search from "../../utils/search";
import Filter from "../../components/filter";
import Table from "./table";
import axios from "axios";

class Personnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      value: "",
      filtered: null
    };
  }

  fetch = () => {
    axios.get(`https://10.1.10.66/api/personnel/read.php`).then(res => {
      this.setState({ data: res.data.records, isLoading: false });
    });
  };

  searchObjects = e => {
    const { value } = e.target;
    const filtered = Search(value, this.state.data);
    this.setState({ filtered, value });
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { data, filtered, value } = this.state;
    return (
      <Page page={"Access Control"} name={"Personnel"} isLoading={false} block={true}>
        <Filter value={value} search={this.searchObjects} />
        <Table data={!!filtered ? filtered : data} update={this.fetch} />
      </Page>
    );
  }
}

export default auth(Personnel);
