import React, { useState } from 'react';

import moment from 'moment';
import { Tabs, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';

import { Page, Calendar } from '../../components';
import { JournalContainer } from './style';
import { SETTINGS } from '../../constants';

const Journal = () => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState('1');

  const [start, setStart] = useState(
    moment()
      .subtract(3, 'hour')
      .format(SETTINGS.DATE_TIME_FORMAT)
  );

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} disabled={selected === '1'} />

      <Radio.Group
        style={{ marginLeft: 10 }}
        value={selected}
        buttonStyle="solid"
        onChange={val => setSelected(val.target.value)}
      >
        <Radio.Button value="1"> {t('tabColumns.liveJournal')}</Radio.Button>
        <Radio.Button value="2"> {t('tabColumns.historicalJournal')} </Radio.Button>
      </Radio.Group>
    </>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.journal')} modifiers={modifiers}>
      <JournalContainer>
        <Tabs activeKey={selected} defaultActiveKey="1" animated={false}>
          <Tabs.TabPane tab={t('tabColumns.liveJournal')} key="1">
            <Live t={t} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('tabColumns.historicalJournal')} key="2">
            <Historical t={t} start={start} end={end} />
          </Tabs.TabPane>
        </Tabs>
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
