import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate, SWRConfig } from 'swr';
import { DeleteOutlined, PlusOutlined, FormOutlined } from '@ant-design/icons';

import { DataTable } from 'components';
import { CUSTOMERS } from 'api';
import columns from './columns';
import Product from './product';
import { fetcher } from 'utils';
import _ from 'lodash';

import { Form, Button, Space, Modal } from 'antd';

const CustomerProduct = ({ form, value, changeProducts }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(`${CUSTOMERS.CUSTOMER_PRODUCTS}?customer=${value?.cust_account}`,
    { revalidateOnFocus: false });

  const [products, setProducts] = useState(null);
  const [selected, setSelected] = useState([]);

  const addProductCallBack = (values) => {
    _.forEach(values, (v) => {
      v.cust_acct = value?.cust_account
    }); 
    const newPartners = _.uniqBy([...products, ...values], function (e) {
      return e.prod_code + e.prod_cmpy;
    });
    
    setProducts(
      _.sortBy(newPartners, ["prod_cmpy", "prod_code"])
    );
    changeProducts(newPartners);
  }

  const deleteProducts = () => {
    const news = _.filter(products, (item) => {
      for (let i = 0; i < selected.length; i += 1) {
        if (item.prod_code === selected[i].prod_code &&
          item.prod_cmpy === selected[i].prod_cmpy) {
          return false;
        }
      }
      return true;
    });
    setProducts(news);
    changeProducts(news);
    setSelected([]);
  };
    
  const addProduct = (v) => {
    Modal.info({
      className: 'form-container',
      title: t('descriptions.selectSuppProd') + " " + v?.cust_supp_code + "/" + v?.cust_supp_name,
      centered: true,
      width: '40vw',
      icon: <FormOutlined />,
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <Product supplier={v?.cust_supp_code} addProductCallBack={addProductCallBack}/>
        </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  useEffect(() => {
    if (payload?.records) {
      setProducts(payload.records);
    }
  }, [payload?.records]);

  return (
      // <Form layout="vertical" form={form} scrollToFirstError>
      <div>
        <Form.Item name="products" noStyle>
          <DataTable
            data={products}
            isLoading={isValidating}
            // height="40vh"
            minimal
            columns={columns(t)}
            handleSelect={setSelected}
          />
        </Form.Item>
        <Space style={{ marginTop: 10 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            loading={isValidating}
            onClick={() => addProduct(value)}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.add')}
          </Button>

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={deleteProducts}
            disabled={selected?.length <= 0}
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.delete')}
          </Button>
        </Space>
      </div>
      // </Form>
  );
};

export default CustomerProduct;
