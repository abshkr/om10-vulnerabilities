import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Tag, Badge, Empty } from "antd";
import summary from "./summary";
import config from "./config";
import _ from "lodash";

export default class Tanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleStatusProcess = (level, hhValue, hValue, lValue, llValue) => {
    level = _.toInteger(level !== "" ? level : 0);
    hhValue = _.toInteger(hhValue !== "" ? hhValue : 0);
    hValue = _.toInteger(hValue !== "" ? hValue : 0);
    lValue = _.toInteger(lValue !== "" ? lValue : 0);
    llValue = _.toInteger(llValue !== "" ? llValue : 0);

    let hh = "default";
    let h = "default";
    let l = "default";
    let ll = "default";

    if (level >= hhValue) {
      hh = "error";
      h = "error";
    } else if (hhValue > level && level >= hValue) {
      h = "error";
    } else if (lValue >= level && level > llValue) {
      l = "error";
    } else if (llValue >= level) {
      l = "error";
      ll = "error";
    }

    return {
      hh,
      h,
      l,
      ll
    };
  };

  handleManipulation = results => {
    const data = [];

    const status = {
      "In Service - Not used": "",
      "Out of Service": "blue",
      "In Service – Working": "gold",
      "In Service – Loading": "green",
      "In Service – Settling": "orange",
      "In Service – Receiving": "purple"
    };

    _.forEach(results, tank => {
      const capacity = _.toInteger(tank.tank_ullage) + _.toInteger(tank.tank_cor_vol);
      const volume = _.toInteger(tank.tank_cor_vol);
      const percent = _.isNaN((volume * 100) / capacity) ? 0.0 : ((volume * 100) / capacity).toFixed(2);

      // capacity && volume > 0
      if (true) {
        const levels = this.handleStatusProcess(tank.tank_prod_lvl, tank.tank_hh_level, tank.tank_h_level, tank.tank_ll_level, tank.tank_l_level);
        data.push({
          code: tank.tank_code,
          name: tank.tank_name,
          status: tank.tank_status_name,
          title: tank.tank_base_name,
          color: status[tank.tank_status_name],
          defaults: tank,
          levels,
          error: Object.values(levels).includes("error"),
          payload: {
            labels: ["Current Volume", "Total Capacity"],
            datasets: [
              {
                title: tank.tank_code,
                data: percent > 100 ? [percent, 0] : [percent, 100 - percent],
                values: [volume, capacity],
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
    const { handleClick } = this.props;

    return (
      <div className="tank-view">
        {data.length === 0 && (
          <div className="empty">
            <Empty />
          </div>
        )}
        {data.map((item, index) => {
          return (
            <div key={index} className="tank" disabled onClick={() => handleClick(item.defaults)}>
              <div className="titles">
                <span>{item.title}</span>
                <Tag color={item.color}>{item.status}</Tag>
              </div>

              <div className="tank-body">
                <div className="tank-graph">
                  <Doughnut data={item.payload} options={config} width={180} height={180} />
                </div>

                <div className="tank-status">
                  <Badge status={item.levels.hh} text="HH" />
                  <Badge status={item.levels.h} text="H" />
                  <Badge status={item.levels.l} text="L" />
                  <Badge status={item.levels.ll} text="LL" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
