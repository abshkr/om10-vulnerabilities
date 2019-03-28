import React from "react";
import Title from "../title";
import Breadcrumbs from "../breadcrumbs";
import configuration from "../../configuration";
import "./page.css";

const Page = ({ name, page, block, children }) => {
  return (
    <div>
      <Title page={!!name ? name : page} />
      {!configuration.EMBEDDED && <Breadcrumbs page={page} path={name} />}

      <div className={block ? "page" : "non-block"}>{children}</div>
    </div>
  );
};

export default Page;
