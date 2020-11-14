import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate, SWRConfig } from 'swr';
import { DeleteOutlined, PlusOutlined, FormOutlined } from '@ant-design/icons';

import { DataTable } from 'components';
import { CUSTOMERS } from 'api';
import columns from './columns';
import Carrier from './carrier';
import { fetcher } from 'utils';
import _ from 'lodash';

import { Form, Button, Space, Modal } from 'antd';

const CustomerCarrier = ({ form, value, changeCarriers }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(`${CUSTOMERS.CUSTOMER_CARRIERS}?customer=${value?.cust_account}`,
    { revalidateOnFocus: false });

  const [carriers, setCarriers] = useState(null);
  const [selected, setSelected] = useState([]);

  const addCarrierCallBack = (values) => {
    _.forEach(values, (v) => {
      v.cust_acct = value?.cust_account
    }); 
    
    const newPartners = _.uniqBy([...carriers, ...values], function (e) {
      return e.cmpy_code;
    });
    
    setCarriers(
      _.sortBy(newPartners, ["cmpy_code"])
    );
    
    changeCarriers(newPartners);
  }

  const deleteProducts = () => {
    const news = _.filter(carriers, (item) => {
      for (let i = 0; i < selected.length; i += 1) {
        if (item.cmpy_code === selected[i].cmpy_code) {
          return false;
        }
      }
      return true;
    });
    setCarriers(news);
    changeCarriers(news);
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
          <Carrier supplier={v?.cust_supp_code} addCarrierCallBack={addCarrierCallBack}/>
        </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  useEffect(() => {
    if (payload?.records) {
      setCarriers(payload.records);
    }
  }, [payload?.records]);

  return (
      // <Form layout="vertical" form={form} scrollToFirstError>
      <div>
        <Form.Item name="carriers" noStyle>
          <DataTable
            data={carriers}
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

export default CustomerCarrier;
