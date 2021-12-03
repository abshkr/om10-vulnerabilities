import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, PageDownloader, PageExporter, DateTimeRangePicker, WindowSearch } from '../../components';
import { LOAD_SCHEDULES } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import api from 'api';
import SourceRender from './source-render';
import _ from 'lodash';
import usePagination from 'hooks/use-pagination';

const LoadSchedules = () => {
  const config = useConfig();

  const [pagingFlag, setPagingFlag] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isSearching, setSearching] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_LOADSCHEDULES');

  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const { setCount, take, offset, paginator, setPage, count } = usePagination();
  const baseUrl = `${LOAD_SCHEDULES.READ}?start_date=${start}&end_date=${end}`;
  const url = `${LOAD_SCHEDULES.READ}?start_date=${start}&end_date=${end}&start_num=${take}&end_num=${offset}`;

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const handleFormState = (visibility, value) => {
    setSelected(value);
    setVisible(visibility);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    // revalidate();
    setSearchParams(null);
  };

  const onRefresh = () => {
    setRefreshed(true);
    setSearchParams(null);
  };

  const locateTrip = (value) => {
    setSearch({
      shls_trip_no: value.shls_trip_no,
      supplier_code: value.supplier_code,
    });
  };

  const setSearch = (values) => {
    if (
      !values.shls_trip_no &&
      !values.supplier_code &&
      !values.tnkr_code &&
      !values.carrier_code &&
      !values.trip_status &&
      !values.use_date_range
    ) {
      return;
    }

    setSearching(true);
    setSearchParams(values);

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
        setCount(res?.data?.records?.length);
        setPage(1)
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

  const fields = columns(false, t, config);

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
      setCount(payload?.count || 0);
    }
  }, [payload]);

  const modifiers = (
    <>
      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={config?.scheduleDateRange}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={720}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      {/* <Download data={data} isLoading={isLoading} columns={fields} /> */}

      {!pagingFlag && (
        <Download data={data} isLoading={isValidating} columns={fields} />
      )}

      {pagingFlag && searchParams && (
        <Download data={data} isLoading={isSearching} columns={fields} />
      )}
      
      {pagingFlag && !searchParams && (
        // <PageExporter baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} columns={fields} />
        <PageDownloader baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} pageSize={500} columns={fields} />
      )}

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(setSearch, t('operations.search'), {
            terminal: true,
            shls_trip_no: true,
            supplier_code: true,
            trip_status: true,
            tnkr_code: true,
            carrier_code: true,
          })
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {pagingFlag && !searchParams ? paginator : t('fields.totalCount') + ': ' + count }
      </div>
      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          locateTrip={locateTrip}
          default_shls_ld_type={config?.site_default_shls_ld_type}
        />
      )}
    </Page>
  );
};

export default auth(LoadSchedules);
