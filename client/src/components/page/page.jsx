import React from "react";
import { Helmet } from "react-helmet";

import "./page.css";

const Page = ({ name, page, children }) => {
  return (
    <div className="page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {name} ─ {page} ─ OMEGA 5000
        </title>
      </Helmet>

      <div>{children}</div>
    </div>
  );
};

export default Page;
