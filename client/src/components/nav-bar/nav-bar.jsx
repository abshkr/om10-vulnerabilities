import React, { useState } from 'react';

import { Input, Icon, Dropdown, Menu, Avatar, Layout } from 'antd';
import { useHistory } from 'react-router-dom';

import { NavBarContainer, SearchContainer, SearchResults } from './style';
import { ROUTES } from '../../constants';

const { SubMenu } = Menu;
const { Header } = Layout;

const UserOverlay = history => {
  const handleNavigation = event => {
    if (event?.key && event.key === ROUTES.LOG_OUT) {
      history.push(ROUTES.LOG_OUT);
    }
  };

  return (
    <Menu style={{ width: 200 }} onClick={handleNavigation}>
      <Menu.Item key="1">
        <Icon type="alert" />
        Events
      </Menu.Item>

      <Menu.Item key="2">
        <Icon type="setting" />
        Settings
      </Menu.Item>

      <SubMenu
        title={
          <span>
            <Icon type="flag" /> System
          </span>
        }
      >
        <Menu.Item>About</Menu.Item>
        <Menu.Item>Help</Menu.Item>
        <Menu.Item>Support</Menu.Item>
      </SubMenu>

      <Menu.Divider />

      <SubMenu
        title={
          <span>
            <Icon type="global" /> Language
          </span>
        }
      >
        <Menu.Item>English (EN)</Menu.Item>
        <Menu.Item>Chinese (CN)</Menu.Item>
      </SubMenu>

      <Menu.Divider />

      <Menu.Item key={ROUTES.LOG_OUT}>
        <Icon type="poweroff" />
        Log Out
      </Menu.Item>
    </Menu>
  );
};

const NavBar = () => {
  const [query, setQuery] = useState('');
  let history = useHistory();

  return (
    <Header className="header">
      <NavBarContainer>
        <Input
          placeholder="Search OMEGA"
          value={query}
          onChange={event => setQuery(event.target.value)}
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />

        {query !== '' && (
          <SearchContainer>
            <SearchResults>{query}</SearchResults>
          </SearchContainer>
        )}

        <Dropdown overlay={UserOverlay(history)} trigger={['click']}>
          <Avatar icon="user" />
        </Dropdown>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
