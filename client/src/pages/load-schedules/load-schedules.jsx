import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, WindowSearch } from '../../components';
import { LOAD_SCHEDULES } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import { getDateRangeOffset, getCurrentTime } from 'utils';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import api from 'api';
import SourceRender from './source-render';
import _ from 'lodash';

const LoadSchedules = () => {
  const { scheduleDateRange, serverTime } = useConfig();
  
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isSearching, setSearching] = useState(false);

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

  const onRefresh = async () => {
    if (scheduleDateRange !== false) {
      const ranges = getDateRangeOffset(String(scheduleDateRange), '7');
      
      const currTime = await getCurrentTime();
      setStart(moment(currTime, SETTINGS.DATE_TIME_FORMAT).subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      setEnd(moment(currTime, SETTINGS.DATE_TIME_FORMAT).add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      // setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      // setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    }

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  }

  const locateTrip = (value) => {
    setSearch({
      shls_trip_no: value.shls_trip_no,
      supplier_code: value.supplier_code,
    })
  }

  const setSearch = (values) => {
    if (!values.shls_trip_no && 
      !values.supplier_code &&
      !values.tnkr_code && 
      !values.carrier_code && 
      !values.trip_status &&
      !values.use_date_range) {
      return;
    }

    setSearching(true);

    api
      .get(LOAD_SCHEDULES.SEARCH, {
        params: {
          shls_terminal: values.terminal,
          shls_trip_no: values.shls_trip_no,
          supplier_code: values.supplier_code,
          carrier_code: values.carrier_code,
          tnkr_code: values.tnkr_code,
          status: values.trip_status,
          start_date: values.use_date_range ? values.start_date : null,
          end_date: values.use_date_range ? values.end_date : null,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
        setSearching(false);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setSearching(false);
      });
  };

  const fields = columns(false, t);

  const components = {
    SourceRender,
  };
  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;
  // const [isLoading, setLoading] = useState(isValidating || !data);

  const page = t('pageMenu.operations');
  const name = t('pageNames.loadSchedules');

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
    } 
    
  }, [payload]);

  useEffect(() => {
    if (scheduleDateRange !== false && serverTime) {
      const ranges = getDateRangeOffset(String(scheduleDateRange), '7');
      
      if (ranges.beforeToday !== -1) {
        setStart(moment(serverTime, SETTINGS.DATE_TIME_FORMAT).subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      }

      if (ranges.afterToday !== -1) {
        setEnd(moment(serverTime, SETTINGS.DATE_TIME_FORMAT).add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      }
    }
  }, [scheduleDateRange, serverTime]);

  const modifiers = (
    <>
      
      <Calendar handleChange={setRange} start={start} end={end} max={720}/>
      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button 
        type="primary"
        icon={<FileSearchOutlined />} 
        onClick={() => WindowSearch(setSearch, t('operations.search'), {
          terminal: true,
          shls_trip_no: true,
          supplier_code: true,
          trip_status: true,
          tnkr_code: true,
          carrier_code: true,
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
        isLoading={isLoading || isSearching}
        selectionMode="single"
        components={components}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
        clearFilterPlus={revalidate}
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
