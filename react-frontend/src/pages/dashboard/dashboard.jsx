import React, { Component } from "react";
import auth from "../../utils/auth";
import Widgets from "./widgets";
import Page from "../../components/page";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    };
  }

  render() {
    return (
      <Page page={"Dashboard"} isLoading={false}>
        <Widgets />
      </Page>
    );
  }
}

export default auth(Dashboard);
