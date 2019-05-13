import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import { Progress } from "antd";
import { adaptiveFlow } from "../../../api";

export default class FlowRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowRate: []
    };
  }

  getFlowRates = () => {
    axios.all([adaptiveFlow.readFlowRate()]).then(
      axios.spread(flowRate => {
        this.setState({
          flowRate: flowRate.data.records
        });
      })
    );
  };

  componentDidMount() {
    this.getFlowRates();
  }

  render() {
    const { flowRate } = this.state;
    const filtered = _.filter(flowRate, ["base_code", this.props.base.base_code]);
    return (
      <div className="tank-block">
        {filtered.map(tag => (
          <div className="tank" key={tag.tank_code}>
            <div>
              <Progress type="dashboard" percent={75} width={250} />
            </div>
            <p>{tag.tank_code}</p>
          </div>
        ))}
      </div>
    );
  }
}
