import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

import transform from './transform';

const Download = ({ data, columns, isLoading, round, icon }) => {
  const payload = transform(data, columns);
  const { t } = useTranslation();

  return (
    <CSVLink data={payload} filename={`om5k_${window.location.pathname}.csv`}>
      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={icon || <FileTextOutlined />}
        onClick={() =>
          notification.success({
            message: t('messages.csvGenerationSuccessful'),
          })
        }
        disabled={isLoading || payload?.length===0 || !payload}
      >
        {t('operations.export')}
      </Button>
    </CSVLink>
  );
};

export default Download;
