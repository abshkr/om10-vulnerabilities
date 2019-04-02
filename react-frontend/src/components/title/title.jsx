import React from "react";
import { Helmet } from "react-helmet";

const Title = ({ page }) => (
  <Helmet>
    <title>{page} ─ OMEGA 5000</title>
  </Helmet>
);

export default Title;
