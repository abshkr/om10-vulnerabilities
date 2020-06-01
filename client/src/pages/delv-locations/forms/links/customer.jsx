import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, notification } from 'antd';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { TableTransfer } from '../../../../components';
import columns from './columns';

import { DELV_LOCATIONS } from '../../../../api';

const CustomerLink = ({ form, value, supplier, category, location }) => {
  const [targetKeys, setTargetKeys] = useState([]);
  //const [data, setData] = useState([]);

  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const leftTableColumns = [
    {
      title: t('fields.delvCustAcctDesc'),
      dataIndex: 'cust_desc',
    },
    {
      title: t('fields.delvCustSuppCode'),
      dataIndex: 'cust_supp_code',
    },
    {
      title: t('fields.delvCustSuppName'),
      dataIndex: 'cust_supp_name',
    },
    {
      title: t('fields.delvCustCatgText'),
      dataIndex: 'cust_ctgr_text',
    },
  ];

  const rightTableColumns = [
    {
      title: t('fields.delvCustAcctDesc'),
      dataIndex: 'cust_desc',
    },
    {
      title: t('fields.delvCustSuppCode'),
      dataIndex: 'cust_supp_code',
    },
    {
      title: t('fields.delvCustSuppName'),
      dataIndex: 'cust_supp_name',
    },
    {
      title: t('fields.delvCustCatgText'),
      dataIndex: 'cust_ctgr_text',
    },
  ];

  // use onSuccess option to handle some settings after data is retrieved successfully.
  // note: Tne component of Table Transfer requires the data source to have an index key. 
  const { data: allCustomers, isValidating } = useSWR(
    `${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`,
    { refreshInterval: 0,
      onSuccess: 
        (data, key, config) => {
          console.log('Entered onSuccess!!!'); 
          console.log({data}); 
          //const originTargetKeys = data?.filter(item => item.delv_code === location).map(item => item.cust_acnt);
          const originTargetKeys = data?.records.filter(item => item.delv_code === location).map(item => item.key);
          console.log("originTargetKeys", originTargetKeys);
          setTargetKeys(originTargetKeys);
          console.log("targetKeys", targetKeys);
      }
    }
  );
  let data = allCustomers?.records;
  
  useEffect(() => {
    if (!!allCustomers) {
      data = (allCustomers?.records);
    }
  }, [allCustomers]);
  

/*   const { data: allCustomers } = useSWR(
    `${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`,
    { refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (!!allCustomers) {
      setData(allCustomers?.records);
    }
  }, [allCustomers, setData]);

  useEffect(() => {
    if (!data) {
      const originTargetKeys = data?.filter(item => item.delv_code === location).map(item => item.key);
      console.log("originTargetKeys", originTargetKeys);
      setTargetKeys(originTargetKeys);
      console.log("targetKeys", targetKeys);
    }
  }, [data, setTargetKeys]);
 */
  const createLinksForEach = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter(item => _.indexOf(keys,item.key) >= 0);
    console.log('items:', items);
    items.forEach((item)=>{
      item.delv_code=location;
      console.log('item:', item);
       axios
      .post( DELV_LOCATIONS.CREATE_LINK, item)
      .then(() => {
        mutate(`${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`);
        notification.success({
          message: t('messages.createSuccess'),
          description: t('descriptions.createSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
    });
  };

  const deleteLinksForEach = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter(item => _.indexOf(keys,item.key) >= 0);
    console.log('items:', items);
    items.forEach((item)=>{
      item.delv_code=location;
      console.log('item:', item);
       axios
      .post( DELV_LOCATIONS.DELETE_LINK, item)
      .then(() => {
        mutate(`${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`);
        notification.success({
          message: t('messages.deleteSuccess'),
          description: t('descriptions.deleteSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
    });
  };

  const createLinks = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter(item => _.indexOf(keys,item.key) >= 0);
    console.log('items:', items);
    items.forEach((item)=>{
      item.delv_code = location;
      console.log('item:', item);
    });
    axios
    .post( DELV_LOCATIONS.CREATE_LINKS, items)
    .then(() => {
      mutate(`${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`);
      notification.success({
        message: t('messages.createSuccess'),
        description: t('descriptions.createSuccess'),
      });
    })
    .catch((errors) => {
      _.forEach(errors.response.data.errors, (error) => {
        notification.error({
          message: error.type,
          description: error.message,
        });
      });
    });
  };

  const deleteLinks = async (keys) => {
    console.log('keys:', keys);
    const items = data.filter(item => _.indexOf(keys,item.key) >= 0);
    console.log('items:', items);
    items.forEach((item)=>{
      item.delv_code = location;
      console.log('item:', item);
    });
    axios
    .post( DELV_LOCATIONS.DELETE_LINKS, items)
    .then(() => {
      mutate(`${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`);
      notification.success({
        message: t('messages.deleteSuccess'),
        description: t('descriptions.deleteSuccess'),
      });
    })
    .catch((errors) => {
      _.forEach(errors.response.data.errors, (error) => {
        notification.error({
          message: error.type,
          description: error.message,
        });
      });
    });
  };

  const changeTargetKeys = (nextTargetKeys) => {
    // compare the difference of old target key and the new target key
    // if new target key is longer, then item is moved from left to right, therefore need to add a link
    // if new target key is shorter, then item is moved from right to left, therefore need to remove a link
    let currTargetKeys = targetKeys;
    if (currTargetKeys === undefined) {
      currTargetKeys = data?.filter(item => item.delv_code === location).map(item => item.key);
    }
    console.log(currTargetKeys);
    let keys;
    if (nextTargetKeys.length > currTargetKeys.length) {
      keys = _.differenceWith(nextTargetKeys, currTargetKeys, _.isEqual);
      //createLinks(keys);
      createLinksForEach(keys);
    }
    if (nextTargetKeys.length < currTargetKeys.length) {
      keys = _.differenceWith(currTargetKeys, nextTargetKeys, _.isEqual);
      //deleteLinks(keys);
      deleteLinksForEach(keys);
    }
    setTargetKeys(nextTargetKeys);
  };

  const linkTitle = t('fields.delvCustomerLinks') + '  [ ' + t('fields.delvAvailableCustomers') + '  <<->>  ' + t('fields.delvLinkedCustomers') + ' ]';

  return (
    <Form.Item name="customer_link" label={linkTitle} rules={[{ required: false }]}>
        <TableTransfer
          dataSource={data}
          targetKeys={targetKeys}
          onChange={changeTargetKeys}
          filterOption={(inputValue, item) =>
            item.cust_desc.indexOf(inputValue) !== -1 || item.cust_cmpy_name.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
    </Form.Item>
  );
};

export default CustomerLink;
