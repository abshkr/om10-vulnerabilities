import React from 'react';
import { FileSearchOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import TheoreticalDensity from './density';

const DensityManager = (title, value, onClose, width, height, config) => {
  Modal.info({
    className: 'form-container',
    title: title ? title : 'Seals',
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
        <TheoreticalDensity value={value} onClose={onClose} config={config} />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default DensityManager;
