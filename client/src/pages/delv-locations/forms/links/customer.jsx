import React, { useState } from 'react';

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
  //const [targetKeys, setTargetKeys] = useState(undefined);

  const { t } = useTranslation();

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


  const { data: allCustomers, isValidating } = useSWR(
    `${DELV_LOCATIONS.ALL_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`,
    { refreshInterval: 0 }
  );

  const { setFieldsValue } = form;
  const data = allCustomers?.records;
  //const originTargetKeys = data?.filter(item => item.delv_code === location).map(item => item.cust_acnt);
  const originTargetKeys = data?.filter(item => item.delv_code === location).map(item => item.key);
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  //setTargetKeys(originTargetKeys);
  console.log(targetKeys);

  const createLinks = async (keys) => {
    const items = data.filter(item => keys.find(item.key))
    await axios
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
    const items = data.filter(item => keys.find(item.key))
    await axios
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
    const keys = _.differenceWith(targetKeys, nextTargetKeys, _.isEqual);
    if (nextTargetKeys.length > targetKeys.length) {
      createLinks(keys);
    }
    if (nextTargetKeys.length < targetKeys.length) {
      deleteLinks(keys);
    }
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Form.Item name="customer_link" label={t('fields.delvCustomerLinks')} rules={[{ required: false }]}>
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
