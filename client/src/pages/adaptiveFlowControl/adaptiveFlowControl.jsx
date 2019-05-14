import React, { Component } from "react";
import axios from "axios";
import columns from "./columns";
import auth from "../../utils/auth";
import search from "../../utils/search";
import FlowRates from "./flowRates";
import generator from "./generator";
import { message } from "antd";
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
      baseProducts: [],
      flowRateList: []
    };
  }

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  handleResize = () => {
    const { resize } = this.state;
    this.setState({
      resize: !resize
    });
  };

  getBaseProducts = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([baseProducts.readBaseProduct(), adaptiveFlow.readFlowRate()])
      .then(
        axios.spread((baseProducts, flowRate) => {
          this.setState({
            value: "",
            filtered: null,
            isLoading: false,
            data: generator(baseProducts.data.records, flowRate.data.records)
          });
        })
      )
      .catch(function(error) {
        message.warn("Failed to make the request.");
      });
  };

  componentDidMount() {
    this.getBaseProducts();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Gantry"} name={"Adaptive Flow Control"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Download data={data} type={"Tank Configuration"} style={{ float: "right" }} loading={isLoading} />
          <DataTable isLoading={isLoading} resize={resize} rowKey="baseCode" columns={columns(results)} data={results} scroll={500} nested={base => FlowRates(base)} />
        </Container>
      </Page>
    );
  }
}

export default auth(AdaptiveFlowControl);
