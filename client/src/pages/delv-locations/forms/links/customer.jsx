import React, { useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { TableTransfer } from '../../../../components';
import columns from './columns';

import { DELV_LOCATIONS } from '../../../../api';

const CustomerLink = ({ form, value, supplier, category, location }) => {
  const [targetKeys, setTargetKeys] = useState(undefined);

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


  const { data: availableCustomers, isValidating } = useSWR(
    `${DELV_LOCATIONS.AVAILABLE_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`,
    { refreshInterval: 0 }
  );
  const { data: linkedCustomers, isValidating2 } = useSWR(
    `${DELV_LOCATIONS.LINKED_CUSTOMERS}?delv_cust_suppcode=${supplier}&delv_cust_catgcode=${category}&delv_code=${location}`,
    { refreshInterval: 0 }
  );

  const { setFieldsValue } = form;
  const data = availableCustomers?.records;
  /*
  const validate = (rule, input) => {
    const match = _.find(logicalPrinters?.records, (object) => {
      return object.prt_usage === input && object.prt_cmpy === company;
    });

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.usage')}`);
    }

    return Promise.resolve();
  };
  useEffect(() => {
    if (value) {
      setFieldsValue({
        prt_usage: value.prt_usage,
      });
    }
  }, [value, setFieldsValue]);
  */

  const changeTargetKeys = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Form.Item name="customer_link" label={t('fields.customerLinkTitle')} rules={[{ required: false }]}>
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
