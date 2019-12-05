import React, { useEffect } from "react";
import Router from "next/router";
import { Icon } from "antd";

import { RootContainer } from "./style";

const Root = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      Router.push("/login");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RootContainer>
      <Icon className="loading" type="loading" />
    </RootContainer>
  );
};

export default Root;
