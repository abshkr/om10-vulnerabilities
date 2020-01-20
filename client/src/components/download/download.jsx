import React from 'react';
import { Button, notification } from 'antd';
import { CSVLink } from 'react-csv';

import transform from './transform';

const Download = ({ data, columns, isLoading }) => {
  const payload = transform(data, columns);

  return (
    <CSVLink data={payload} filename={`om5k_${window.location.pathname}.csv`}>
      <Button
        icon="file-text"
        onClick={() =>
          notification.success({
            message: 'Generated Succesfully.'
          })
        }
        loading={isLoading}
      >
        Export CSV
      </Button>
    </CSVLink>
  );
};

export default Download;
