import React, { useState, useEffect, useRef } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, notification, Switch, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import {
  Page,
  PowerTable as DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  PageExporter,
  DateTimeRangePicker,
  WindowSearch,
  WindowSearchForm,
} from '../../components';
import { LOAD_SCHEDULES, SITE_CONFIGURATION } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import StagingForms from './forms/staging-forms';
import StagingBay from './staging-bay';
import api from 'api';
import SourceRender from './source-render';
import ConvertTraceRender from './convert-trace-render';
import TripStatusRender from './trip-status-render';
import PickupModeRender from './pickup-mode-render';
import _ from 'lodash';
import usePagination from 'hooks/use-pagination';

const LoadSchedules = () => {
  const config = useConfig();
  const {
    siteSchdPaging,
    siteUseDownloader,
    siteCustomColumnSchedule,
    siteUseStagingBay,
    siteListPickupLoad,
  } = config;

  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [pickupFlag, setPickupFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isStaging, setStaging] = useState(false);

  const { t } = useTranslation();

  const access = useAuth('M_LOADSCHEDULES');

  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [useDateRange, setUseDateRange] = useState('N');

  const [startTimeSearch, setStartTimeSearch] = useState(null);
  const [endTimeSearch, setEndTimeSearch] = useState(null);
  const [useSearch, setUseSearch] = useState(false);

  const [tripTerminal, setTripTerminal] = useState('');
  const [tripPickupMode, setTripPickupMode] = useState('');
  const [tripNumber, setTripNumber] = useState('');
  const [tripSupplier, setTripSupplier] = useState('');
  const [tripCarrier, setTripCarrier] = useState('');
  const [tripTanker, setTripTanker] = useState('');
  const [tripStatus, setTripStatus] = useState('');

  const [mainUrl, setMainUrl] = useState(
    `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${pickupFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url = !pagingFlag && siteUseDownloader ? null : mainUrl + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const fields = columns(false, t, config);

  const components = {
    SourceRender,
    ConvertTraceRender,
    TripStatusRender,
    PickupModeRender,
  };
  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;
  // const [isLoading, setLoading] = useState(isValidating || !data);

  const page = t('pageMenu.operations');
  const name = t('pageNames.loadSchedules');

  /*
    siteUseStagingBay = false
      isStaging = false
        Load Schedule Trip:                 Normal Form

    siteUseStagingBay = true
      CREATE
        isStaging = true
          Pickup Schedule Trip:             Staging Bay
        isStaging = false
          Load Schedule Trip:               Staging Form without Pickup Schedule and Staged Schedule 
      UPDATE
        isStaging = true
          Pickup Schedule Trip              Staging Bay
        isStaging = false
          Load or Staged Schedule Trip:     Staging Form without Pickup Schedule
  */
  const handleFormState = (visibility, value) => {
    if (siteUseStagingBay) {
      if (visibility && !value) {
        Modal.confirm({
          title: t('prompts.isPickupLoad'),
          icon: <ExclamationCircleOutlined />,
          okText: t('operations.no'),
          cancelText: t('operations.yes'),
          centered: true,
          onOk() {
            setStaging(false);

            setSelected(value);
            setVisible(visibility);
          },
          onCancel() {
            setStaging(true);

            setSelected(value);
            setVisible(visibility);
          },
        });
      } else {
        setSelected(value);
        setVisible(visibility);
        if (visibility && value && value?.shls_pickup_mode === '1') {
          setStaging(true);
        } else {
          setStaging(false);
        }
      }
    } else {
      setSelected(value);
      setVisible(visibility);
      setStaging(false);
    }
  };

  const onChangePickupFlag = async (v) => {
    if (!pagingFlag) {
      setData([]);
    }

    const tempUrl = `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${
      v ? 'Y' : 'N'
    }&start_date=${!start ? '-1' : start}&end_date=${
      !end ? '-1' : end
    }&shls_terminal=${tripTerminal}&shls_trip_no=${tripNumber}&supplier_code=${tripSupplier}&carrier_code=${tripCarrier}&tnkr_code=${tripTanker}&status=${tripStatus}&shls_pickup_mode=${tripPickupMode}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);

    setPickupFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_LIST_PICKUP_LOAD',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${LOAD_SCHEDULES.READ}?pgflag=${v ? 'Y' : 'N'}&pkupflag=${
      pickupFlag ? 'Y' : 'N'
    }&start_date=${!start ? '-1' : start}&end_date=${
      !end ? '-1' : end
    }&shls_terminal=${tripTerminal}&shls_trip_no=${tripNumber}&supplier_code=${tripSupplier}&carrier_code=${tripCarrier}&tnkr_code=${tripTanker}&status=${tripStatus}&shls_pickup_mode=${tripPickupMode}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_SCHD_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const setRange = (start, end) => {
    // revalidate();
    const tempUrl = `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${
      pickupFlag ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&shls_terminal=${tripTerminal}&shls_trip_no=${tripNumber}&supplier_code=${tripSupplier}&carrier_code=${tripCarrier}&tnkr_code=${tripTanker}&status=${tripStatus}&shls_pickup_mode=${tripPickupMode}`;
    setMainUrl(tempUrl);
    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setStart(start);
    setEnd(end);
  };

  const onRefresh = () => {
    if (!pagingFlag) {
      setData([]);
    }

    setStartTimeSearch(null);
    setEndTimeSearch(null);
    setUseDateRange('N');

    setUseSearch(false);

    setTripTerminal('');
    setTripNumber('');
    setTripSupplier('');
    setTripCarrier('');
    setTripTanker('');
    setTripStatus('');
    /* // const tempUrl = (
    //   `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${pickupFlag ? 'Y' : 'N'}&start_date=${!start?'-1':start}&end_date=${!end?'-1':end}&shls_terminal=${tripTerminal}&shls_trip_no=${tripNumber}&supplier_code=${tripSupplier}&carrier_code=${tripCarrier}&tnkr_code=${tripTanker}&status=${tripStatus}&shls_pickup_mode=${tripPickupMode}`
    // );
    const tempUrl = `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${pickupFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${
      !end ? '-1' : end
    }&shls_terminal=${''}&shls_trip_no=${''}&supplier_code=${''}&carrier_code=${''}&tnkr_code=${''}&status=${''}&shls_pickup_mode=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate(); */

    // this will trigger setRange so the above lines are not needed
    setRefreshed(true);
  };

  const locateTrip = (value) => {
    setSearch({
      shls_trip_no: value.shls_trip_no,
      supplier_code: value.supplier_code,
    });
  };

  const setSearch = (values) => {
    /* if (
      !values.shls_trip_no &&
      !values.supplier_code &&
      !values.tnkr_code &&
      !values.carrier_code &&
      !values.trip_status &&
      !values.use_date_range
    ) {
      return;
    } */

    if (!pagingFlag) {
      setData([]);
    }

    setSearching(true);

    setTripTerminal(!values?.terminal ? '' : values?.terminal);
    setTripPickupMode(!values?.shls_pickup_mode ? '' : values?.shls_pickup_mode);
    setTripNumber(!values?.shls_trip_no ? '' : values?.shls_trip_no);
    setTripSupplier(!values?.supplier_code ? '' : values?.supplier_code);
    setTripCarrier(!values?.carrier_code ? '' : values?.carrier_code);
    setTripTanker(!values?.tnkr_code ? '' : values?.tnkr_code);
    setTripStatus(!values?.trip_status ? '' : values?.trip_status);
    setUseDateRange(!values.use_date_range ? 'N' : 'Y');
    setStartTimeSearch(values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1');
    setEndTimeSearch(values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1');
    setUseSearch(true);

    const tripPickupMode = !values?.shls_pickup_mode ? '' : values?.shls_pickup_mode;
    const tripNumber = !values?.shls_trip_no ? '' : values?.shls_trip_no;
    const tripSupplier = !values?.supplier_code ? '' : values?.supplier_code;
    const tripCarrier = !values?.carrier_code ? '' : values?.carrier_code;
    const tripTanker = !values?.tnkr_code ? '' : values?.tnkr_code;
    const tripStatus = !values?.trip_status ? '' : values?.trip_status;
    const useDateRange = !values.use_date_range ? 'N' : 'Y';
    const startTimeSearch = values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1';
    const endTimeSearch = values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1';
    // const tempUrl = (
    //   `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${pickupFlag ? 'Y' : 'N'}&start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&shls_terminal=${tripTerminal}&shls_trip_no=${tripNumber}&supplier_code=${tripSupplier}&carrier_code=${tripCarrier}&tnkr_code=${tripTanker}&status=${tripStatus}&shls_pickup_mode=${tripPickupMode}`
    // );
    const tempUrl = `${LOAD_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&pkupflag=${
      pickupFlag ? 'Y' : 'N'
    }&start_date=${startTimeSearch}&end_date=${endTimeSearch}&shls_terminal=${tripTerminal}&shls_trip_no=${tripNumber}&supplier_code=${tripSupplier}&carrier_code=${tripCarrier}&tnkr_code=${tripTanker}&status=${tripStatus}&shls_pickup_mode=${tripPickupMode}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
    setSearching(false);

    /* api
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
      }); */
  };

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
      setCount(payload?.count || 0);
    }
  }, [payload]);

  useEffect(() => {
    if (siteSchdPaging !== undefined) {
      setPagingFlag(siteSchdPaging);
    }
  }, [siteSchdPaging]);

  useEffect(() => {
    if (siteUseStagingBay !== undefined && siteListPickupLoad !== undefined) {
      if (siteUseStagingBay) {
        setPickupFlag(siteListPickupLoad);
      } else {
        setPickupFlag(false);
      }
      setPage(1);
      setRunUrlFlag(!pagingFlag);
    }
  }, [siteUseStagingBay, siteListPickupLoad]);

  useEffect(() => {
    if (isValidating !== undefined) {
      setDownloading(isValidating);
    }
  }, [isValidating]);

  const modifiers = (
    <>
      {siteUseStagingBay && (
        <Switch
          style={{ marginRight: 5 }}
          checked={pickupFlag}
          checkedChildren={<span>{t('operations.pickupLoadShow')}</span>}
          unCheckedChildren={<span>{t('operations.pickupLoadHide')}</span>}
          onChange={(value) => onChangePickupFlag(value)}
        />
      )}
      <Switch
        style={{ marginRight: 5 }}
        checked={pagingFlag}
        checkedChildren={<span>{t('operations.paginationOn')}</span>}
        unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
        onChange={(value) => onChangePagination(value)}
      />
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

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isDownloading || isSearching}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && <Download data={data} isLoading={isDownloading || isSearching} columns={fields} />}

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
            setSearch,
            t('operations.search'),
            {
              terminal: true,
              shls_trip_no: true,
              supplier_code: true,
              shls_pickup_mode: siteUseStagingBay,
              trip_status: true,
              tnkr_code: true,
              carrier_code: true,
            },
            {
              terminal: tripTerminal,
              shls_trip_no: tripNumber,
              supplier_code: tripSupplier,
              shls_pickup_mode: tripPickupMode,
              trip_status: tripStatus,
              tnkr_code: tripTanker,
              carrier_code: tripCarrier,
              start_date: startTimeSearch,
              end_date: endTimeSearch,
              use_date_range: useDateRange === 'Y' ? true : false,
            },
            true, // rangeRequired
            false, // timeRequired
            { pickupFlag: pickupFlag }
          )
        }
      >
        {t('operations.search')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isDownloading || isSearching}
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
        isLoading={isDownloading || isSearching}
        selectionMode="single"
        components={components}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
        clearFilterPlus={revalidate}
        columnAdjustable={siteCustomColumnSchedule}
        pageModule={'M_LOADSCHEDULES'}
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
        {/* pagingFlag ? paginator : t('fields.totalCount') + ': ' + count */}
        {pagingFlag ? (
          paginator
        ) : siteUseDownloader === false ? (
          t('fields.totalCount') + ': ' + count
        ) : (
          <DataDownloader
            baseUrl={mainUrl.replace('pgflag=N', 'pgflag=Y')}
            startVar={'start_num'}
            endVar={'end_num'}
            pageSize={500}
            setData={setData}
            setDownloading={setDownloading}
            runUrl={runUrlFlag.current}
            setRunUrl={setRunUrlFlag}
          />
        )}
      </div>
      {visible && !siteUseStagingBay && (
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
      {visible && siteUseStagingBay && !isStaging && (
        <StagingForms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          locateTrip={locateTrip}
          default_shls_ld_type={config?.site_default_shls_ld_type}
        />
      )}
      {visible && siteUseStagingBay && isStaging && (
        <StagingBay
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          locateTrip={locateTrip}
          default_shls_ld_type={'2'}
        />
      )}
    </Page>
  );
};

export default auth(LoadSchedules);
