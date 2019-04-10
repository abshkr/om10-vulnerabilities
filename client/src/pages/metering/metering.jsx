import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import search from "../../utils/search";
import axios from "axios";
import columns from "./columns";
import "./metering.css";

class Metering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      value: ""
    };
  }

  getMetering = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/pages/metering/read.php?mass_unit=kg&vol_unit=litre`).then(res => {
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
    this.getMetering();
  }

  render() {
    const { isLoading, data, filtered, value } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Stock Management"} name={"Metering"} isLoading={isLoading} block={true}>
        <Container>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Filter value={value} search={this.searchObjects} />
            <Download data={data} type={"Metering"} />
          </div>

          <DataTable
            rowKey="metercode"
            columns={columns(results)}
            data={results}
            loading={true}
            scroll={300}
            click={this.showEdit}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(Metering);
