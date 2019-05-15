import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import axios from "axios";
import { Select } from "antd";
import search from "../../utils/search";
import columns from "./columns";
import "./siteBalance.css";

const units = ["Litres", "Cubic Metre", "Imperial Gallon", "U.S Gallon", "Kilogram"];

class SiteBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      value: "",
      unit: "Litres"
    };
  }

  getSiteBalance = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/pages/site_bal/read.php?unit=LITRES`).then(res => {
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

  handleUnitChange = unit => {
    this.setState({ unit });
  };

  componentDidMount() {
    this.getSiteBalance();
  }

  render() {
    const { isLoading, data, value, filtered, unit } = this.state;
    const results = !!filtered ? filtered : data;

    return (
      <Page page={"Stock Management"} name={"Site Balance"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={"Site Balance"} style={{ float: "right" }} />
          <Select defaultValue={unit} style={{ width: 300, marginLeft: 5 }} onChange={this.handleUnitChange}>
            {units.map((item, index) => {
              return (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
          <DataTable rowKey="tankcode" columns={columns(results, unit)} data={results} isLoading={isLoading} scroll={100} />
        </Container>
      </Page>
    );
  }
}

export default auth(SiteBalance);
