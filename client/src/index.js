import "babel-polyfill";
import "react-app-polyfill/ie11";

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import "./styles/app.css";
import "./styles/antd.css";
import "antd/dist/antd.css";
import "./styles/bootstrap.css";
import "ant-design-pro/dist/ant-design-pro.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
