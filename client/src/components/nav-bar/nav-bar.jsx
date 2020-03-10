import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Input, Dropdown, Menu, Avatar, Layout } from 'antd';
import { useHistory } from 'react-router-dom';

import {
  AlertOutlined,
  SettingOutlined,
  FlagOutlined,
  GlobalOutlined,
  PoweroffOutlined,
  SearchOutlined
} from '@ant-design/icons';

import { NavBarContainer, SearchContainer, SearchResults } from './style';
import { ROUTES } from '../../constants';

const { SubMenu } = Menu;
const { Header } = Layout;

const user = handleNavigation => {
  return (
    <Menu style={{ width: 200 }} onClick={handleNavigation}>
      <Menu.Item key="2">
        <SettingOutlined />
        Settings
      </Menu.Item>

      <SubMenu
        title={
          <span>
            <FlagOutlined /> System
          </span>
        }
      >
        <Menu.Item>About</Menu.Item>
        <Menu.Item>Help</Menu.Item>
        <Menu.Item>Support</Menu.Item>
      </SubMenu>

      <Menu.Divider />

      <Menu.Item key={ROUTES.LOG_OUT}>
        <PoweroffOutlined />
        Log Out
      </Menu.Item>
    </Menu>
  );
};

const language = handleNavigation => {
  return (
    <Menu style={{ width: 200 }} onClick={handleNavigation}>
      <Menu.Item key="language-en">English (EN)</Menu.Item>
      <Menu.Item key="language-cn">Chinese (CN)</Menu.Item>
    </Menu>
  );
};

const NavBar = () => {
  const [query, setQuery] = useState('');

  const { i18n } = useTranslation();

  let history = useHistory();

  const handleNavigation = event => {
    if (event?.keyPath.includes('language')) {
      i18n.changeLanguage(event.key);
    }

    if (event?.key && event.key === ROUTES.LOG_OUT) {
      history.push(ROUTES.LOG_OUT);
    }
  };

  return (
    <Header className="header">
      <NavBarContainer>
        <Input
          placeholder="Search OMEGA"
          value={query}
          bo
          onChange={event => setQuery(event.target.value)}
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />

        {query !== '' && (
          <SearchContainer>
            <SearchResults>{query}</SearchResults>
          </SearchContainer>
        )}

        <Dropdown overlay={language(handleNavigation)} trigger={['click']}>
          <GlobalOutlined style={{ fontSize: 20, marginRight: 20, color: '#b4b8ce' }} />
        </Dropdown>

        <Dropdown overlay={user(handleNavigation)} trigger={['click']}>
          <AlertOutlined style={{ fontSize: 20, marginRight: 20, color: '#b4b8ce' }} />
        </Dropdown>

        <Dropdown overlay={user(handleNavigation)} trigger={['click']}>
          <Avatar src="https://avatars1.githubusercontent.com/u/20252138?s=460&v=4" />
        </Dropdown>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
