import React from 'react';
import { FileSearchOutlined, CloseOutlined } from '@ant-design/icons';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import { Form, Button, Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Supplier from './search/supplier';
import Status from './search/status';
import Tanker from './search/tanker';

const emptyFunc = () => {

}

const SearchForm = ({onSearch}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)
    Modal.destroyAll();
    onSearch(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{marginTop: "1rem"}}>
      <Form.Item
        name="shls_trip_no"
        label={t('fields.tripNumber')}
      >
        <Input />
      </Form.Item>

      <Supplier value={null} onChange={emptyFunc} />
      <Status value={null} onChange={emptyFunc} />
      <Tanker value={null} onChange={emptyFunc} />
      
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

const WindowSearch = (onSearch, title) => {
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
      <SearchForm onSearch={onSearch} />
    </SWRConfig>
    ),
    okButtonProps: {
    style: { display: 'none' },
    },
  });

  return null;
};


export default WindowSearch;
  