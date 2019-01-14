import React from "react";
import { Spin, Icon } from "antd";

import "./loaders.css";

const antIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;

const Loading = () => (
  <div className="loading">
    <Spin indicator={antIcon} />
  </div>
);

export default Loading;
