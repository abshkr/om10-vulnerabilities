import React, { useEffect, useState, useRef } from 'react';

import moment from 'moment';
import { Radio, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';
import Overview from './overview';
import api, { SITE_CONFIGURATION, JOURNAL } from 'api';

import {
  Page,
  Calendar,
  Download,
  DataDownloader,
  PageDownloader,
  PageExporter,
  WindowSearch,
  WindowSearchForm,
} from '../../components';
import { JournalContainer } from './style';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig, usePagination } from 'hooks';
import { FileSearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { getDateRangeOffset, getCurrentTime } from 'utils';

const { TabPane } = Tabs;

const Journal = () => {
  const { journalDateRange, serverTime, siteJnlPaging, siteJnlTabMode, siteUseDownloader } = useConfig();

  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const { t } = useTranslation();
  const tabMode = siteJnlTabMode; // true: tabs; false: menu items
  const useDownloader = true; // siteUseDownloader;

  const access = useAuth('M_JOURNALREPORT');

  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const [selected, setSelected] = useState('1');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);

  const [start, setStart] = useState(moment().subtract(1, 'hour').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));
  const [useDateRange, setUseDateRange] = useState('Y');

  const [startTimeSearch, setStartTimeSearch] = useState(null);
  const [endTimeSearch, setEndTimeSearch] = useState(null);
  const [useSearch, setUseSearch] = useState(false);

  const [msgEvent, setMsgEvent] = useState('');
  const [msgClass, setMsgClass] = useState('');
  const [msgDetails, setMsgDetails] = useState('');

  const [mainUrl, setMainUrl] = useState(
    `${JOURNAL.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${start}&end_date=${end}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url =
    !pagingFlag && useDownloader
      ? null
      : mainUrl + `&start_num=${take}&end_num=${offset}${sortBy ? `&sort_by=${sortBy}` : ''}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  const setRange = (start, end) => {
    const tempUrl = `${JOURNAL.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&msg_event=${msgEvent}&msg_class=${msgClass}&target_str=${msgDetails}`;
    setMainUrl(tempUrl);
    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setStart(start);
    setEnd(end);
  };

  const doSearch = (values) => {
    setSearch(values);
  };

  const revalidate = () => {
    // setSearch(null);
  };

  const onRefresh = async () => {
    if (!pagingFlag) {
      setData([]);
    }

    let startTime = start;
    let endTime = end;
    if (journalDateRange !== false) {
      const ranges = getDateRangeOffset(String(journalDateRange), '0.125');

      const currTime = await getCurrentTime();
      startTime = moment(currTime, SETTINGS.DATE_TIME_FORMAT)
        .subtract(ranges.beforeToday * 24, 'hour')
        .format(SETTINGS.DATE_TIME_FORMAT);
      endTime = moment(currTime, SETTINGS.DATE_TIME_FORMAT)
        .add(ranges.afterToday * 24, 'hour')
        .format(SETTINGS.DATE_TIME_FORMAT);
      // setStart(startTime);
      // setEnd(endTime);
    }

    setStartTimeSearch(null);
    setEndTimeSearch(null);
    setUseDateRange('N');

    setUseSearch(false);

    setMsgEvent('');
    setMsgClass('');
    setMsgDetails('');
    // const tempUrl = (
    //   `${JOURNAL.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${start}&end_date=${end}&msg_event=${msgEvent}&msg_class=${msgClass}&target_str=${msgDetails}`
    // );
    const tempUrl = `${JOURNAL.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${startTime}&end_date=${endTime}&msg_event=${''}&msg_class=${''}&target_str=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setStart(startTime);
    setEnd(endTime);
  };

  const setSearch = (values) => {
    if (!pagingFlag) {
      setData([]);
    }

    setSearching(true);

    setMsgEvent(!values?.msg_event ? '' : values?.msg_event);
    setMsgClass(!values?.msg_class ? '' : values?.msg_class);
    setMsgDetails(!values?.target_str ? '' : values?.target_str);
    setUseDateRange(!values.use_date_range ? 'N' : 'Y');
    setStartTimeSearch(values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1');
    setEndTimeSearch(values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1');
    setUseSearch(true);

    const msgEvent = !values?.msg_event ? '' : values?.msg_event;
    const msgClass = !values?.msg_class ? '' : values?.msg_class;
    const msgDetails = !values?.target_str ? '' : values?.target_str;
    const useDateRange = !values.use_date_range ? 'N' : 'Y';
    const startTimeSearch = values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1';
    const endTimeSearch = values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1';
    // const tempUrl = (
    //   `${JOURNAL.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&msg_event=${msgEvent}&msg_class=${msgClass}&target_str=${msgDetails}`
    // );
    const tempUrl = `${JOURNAL.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${startTimeSearch}&end_date=${endTimeSearch}&msg_event=${msgEvent}&msg_class=${msgClass}&target_str=${msgDetails}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
    setSearching(false);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${JOURNAL.READ}?pgflag=${
      v ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&msg_event=${msgEvent}&msg_class=${msgClass}&target_str=${msgDetails}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_JNL_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  useEffect(() => {
    if (journalDateRange !== false && serverTime) {
      const ranges = getDateRangeOffset(String(journalDateRange), '0.125');

      let startTime = start;
      let endTime = end;
      if (ranges.beforeToday !== -1) {
        startTime = moment(serverTime, SETTINGS.DATE_TIME_FORMAT)
          .subtract(ranges.beforeToday * 24, 'hour')
          .format(SETTINGS.DATE_TIME_FORMAT);
        // setStart(startTime);
      }

      if (ranges.afterToday !== -1) {
        endTime = moment(serverTime, SETTINGS.DATE_TIME_FORMAT)
          .add(ranges.afterToday * 24, 'hour')
          .format(SETTINGS.DATE_TIME_FORMAT);
        // setEnd(endTime);
      }

      const tempUrl = `${JOURNAL.READ}?pgflag=${
        pagingFlag ? 'Y' : 'N'
      }&start_date=${startTime}&end_date=${endTime}&msg_event=${msgEvent}&msg_class=${msgClass}&target_str=${msgDetails}`;
      setMainUrl(tempUrl);
      setPage(1);
      setRunUrlFlag(!pagingFlag);
      // if (revalidate) revalidate();

      setStart(startTime);
      setEnd(endTime);
    }
  }, [journalDateRange, serverTime]);

  useEffect(() => {
    if (siteJnlPaging !== undefined) {
      setPagingFlag(siteJnlPaging);
    }
  }, [siteJnlPaging]);

  const modifiers = (
    <>
      {selected !== '1' && selected !== '0' && (
        <React.Fragment>
          <Switch
            style={{ marginRight: 5 }}
            checked={pagingFlag}
            checkedChildren={<span>{t('operations.paginationOn')}</span>}
            unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
            onChange={(value) => onChangePagination(value)}
          />
          <Calendar handleChange={setRange} start={start} end={end} disabled={selected === '1'} />
        </React.Fragment>
      )}

      {selected !== '0' && (
        <Button
          icon={<SyncOutlined />}
          onClick={() => onRefresh()}
          disabled={selected === '1'}
          loading={isDownloading || isSearching}
        >
          {t('operations.refresh')}
        </Button>
      )}

      {selected === '1' && <Download data={data} columns={fields} isLoading={isDownloading || isSearching} />}

      {!pagingFlag && selected === '2' && (
        <Download data={data} columns={fields} isLoading={isDownloading || isSearching} />
      )}

      {pagingFlag && selected === '2' && (
        // <PageExporter baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} columns={fields} />
        <PageDownloader
          baseUrl={baseUrl}
          startVar={'start_num'}
          endVar={'end_num'}
          pageSize={500}
          columns={fields}
        />
      )}

      {selected !== '0' && (
        <Button
          type="primary"
          icon={<FileSearchOutlined />}
          disabled={selected === '1'}
          onClick={() =>
            WindowSearchForm(
              doSearch,
              t('operations.search'),
              {
                journal_msg: true,
                journal_event: true,
                journal_category: true,
              },
              {
                msg_event: msgEvent,
                msg_class: msgClass,
                target_str: msgDetails,
                start_date: startTimeSearch,
                end_date: endTimeSearch,
                use_date_range: useDateRange === 'Y' ? true : false,
              }
            )
          }
        >
          {t('operations.search')}
        </Button>
      )}

      {!tabMode && (
        <Radio.Group
          style={{ marginLeft: 5 }}
          value={selected}
          buttonStyle="solid"
          onChange={(val) => {
            // setSearch(null);
            setSelected(val.target.value);
          }}
        >
          <Radio.Button value="0"> {t('tabColumns.overview')}</Radio.Button>
          <Radio.Button value="1"> {t('tabColumns.liveJournal')}</Radio.Button>
          <Radio.Button value="2"> {t('tabColumns.historicalJournal')} </Radio.Button>
        </Radio.Group>
      )}
    </>
  );

  const downloader =
    useDownloader === false ? (
      t('fields.totalCount') + ': ' + count
    ) : (
      <DataDownloader
        baseUrl={pageUrl}
        startVar={'start_num'}
        endVar={'end_num'}
        pageSize={1000}
        setData={setData}
        setDownloading={setDownloading}
        runUrl={runUrlFlag.current}
        setRunUrl={setRunUrlFlag}
      />
    );

  const doTabChanges = (tabPaneKey) => {
    setSelected(tabPaneKey);
    setRange(start, end);
  };

  return (
    <Page
      page={t('pageMenu.reports')}
      name={t('pageNames.journal')}
      modifiers={modifiers}
      avatar="journal"
      access={access}
    >
      <JournalContainer>
        {tabMode && (
          <Tabs defaultActiveKey="1" onChange={doTabChanges} size="small" type="card">
            <TabPane tab={t('tabColumns.overview')} key="0">
              {selected === '0' && (
                <Overview
                  start={start}
                  end={end}
                  doSearch={doSearch}
                  setTab={setSelected}
                  setRange={setRange}
                />
              )}
            </TabPane>
            <TabPane tab={t('tabColumns.liveJournal')} key="1">
              {selected === '1' && (
                <Live t={t} setData={setData} setFields={setFields} setDownloading={setDownloading} />
              )}
            </TabPane>
            <TabPane tab={t('tabColumns.historicalJournal')} key="2">
              {selected === '2' && (
                <Historical
                  t={t}
                  data={data}
                  setData={setData}
                  setFields={setFields}
                  url={url}
                  pagingFlag={pagingFlag}
                  paginator={paginator}
                  setCount={setCount}
                  count={count}
                  downloader={downloader}
                  setDownloading={setDownloading}
                  setSortBy={setSortBy}
                  // pageUrl={pageUrl}
                  // runUrlFlag={runUrlFlag.current}
                  // setRunUrlFlag={setRunUrlFlag}
                />
              )}
            </TabPane>
          </Tabs>
        )}
        {!tabMode && selected === '0' && (
          <Overview start={start} end={end} doSearch={doSearch} setTab={setSelected} setRange={setRange} />
        )}
        {!tabMode && selected === '1' && (
          <Live t={t} setData={setData} setFields={setFields} setDownloading={setDownloading} />
        )}
        {!tabMode && selected === '2' && (
          <Historical
            t={t}
            data={data}
            setData={setData}
            setFields={setFields}
            url={url}
            pagingFlag={pagingFlag}
            paginator={paginator}
            setCount={setCount}
            count={count}
            downloader={downloader}
            setDownloading={setDownloading}
            setSortBy={setSortBy}
            // pageUrl={pageUrl}
            // runUrlFlag={runUrlFlag.current}
            // setRunUrlFlag={setRunUrlFlag}
          />
        )}
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
