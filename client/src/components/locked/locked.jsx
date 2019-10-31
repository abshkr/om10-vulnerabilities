import React from "react";
import { Icon } from "antd";
import "./locked.css";

const Locked = () => (
  <div>
    <div className="text">Unauthorized</div>
    <div className="lock">
      {" "}
      <Icon type="file-protect" style={{ color: "#538aef", fontSize: 70 }} />{" "}
    </div>
  </div>
);

export default Locked;
