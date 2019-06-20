import React from "react";
import { Button, notification } from "antd";
import { CSVLink } from "react-csv";

const withDownload = () => {
  notification.success({
    message: "Generated Succesfully."
  });
};

const Download = ({ data, type, style, loading }) => {
  return (
    <CSVLink data={!!data ? data : []} filename={`om5k_${type}.csv`}>
      <Button shape="round" type="primary" icon="file-text" style={style} onClick={withDownload} loading={loading}>
        Export CSV
      </Button>
    </CSVLink>
  );
};

export default Download;
