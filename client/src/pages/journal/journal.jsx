import React, { useState } from 'react';

import moment from 'moment';
import { Tabs, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';

import { Page, Calendar, Download, WindowSearch } from '../../components';
import { JournalContainer } from './style';
import { SETTINGS } from '../../constants';
import { useAuth } from 'hooks';
import { FileSearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Journal = () => {
  const { t } = useTranslation();

  const access = useAuth('M_JOURNALREPORT');

  const [selected, setSelected] = useState('1');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const [start, setStart] = useState(moment().subtract(3, 'hour').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const doSearch = (values) => {
    if (!values.target_str && 
      !values.msg_event &&
      !values.msg_class && 
      !values.start_date) {
      return;
    }

    setSearch(values);
  };

  const revalidate = () => {
    setSearch(null);
  }

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} disabled={selected === '1'} />
      <Button 
        icon={<SyncOutlined />} 
        onClick={() => revalidate()} 
        disabled={selected==='1'}
      >
        {t('operations.refresh')}
      </Button>

      <Download data={data} columns={fields} />

      <Button 
        type="primary"
        icon={<FileSearchOutlined />} 
        disabled={selected==='1'}
        onClick={() => WindowSearch(doSearch, t('operations.search'), {
          journal_msg: true,
          journal_event: true,
          journal_category: true,
        })}
      >
        {t('operations.search')}
      </Button>

      <Radio.Group
        style={{ marginLeft: 5 }}
        value={selected}
        buttonStyle="solid"
        onChange={(val) => setSelected(val.target.value)}
      >
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
        <Tabs activeKey={selected} defaultActiveKey="1" animated={false}>
          <Tabs.TabPane tab={t('tabColumns.liveJournal')} key="1">
            <Live t={t} setData={setData} setFields={setFields} />
          </Tabs.TabPane>

          <Tabs.TabPane tab={t('tabColumns.historicalJournal')} key="2">
            <Historical t={t} start={start} end={end} setData={setData} setFields={setFields} search={search} />
          </Tabs.TabPane>
        </Tabs>
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
