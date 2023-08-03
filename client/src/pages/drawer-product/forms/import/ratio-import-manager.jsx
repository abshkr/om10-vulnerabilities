import React from 'react';
import { FileSearchOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import RatioImport from './ratio-import';

const RatioImportManager = (
  title,
  value,
  bases,
  onClose,
  width,
  height,
  config,
  pipenodeBases,
  user_code
) => {
  Modal.info({
    className: 'form-container',
    title: title ? title : 'Import/Edit Base Ratios',
    centered: true,
    closable: true,
    width: width,
    icon: <FileSearchOutlined />,
    content: (
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher,
        }}
      >
        <RatioImport
          value={value}
          bases={bases}
          onClose={onClose}
          config={config}
          pipenodeBases={pipenodeBases}
          user_code={user_code}
        />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default RatioImportManager;
