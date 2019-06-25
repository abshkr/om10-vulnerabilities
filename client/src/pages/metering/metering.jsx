import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import { stockManagement } from "../../api";
import { Select } from "antd";
import search from "../../utils/search";
import axios from "axios";
import columns from "./columns";
import "./metering.css";

const units = ["Litres", "Cubic Metre", "Imperial Gallon", "U.S Gallon", "Imperial Barrel", "U.S Barrel"];

class Metering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      unit: "Litres",
      value: ""
    };
  }

  getMetering = () => {
    this.setState({ isLoading: true });
    axios.all([stockManagement.readMetering()]).then(
      axios.spread(metering => {
        this.setState({
          isLoading: false,
          data: metering.data.records
        });
      })
    );
  };

  handleUnitChange = unit => {
    this.setState({
      unit
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
    this.getMetering();
  }

  render() {
    const { isLoading, data, filtered, value, unit } = this.state;
    const results = !!filtered ? filtered : data;

    return (
      <Page page={"Stock Management"} name={"Metering"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Select defaultValue={unit} style={{ width: 300, marginLeft: 5 }} onChange={this.handleUnitChange}>
            {units.map((item, index) => {
              return (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
          <Download data={data} type={"Metering"} style={{ float: "right" }} />
          <DataTable rowKey="metercode" columns={columns(results, unit)} data={results} isLoading={isLoading} scroll={300} />
        </Container>
      </Page>
    );
  }
}

export default auth(Metering);
