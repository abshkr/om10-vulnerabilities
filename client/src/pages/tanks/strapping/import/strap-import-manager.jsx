import React from 'react';
import { FileSearchOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import StrapImport from './strap-import';

const StrapImportManager = (title, value, onClose, width, height) => {
  Modal.info({
    className: 'form-container',
    title: title ? title : 'Import Strapping',
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
        <StrapImport value={value} onClose={onClose} />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default StrapImportManager;
