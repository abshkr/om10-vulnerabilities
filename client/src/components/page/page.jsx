import React from "react";
import Title from "../title";
import "./page.css";

const Page = ({ name, page, block, children }) => {
  return (
    <div className="page">
      <Title page={!!name ? name : page} />
      {children}
    </div>
  );
};

export default Page;
