import React, { Component } from "react";
import { Timeline, Icon } from "antd";
import Create from "../create";
import search from "../../../utils/search";
import { Filter } from "../../../components";
import _ from "lodash";

let raw = [
  {
    id: 1,
    date: "2016-05-03",
    status: "New",
    message: "This was the initial strategy deployed in production",
    address: "No. 189, Grove St, Los Angeles",
    recipient: "343422",
    location: "Driver"
  },
  {
    id: 2,
    date: "2016-05-02",
    status: "New",
    message:
      "While using this strategy, the following problems were encountered. First, when a new node joins the system, it needs to “steal” its key ranges from other nodes. However, the nodes handing the key ra While using this strategy, the following problems were encountered. First, when a new node joins the system, it needs to “steal” its key ranges from other nodes. However, the nodes handing the key ra While using this strategy, the following problems were encountered. First, when a new node joins the system, it needs to “steal” its key ranges from other nodes. However, the nodes handing the key ra While using this strategy, the following problems were encountered. First, when a new node joins the system, it needs to “steal” its key ranges from other nodes. However, the nodes handing the key ra",
    address: "No. 189, Grove St, Los Angeles",
    recipient: "DAB9769",
    location: "Tanker"
  },
  {
    id: 3,
    date: "2016-05-04",
    status: "Acknowledged",
    message: "customer performance. This requires us to run the bootstrapping task at the lowest priority",
    address: "No. 189, Grove St, Los Angeles",
    recipient: "24",
    location: "Equipment"
  },
  {
    id: 4,
    date: "2016-05-01",
    status: "Deleted",
    message:
      "was no easy way to take a snapshot of the entire key space due to the randomness in key ranges, and this made the process of archival",
    address: "No. 189, Grove St, Los Angeles",
    recipient: "1233233",
    location: "Order"
  }
];

const classification = {
  Acknowledged: {
    icon: "smile",
    color: "#13CE66"
  },
  New: {
    icon: "message",
    color: "#F7BA2A"
  },
  Deleted: {
    icon: "frown",
    color: "#FF4949"
  }
};

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: _.maxBy(raw, function(o) {
        return o.id;
      }),
      data: [],
      edit: {
        show: false,
        payload: null
      },
      create: false,
      value: ""
    };
  }

  create = create => {
    this.setState({ create });
  };

  postEvent = event => {
    raw.push(event);
    this.generateEvents(raw);
  };

  generateEvents = data => {
    const events = [];
    for (let i = 0; i < data.length; i++) {
      const style = classification[data[i].status];
      events.push({
        id: data[i].id,
        date: data[i].date,
        recipient: data[i].recipient,
        location: data[i].location,
        status: data[i].status,
        message: data[i].message,
        color: style.color,
        icon: style.icon
      });
    }
    this.setState({ data: events });
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.generateEvents(raw);
  }

  render() {
    const { create, data, id, filtered, value } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <div className="timeline">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Filter value={value} search={this.searchObjects} />
          <Create status={create} update={this.create} id={id} post={this.postEvent} />
        </div>
        <Timeline className="timeline-container" style={{ marginTop: 20, marginLeft: 5 }}>
          {results.map((item, index) => (
            <Timeline.Item
              key={index}
              dot={<Icon type={item.icon} style={{ fontSize: "20px", color: item.color }} />}
              color={item.color}
            >
              <p>
                <span>Status: </span> {item.status}
              </p>
              <p>
                <span>Datetime: </span> {item.date}
              </p>
              <p>
                <span>Location: </span> {item.location}
              </p>
              <p>
                <span>Recipient: </span> {item.recipient}
              </p>
              <p>
                <span>Message: </span> {item.message}
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    );
  }
}
