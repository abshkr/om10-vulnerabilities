import React, { Component } from "react";
import { Timeline } from "antd";
import axios from "axios";
import * as API from "../../../constants/api";

export default class LiveJournal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isMounted: false
    };
  }

  fetchLiveJournal() {
    axios.get(`https://${API.URL}/api/journal/read.php`).then(res => {
      if (this.state.isMounted) {
        this.setState({
          data: res.data.records
        });
      }
    });
  }

  componentDidMount() {
    this.setState({ isMounted: true });

    this.fetchLiveJournal();

    this.interval = setInterval(() => {
      this.fetchLiveJournal();
    }, 1000);
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.state;
    return (
      <Timeline className="timeline-container" pending={!!data ? "Logging..." : "Fetching..."} reverse>
        {!!data &&
          data.map((item, index) => (
            <Timeline.Item key={index}>
              <p>
                <span>Date/Time: </span> {item.gen_date}
              </p>
              <p>
                <span>Event: </span> {item.msg_event}
              </p>
              <p>
                <span>Detail: </span> {item.message}
              </p>
            </Timeline.Item>
          ))}
      </Timeline>
    );
  }
}
