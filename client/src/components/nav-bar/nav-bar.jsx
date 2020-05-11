import React, { useState } from 'react';
import {
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
  TrademarkCircleOutlined,
} from '@ant-design/icons';
import { Layout, AutoComplete, Button, Input, Dropdown, Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import { NavBarContainer } from './style';
import { ROUTES } from '../../constants';
import { Events } from '..';

const { Header } = Layout;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const NavBar = () => {
  let history = useHistory();

  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
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
          <Input.Search placeholder="Search OMEGA" />
        </AutoComplete>

        <div style={{ position: 'fixed', right: 15 }}>
          <Events />

          <Dropdown overlay={null} trigger={['click']}>
            <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
              <StarOutlined style={{ transform: 'scale(1.5)' }} />
            </Button>
          </Dropdown>

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
            <TrademarkCircleOutlined style={{ transform: 'scale(1.5)' }} />
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
