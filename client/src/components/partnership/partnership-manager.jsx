import React from 'react';
import { FileSearchOutlined} from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';

import Partnership from './partnership';

const PartnershipManager = (
  title, 
  value,
  onClose, 
  width,
  height,
  t,
) => {
  // const { t } = useTranslation();
  const modal = Modal.info();
  modal.update({
    className: 'form-container',
    title: title? title: t('pageNames.partnership'),
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
        <Partnership value={value} onClose={onClose} modal={modal} />
      </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};


export default PartnershipManager;
  