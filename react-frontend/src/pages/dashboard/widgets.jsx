import React, { Component } from "react";
import { Icon } from "antd";
import { Doughnut, Bar } from "react-chartjs-2";
import * as SETTINGS from "./settings";

const tankers = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      data: [612, 20],
      backgroundColor: ["#538aef", "#a9c5f7"],
      hoverBackgroundColor: ["#5c88d9", "#cbdcfa"]
    }
  ]
};

const personnel = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      data: [5, 319],
      backgroundColor: ["#538aef", "#a9c5f7"],
      hoverBackgroundColor: ["#5c88d9", "#cbdcfa"]
    }
  ]
};

const id = {
  labels: ["Available", "Used", "Personnel", "Tanker", "Combo", "Other"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      borderColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      borderWidth: 1,
      hoverBackgroundColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      hoverBorderColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      data: [4000, 543, 311, 158, 74, 0]
    }
  ]
};

const movement = {
  labels: ["1 Bay", "2 Bays", "3 Bays", "4+ Bays"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      borderColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      borderWidth: 1,
      hoverBackgroundColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      hoverBorderColor: ["#538aef", "#77a2f2", "#9bbbf6", "#bfd3f9"],
      data: [120, 43, 76, 4]
    }
  ]
};

const options = {
  // Graph Configuration Function // If anything of the styling + tooltip data needs to be changed. This is your best friend.
  maintainAspectRatio: false, // This is done to maintain proper sizing for mobile / smaller displays
  cutoutPercentage: 60, // Creates the donut effect

  // Title Related Styling https://www.chartjs.org/docs/latest/configuration/title.html

  // Tooltip Config https://www.chartjs.org/docs/latest/configuration/tooltip.html
  tooltips: {
    enabled: true, //False to disable
    callbacks: {
      // Tooltip hover functionality.
      label: function(tooltipItems, data) {
        const array = [];
        const set = data.datasets[0].data;
        const size = set.length;
        const meta = data.datasets[0]._meta;
        const tipIndex = tooltipItems.index;
        try {
          for (let index = 0; index < size; index++) {
            if (meta[Object.keys(meta)[0]].data[index].hidden === false) {
              array.push(set[meta[Object.keys(meta)[0]].data[index]._index]);
            }
          }
        } catch (e) {}

        const sum = array.reduce((a, b) => a + b, 0); // Summing up the alarms array (total)

        if (set[tipIndex] === 1) {
          // If the number of alarms === 1
          // Add the Alarm/s Text and also give a percentage.
          return (
            data.labels[tipIndex] +
            ": " +
            set[tipIndex] +
            " Value / " +
            Math.round((set[tipIndex] / sum) * 100, 2) +
            "%"
          );
        }
        if (set[tipIndex] !== 1) {
          // If the number of alarms doesnt equal 1
          // Add the Alarm/s Text and also give a percentage.
          return (
            data.labels[tipIndex] +
            ": " +
            set[tipIndex] +
            " Values / " +
            Math.round((set[tipIndex] / sum) * 100, 2) +
            "%"
          );
        }
      }
    }
  },

  legend: {
    position: SETTINGS.LEGEND_POSITION,
    fullWidth: SETTINGS.LEGEND_FULLWIDTH,
    labels: {
      fontColor: SETTINGS.LABELS_COLOR,
      usePointStyle: SETTINGS.LABELS_POINTSTYLE
    }
  }
};

const barOptions = {
  // Graph Configuration Function // If anything of the styling + tooltip data needs to be changed. This is your best friend.
  maintainAspectRatio: false, // This is done to maintain proper sizing for mobile / smaller displays
  cutoutPercentage: 60, // Creates the donut effect

  // Title Related Styling https://www.chartjs.org/docs/latest/configuration/title.html

  // Tooltip Config https://www.chartjs.org/docs/latest/configuration/tooltip.html
  tooltips: {
    enabled: true, //False to disable
    callbacks: {
      // Tooltip hover functionality.
      label: function(tooltipItems, data) {
        const array = [];
        const set = data.datasets[0].data;
        const size = set.length;
        const meta = data.datasets[0]._meta;
        const tipIndex = tooltipItems.index;
        try {
          for (let index = 0; index < size; index++) {
            if (meta[Object.keys(meta)[0]].data[index].hidden === false) {
              array.push(set[meta[Object.keys(meta)[0]].data[index]._index]);
            }
          }
        } catch (e) {}

        const sum = array.reduce((a, b) => a + b, 0); // Summing up the alarms array (total)

        if (set[tipIndex] === 1) {
          // If the number of alarms === 1
          // Add the Alarm/s Text and also give a percentage.
          return (
            data.labels[tipIndex] +
            ": " +
            set[tipIndex] +
            " Value / " +
            Math.round((set[tipIndex] / sum) * 100, 2) +
            "%"
          );
        }
        if (set[tipIndex] !== 1) {
          // If the number of alarms doesnt equal 1
          // Add the Alarm/s Text and also give a percentage.
          return (
            data.labels[tipIndex] +
            ": " +
            set[tipIndex] +
            " Values / " +
            Math.round((set[tipIndex] / sum) * 100, 2) +
            "%"
          );
        }
      }
    }
  },

  legend: {
    display: false,
    position: SETTINGS.LEGEND_POSITION,
    fullWidth: SETTINGS.LEGEND_FULLWIDTH,
    labels: {
      fontColor: SETTINGS.LABELS_COLOR,
      usePointStyle: SETTINGS.LABELS_POINTSTYLE
    }
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)"
        },
        ticks: {
          min: 0
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          min: 0,
          color: "rgba(0, 0, 0, 0)"
        },
        ticks: {
          min: 0
        }
      }
    ]
  }
};

export default class Widgets extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="widget-block">
          <div className="widget">
            <span>
              {" "}
              <Icon type="box-plot" theme="outlined" /> Tankers
            </span>
            <div className="graph">
              <Doughnut data={tankers} width={300} height={240} options={options} />
            </div>
          </div>
          <div className="widget">
            <span>
              {" "}
              <Icon type="team" theme="outlined" /> Personnel
              <div className="graph">
                <Doughnut data={personnel} width={300} height={240} options={options} />
              </div>
            </span>
          </div>
          <div className="widget">
            <span>
              <Icon type="idcard" theme="outlined" /> Id Assignment{" "}
              <div className="graph-bar">
                <Bar data={id} width={300} height={240} options={barOptions} />
              </div>
            </span>
          </div>
          <div className="widget">
            <span>
              {" "}
              <Icon type="fire" theme="outlined" /> Tanker Movement{" "}
              <div className="graph-bar">
                <Bar data={movement} width={300} height={240} options={barOptions} />
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
