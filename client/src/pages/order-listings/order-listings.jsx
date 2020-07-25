import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, WindowSearch } from '../../components';
import api, { ORDER_LISTINGS } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useConfig } from '../../hooks';
import { getDateRangeOffset } from '../../utils';

const OrderListings = ({popup, params}) => {
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(0);

  const config = useConfig();
  const rangeSetting = config.openOrderDateRange;
  const ranges = getDateRangeOffset(config.openOrderDateRange, '30');
  //const ranges = getDateRangeOffset(false, '30');
  //const ranges = getDateRangeOffset("7~~0", '30');
  const filterByExpiry = config.filterOpenOrderByExpiry;
  console.log('filterByExpiry', filterByExpiry);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState(filterByExpiry?'ORDER_EXP_TIME':'ORDER_ORD_TIME');
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
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}`
        : null // `${ORDER_LISTINGS.READ}?order_supp_code=${supplier}&order_cust_acnt=${customer}`
      )
      : (
        start && end
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}`
        : null
      );

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  //const data = payload?.records;
  const isLoading = isValidating || !data;
  const fields = columns(t);

  const page = t('pageMenu.operations');
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
    // setStart(start);
    // setEnd(end);
    if (rangeSetting !== '-1~~-1') {
      setStart(start);
      setEnd(end);
    } else {
      setStart('-1');
      setEnd('-1');
    }
  };

  const onRefresh = () => {
    if (rangeSetting !== '-1~~-1') {
      setStart(moment().subtract(rangeStart, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      setEnd(moment().add(rangeEnd, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    } else {
      setStart('-1');
      setEnd('-1');
      revalidate();
    }
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
      !values?.order_ref_code &&
      !values.use_date_range) {
      return;
    }

    api
    .get(ORDER_LISTINGS.SEARCH, {
      params: {
        order_cust_no: values?.order_cust_no,
        order_supp_code: !supplier ? values?.order_supp_code : supplier,
        order_cust_acnt: !customer ? values?.order_cust_acnt : customer,
        order_stat_id: values?.order_stat_id,
        order_ref_code: values?.order_ref_code,
        start_date: values.use_date_range ? values.start_date : null,
        end_date: values.use_date_range ? values.end_date : null,
        time_option: values.use_date_range ? values.time_option : null,
      },
    })
    .then((res) => {
      setData(res.data.records);
    });
  };

  useEffect(() => {
    console.log("I am here: rangeStart, start", start, rangeStart);
    if (rangeSetting !== '-1~~-1') {
      setStart(moment().subtract(rangeStart, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    } else {
      setStart('-1');
    }
  }, [rangeStart]);

  useEffect(() => {
    console.log("I am here: rangeEnd, end", end, rangeEnd);
    if (rangeSetting !== '-1~~-1') {
      setEnd(moment().add(rangeEnd, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    } else {
      setEnd('-1');
    }
  }, [rangeEnd]);

  useEffect(() => {
    if (ranges) {
      if (rangeSetting !== '-1~~-1') {
        setRangeStart(ranges?.beforeToday);
        setRangeEnd(ranges?.afterToday);
      } else {
        setRangeStart(-1);
        setRangeEnd(-1);
      }
    }
  }, [ranges]);

  useEffect(() => {
    if (filterByExpiry) {
      setTimeOption('ORDER_EXP_TIME');
    }else {
      setTimeOption('ORDER_ORD_TIME');
    }
  }, [filterByExpiry]);

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
      {rangeSetting !== '-1~~-1' && (
        <div style={{ float: 'left' }}>
          <Select
            dropdownMatchSelectWidth={false}
            defaultValue={filterByExpiry?'ORDER_EXP_TIME':'ORDER_ORD_TIME'}
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
      )}

      {rangeSetting !== '-1~~-1' && (
        <div style={{ float: 'left', width: '420px' }}>
          <Calendar handleChange={setRange} start={start} end={end} max={1000} />
        </div>
      )}

      <Button icon={<SyncOutlined />} onClick={onRefresh} loading={isLoading}>
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
          time_option: "open_order",
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
        minimal={false}
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
