import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";
import columns from "./columns";
import auth from "../../utils/auth";
import FlowRates from "./flowRates";
import generator from "./generator";
import search from "../../utils/search";
import { baseProducts, adaptiveFlow } from "../../api";
import { Page, Filter, Container, DataTable } from "../../components";
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
            data: generator(baseProducts.data.records, flowRate.data.records, currentFlow.data)
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
    const { data, filtered, value, resize, isLoading } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Gantry"} name={"Adaptive Flow Control"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <DataTable isLoading={isLoading} resize={resize} rowKey="baseCode" columns={columns(results)} data={results} nested={tank => FlowRates(tank)} />
        </Container>
      </Page>
    );
  }
}

export default auth(AdaptiveFlowControl);
