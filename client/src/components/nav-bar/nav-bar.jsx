import React, { useState } from 'react';

import Icon, {
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
  CopyrightOutlined,
} from '@ant-design/icons';

import { Layout, AutoComplete, Button, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { NavBarContainer } from './style';
import { ROUTES } from '../../constants';
import { Events, Favourites } from '..';
import generator from './generator';

import { ReactComponent as SearchIcon } from './search_two.svg';

const { Header } = Layout;

const SearchIconOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.8)' }} component={SearchIcon} {...props} />
);

const NavBar = () => {
  const { t } = useTranslation();

  let history = useHistory();

  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    const val = generator(searchText, t);

    setOptions(!searchText ? [] : val);
  };

  const onSelect = (data) => {
    if (data?.path) {
      history.push(data?.path);
    }
  };

  const onLogOut = () => {
    Modal.confirm({
      title: 'Are you sure want to Log Out?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Log Out',
      centered: true,
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => history.push(ROUTES.LOG_OUT),
    });
  };

  return (
    <Header
      style={{
        background: 'none',
        backgroundColor: 'none',
        boxShadow: 'none',
        lineHeight: 0,
        paddingTop: 15,
      }}
    >
      <NavBarContainer>
        <AutoComplete
          options={options}
          onSearch={onSearch}
          onSelect={(value, option) => onSelect(option)}
          style={{ width: 420, marginLeft: 10 }}
        >
          <Input.Search enterButton={<SearchIconOutlined />} placeholder="Search OMEGA" />
        </AutoComplete>

        <div>
          <Events />

          <Favourites />

          <Button
            type="primary"
            size="large"
            shape="circle"
            style={{ marginRight: 7 }}
            onClick={() => history.push(ROUTES.CONFIGURATION)}
          >
            <SettingOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>

          <Button
            type="primary"
            size="large"
            shape="circle"
            style={{ marginRight: 7 }}
            onClick={() => window.open(ROUTES.MANUAL, '_blank')}
          >
            <QuestionCircleOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>

          <Button
            type="primary"
            size="large"
            shape="circle"
            style={{ marginRight: 7 }}
            onClick={() => window.open(ROUTES.EULA, '_blank')}
          >
            <CopyrightOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>

          <Button
            type="primary"
            size="large"
            shape="circle"
            style={{ marginRight: 7 }}
            onClick={() => history.push(ROUTES.SETTINGS)}
          >
            <UserOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>

          <Button type="primary" size="large" shape="circle" onClick={onLogOut}>
            <PoweroffOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>
        </div>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
