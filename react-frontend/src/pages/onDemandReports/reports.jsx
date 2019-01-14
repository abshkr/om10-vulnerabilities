import React from "react";
import Form from "./Form";
import auth from "../../utils/auth";
import Page from "../../components/page";
import "./reports.css";

const Reports = ({ auth }) => {
  return (
    <Page page={"Reports"} name={"On Demand Reports"} isLoading={false} block={true}>
      <Form auth={auth} />
    </Page>
  );
};

export default auth(Reports);
