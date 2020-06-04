import React, { useState } from 'react';
import Icon, {
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
  CopyrightOutlined,
} from '@ant-design/icons';
import { Layout, AutoComplete, Button, Input, Dropdown, Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import { NavBarContainer } from './style';
import { ROUTES } from '../../constants';
import { Events, Favourites } from '..';

import { ReactComponent as SearchIcon } from './search_two.svg';

const { Header } = Layout;

const SearchIconOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.8)' }} component={SearchIcon} {...props} />
);

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const NavBar = () => {
  let history = useHistory();

  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    console.log(searchText);
    setOptions(!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]);
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
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
          onSelect={onSelect}
          onSearch={onSearch}
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
