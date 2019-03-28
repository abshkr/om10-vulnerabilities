import React from "react";
import Form from "./Form";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Container from "../../components/container";
import "./reports.css";

const Reports = ({ auth }) => {
  return (
    <Page page={"Reports"} name={"On Demand Reports"} block={true}>
      <Container>
        <Form auth={auth} />
      </Container>
    </Page>
  );
};

export default auth(Reports);
