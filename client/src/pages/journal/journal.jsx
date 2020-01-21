import React, { useState } from 'react';

import { Tabs, Radio } from 'antd';

import Live from './live';
import auth from '../../auth';
import Historical from './historical';
import { Page } from '../../components';
import { JournalContainer } from './style';

const Journal = ({ configuration, t }) => {
  const [selected, setSelected] = useState('1');

  const modifiers = (
    <Radio.Group value={selected} buttonStyle="solid" onChange={val => setSelected(val.target.value)}>
      <Radio.Button value="1"> {t('tabColumns.liveJournal')}</Radio.Button>
      <Radio.Button value="2"> {t('tabColumns.historicalJournal')} </Radio.Button>
    </Radio.Group>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.journal')} modifiers={modifiers}>
      <JournalContainer>
        <Tabs activeKey={selected} defaultActiveKey="1" animated={false}>
          <Tabs.TabPane tab={t('tabColumns.liveJournal')} key="1">
            <Live configuration={configuration} t={t} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('tabColumns.historicalJournal')} key="2">
            <Historical configuration={configuration} t={t} />
          </Tabs.TabPane>
        </Tabs>
      </JournalContainer>
    </Page>
  );
};

export default auth(Journal);
