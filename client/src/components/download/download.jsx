import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import { CSVLink } from 'react-csv';

import transform from './transform';

const Download = ({ data, columns, isLoading, round }) => {
  const payload = transform(data, columns);

  return (
    <CSVLink data={payload} filename={`om5k_${window.location.pathname}.csv`}>
      <Button
        shape={round ? 'round' : ''}
        icon={<FileTextOutlined />}
        onClick={() =>
          notification.success({
            message: 'Generated Succesfully.',
          })
        }
        disabled={isLoading}
      >
        Export CSV
      </Button>
    </CSVLink>
  );
};

export default Download;
