import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Form, Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import api, { CUSTOMERS } from 'api';
import { DataTable } from 'components';
import { EditOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import Supplier from './supplier'

const columns = (t) => [
  {
    headerName: "",
    field: 'selected',
    suppressSizeToFit: true, 
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
  },
  {
    headerName: t('fields.prodCode'),
    field: 'prod_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // cellRenderer: 'BooleanRenderer',
    width: 120,
  },
  {
    headerName: t('fields.prodName'),
    field: 'prod_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // hide: true,
  },
];

const Product = ({ existings, company, addProductCallBack }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [data, setData] = useState([]);

  // const { data: payload, isValidating, revalidate } = useSWR(`${PARTNERSHIP.PARTNERS}?supplier=${company}`);

  const onFinish = (values) => {
    addProductCallBack(selected);
    Modal.destroyAll();
  }

  const handleSelect = (v) => {
    setSelected(v);
  }

  const supplierChange = (v) => {
    console.log(v)
    setSupplier(v);
  }

  useEffect (() => {
    if (!supplier) {
      return;
    }

    const url = `${CUSTOMERS.SUPPLIER_PRODUCTS}?supplier_code=${supplier}`;
    api.get(url).then((response) => {
      const payload = response.data?.records || [];
      setData(payload);
    });
  }, [supplier]);

  return (
    <Form
      onFinish={onFinish}
    >
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Supplier onChange={supplierChange} />
      </div>

      {/* <Space style={{ marginTop: 10 }}> */}
        <Form.Item name="partners" noStyle >
          <DataTable
            data={data}
            height="40vh"
            minimal
            columns={columns(t)}
            handleSelect={handleSelect}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right', marginTop: 10 }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5, marginTop: 10 }}
          >
            {t('operations.add')}
          </Button>
        </Form.Item>
      {/* </Space> */}
    </Form>
  );
};

export default Product;
