import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Form, Button, Select, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { CloseOutlined, SyncOutlined, FileSearchOutlined } from '@ant-design/icons';

import { DataTable, Calendar, WindowSearch } from '../../components';
import api, { ORDER_LISTINGS } from '../../api';
import { SETTINGS } from '../../constants';
import { useConfig } from '../../hooks';
import { getDateRangeOffset } from '../../utils';

import columns from './columns';
import Forms from './forms';

const OrderPicker = ({params, onClose, modal}) => {
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
  const [item, setItem] = useState(null);
  const [timeOption, setTimeOption] = useState(filterByExpiry?'ORDER_EXP_TIME':'ORDER_ORD_TIME');
  const [pageState, setPageState] = useState('view');
  const [supplier, setSupplier] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [data, setData] = useState(null);

  const { t } = useTranslation();
  const [form] = Form.useForm();

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

  const access = {
    isProtected: false,
    isLoading: true,
    canDelete: false,
    canUpdate: false,
    canCreate: false,
    canView: true,
    extra: false
  };

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const url =
    // supplier && customer
    supplier
      ? (
        start && end
        // ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&order_supp_code=${supplier}&order_cust_acnt=${customer}`
        ? `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&order_supp_code=${supplier}`
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
  const fields = columns(t, config);

  // const page = t('pageMenu.operations');
  // const name = t('pageNames.orderListing');

  const onFinish = () => {
    modal.destroy();
    // onClose(selected?.order_cust_no);
    // onClose(item?.order_cust_ordno);
    onClose(item);
  };

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
    setPageState(visibility ? 'detail' : 'view');
  };

  const checkOrder = (value) => {
    let is_available=false;
    let is_approved=value?.order_approved;
    let stat_id=value?.order_stat_id;
    let error='';
    
    // check if the open order has been approved
    if ( is_approved === false ) {
      is_available = false;
      error = t('descriptions.schdOrderRejectNotApproved')
    } else {
      // check if the open order has been expired
      if ( stat_id === '6' ) { //6	EXPIRED
        is_available = false;
        error = t('descriptions.schdOrderRejectExpired');
      } else {
        is_available = true;

        if ( stat_id === '0' || stat_id === '1' ) { //0 NEW or 1 PARTIALLY SCHEDULED
          is_available = true;
          error = '';
        }
        else if ( stat_id === '2' ) { //2	FULLY SCHEDULED
          is_available = false;
          error = t('descriptions.schdOrderRejectFullyScheduled');
        }
        else if ( stat_id === '3' ) { //3	FULLY LOADED
          is_available = false;
          error = t('descriptions.schdOrderRejectFullyLoaded');
        }
        else if ( stat_id === '4' ) { //4	OUTSTANDING
          is_available = false;
          error = t('descriptions.schdOrderRejectOutstanding');
        }
        else if ( stat_id === '5' ) { //5	FULLY DELIVERED
          is_available = false;
          error = t('descriptions.schdOrderRejectFullyDelivered');
        }
        else if ( stat_id === '7' ) { //7	PARTIALLY LOADED
          is_available = false;
          error = t('descriptions.schdOrderRejectPartiallyLoaded');
        }
        else if ( stat_id === '8' ) { //8	PARTIALLY DELIVERED
          is_available = false;
          error = t('descriptions.schdOrderRejectPartiallyDelivered');
        }
        else {
          is_available = false;
          error = t('descriptions.schdOrderRejectUnknownStatus');
        }							
      }
    }
    
    if (error?.length > 0 && !is_available) {
      console.log(".............I am here: checkOrder", error, is_available);
      notification.error({
        message: t('descriptions.schdOrderReject'),
        description: error,
      });
      error = null;
    }
    return is_available;
  }

  const handleOrderSelect = (option) => {
    console.log(".............I am here: handleOrderSelect");
    const available = checkOrder(option);
    if (available) {
      handleFormState(true, option);
    } else {
      // handleFormState(false, null);
    }
  };

  const setRange = (start, end) => {
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
    // console.log("I am here: rangeStart, start", start, rangeStart);
    if (rangeSetting !== '-1~~-1') {
      setStart(moment().subtract(rangeStart, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    } else {
      setStart('-1');
    }
  }, [rangeStart, rangeSetting]);

  useEffect(() => {
    // console.log("I am here: rangeEnd, end", end, rangeEnd);
    if (rangeSetting !== '-1~~-1') {
      setEnd(moment().add(rangeEnd, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    } else {
      setEnd('-1');
    }
  }, [rangeEnd, rangeSetting]);

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
  }, [ranges, rangeSetting]);

  useEffect(() => {
    if (filterByExpiry) {
      setTimeOption('ORDER_EXP_TIME');
    }else {
      setTimeOption('ORDER_ORD_TIME');
    }
  }, [filterByExpiry]);

  useEffect(() => {
    if (params) {
      setSupplier(params?.order_supp_code);
    }
  }, [params]);

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
    </>
  );

  return (
    <div>
      <DataTable
        minimal={false}
        data={data}
        columns={fields}
        extra={modifiers}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleOrderSelect(payload)}
        handleSelect={(payload) => handleOrderSelect(payload[0])}
        autoColWidth
        clearFilterPlus={revalidate}
      />
      {pageState !== 'view' && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          config={config}
          pageState={pageState}
          item={item}
          setItem={setItem}
          onClose={onClose}
          modal={modal}
          params={params}
        />
      )}
      
      <div style={{marginTop: "10px"}}>
        { t('descriptions.schdOrderNote') }
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => modal.destroy()}
        >
          {t('operations.cancel')}
        </Button>
      </div>
    </div>
  );
};

export default OrderPicker;
