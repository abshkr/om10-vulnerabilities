import React from 'react';
import { FileSearchOutlined} from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Modal } from 'antd';
// import { useTranslation } from 'react-i18next';

import OrderPicker from './order-picker';

const OrderManager = (
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
      <OrderPicker popup={true} params={value} onClose={onClose} modal={modal}/>
    </SWRConfig>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};


export default OrderManager;
  