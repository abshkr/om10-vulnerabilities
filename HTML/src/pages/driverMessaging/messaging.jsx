import React, { Component } from "react";
import auth from "../../utils/auth";
import Feed from "./feed";
import Page from "../../components/page";
import "./messaging.css";

class Messaging extends Component {
  render() {
    return (
      <Page page={"Operations"} name={"Driver Messaging"} block={true} isLoading={false}>
        <Feed />
      </Page>
    );
  }
}

export default auth(Messaging);
