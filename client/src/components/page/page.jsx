import React from "react";
import Title from "../title";
import "./page.css";

const Page = ({ name, page, block, children }) => {
  return (
    <div>
      <Title page={!!name ? name : page} />
      <div className={block ? "" : "non-block"}>{children}</div>
    </div>
  );
};

export default Page;
