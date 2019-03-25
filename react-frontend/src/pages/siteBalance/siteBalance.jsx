import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import "./siteBalance.css";

class SiteBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      value: ""
    };
  }

  getSiteBalance = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/site_bal/read.php?unit=US.GAL`).then(res => {
      this.setState({ data: res.data.records, isLoading: false });
    });
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.getSiteBalance();
  }

  render() {
    const { isLoading, data, value, filtered } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Stock Management"} name={"Site Balance"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={"Site Balance"} style={{ float: "right" }} />
          <DataTable
            resize={true}
            rowKey="tankcode"
            columns={columns(results)}
            data={results}
            loading={true}
            scroll={100}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(SiteBalance);
