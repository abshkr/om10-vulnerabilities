import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, WindowSearch } from '../../components';
import { LOAD_SCHEDULES } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import { getDateRangeOffset } from 'utils';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import api from 'api';

const LoadSchedules = () => {
  const { scheduleDateRange } = useConfig();
  
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_LOADSCHEDULES');

  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const url = `${LOAD_SCHEDULES.READ}?start_date=${start}&end_date=${end}`;

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    // revalidate();
  };

  const locateTrip = (value) => {
    setSearch({
      shls_trip_no: value,
    })
  }

  const setSearch = (values) => {
    if (!values.shls_trip_no && 
      !values.supplier_code &&
      !values.tnkr_code && 
      !values.trip_status) {
      return;
    }
    api
      .get(LOAD_SCHEDULES.SEARCH, {
        params: {
          shls_trip_no: values.shls_trip_no,
          supplier_code: values.supplier_code,
          tnkr_code: values.tnkr_code,
          status: values.trip_status,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
      });
  };

  const fields = columns(false, t);
  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;

  const page = t('pageMenu.operations');
  const name = t('pageNames.loadSchedules');

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      payload.records = null;
    } 
    
  }, [payload]);

  useEffect(() => {
    if (scheduleDateRange !== false) {
      const ranges = getDateRangeOffset(String(scheduleDateRange), '7');
      
      if (ranges.beforeToday !== 7) {
        setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      }

      if (ranges.afterToday !== 7) {
        setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      }
    }
  }, [scheduleDateRange]);

  const modifiers = (
    <>
      
      <Calendar handleChange={setRange} start={start} end={end} />
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button 
        type="primary"
        icon={<FileSearchOutlined />} 
        onClick={() => WindowSearch(setSearch, t('operations.search'), {
          shls_trip_no: true,
          supplier_code: true,
          trip_status: true,
          tnkr_code: true,
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
    <Page page={page} name={name} modifiers={modifiers} access={access}>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
      />

      <Forms 
        value={selected} 
        visible={visible} 
        handleFormState={handleFormState} 
        access={access} url={url}
        locateTrip={locateTrip} />
    </Page>
  );
};

export default auth(LoadSchedules);
