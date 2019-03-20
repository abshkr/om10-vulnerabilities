/**
 * @description
 * Tank Configurations Screen
 * Lets the user perform simple CRUD operations to manipulate the Tank Configurations Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Filter from "../../components/filter";
import DataTable from "../../components/table";
import Download from "../../components/download";
import Container from "../../components/container";

import { CreateButton } from "../../components/buttons";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import { Create, Edit } from "./forms";

class TankConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      create: false,
      edit: null
    };
  }

  fetchTanks = () => {
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

  showCreate = () => {
    this.setState({ create: true });
  };

  hideCreate = () => {
    this.setState({ create: false });
  };

  showEdit = record => {
    this.setState({ edit: record });
  };

  hideEdit = () => {
    this.setState({ edit: null });
  };

  componentDidMount() {
    this.fetchTanks();
  }

  render() {
    const { data, isLoading, filtered, value, create, edit } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Tank Configuration";
    return (
      <Page page={"Gantry"} name={name} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={name} style={{ float: "right" }} />
          <CreateButton type={name} style={{ float: "right", marginRight: 5 }} action={this.showCreate} />
          <Create visible={create} cancel={this.hideCreate} />
          <Edit visible={!!edit} cancel={this.hideEdit} value={edit} />

          <DataTable
            rowKey="base_code"
            columns={columns(results)}
            data={results}
            loading={true}
            scroll={2000}
            click={this.showEdit}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(TankConfiguration);
