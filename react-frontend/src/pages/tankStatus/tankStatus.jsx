/**
 * @description
 * Tank Status Screen
 * Lets the user perform simple CRUD operations to manipulate the Tank Status Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import { Edit } from "./forms";

class TankStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      create: false,
      edit: null
    };
  }

  getTanks = () => {
    axios.get(`https://10.1.10.66/api/tank/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        data: data,
        isLoading: false
      });
    });
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  showEdit = record => {
    this.setState({ edit: record });
  };

  hideEdit = () => {
    this.setState({ edit: null });
  };

  componentDidMount() {
    this.getTanks();
  }

  render() {
    const { data, isLoading, filtered, value, edit } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Tank Status";
    return (
      <Page page={"Gantry"} name={name} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={name} style={{ float: "right" }} />
          <Edit visible={!!edit} cancel={this.hideEdit} value={edit} />
          <DataTable
            resize={true}
            rowKey="tank_code"
            columns={columns(results)}
            data={results}
            loading={true}
            scroll={5000}
            click={this.showEdit}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(TankStatus);
