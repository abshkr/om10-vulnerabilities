import React from "react";
import { Spin, Icon } from "antd";
import { LoadingContainer } from "./style";

const Spinner = (
  <Icon type="loading" style={{ fontSize: 24, color: "#68a4ec" }} spin />
);

const Loading = () => (
  <LoadingContainer>
    <Spin indicator={Spinner} />
  </LoadingContainer>
);

export default Loading;
