/**
 * @description
 * Tank View Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import axios from "axios";
import { Page, Container, Filter, Download } from "../../components";
import { Button, Tabs } from "antd";
import Tanks from "./tanks";
import search from "../../utils/search";
import Summary from "./summary";

import "./tankView.css";

const Panel = Tabs.TabPane;

class TankView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      value: ""
    };
  }

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  getTanks = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.192/api/pages/tank/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        data,
        isLoading: false
      });
    });
  };

  componentDidMount() {
    this.getTanks();
  }

  render() {
    const { data, filtered, value, isLoading } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page="Operations" name="Tank View" isLoading={isLoading} block>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Filter value={value} search={this.searchObjects} />
            <div>
              <Button shape="round" type="primary" style={{ marginRight: 5 }}>
                Create New Tank
              </Button>
              <Download data={results} type={"Tank View"} />
            </div>
          </div>

          <Tabs defaultActiveKey="1">
            <Panel tab="Tank View" key="1" style={{ padding: 5 }}>
              {!isLoading && <Tanks results={results} />}
            </Panel>
            <Panel tab="Table View" key="2">
              <Summary data={results} />
            </Panel>
          </Tabs>
        </Container>
      </Page>
    );
  }
}

export default auth(TankView);
