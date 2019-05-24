import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";
import columns from "./columns";
import auth from "../../utils/auth";
import FlowRates from "./flowRates";
import generator from "./generator";
import search from "../../utils/search";
import { baseProducts, adaptiveFlow } from "../../api";
import { Page, Filter, Download, Container, DataTable } from "../../components";
import "./adaptiveFlowControl.css";

class AdaptiveFlowControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      resize: false,
      isLoading: true,
      baseProducts: []
    };
  }

  getBaseProducts = () => {
    axios
      .all([baseProducts.readBaseProduct(), adaptiveFlow.readFlowRate()])
      .then(
        axios.spread((baseProducts, flowRate) => {
          this.setState({
            value: "",
            filtered: null,
            isLoading: false,
            baseProducts: baseProducts.data.records,
            data: generator(baseProducts.data.records, flowRate.data.records)
          });
        })
      )
      .catch(error => {
        message.warn("Failed to make the request.");
        console.error(error);
      });
  };

  getFlowRate = () => {
    const { baseProducts } = this.state;

    if (baseProducts.length !== 0) {
      axios.all([adaptiveFlow.readFlowRate()]).then(
        axios.spread(flowRate => {
          this.setState({
            data: generator(baseProducts, flowRate.data.records)
          });
        })
      );
    }
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.getBaseProducts();
    try {
      this.periodic = setInterval(async () => {
        this.getFlowRate();
      }, 1000);
    } catch (e) {
      clearInterval(this.periodic);
    }
  }

  render() {
    const { data, filtered, value, resize, isLoading } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Gantry"} name={"Adaptive Flow Control"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={data} type={"Tank Configuration"} style={{ float: "right" }} />
          <DataTable isLoading={isLoading} resize={resize} rowKey="baseCode" columns={columns(results)} data={results} nested={base => FlowRates(base)} />
        </Container>
      </Page>
    );
  }
}

export default auth(AdaptiveFlowControl);
