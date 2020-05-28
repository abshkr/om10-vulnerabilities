import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar } from '../../components';
import { ORDER_LISTINGS } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const OrderListings = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState('ORDER_ORD_TIME');
  const [pageState, setPageState] = useState('view');

  const { t } = useTranslation();
  const timeOptions = [{
    index: 1,
    code: 'ORDER_ORD_TIME', 
    name: t('fields.orderOrdTime')
  }, {
    index: 2,
    code: 'ORDER_EXP_TIME', 
    name: t('fields.orderExpTime')
  }];

  const access = useAuth('M_ORDERLISTING');

  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: payload, isValidating, revalidate } = useSWR(
    `${ORDER_LISTINGS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}`
  );

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
    /*
    if (visibility) {
      if (!value) {
        setPageState('create');
      }
      else {
        if(value.order_approved) {
          setPageState('detail');
        }
        else {
          setPageState('edit');
        }
      }
    }
    else {
      setPageState('view');
    }
    */
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.customers');
  const name = t('pageNames.orderListing');

  useEffect(() => {
    if (visible) {
      if (!selected) {
        setPageState('create');
      }
      else {
        if(selected.order_approved) {
          setPageState('detail');
        }
        else {
          setPageState('edit');
        }
      }
    }
    else {
      setPageState('view');
    }
  }, [visible, selected]);

  const modifiers = (
    <>
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

      <Calendar handleChange={setRange} start={start} end={end} />

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

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
    <Page page={page} name={name} modifiers={modifiers} access={access}>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} pageState={pageState} />
    </Page>
  );
};

export default auth(OrderListings);
