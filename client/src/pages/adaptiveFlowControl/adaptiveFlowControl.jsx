import React, { Component } from "react";
import axios from "axios";
import columns from "./columns";
import FlowRates from "./flowRates";
import auth from "../../utils/auth";
import search from "../../utils/search";
import { Modal, notification } from "antd";
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

  handleClick = object => {
    Modal.info({
      title: `Viewing ${object.base_name}`,
      centered: true,
      width: "50vw",
      content: <FlowRates base={object} />
    });
  };

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
            data: baseProducts.data.records,
            flowRateList: flowRate.data.records
          });
        })
      )
      .catch(function(error) {
        notification.error({
          message: error.message,
          description: "Failed to make the request."
        });
      });
  };

  componentDidMount() {
    this.getBaseProducts();
  }

  render() {
    const { data, isLoading, filtered, value, resize, flowRateList } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Gantry"} name={"Adaptive Flow Control"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Download data={data} type={"Tank Configuration"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <DataTable isLoading={isLoading} resize={resize} rowKey="base_code" columns={columns(results, flowRateList)} data={results} click={this.handleClick} scroll={500} />
        </Container>
      </Page>
    );
  }
}

export default auth(AdaptiveFlowControl);
