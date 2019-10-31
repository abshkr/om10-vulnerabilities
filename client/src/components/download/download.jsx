import React from 'react';
import { Button, notification } from 'antd';
import { CSVLink } from 'react-csv';

import transform from './transform';

const Download = ({ data, columns, style, loading, t }) => {
  const payload = transform(data, columns);

  return (
    <CSVLink data={payload} filename={`om5k_${window.location.pathname}.csv`}>
      <Button
        shape="round"
        type="primary"
        icon="file-text"
        style={style}
        onClick={() =>
          notification.success({
            message: 'Generated Succesfully.'
          })
        }
        loading={loading}
      >
        Export CSV
      </Button>
    </CSVLink>
  );
};

export default Download;
