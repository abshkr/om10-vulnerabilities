import React from 'react';
import { FileSearchOutlined, CloseOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Form, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import Supplier from './search/supplier';
import TripStatus from './search/trip-status';
import Tanker from './search/tanker';
import Trip from './search/trip-number';
import LoadID from './search/load-id';
import TrsaID from './search/trsa-id';

const SearchForm = ({onSearch, items}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)
    Modal.destroyAll();
    onSearch(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}}>
      {items?.shls_trip_no && <Trip />}
      {items?.load_id && <LoadID />}
      {items?.trsa_id && <TrsaID />}
      {items?.supplier_code && <Supplier />}
      {items?.trip_status && <TripStatus />}
      {items?.tnkr_code && <Tanker />}
      
      <div style={{marginTop: "2rem"}}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.search')}
        </Button>
      </div>
    </Form>
  );
};

const WindowSearch = (
    onSearch, 
    title, 
    items,
  ) => {
  console.log(items)
  Modal.info({
    className: 'form-container',
    // title: t('operations.search'),
    title: title? title: 'Search',
    centered: true,
    width: '20vw',
    icon: <FileSearchOutlined />,
    content: (
    <SWRConfig
        value={{
        refreshInterval: 0,
        fetcher,
        }}
    >
      <SearchForm onSearch={onSearch} items={items} />
    </SWRConfig>
    ),
    okButtonProps: {
    style: { display: 'none' },
    },
  });

  return null;
};


export default WindowSearch;
  