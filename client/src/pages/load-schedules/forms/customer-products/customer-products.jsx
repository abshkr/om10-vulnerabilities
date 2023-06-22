import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, notification, Tag } from 'antd';
import { mutate } from 'swr';

import _ from 'lodash';

import { TableTransfer } from '../../../../components';

import api, { CUSTOMERS } from '../../../../api';

const CustomerProducts = ({ supplier, customer, disabled }) => {
  const [targetKeys, setTargetKeys] = useState([]);
  //const [data, setData] = useState([]);
  const [busyFlag, setBusyFlag] = useState(disabled || false);

  const { t } = useTranslation();

  const leftTableColumns = [
    {
      title: t('fields.supplierCode'),
      dataIndex: 'prod_cmpy',
    },
    {
      title: t('fields.supplierName'),
      dataIndex: 'prod_cmpy_name',
    },
    {
      title: t('fields.prodCode'),
      dataIndex: 'prod_code',
    },
    {
      title: t('fields.prodName'),
      dataIndex: 'prod_name',
    },
  ];

  const rightTableColumns = [
    {
      title: t('fields.supplierCode'),
      dataIndex: 'prod_cmpy',
    },
    {
      title: t('fields.supplierName'),
      dataIndex: 'prod_cmpy_name',
    },
    {
      title: t('fields.prodCode'),
      dataIndex: 'prod_code',
    },
    {
      title: t('fields.prodName'),
      dataIndex: 'prod_name',
    },
  ];

  // use onSuccess option to handle some settings after data is retrieved successfully.
  // note: Tne component of Table Transfer requires the data source to have an index key.
  const { data: allProducts, isValidating } = useSWR(
    `${CUSTOMERS.ALL_PRODUCTS}?supplier=${supplier}&customer=${customer}`,
    {
      refreshInterval: 0,
      onSuccess: (data, key, config) => {
        console.log('Entered onSuccess!!!');
        console.log({ data });
        //const originTargetKeys = data?.filter(item => item.cust_acct === customer).map(item => item.cust_acnt);
        const originTargetKeys = data?.records
          .filter((item) => item.cust_acct === customer)
          .map((item) => item.key);
        console.log('originTargetKeys', originTargetKeys);
        setTargetKeys(originTargetKeys);
        console.log('targetKeys', targetKeys);
      },
    }
  );
  let data = allProducts?.records;

  useEffect(() => {
    if (!!allProducts) {
      data = allProducts?.records;
    }
  }, [allProducts]);

  /*   const { data: allProducts } = useSWR(
    `${CUSTOMERS.ALL_PRODUCTS}?supplier=${supplier}&customer=${customer}`,
    { refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (!!allProducts) {
      setData(allProducts?.records);
    }
  }, [allProducts, setData]);

  useEffect(() => {
    if (!data) {
      const originTargetKeys = data?.filter(item => item.cust_acct === customer).map(item => item.key);
      console.log("originTargetKeys", originTargetKeys);
      setTargetKeys(originTargetKeys);
      console.log("targetKeys", targetKeys);
    }
  }, [data, setTargetKeys]);
  */

  const createLinksForEach = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter((item) => _.indexOf(keys, item.key) >= 0);
    console.log('items:', items);
    items.forEach((item) => {
      const link = {
        cust_acct: customer,
        prod_cmpy: item?.prod_cmpy,
        prod_code: item?.prod_code,
      };
      console.log('item:', item, link);
      api
        .post(CUSTOMERS.CREATE_CUSTOMER_PRODUCT, link)
        .then(() => {
          mutate(`${CUSTOMERS.ALL_PRODUCTS}?supplier=${supplier}&customer=${customer}`);
          notification.success({
            message: t('messages.createSuccess'),
            description: t('descriptions.createSuccess'),
          });
          setBusyFlag(false);
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
          setBusyFlag(false);
        });
    });
  };

  const deleteLinksForEach = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter((item) => _.indexOf(keys, item.key) >= 0);
    console.log('items:', items);
    items.forEach((item) => {
      const link = {
        cust_acct: customer,
        prod_cmpy: item?.prod_cmpy,
        prod_code: item?.prod_code,
      };
      console.log('item:', item, link);
      api
        .post(CUSTOMERS.DELETE_CUSTOMER_PRODUCT, link)
        .then(() => {
          mutate(`${CUSTOMERS.ALL_PRODUCTS}?supplier=${supplier}&customer=${customer}`);
          notification.success({
            message: t('messages.deleteSuccess'),
            description: t('descriptions.deleteSuccess'),
          });
          setBusyFlag(false);
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
          setBusyFlag(false);
        });
    });
  };

  const createLinks = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter((item) => _.indexOf(keys, item.key) >= 0);
    console.log('items:', items);
    const links = [];
    items.forEach((item) => {
      const link = {
        cust_acct: customer,
        prod_cmpy: item?.prod_cmpy,
        prod_code: item?.prod_code,
      };
      links.push(link);
      console.log('item:', item, link);
    });
    api
      .post(CUSTOMERS.CREATE_CUSTOMER_PRODUCTS, links)
      .then(() => {
        mutate(`${CUSTOMERS.ALL_PRODUCTS}?supplier=${supplier}&customer=${customer}`);
        notification.success({
          message: t('messages.createBatchSuccess'),
          description: t('descriptions.createBatchSuccess'),
        });
        setBusyFlag(false);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setBusyFlag(false);
      });
  };

  const deleteLinks = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter((item) => _.indexOf(keys, item.key) >= 0);
    console.log('items:', items);
    const links = [];
    items.forEach((item) => {
      const link = {
        cust_acct: customer,
        prod_cmpy: item?.prod_cmpy,
        prod_code: item?.prod_code,
      };
      links.push(link);
      console.log('item:', item, link);
    });
    api
      .post(CUSTOMERS.DELETE_CUSTOMER_PRODUCTS, links)
      .then(() => {
        mutate(`${CUSTOMERS.ALL_PRODUCTS}?supplier=${supplier}&customer=${customer}`);
        notification.success({
          message: t('messages.deleteBatchSuccess'),
          description: t('descriptions.deleteBatchSuccess'),
        });
        setBusyFlag(false);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setBusyFlag(false);
      });
  };

  const changeTargetKeys = (nextTargetKeys) => {
    // compare the difference of old target key and the new target key
    // if new target key is longer, then item is moved from left to right, therefore need to add a link
    // if new target key is shorter, then item is moved from right to left, therefore need to remove a link
    let currTargetKeys = targetKeys;
    if (currTargetKeys === undefined) {
      currTargetKeys = data?.filter((item) => item.cust_acct === customer).map((item) => item.key);
    }
    console.log(currTargetKeys);
    let keys;
    if (nextTargetKeys.length > currTargetKeys.length) {
      keys = _.differenceWith(nextTargetKeys, currTargetKeys, _.isEqual);
      setBusyFlag(true);
      createLinks(keys);
      // createLinksForEach(keys);
    }
    if (nextTargetKeys.length < currTargetKeys.length) {
      keys = _.differenceWith(currTargetKeys, nextTargetKeys, _.isEqual);
      setBusyFlag(true);
      deleteLinks(keys);
      // deleteLinksForEach(keys);
    }
    setTargetKeys(nextTargetKeys);
  };

  const linkTitle = t('fields.custProductLinks');
  // const leftTitle = (<div style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>{t('fields.custAvailableProducts')}</div>);
  // const rightTitle = (<div style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>{t('fields.custLinkedProducts')}</div>);
  const leftTitle = (
    <Tag color={'red'}>
      <div style={{ fontWeight: 'bold' }}>{t('fields.custAvailableProducts')}</div>
    </Tag>
  );
  const rightTitle = (
    <Tag color={'red'}>
      <div style={{ fontWeight: 'bold' }}>{t('fields.custLinkedProducts')}</div>
    </Tag>
  );

  return (
    <TableTransfer
      disabled={busyFlag}
      dataSource={data}
      titles={[leftTitle, rightTitle]}
      targetKeys={targetKeys}
      onChange={changeTargetKeys}
      filterOption={(inputValue, item) =>
        item.prod_name.indexOf(inputValue) !== -1 || item.prod_cmpy_name.indexOf(inputValue) !== -1
      }
      leftColumns={leftTableColumns}
      rightColumns={rightTableColumns}
    />
  );
};

export default CustomerProducts;
