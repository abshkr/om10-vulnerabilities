import React, { useState } from 'react';

import Icon, {
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
  CopyrightOutlined,
} from '@ant-design/icons';

import { Layout, AutoComplete, Button, Input, Modal, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { NavBarContainer } from './style';
import { ROUTES } from '../../constants';
import { useConfig } from '../../hooks';
import { Events, Favourites } from '..';
import generator from './generator';
import api from 'api';
import { AUTH } from 'api';

import { ReactComponent as SearchIcon } from './search_two.svg';

const { Header } = Layout;

const SearchIconOutlined = (props) => (
  <Icon style={{ transform: 'scale(1.8)' }} component={SearchIcon} {...props} />
);

const NavBar = () => {
  const { t } = useTranslation();
  const config = useConfig();

  let history = useHistory();

  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    const val = generator(searchText, t, config);

    // setOptions(!searchText ? [] : val);
    setOptions(val);
  };

  const onSelect = (data) => {
    if (data?.path === ROUTES.BAY_VIEW) {
      // const access = useAuth('M_BAYVIEW'); //Cannot use useAuth here because this is a function not a component
      api
        .get(`${AUTH.PERMISSIONS}?object_text=M_BAYVIEW`)
        .then((res) => {
          if (!res.data.records[0].priv_view) {
            console.log("Do not have view privilege");
            history.push(ROUTES.UNAUTHORIZED);
          } else {
            const port = window.location.port ? window.location.port : 443;
            api
              .get(`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`)
              .then((res) => {
                if (res.data.includes("<title>OMEGA 5000</title>")){
                  history.push(ROUTES.BAY_VIEW);
                } else {
                  window.open(`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`, "_blank");
                }
              })
              .catch(function (error) {
                history.push(ROUTES.BAY_VIEW);
              })
          }
        }) ;
    } else if (data?.path) {
      history.push(data?.path);
    }
  };

  const onLogOut = () => {
    Modal.confirm({
      title: t('prompts.logOut'), // 'Are you sure want to Log Out?',
      icon: <ExclamationCircleOutlined />,
      okText: t('operations.logOut'),
      centered: true,
      okType: 'danger',
      cancelText: t('operations.cancel'),
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
        paddingTop: 5,
      }}
    >
      <NavBarContainer>
        <AutoComplete
          options={options}
          onSearch={onSearch}
          onSelect={(value, option) => onSelect(option)}
          style={{ width: 420, marginLeft: 10 }}
        >
          <Input.Search enterButton={<SearchIconOutlined />} placeholder={t("placeholder.searchOmega")} />
        </AutoComplete>

        <div>
          <Events />

          <Favourites />

          <Tooltip placement="topLeft" title={t("pageMenu.configuration")} >
            <Button
              type="primary"
              size="large"
              shape="circle"
              style={{ marginRight: 7 }}
              onClick={() => history.push(ROUTES.CONFIGURATION)}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SettingOutlined style={{ transform: 'scale(1.5)' }} />
              </div>
            </Button>
          </Tooltip>

          <Tooltip placement="topLeft" title={t("messages.manual")} >
            <Button
              type="primary"
              size="large"
              shape="circle"
              style={{ marginRight: 7 }}
              onClick={() => window.open(ROUTES.MANUAL, '_blank')}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <QuestionCircleOutlined style={{ transform: 'scale(1.5)' }} />
              </div>
            </Button>
          </Tooltip>

          <Tooltip placement="topLeft" title={t("messages.copyright")} >
            <Button
              type="primary"
              size="large"
              shape="circle"
              style={{ marginRight: 7 }}
              onClick={() => window.open(ROUTES.EULA, '_blank')}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CopyrightOutlined style={{ transform: 'scale(1.5)' }} />
              </div>
            </Button>
          </Tooltip>

          <Tooltip placement="topLeft" title={t("descriptions.changeUseProfile")} >
            <Button
              type="primary"
              size="large"
              shape="circle"
              style={{ marginRight: 7 }}
              onClick={() => history.push(ROUTES.SETTINGS)}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <UserOutlined style={{ transform: 'scale(1.5)' }} />
              </div>
            </Button>
          </Tooltip>

          <Tooltip placement="topLeft" title={t("pageNames.logOut")} >
            <Button type="primary" size="large" shape="circle" onClick={onLogOut}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PoweroffOutlined style={{ transform: 'scale(1.5)' }} />
              </div>
            </Button>
          </Tooltip>
        </div>
      </NavBarContainer>
    </Header>
  );
};

export default NavBar;
