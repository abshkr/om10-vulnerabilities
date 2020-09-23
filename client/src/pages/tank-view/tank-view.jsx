import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackTop, Button, Input, Tabs } from 'antd';
import { UpOutlined, PlusOutlined } from '@ant-design/icons';

import useSWR from 'swr';
// import _ from 'lodash';

import { TANKS } from 'api';
import { TankViewContainer, SearchSuffixContainer, ToolbarContainer } from './style';
import { Page, Download } from 'components';
import { useAuth } from 'hooks';
import { useConfig } from 'hooks';

import search from 'utils/search';
import auth from 'auth';

import Forms from './forms';
import Summary from './summary';
import Tanks from './tanks';

import transform from './transform';
import columns from './columns';

const { Search } = Input;
const { TabPane } = Tabs;

const TankView = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const access = useAuth('M_TANKVIEW');

  const { data, revalidate } = useSWR(TANKS.READ, {
    refreshInterval: 1000,
  });

  const [tanks, setTanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [summary, setSummary] = useState([]);

  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const handleRevalidate = () => {
    setLoading(true);

    revalidate().finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (data?.records) {
      const filtered = search(searchQuery, data?.records);
      const payload = transform(filtered);

      setTanks(payload?.tanks);
      setSummary(payload?.summary);
    }
  }, [data, searchQuery]);

  const isLoading = !data || loading;

  const fields = columns(t);

  const page = t('pageMenu.modules');
  const name = t('pageNames.tankView');

  return (
    <Page access={access} page={page} name={name} transparent>
      <ToolbarContainer>
        <Search
          placeholder={t('placeholder.searchTanks')}
          onSearch={(value) => setSearchQuery(value)}
          enterButton
          style={{ marginTop: 5, marginRight: 10 }}
          suffix={<SearchSuffixContainer>{t('placeholder.pressEnterToSearch')}</SearchSuffixContainer>}
        />

        <Download data={tanks} isLoading={isLoading} columns={fields} />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleFormState(true, null)}
          style={{ marginLeft: 10 }}
          loading={isLoading}
          disabled={!access.canCreate}
        >
          {t('operations.create')}
        </Button>
      </ToolbarContainer>

      <Forms
        visible={visible}
        handleFormState={handleFormState}
        handleRevalidate={handleRevalidate}
        value={selected}
        access={access}
        config={config}
      />

      <TankViewContainer>
        <Tabs defaultActiveKey="1" type="card" onChange={() => handleFormState(false, null)}>
          <TabPane tab={t('tabColumns.tanks')} key="1">
            <Tanks data={tanks} isLoading={isLoading} handleFormState={handleFormState} />
          </TabPane>
          <TabPane tab={t('tabColumns.summary')} key="2">
            <Summary data={summary} isLoading={isLoading} />
          </TabPane>
        </Tabs>

        <BackTop>
          <Button type="primary" icon={<UpOutlined />}>
            {t('operations.scrollUp')}
          </Button>
        </BackTop>
      </TankViewContainer>
    </Page>
  );
};

export default auth(TankView);
