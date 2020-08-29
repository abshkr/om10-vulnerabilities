import React from 'react';
import { FileSearchOutlined} from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
// import { useTranslation } from 'react-i18next';

import OrderListingsPopup from '../../pages/order-listings';

const OrderManager = (
    title, 
    value,
    onClose, 
    width,
    height,
    t,
  ) => {
  // const { t } = useTranslation();
  Modal.info({
    className: 'form-container',
    title: title? title: t('pageNames.orderListing'),
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
      <OrderListingsPopup value={value} onClose={onClose} />
    </SWRConfig>
    ),
    okButtonProps: {
    style: { display: 'none' },
    },
  });

  return null;
};


export default OrderManager;
  