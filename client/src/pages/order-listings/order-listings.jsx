import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Page, DataTable, Download, Calendar, WindowSearch } from '../../components';
import { ORDER_LISTINGS } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useConfig } from '../../hooks';
import { getDateRangeOffset } from '../../utils';

const OrderListings = ({popup, params}) => {
  const config = useConfig();
  const ranges = getDateRangeOffset(String(config.openOrderDateRange), '365');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState('ORDER_ORD_TIME');
  const [pageState, setPageState] = useState('view');
  const [supplier, setSupplier] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [data, setData] = useState(null);

  const { t } = useTranslation();

  const timeOptions = [
    {
      index: 1,
      code: 'ORDER_ORD_TIME',
      name: t('fields.orderOrdTime'),
    },
    {
      index: 2,
      code: 'ORDER_EXP_TIME',
      name: t('fields.orderExpTime'),
    },
  ];

  const access = useAuth('M_ORDERLISTING');

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const url =
    popup && supplier && customer
      ? (
        start && end
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}
          &order_supp_code=${supplier}&order_cust_acnt=${customer}`
        : null // `${ORDER_LISTINGS.READ}?order_supp_code=${supplier}&order_cust_acnt=${customer}`
      )
      : (
        start && end
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}`
        : null
      );

  const { data: payload, isValidating, revalidate } = useSWR(url);

  //const data = payload?.records;
  const isLoading = isValidating || !data;
  const fields = columns(t);

  const page = t('pageMenu.customers');
  const name = t('pageNames.orderListing');

  const adjustPageState = (visibility, value) => {
    if (visibility) {
      if (!value) {
        setPageState('create');
      } else {
        if (value.order_approved) {
          setPageState('detail');
        } else {
          setPageState('edit');
        }
      }
    } else {
      setPageState('view');
    }
  };

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
    adjustPageState(visibility, value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const locateOrder = (value) => {
    runSearch({
      order_cust_no: value,
    })
  }

  const runSearch = (values) => {
    if (
      !values?.order_cust_no && 
      (!supplier && !values?.order_supp_code) && 
      (!customer && !values?.order_cust_acnt) &&
      !values?.order_stat_id &&
      !values?.order_ref_code) {
      revalidate();
      return;
    }
    axios
      .get(ORDER_LISTINGS.READ, {
        params: {
          order_cust_no: values?.order_cust_no,
          order_supp_code: !supplier ? values?.order_supp_code : supplier,
          order_cust_acnt: !customer ? values?.order_cust_acnt : customer,
          order_stat_id: values?.order_stat_id,
          order_ref_code: values?.order_ref_code,
          //start_date: start,
          //end_date: end,
        },
      })
      .then((res) => {
        setData(res.data.records);
      });
  };

  useEffect(() => {
    if (!start && ranges?.beforeToday) {
      setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    }

    if (!end && ranges?.afterToday) {
      setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    }
  }, [ranges, start, end]);

  useEffect(() => {
    if (popup && params) {
      setSupplier(params?.order_supp_code);
      setCustomer(params?.order_cust_acnt);
    }
  }, [popup, params]);

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload]);

  const modifiers = (
    <>
      <div style={{ float: 'left' }}>
        <Select
          defaultValue="ORDER_ORD_TIME"
          onChange={setTimeOption}
          optionFilterProp="children"
          placeholder={null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {timeOptions.map((item, index) => (
            <Select.Option key={index} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div style={{ float: 'left', width: '420px' }}>
        <Calendar handleChange={setRange} start={start} end={end} />
      </div>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button 
        type="primary"
        icon={<FileSearchOutlined />} 
        onClick={() => WindowSearch(runSearch, t('operations.search'), {
          order_supp_code: !supplier, // true,
          order_cust_acnt: !customer, // true,
          order_stat_id: true,
          order_cust_no: true,
          order_ref_code: true,
        })}
      >
        {t('operations.search')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} standalone={popup}>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
      />
      {pageState !== 'view' && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          pageState={pageState}
          revalidate={revalidate}
          locateOrder={locateOrder}
        />
      )}
    </Page>
  );
};

export default OrderListings;
