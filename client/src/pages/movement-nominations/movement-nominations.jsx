import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import moment from 'dayjs';
import { Button, Select, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined, EyeOutlined } from '@ant-design/icons';

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
import api, { MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import { useAuth } from '../../hooks';
import { useConfig, usePagination } from '../../hooks';
import Schedules from './forms/items/schedules';

const MovementNominations = () => {
  const config = useConfig();
  const rangeSetting = config.nominationDateRange;
  const filterByExpiry = config.filterNominationByExpiry;
  console.log('filterByExpiry', filterByExpiry);

  const [pagingFlag, setPagingFlag] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState(filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE'); //'MV_DTIM_EFFECT');
  const [data, setData] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const { t } = useTranslation();

  const timeOptions = [
    {
      index: 1,
      code: 'MV_DTIM_EFFECT',
      name: t('fields.effectiveFrom'),
    },
    {
      index: 2,
      code: 'MV_DTIM_EXPIRY',
      name: t('fields.expiredAfter'),
    },
    {
      index: 3,
      code: 'MV_DTIM_CREATE',
      name: t('fields.createdAt'),
    },
    /* {
      index: 4,
      code: 'MV_DTIM_CHANGE',
      name: t('fields.lastModified'),
    }, */
  ];

  const access = useAuth('M_NOMINATION');

  const { setCount, take, offset, paginator, setPage, count } = usePagination(200);

  const [refreshed, setRefreshed] = useState(false);
  // const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  // const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [useDateRange, setUseDateRange] = useState('N');

  const [timeOptionSearch, setTimeOptionSearch] = useState(
    filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE'
  ); //'MV_DTIM_EFFECT');
  const [startTimeSearch, setStartTimeSearch] = useState(null);
  const [endTimeSearch, setEndTimeSearch] = useState(null);
  const [useSearch, setUseSearch] = useState(false);

  const [movKey, setMovKey] = useState('');
  const [movStatus, setMovStatus] = useState('');
  const [movSrcType, setMovSrcType] = useState('');
  const [movTerminal, setMovTerminal] = useState('');
  const [movNumber, setMovNumber] = useState('');

  // const [mainUrl, setMainUrl] = useState(`${MOVEMENT_NOMIATIONS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}`);
  const [mainUrl, setMainUrl] = useState(
    `${MOVEMENT_NOMIATIONS.READ}?start_date=${!start ? '-1' : start}&end_date=${
      !end ? '-1' : end
    }&time_option=${timeOption}`
  );
  const baseUrl = mainUrl;
  const url = mainUrl + `&start_num=${take}&end_num=${offset}`;

  /* const baseUrl =
    start && end
      ? `${MOVEMENT_NOMIATIONS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}&mv_key=${movKey}&mv_status=${movStatus}&mv_srctype=${movSrcType}&mv_terminal=${movTerminal}&mv_number=${movNumber}`
      : null;

  const url =
    start && end
      ? `${MOVEMENT_NOMIATIONS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}&mv_key=${movKey}&mv_status=${movStatus}&mv_srctype=${movSrcType}&mv_terminal=${movTerminal}&mv_number=${movNumber}&start_num=${take}&end_num=${offset}`
      : null; */

  const { data: payload, isValidating, mutate: revalidate } = useSWR(url, { revalidateOnFocus: false });
  /* const { data: payload, isValidating, mutate: revalidate } = useSWR({url: `${MOVEMENT_NOMIATIONS.READ}`, args: {
    use_range: useDateRange, 
    start_date: start, 
    end_date: end, 
    time_option: timeOption, 
    mv_key: movKey,
    mv_status: movStatus,
    mv_srctype: movSrcType,
    mv_terminal: movTerminal,
    mv_number: movNumber,
    start_num: take,
    end_num: offset,
  }}, { revalidateOnFocus: false }); */

  //const data = payload?.records;
  const isLoading = isValidating || !data;
  const fields = columns(t, config);

  const page = t('pageMenu.operations');
  const name = t('pageNames.movementNominations');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    const tempUrl = `${MOVEMENT_NOMIATIONS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}&mv_key=${movKey}&mv_status=${movStatus}&mv_srctype=${movSrcType}&mv_terminal=${movTerminal}&mv_number=${movNumber}`;
    setMainUrl(tempUrl);
    setPage(1);
  };

  const onRefresh = () => {
    // setStart(start);
    // setEnd(end);

    setStartTimeSearch(null);
    setEndTimeSearch(null);
    setTimeOptionSearch(filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE');
    setUseDateRange('N');

    setTimeOption(filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE');
    setUseSearch(false);

    setMovKey('');
    setMovStatus('');
    setMovSrcType('');
    setMovTerminal('');
    setMovNumber('');
    // const tempUrl = `${MOVEMENT_NOMIATIONS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}`;
    const tempUrl = `${MOVEMENT_NOMIATIONS.READ}?start_date=${!start ? '-1' : start}&end_date=${
      !end ? '-1' : end
    }&time_option=${timeOption}`;
    setMainUrl(tempUrl);

    setPage(1);
    if (revalidate) revalidate();

    setRefreshed(true);
    // setTimeOption(filterByExpiry?'MV_DTIM_EXPIRY':'MV_DTIM_CREATE');

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  const locateNomination = (value) => {
    runSearch({
      mv_key: value,
    });
  };

  const runSearch = (values) => {
    /* if (
      !values?.mv_key &&
      !values?.mv_status &&
      !values?.mv_srctype &&
      !values?.mv_terminal &&
      !values?.mv_number &&
      !values.use_date_range
    ) {
      revalidate();
      return;
    } */

    setSearching(true);
    setMovKey(!values.mv_key ? '' : values?.mv_key);
    setMovStatus(!values.mv_status ? '' : values?.mv_status);
    setMovSrcType(!values.mv_srctype ? '' : values?.mv_srctype);
    setMovTerminal(!values.mv_terminal ? '' : values?.mv_terminal);
    setMovNumber(!values.mv_number ? '' : values?.mv_number);
    setUseDateRange(!values.use_date_range ? 'N' : 'Y');
    setStartTimeSearch(values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1');
    setEndTimeSearch(values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1');
    setTimeOptionSearch(
      values.use_date_range ? values.time_option : filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE'
    );
    setUseSearch(true);

    const movKey = !values.mv_key ? '' : values?.mv_key;
    const movStatus = !values.mv_status ? '' : values?.mv_status;
    const movSrcType = !values.mv_srctype ? '' : values?.mv_srctype;
    const movTerminal = !values.mv_terminal ? '' : values?.mv_terminal;
    const movNumber = !values.mv_number ? '' : values?.mv_number;
    const useDateRange = !values.use_date_range ? 'N' : 'Y';
    const startTimeSearch = values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1';
    const endTimeSearch = values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1';
    const timeOptionSearch = values.use_date_range
      ? values.time_option
      : filterByExpiry
      ? 'MV_DTIM_EXPIRY'
      : 'MV_DTIM_CREATE';
    // const tempUrl = `${MOVEMENT_NOMIATIONS.READ}?start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&time_option=${useSearch?timeOptionSearch:timeOption}&mv_key=${movKey}&mv_status=${movStatus}&mv_srctype=${movSrcType}&mv_terminal=${movTerminal}&mv_number=${movNumber}`;
    const tempUrl = `${MOVEMENT_NOMIATIONS.READ}?start_date=${startTimeSearch}&end_date=${endTimeSearch}&time_option=${timeOptionSearch}&mv_key=${movKey}&mv_status=${movStatus}&mv_srctype=${movSrcType}&mv_terminal=${movTerminal}&mv_number=${movNumber}`;
    setMainUrl(tempUrl);

    setPage(1);
    if (revalidate) revalidate();
    setSearching(false);

    /* api
      .get(MOVEMENT_NOMIATIONS.SEARCH, {
        params: {
          mv_key: values?.mv_key,
          mv_status: values?.mv_status,
          mv_srctype: values?.mv_srctype,
          mv_terminal: values?.mv_terminal,
          mv_number: values?.mv_number,
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
      setTimeOption('MV_DTIM_EXPIRY');
    } else {
      setTimeOption('MV_DTIM_CREATE');
    }
  }, [filterByExpiry]);

  /* useEffect(() => {
    if (payload) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload]); */

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
          defaultValue={filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE'}
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
        max={2000}
        // localBased={true}
      />

      <Button type="primary" icon={<EyeOutlined />} disabled={false} onClick={() => setScheduleOpen(true)}>
        {t('pageMenu.schedules')}
      </Button>

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
              mv_key: true,
              mv_status: true,
              mv_srctype: true,
              mv_terminal: true,
              mv_number: true,
              time_option_type: 'movement_nomination',
              time_option: true,
            },
            {
              mv_key: movKey,
              mv_status: movStatus,
              mv_srctype: movSrcType,
              mv_terminal: movTerminal,
              mv_number: movNumber,
              time_option_type: 'movement_nomination',
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
    <>
      {scheduleOpen && (
        <Drawer
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => setScheduleOpen(false)}
          open={scheduleOpen}
          width="100vw"
        >
          <Schedules selected={null} />
        </Drawer>
      )}
      <Page page={page} name={name} modifiers={modifiers} access={access}>
        <DataTable
          columns={fields}
          data={data}
          isLoading={isValidating}
          selectionMode="single"
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
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

        {visible && (
          <Forms
            value={selected}
            visible={visible}
            handleFormState={handleFormState}
            access={access}
            url={url}
            locateNomination={locateNomination}
            config={config}
          />
        )}
      </Page>
    </>
  );
};

export default auth(MovementNominations);
