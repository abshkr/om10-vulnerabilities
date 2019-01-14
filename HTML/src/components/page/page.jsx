import React, { Component } from "react";
import Title from "../title";
import Breadcrumbs from "../breadcrumbs";
import { Spin, Icon } from "antd";
import configuration from "../../configuration";
import "./page.css";

const Loader = <Icon type="loading" style={{ fontSize: 60, position: "fixed" }} spin />;

export default class Page extends Component {
  render() {
    const { name, page, isLoading, block } = this.props;
    return (
      <div>
        <Title page={!!name ? name : page} />
        {!configuration.EMBEDDED && <Breadcrumbs page={page} path={name} />}
        <Spin spinning={isLoading} indicator={Loader}>
          <div className={block ? "page" : "non-block"}>{this.props.children}</div>
        </Spin>
      </div>
    );
  }
}
