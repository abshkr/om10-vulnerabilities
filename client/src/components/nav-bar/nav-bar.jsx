import React, { useState } from 'react';
import {
  BellOutlined,
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, AutoComplete, Button, Badge, Input, Menu, Dropdown, List } from 'antd';
import { useHistory } from 'react-router-dom';

import { NavBarContainer } from './style';
import { ROUTES } from '../../constants';
const { Header } = Layout;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const NavBar = () => {
  let history = useHistory();

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]);
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const favourites = (
    <Menu onClick={(value) => history.push(value.key)}>
      <Menu.Item key={ROUTES.TANK_CONFIGURATION}>
        <StarOutlined />
        Tank Configuration
      </Menu.Item>
      <Menu.Item key={ROUTES.PHYSICAL_PRINTERS}>
        <StarOutlined />
        Physical Printers
      </Menu.Item>
      <Menu.Item key={ROUTES.BASE_PRODUCTS}>
        <StarOutlined />
        Base Products
      </Menu.Item>
    </Menu>
  );

  const settings = (
    <Menu>
      <Menu.Item key="1">Site Configuration</Menu.Item>
      <Menu.Item key="2">Feature Configuration</Menu.Item>
    </Menu>
  );

  const data = [
    {
      title: 'Error On Bay 04. Please Check The Journal For More Information',
    },
    {
      title: 'Error On Bay 04. Please Check The Journal For More Information',
    },
    {
      title: 'Error On Bay 04. Please Check The Journal For More Information',
    },
    {
      title: 'Error On Bay 04. Please Check The Journal For More Information',
    },
    {
      title: 'Error On Bay 04. Please Check The Journal For More Information',
    },
  ];

  const events = (
    <Menu>
      <List
        style={{ padding: 10, paddingTop: 0, paddingBottom: 0 }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={<a>Omega Event Detected</a>} description={item.title} />
          </List.Item>
        )}
      />
    </Menu>
  );

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
          style={{ width: '70vw', marginLeft: 10 }}
        >
          <Input.Search size="large" placeholder="Search OMEGA" />
        </AutoComplete>

        <div style={{ position: 'fixed', right: 15 }}>
          <Dropdown overlay={events} trigger={['click']}>
            <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
              <Badge count={5} offset={[10, -5]}>
                <BellOutlined style={{ transform: 'scale(1.5)' }} />
              </Badge>
            </Button>
          </Dropdown>

          <Dropdown overlay={favourites} trigger={['click']}>
            <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
              <StarOutlined style={{ transform: 'scale(1.5)' }} />
            </Button>
          </Dropdown>

          <Dropdown overlay={settings} trigger={['click']}>
            <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
              <SettingOutlined style={{ transform: 'scale(1.5)' }} />
            </Button>
          </Dropdown>

          <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
            <QuestionCircleOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>
          <Button type="primary" size="large" shape="circle">
            <UserOutlined style={{ transform: 'scale(1.5)' }} />
          </Button>
        </div>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
