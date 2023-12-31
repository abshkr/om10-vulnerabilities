import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'dayjs';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import {
  Page,
  DataTable,
  Download,
  PageDownloader,
  PageExporter,
  DateTimeRangePicker,
  WindowSearch,
  WindowSearchForm,
} from '../../components';
import api, { ORDER_LISTINGS } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useConfig, usePagination } from '../../hooks';

const OrderListings = ({ popup, params }) => {
  const config = useConfig();
  const rangeSetting = config.openOrderDateRange;
  const filterByExpiry = config.filterOpenOrderByExpiry;
  console.log('filterByExpiry', filterByExpiry);

  const [pagingFlag, setPagingFlag] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState(filterByExpiry ? 'ORDER_EXP_TIME' : 'ORDER_ORD_TIME');
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

  const { setCount, take, offset, paginator, setPage, count } = usePagination(200);

  const [refreshed, setRefreshed] = useState(false);
  // const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  // const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [useDateRange, setUseDateRange] = useState('N');

  const [timeOptionSearch, setTimeOptionSearch] = useState(
    filterByExpiry ? 'ORDER_EXP_TIME' : 'ORDER_ORD_TIME'
  );
  const [startTimeSearch, setStartTimeSearch] = useState(null);
  const [endTimeSearch, setEndTimeSearch] = useState(null);
  const [useSearch, setUseSearch] = useState(false);

  const [ordCustNo, setOrdCustNo] = useState('');
  const [ordSuppCode, setOrdSuppCode] = useState('');
  const [ordCustAcnt, setOrdCustAcnt] = useState('');
  const [ordStatId, setOrdStatId] = useState('');
  const [ordRefCode, setOrdRefCode] = useState('');

  const [mainUrl, setMainUrl] = useState(
    popup && supplier && customer
      ? `${ORDER_LISTINGS.READ}?start_date=${!start ? '-1' : start}&end_date=${
          !end ? '-1' : end
        }&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}`
      : `${ORDER_LISTINGS.READ}?start_date=${!start ? '-1' : start}&end_date=${
          !end ? '-1' : end
        }&time_option=${timeOption}`
  );
  const baseUrl = mainUrl;
  const url = mainUrl + `&start_num=${take}&end_num=${offset}`;

  /* const url =
    popup && supplier && customer
      ? start && end
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}`
        : null // `${ORDER_LISTINGS.READ}?order_supp_code=${supplier}&order_cust_acnt=${customer}`
      : start && end
      ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}`
      : null; */

  const { data: payload, isValidating, mutate: revalidate } = useSWR(url, { revalidateOnFocus: false });

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
    setStart(start);
    setEnd(end);
    const tempUrl =
      popup && supplier && customer
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`
        : `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&order_supp_code=${ordSuppCode}&order_cust_acnt=${ordCustAcnt}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`;
    setMainUrl(tempUrl);
    setPage(1);
  };

  const onRefresh = () => {
    setStartTimeSearch(null);
    setEndTimeSearch(null);
    setTimeOptionSearch(filterByExpiry ? 'ORDER_EXP_TIME' : 'ORDER_ORD_TIME');
    setUseDateRange('N');

    setTimeOption(filterByExpiry ? 'ORDER_EXP_TIME' : 'ORDER_ORD_TIME');
    setUseSearch(false);

    setOrdCustNo('');
    setOrdSuppCode('');
    setOrdCustAcnt('');
    setOrdStatId('');
    setOrdRefCode('');
    // const tempUrl = (popup && supplier && customer
    //   ? `${ORDER_LISTINGS.READ}?start_date=${!start?'-1':start}&end_date=${!end?'-1':end}&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`
    //   : `${ORDER_LISTINGS.READ}?start_date=${!start?'-1':start}&end_date=${!end?'-1':end}&time_option=${timeOption}&order_supp_code=${ordSuppCode}&order_cust_acnt=${ordCustAcnt}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`
    // );
    const tempUrl =
      popup && supplier && customer
        ? `${ORDER_LISTINGS.READ}?start_date=${!start ? '-1' : start}&end_date=${
            !end ? '-1' : end
          }&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}&order_stat_id=${''}&order_cust_no=${''}&order_ref_code=${''}`
        : `${ORDER_LISTINGS.READ}?start_date=${!start ? '-1' : start}&end_date=${
            !end ? '-1' : end
          }&time_option=${timeOption}&order_supp_code=${''}&order_cust_acnt=${''}&order_stat_id=${''}&order_cust_no=${''}&order_ref_code=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    if (revalidate) revalidate();

    setRefreshed(true);
    // setTimeOption(filterByExpiry?'ORDER_EXP_TIME':'ORDER_ORD_TIME');

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  const locateOrder = (value) => {
    runSearch({
      order_cust_no: value,
    });
  };

  const runSearch = (values) => {
    /* if (
      !values?.order_cust_no &&
      !supplier &&
      !values?.order_supp_code &&
      !customer &&
      !values?.order_cust_acnt &&
      !values?.order_stat_id &&
      !values?.order_ref_code &&
      !values.use_date_range
    ) {
      return;
    } */

    setSearching(true);
    setOrdCustNo(!values?.order_cust_no ? '' : values?.order_cust_no);
    setOrdSuppCode(!supplier ? (!values?.order_supp_code ? '' : values?.order_supp_code) : supplier);
    setOrdCustAcnt(!customer ? (!values?.order_cust_acnt ? '' : values?.order_cust_acnt) : customer);
    setOrdStatId(!values?.order_stat_id ? '' : values?.order_stat_id);
    setOrdRefCode(!values?.order_ref_code ? '' : values?.order_ref_code);
    setUseDateRange(!values.use_date_range ? 'N' : 'Y');
    setStartTimeSearch(values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1');
    setEndTimeSearch(values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1');
    setTimeOptionSearch(
      values.use_date_range ? values.time_option : filterByExpiry ? 'ORDER_EXP_TIME' : 'ORDER_ORD_TIME'
    );
    setUseSearch(true);

    const ordCustNo = !values?.order_cust_no ? '' : values?.order_cust_no;
    const ordSuppCode = !supplier ? (!values?.order_supp_code ? '' : values?.order_supp_code) : supplier;
    const ordCustAcnt = !customer ? (!values?.order_cust_acnt ? '' : values?.order_cust_acnt) : customer;
    const ordStatId = !values?.order_stat_id ? '' : values?.order_stat_id;
    const ordRefCode = !values?.order_ref_code ? '' : values?.order_ref_code;
    const useDateRange = !values.use_date_range ? 'N' : 'Y';
    const startTimeSearch = values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1';
    const endTimeSearch = values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1';
    const timeOptionSearch = values.use_date_range
      ? values.time_option
      : filterByExpiry
      ? 'ORDER_EXP_TIME'
      : 'ORDER_ORD_TIME';
    // const tempUrl = (popup && supplier && customer
    //   ? `${ORDER_LISTINGS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`
    //   : `${ORDER_LISTINGS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}&order_supp_code=${ordSuppCode}&order_cust_acnt=${ordCustAcnt}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`
    // );
    const tempUrl =
      popup && supplier && customer
        ? `${ORDER_LISTINGS.READ}?start_date=${startTimeSearch}&end_date=${endTimeSearch}&time_option=${timeOptionSearch}&order_supp_code=${supplier}&order_cust_acnt=${customer}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`
        : `${ORDER_LISTINGS.READ}?start_date=${startTimeSearch}&end_date=${endTimeSearch}&time_option=${timeOptionSearch}&order_supp_code=${ordSuppCode}&order_cust_acnt=${ordCustAcnt}&order_stat_id=${ordStatId}&order_cust_no=${ordCustNo}&order_ref_code=${ordRefCode}`;
    setMainUrl(tempUrl);

    setPage(1);
    if (revalidate) revalidate();
    setSearching(false);

    /* api
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
      }); */
  };

  useEffect(() => {
    if (filterByExpiry) {
      setTimeOption('ORDER_EXP_TIME');
    } else {
      setTimeOption('ORDER_ORD_TIME');
    }
  }, [filterByExpiry, setTimeOption]);

  useEffect(() => {
    if (popup && params) {
      setSupplier(params?.order_supp_code);
      setCustomer(params?.order_cust_acnt);
    }
  }, [popup, params, setSupplier, setCustomer]);

  /* useEffect(() => {
    if (payload) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload, setData]); */

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
      setCount(payload?.count || 0);
    }
  }, [payload]);

  const modifiers = (
    <>
      <div style={{ float: 'left' }}>
        <Select
          popupMatchSelectWidth={false}
          defaultValue={filterByExpiry ? 'ORDER_EXP_TIME' : 'ORDER_ORD_TIME'}
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

      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={rangeSetting}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={1000}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={onRefresh} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && <Download data={data} isLoading={isLoading} columns={fields} />}

      {pagingFlag && (
        // <PageExporter baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} columns={fields} />
        <PageDownloader
          baseUrl={baseUrl}
          startVar={'start_num'}
          endVar={'end_num'}
          pageSize={500}
          columns={fields}
        />
      )}

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearchForm(
            runSearch,
            t('operations.search'),
            {
              order_supp_code: !supplier, // true,
              order_cust_acnt: !customer, // true,
              order_stat_id: true,
              order_cust_no: true,
              order_ref_code: true,
              time_option_type: 'open_order',
              time_option: true,
            },
            {
              order_supp_code: !supplier ? ordSuppCode : supplier,
              order_cust_acnt: !customer ? ordCustAcnt : customer,
              order_stat_id: ordStatId,
              order_cust_no: ordCustNo,
              order_ref_code: ordRefCode,
              time_option_type: 'open_order',
              time_option: timeOptionSearch,
              start_date: startTimeSearch,
              end_date: endTimeSearch,
              use_date_range: useDateRange === 'Y' ? true : false,
            }
          )
        }
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
        clearFilterPlus={revalidate}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {pagingFlag ? paginator : t('fields.totalCount') + ': ' + count}
      </div>
      {pageState !== 'view' && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          config={config}
          pageState={pageState}
          revalidate={revalidate}
          locateOrder={locateOrder}
        />
      )}
    </Page>
  );
};

export default OrderListings;
