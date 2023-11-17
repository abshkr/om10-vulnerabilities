import React from 'react';
import { FileSearchOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import BaseColors from './base-colors';

const BaseColorsManager = (title, onClose, width, height) => {
  Modal.info({
    className: 'form-container',
    title: title ? title : 'Manage Base Product Colors',
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
        <BaseColors onClose={onClose} />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default BaseColorsManager;
