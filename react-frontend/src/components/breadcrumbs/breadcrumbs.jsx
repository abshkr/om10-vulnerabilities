import React from "react";
import { PageHeader } from "antd";
import "./breadcrumbs.css";

const Breadcrumbs = ({ page, path, sub }) => {
  const routes = [
    {
      path: "/",
      breadcrumbName: "OMEGA 5000"
    },
    {
      path: "first",
      breadcrumbName: page
    },
    {
      path: "second",
      breadcrumbName: path
    }
  ];
  const filter = ["Listings", "Management"];
  return (
    <div className="breadcrumbs">
      <PageHeader title={filter.includes(page) ? path : page} breadcrumb={{ routes }} subTitle={sub} />
    </div>
  );
};

export default Breadcrumbs;
