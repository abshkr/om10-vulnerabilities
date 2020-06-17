import React, { useState } from 'react';

import moment from 'moment';
import { Tabs, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';

import { Page, Calendar, Download } from '../../components';
import { JournalContainer } from './style';
import { SETTINGS } from '../../constants';
import { useAuth } from 'hooks';

const Journal = () => {
  const { t } = useTranslation();

  const access = useAuth('M_JOURNALREPORT');

  const [selected, setSelected] = useState('1');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);

  const [start, setStart] = useState(moment().subtract(3, 'hour').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} disabled={selected === '1'} />

      <Download data={data} columns={fields} />

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
            <Historical t={t} start={start} end={end} setData={setData} setFields={setFields} />
          </Tabs.TabPane>
        </Tabs>
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
