import React, { Component } from "react";
import auth from "../../auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import { Select } from "antd";
import { stockManagement } from "../../api";
import search from "../../utils/search";
import axios from "axios";
import columns from "./columns";
import "./productInventory.css";

const units = ["Litres", "Cubic Metre", "Imperial Gallon", "U.S Gallon"];

class ProductInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      unit: "Litres",
      value: ""
    };
  }

  getProductInventory = () => {
    this.setState({ isLoading: true });
    axios.all([stockManagement.readProductInventory()]).then(
      axios.spread(metering => {
        this.setState({
          isLoading: false,
          data: metering.data.records
        });
      })
    );
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  handleUnitChange = unit => {
    this.setState({
      unit
    });
  };

  componentDidMount() {
    this.getProductInventory();
  }

  render() {
    const { isLoading, data, value, filtered, unit } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <div>
        <Page page={"Stock Management"} name={"Product Inventory"} isLoading={isLoading} block={true}>
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
            <DataTable rowKey="base_code" columns={columns(results, unit)} data={results} isLoading={isLoading} scroll={300} click={this.showEdit} />
          </Container>
        </Page>
      </div>
    );
  }
}

export default auth(ProductInventory);
