import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Input, Dropdown, Menu, Avatar, Layout } from 'antd';
import { useHistory } from 'react-router-dom';

import {
  AlertOutlined,
  SettingOutlined,
  FlagOutlined,
  BookOutlined,
  GlobalOutlined,
  PoweroffOutlined,
  SearchOutlined
} from '@ant-design/icons';

import { NavBarContainer, SearchContainer, SearchResults } from './style';
import { ROUTES } from '../../constants';

const { SubMenu } = Menu;
const { Header } = Layout;

const UserOverlay = history => {
  const { i18n } = useTranslation();

  const handleNavigation = event => {
    if (event?.keyPath.includes('language')) {
      i18n.changeLanguage(event.key);
    }

    if (event?.key && event.key === ROUTES.LOG_OUT) {
      history.push(ROUTES.LOG_OUT);
    }
  };

  return (
    <Menu style={{ width: 200 }} onClick={handleNavigation}>
      <Menu.Item key="1">
        <AlertOutlined />
        Events
      </Menu.Item>

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

      <Menu.Item key="3">
        <BookOutlined />
        Changelog
      </Menu.Item>

      <Menu.Divider />

      <SubMenu
        key="language"
        title={
          <span>
            <GlobalOutlined /> Language
          </span>
        }
      >
        <Menu.Item key="en">English (EN)</Menu.Item>
        <Menu.Item key="cn">Chinese (CN)</Menu.Item>
      </SubMenu>

      <Menu.Divider />

      <Menu.Item key={ROUTES.LOG_OUT}>
        <PoweroffOutlined />
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
          bo
          onChange={event => setQuery(event.target.value)}
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />

        {query !== '' && (
          <SearchContainer>
            <SearchResults>{query}</SearchResults>
          </SearchContainer>
        )}

        <Dropdown overlay={UserOverlay(history)} trigger={['click']}>
          <Avatar src="https://avatars1.githubusercontent.com/u/20252138?s=460&v=4" />
        </Dropdown>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
