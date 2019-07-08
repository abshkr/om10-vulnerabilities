/**
 * @description
 * Tank View Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";

import { Page, Container, Filter, Download } from "../../components";
import { tanks, baseProducts } from "../../api";
import { Button, Tabs, Modal } from "antd";
import { search } from "../../utils/";
import Summary from "./summary";
import auth from "../../auth";
import Tanks from "./tanks";
import Forms from "./forms";
import axios from "axios";
import _ from "lodash";

import "./tankView.css";

const Panel = Tabs.TabPane;

class TankView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      isLoading: false,
      baseProducts: []
    };
  }

  handleClick = object => {
    const { configuration } = this.props;
    const { data, baseProducts } = this.state;

    Modal.info({
      title: !!object ? `Editing (${object.tank_code} / ${object.tank_name})` : "Create",
      centered: true,
      icon: !!object ? "edit" : "form",
      width: 800,
      content: <Forms value={object} refresh={this.handleFetch} baseProducts={baseProducts} profile={configuration} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleExport = data => {
    const csv = [];

    _.forEach(data, tank => {
      csv.push({
        terminal: tank.tank_terminal,
        current_datetime: new Date(),
        tank_code: tank.tank_code,
        tank_name: tank.tank_name,
        base_product_code: tank.tank_base,
        base_product_name: tank.tank_base_name,
        reference_density: tank.tank_15_density,
        daily_variance_limit_vol: tank.tank_dtol_volume,
        daily_variance_limit_percent: tank.tank_dtol_percent,
        monthly_variance_limit_vol: tank.tank_mtol_volume,
        monthly_variance_limit_percent: tank.tank_mtol_percent,
        tank_state: tank.tank_status_name,
        tank_level: tank.tank_prod_lvl,
        obs_quantity: "",
        average_temperature: "",
        standard_quantity: "",
        mass_quantity: "",
        ullage: tank.tank_ullage,
        hh__percent: tank.tank_hh_level,
        hh_state: tank.tank_hh_state,
        h__percent: tank.tank_h_state,
        h_state: tank.tank_h_state,
        l__percent: tank.tank_l_state,
        l_state: tank.tank_l_state,
        ll__percent: tank.tank_ll_state,
        ll_state: tank.tank_ll_state,
        user_h_percent: tank.tank_uh_level,
        user_h_state: tank.tank_uh_state,
        user_l__percent: tank.tank_ul_level,
        user_l_state: tank.tank_ul_state
      });
    });

    return csv;
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
    axios.all([tanks.readTanks(), baseProducts.readBaseProduct()]).then(
      axios.spread((tanks, baseProducts) => {
        this.setState({
          isLoading: false,
          data: tanks.data.records,
          baseProducts: baseProducts.data.records
        });
      })
    );
  };

  handleLiveUpdate = () => {
    axios.all([tanks.readTanks(), baseProducts.readBaseProduct()]).then(
      axios.spread((tanks, baseProducts) => {
        this.setState({
          data: tanks.data.records,
          baseProducts: baseProducts.data.records
        });
      })
    );
  };

  componentDidMount() {
    this.handleFetch();
    this.liveUpdate = setInterval(this.handleLiveUpdate, 1000);
  }

  render() {
    const { data, filtered, value, isLoading } = this.state;
    const { configuration } = this.props;
    const results = !!filtered ? filtered : data;
    return (
      <Page page="Operations" name="Tank View" isLoading={isLoading} block>
        <Container>
          <Filter value={value} search={this.handleSearch} />
          <Download data={this.handleExport(results)} type={"Tank View"} style={{ float: "right", marginRight: 5 }} />
          <Button shape="round" icon="setting" type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)}>
            Create New Tank
          </Button>
          <Tabs defaultActiveKey="1">
            <Panel tab="Tank View" key="1" style={{ padding: 5 }}>
              {!isLoading && <Tanks results={results} configuration={configuration} handleClick={this.handleClick} />}
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
