import React from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import Supplier from './supplier';
import Status from './status';
import Tanker from './tanker';

// import { Code, Type, Use } from './fields';

import { KEY_READER_DEVICES } from 'api';

const TabPane = Tabs.TabPane;

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
          {/* <Code form={form} value={value} />
          <Type form={form} value={value} />
          <Use form={form} value={value} /> */}
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

export default SearchForm;
