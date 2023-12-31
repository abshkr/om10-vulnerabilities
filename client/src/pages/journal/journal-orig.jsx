import React, { useEffect, useState } from 'react';

import moment from 'dayjs';
import { Radio, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';
import Overview from './overview';
import api, { SITE_CONFIGURATION, JOURNAL } from 'api';

import { Page, Calendar, Download, PageDownloader, PageExporter, WindowSearch } from '../../components';
import { JournalContainer } from './style';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import { FileSearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { getDateRangeOffset, getCurrentTime } from 'utils';

const { TabPane } = Tabs;

const Journal = () => {
  const { journalDateRange, serverTime, siteJnlPaging, siteJnlTabMode } = useConfig();
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const { t } = useTranslation();
  const tabMode = siteJnlTabMode; // true: tabs; false: menu items

  const access = useAuth('M_JOURNALREPORT');

  const [selected, setSelected] = useState('1');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const [start, setStart] = useState(moment().subtract(1, 'hour').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  /* const baseUrl = search || pagingFlag === undefined ? null :
    `${JOURNAL.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${start}&end_date=${end}${
      sortBy ? `&sort_by=${sortBy}` : ''
    }`; */

  const baseUrl =
    search || pagingFlag === undefined
      ? null
      : `${JOURNAL.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${start}&end_date=${end}`;

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    setSearch(null);
  };

  const doSearch = (values) => {
    if (!values.target_str && !values.msg_event && !values.msg_class && !values.start_date) {
      return;
    }

    setSearch(values);
  };

  const revalidate = () => {
    setSearch(null);
  };

  const onRefresh = async () => {
    if (journalDateRange !== false) {
      const ranges = getDateRangeOffset(String(journalDateRange), '0.125');

      const currTime = await getCurrentTime();
      const startTime = moment(currTime, SETTINGS.DATE_TIME_FORMAT)
        .subtract(ranges.beforeToday * 24, 'hour')
        .format(SETTINGS.DATE_TIME_FORMAT);
      const endTime = moment(currTime, SETTINGS.DATE_TIME_FORMAT)
        .add(ranges.afterToday * 24, 'hour')
        .format(SETTINGS.DATE_TIME_FORMAT);
      setStart(startTime);
      setEnd(endTime);
    }

    revalidate();
  };

  const onChangePagination = async (v) => {
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

      if (ranges.beforeToday !== -1) {
        setStart(
          moment(serverTime, SETTINGS.DATE_TIME_FORMAT)
            .subtract(ranges.beforeToday * 24, 'hour')
            .format(SETTINGS.DATE_TIME_FORMAT)
        );
      }

      if (ranges.afterToday !== -1) {
        setEnd(
          moment(serverTime, SETTINGS.DATE_TIME_FORMAT)
            .add(ranges.afterToday * 24, 'hour')
            .format(SETTINGS.DATE_TIME_FORMAT)
        );
      }
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
        <Button icon={<SyncOutlined />} onClick={() => onRefresh()} disabled={selected === '1'}>
          {t('operations.refresh')}
        </Button>
      )}

      {selected === '1' && <Download data={data} columns={fields} />}

      {!pagingFlag && selected === '2' && <Download data={data} columns={fields} />}

      {pagingFlag && selected === '2' && search && <Download data={data} columns={fields} />}

      {pagingFlag && selected === '2' && !search && (
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
            WindowSearch(doSearch, t('operations.search'), {
              journal_msg: true,
              journal_event: true,
              journal_category: true,
            })
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
            setSearch(null);
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

  const doTabChanges = (tabPaneKey) => {
    setSearch(null);
    setSelected(tabPaneKey);
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
              {selected === '1' && <Live t={t} setData={setData} setFields={setFields} />}
            </TabPane>
            <TabPane tab={t('tabColumns.historicalJournal')} key="2">
              {selected === '2' && (
                <Historical
                  t={t}
                  start={start}
                  end={end}
                  setData={setData}
                  setFields={setFields}
                  search={search}
                  pagingFlag={pagingFlag}
                />
              )}
            </TabPane>
          </Tabs>
        )}
        {!tabMode && selected === '0' && (
          <Overview start={start} end={end} doSearch={doSearch} setTab={setSelected} setRange={setRange} />
        )}
        {!tabMode && selected === '1' && <Live t={t} setData={setData} setFields={setFields} />}
        {!tabMode && selected === '2' && (
          <Historical
            t={t}
            start={start}
            end={end}
            setData={setData}
            setFields={setFields}
            search={search}
            pagingFlag={pagingFlag}
          />
        )}
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
