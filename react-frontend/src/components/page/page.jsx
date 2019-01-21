import React from "react";
import Title from "../title";
import Breadcrumbs from "../breadcrumbs";
import { Spin, Icon } from "antd";
import configuration from "../../configuration";
import "./page.css";

const Loader = <Icon type="loading" style={{ fontSize: 60, position: "fixed" }} spin />;

const Page = ({ name, page, isLoading, block, children }) => {
  return (
    <div>
      <Title page={!!name ? name : page} />
      {!configuration.EMBEDDED && <Breadcrumbs page={page} path={name} />}
      <Spin spinning={isLoading} indicator={Loader}>
        <div className={block ? "page" : "non-block"}>{children}</div>
      </Spin>
    </div>
  );
};

export default Page;
