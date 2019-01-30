import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import "./baseProducts.css";

class BaseProducts extends Component {
  render() {
    return <Page page={"Base Products"} isLoading={false} />;
  }
}

export default auth(BaseProducts);
