/**
 * @description
 * Tank View Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../auth";
import axios from "axios";
import { Page, Container, Filter, Download } from "../../components";
import { tanks } from "../../api";
import { Button, Tabs, Modal } from "antd";
import Tanks from "./tanks";
import { search } from "../../utils/";
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

  handleClick = object => {
    const { data } = this.state;
    Modal.info({
      title: !!object ? `Editing (${object.tank_code} / ${object.tank_name})` : "Create",
      centered: true,
      icon: !!object ? "edit" : "form",
      width: 720,
      content: <div value={object} refresh={this.handleFetch} baseProducts={this.state.baseProducts} profile={this.props.configuration} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleExport = data => {
    return {
      terminal: "",
      current_datetime: "",
      tank_code: "",
      tank_name: "",
      base_product_code: "",
      base_product_name: "",
      reference_density: "",
      daily_variance_limit_vol: "",
      daily_variance_limit_percent: "",
      monthly_variance_limit_vol: "",
      monthly_variance_limit_percent: "",
      tank_state: "",
      tank_level: "",
      obs_quantity: "",
      average_temperature: "",
      standard_quantity: "",
      mass_quantity: "",
      ullage: ""
    };
  };

  handleSearch = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  handleFetch = () => {
    this.setState({
      isLoading: true
    });

    axios.all([tanks.readTanks()]).then(
      axios.spread(tanks => {
        this.setState({
          isLoading: false,
          data: tanks.data.records,
          filtered: null,
          value: ""
        });
      })
    );
  };

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    const { data, filtered, value, isLoading } = this.state;
    const { configuration } = this.props;
    const results = !!filtered ? filtered : data;
    return (
      <Page page="Operations" name="Tank View" isLoading={isLoading} block>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Filter value={value} search={this.handleSearch} />
            <div>
              <Button shape="round" icon="setting" type="primary" style={{ marginRight: 5 }} onClick={() => this.handleClick(null)}>
                Create New Tank
              </Button>
              <Download data={results} type={"Tank View"} />
            </div>
          </div>

          <Tabs defaultActiveKey="1">
            <Panel tab="Tank View" key="1" style={{ padding: 5 }}>
              {!isLoading && <Tanks results={results} configuration={configuration} />}
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
