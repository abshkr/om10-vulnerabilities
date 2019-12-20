import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import "typeface-open-sans";

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./i18n";

import "antd/dist/antd.css";
import "./styles/antd.css";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
