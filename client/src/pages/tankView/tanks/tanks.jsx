import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Badge, Modal, Tag } from "antd";
import config from "./config";
import Tank from "./tank";
import _ from "lodash";

const status = {
  "In Service - Not used": "",
  "Out of Service": "blue",
  "In Service – Working": "gold",
  "In Service – Loading": "green",
  "In Service – Settling": "orange",
  "In Service – Receiving": "purple"
};

export default class Tanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleClick = tank => {
    Modal.info({
      title: tank.tank_name,
      centered: true,
      width: 1024,
      maskClosable: true,
      content: <Tank tank={tank} />
    });
  };

  handleManipulation = () => {
    const { results } = this.props;
    const data = [];

    _.forEach(results, tank => {
      const ullage = _.toInteger(tank.tank_ullage);
      const volume = _.toInteger(tank.tank_cor_vol);
      data.push({
        code: tank.tank_code,
        status: tank.tank_status_name,
        ullage,
        volume,
        percentage: Math.round((ullage / volume) * 100, 2) < 100 ? Math.round((ullage / volume) * 100, 2) : 100,
        payload: {
          labels: ["Current Volume", "Current Ullage"],
          datasets: [
            {
              data: [80, 20],
              backgroundColor: ["rgba(104, 164, 236, 1)", "rgba(104, 164, 236, 0.3)"],
              hoverBackgroundColor: ["rgba(104, 164, 236, 0.8)", "rgba(104, 164, 236, 0.6)"]
            }
          ]
        }
      });
    });

    this.setState({
      data
    });
  };

  componentDidMount() {
    this.handleManipulation();
  }

  render() {
    const { data } = this.state;
    return (
      <div className="tank-view">
        {data.map((item, index) => {
          return (
            <div key={index} className="tank" disabled onClick={() => this.handleClick(item)}>
              <div className="titles">
                <span>{item.code}</span>
                <Tag color={status[item.status]}>{item.status}</Tag>
              </div>

              <div className="tank-body">
                <div>
                  <Doughnut data={item.payload} options={config} width={220} height={220} />
                </div>

                <div className="tank-status">
                  <Badge status="default" text="HH" />
                  <Badge status="processing" text="H" />
                  <Badge status="default" text="L" />
                  <Badge status="default" text="LL" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
