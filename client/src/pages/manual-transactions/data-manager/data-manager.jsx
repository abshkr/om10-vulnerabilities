import React from 'react';
import { FileSearchOutlined} from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import LoadForm from './load-form';

const DataManager = (
    title, 
    fields,
    url,
    onLoad, 
    params,
    width,
    height,
  ) => {
  Modal.info({
    className: 'form-container',
    title: title? title: 'Search',
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
      <LoadForm onLoad={onLoad} params={params} fields={fields} url={url} height={height} />
    </SWRConfig>
    ),
    okButtonProps: {
    style: { display: 'none' },
    },
  });

  return null;
};


export default DataManager;
  