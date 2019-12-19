import React, { useState } from 'react';
import { Input, Icon, Dropdown, Menu, Avatar, Layout } from 'antd';

import { NavBarContainer, SearchContainer, SearchResults } from './style';

const { SubMenu } = Menu;
const { Header } = Layout;

const UserOverlay = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="alert" />
      Events
    </Menu.Item>

    <Menu.Item key="2">
      <Icon type="setting" />
      Settings
    </Menu.Item>

    <Menu.Item key="5">
      <Icon type="flag" />
      System Information
    </Menu.Item>

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

    <Menu.Item key="9999">
      <Icon type="poweroff" />
      Log Out
    </Menu.Item>
  </Menu>
);

const ContextOverlay = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="info-circle" />
      About
    </Menu.Item>

    <Menu.Item key="2">
      <Icon type="flag" />
      Help
    </Menu.Item>

    <Menu.Item key="3">
      <Icon type="phone" />
      Support
    </Menu.Item>
  </Menu>
);

const NavBar = () => {
  const [query, setQuery] = useState('');

  return (
    <Header className="header">
      <NavBarContainer>
        <Input placeholder="Search OMEGA" value={query} onChange={event => setQuery(event.target.value)} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />

        {query !== '' && (
          <SearchContainer>
            <SearchResults>{query}</SearchResults>
          </SearchContainer>
        )}

        <Dropdown overlay={ContextOverlay} trigger={['click']}>
          <Icon type="ellipsis" style={{ marginRight: 10 }} />
        </Dropdown>

        <Dropdown overlay={UserOverlay} trigger={['click']}>
          <Avatar icon="user" />
        </Dropdown>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
