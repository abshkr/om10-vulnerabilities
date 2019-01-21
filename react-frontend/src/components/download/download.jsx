import React from "react";
import { Button, notification } from "antd";
import { CSVLink } from "react-csv";

const withDownload = () => {
  notification.success({
    message: "Generated Succesfully."
  });
};

const Download = ({ data, type, style }) => {
  return (
    <CSVLink data={!!data ? data : []} filename={`om5k_${type}.csv`}>
      <Button type="default" style={style} onClick={withDownload}>
        Export CSV
      </Button>
    </CSVLink>
  );
};

export default Download;
