import React, { Component } from "react";
import "./footer.css";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date().toLocaleString()
      });
    }, 1000);
  }

  render() {
    const { config } = this.props;
    return config.EMBEDDED ? (
      <div />
    ) : (
      <div className="footer">
        <span> {this.state.time} </span>
      </div>
    );
  }
}
