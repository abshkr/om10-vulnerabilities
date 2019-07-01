import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Modal, Tag } from "antd";
import summary from "./summary";
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
      title: tank.name,
      centered: true,
      width: 1024,
      maskClosable: true,
      okButtonProps: {
        style: { display: "none" }
      },
      content: <Tank tank={tank} />
    });
  };

  handleManipulation = results => {
    const data = [];

    _.forEach(results, tank => {
      const ullage = _.toInteger(tank.tank_ullage);
      const volume = _.toInteger(tank.tank_cor_vol);
      const percent = ((volume * 100) / ullage).toFixed(2);

      if (ullage && volume > 0) {
        data.push({
          code: tank.tank_code,
          name: tank.tank_name,
          status: tank.tank_status_name,
          title: tank.tank_base_name,
          default: tank,
          payload: {
            labels: ["Current Volume", "Current Ullage"],
            datasets: [
              {
                data: percent > 100 ? [percent, 0] : [percent, 100 - percent],
                values: [volume, ullage],
                percentage: percent,
                backgroundColor: ["rgba(104, 164, 236, 1)", "rgba(104, 164, 236, 0.2)"],
                hoverBackgroundColor: ["rgba(104, 164, 236, 0.8)", "rgba(104, 164, 236, 0.3)"]
              }
            ]
          }
        });
      }
    });

    this.setState({
      data
    });
  };

  componentDidMount() {
    const { results } = this.props;
    this.handleManipulation(results);
    summary();
  }

  componentDidUpdate(prevProps) {
    const { results } = this.props;

    if (results !== prevProps.results) {
      this.handleManipulation(results);
    }
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
                <Doughnut data={item.payload} options={config(item.title)} width={220} height={220} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
