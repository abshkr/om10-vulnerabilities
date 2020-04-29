import React, { useState } from 'react';

import { SearchOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Input, Layout, Button } from 'antd';

import { NavBarContainer, SearchContainer, SearchResults, NavExtras } from './style';
import { SideDrawer } from '..';

const { Header } = Layout;

const NavBar = () => {
  const [query, setQuery] = useState('');

  const [isDrawerVisible, setDrawerVisibility] = useState(false);

  const handleDrawerVisibility = () => {
    const visibility = !isDrawerVisible;

    setDrawerVisibility(visibility);
  };

  return (
    <Header>
      <NavBarContainer>
        <Input
          placeholder="Search OMEGA"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          style={{ width: '70vw' }}
        />
        {query !== '' && (
          <SearchContainer>
            <SearchResults>{query}</SearchResults>
          </SearchContainer>
        )}

        <NavExtras>
          <Button type="link" onClick={handleDrawerVisibility} icon={<AppstoreOutlined />} />
        </NavExtras>

        <SideDrawer visible={isDrawerVisible} handleClose={handleDrawerVisibility} />
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
