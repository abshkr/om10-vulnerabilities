import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";
import columns from "./columns";
import auth from "../../auth";
import FlowRates from "./flowRates";
import generator from "./generator";
import search from "../../utils/search";
import { baseProducts, adaptiveFlow } from "../../api";
import { Page, Filter, Container, DataTable } from "../../components";
import _ from "lodash";

import "./adaptiveFlowControl.css";

class AdaptiveFlowControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      isLoading: true
    };
  }

  getBaseProducts = () => {
    axios
      .all([baseProducts.readBaseProduct(), adaptiveFlow.readFlowRate(), adaptiveFlow.readTankCurrentFlow()])
      .then(
        axios.spread((baseProducts, flowRate, currentFlow) => {
          this.setState({
            isLoading: false,
            data: generator(baseProducts.data.records, flowRate.data.records, currentFlow.data),
            totalFlow: _.sumBy(flowRate.data, "current_flow_rate")
          });
        })
      )
      .catch(error => {
        message.warn("Failed to make the request.");
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
    try {
      this.periodic = setInterval(async () => {
        this.getBaseProducts();
      }, 1000);
    } catch (e) {
      clearInterval(this.periodic);
    }
  }

  componentWillUnmount() {
    clearInterval(this.periodic);
  }

  render() {
    const { data, filtered, value, resize, isLoading, totalFlow } = this.state;
    const { configuration } = this.props;

    const results = !!filtered ? filtered : data;

    return (
      <Page page={"Gantry"} name={"Adaptive Flow Control"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <DataTable
            size="middle"
            isLoading={isLoading}
            resize={resize}
            rowKey="baseCode"
            columns={columns(results)}
            data={results}
            nested={tank => FlowRates(tank, configuration)}
            footer={<span style={{ textAlign: "center" }}>Total Flow of All Products: {totalFlow} LPM </span>}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(AdaptiveFlowControl);
