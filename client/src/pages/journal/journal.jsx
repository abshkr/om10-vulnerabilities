import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';
import Overview from './overview';

import { Page, Calendar, Download, WindowSearch } from '../../components';
import { JournalContainer } from './style';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import { FileSearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { getDateRangeOffset, getCurrentTime } from 'utils';

const Journal = () => {
  const { journalDateRange, serverTime } = useConfig();
  const { t } = useTranslation();

  const access = useAuth('M_JOURNALREPORT');

  const [selected, setSelected] = useState('0');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const [start, setStart] = useState(moment().subtract(1, 'hour').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
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

  const modifiers = (
    <>
      {selected !== '1' && selected !== '0' && (
        <Calendar handleChange={setRange} start={start} end={end} disabled={selected === '1'} />
      )}

      {selected !== '0' && (
        <>
          <Button icon={<SyncOutlined />} onClick={() => onRefresh()} disabled={selected === '1'}>
            {t('operations.refresh')}
          </Button>

          <Download data={data} columns={fields} />

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
        </>
      )}

      <Radio.Group
        style={{ marginLeft: 5 }}
        value={selected}
        buttonStyle="solid"
        onChange={(val) => setSelected(val.target.value)}
      >
        <Radio.Button value="0"> {t('tabColumns.overview')}</Radio.Button>
        <Radio.Button value="1"> {t('tabColumns.liveJournal')}</Radio.Button>
        <Radio.Button value="2"> {t('tabColumns.historicalJournal')} </Radio.Button>
      </Radio.Group>
    </>
  );

  return (
    <Page
      page={t('pageMenu.reports')}
      name={t('pageNames.journal')}
      modifiers={modifiers}
      avatar="journal"
      access={access}
    >
      <JournalContainer>
        {selected === '0' && <Overview start={start} end={end} />}
        {selected === '1' && <Live t={t} setData={setData} setFields={setFields} />}
        {selected === '2' && (
          <Historical t={t} start={start} end={end} setData={setData} setFields={setFields} search={search} />
        )}
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
