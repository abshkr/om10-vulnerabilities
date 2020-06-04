import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Menu, notification } from 'antd';
import JwtDecode from 'jwt-decode';
import useSWR from 'swr';
import _ from 'lodash';
import axios from 'axios';

import { generatePaths } from '../../utils';
import auth from '../../auth';
import { AUTH } from '../../api';

const Favourites = ({ token }) => {
  const { data, revalidate } = useSWR(AUTH.SETUP);

  const { t } = useTranslation();
  const history = useHistory();

  const [items, setItems] = useState([]);

  const current = history?.location?.pathname;
  const disabled = ['/home', '/configuration', '/settings'].includes(current);

  useEffect(() => {
    if (data?.records) {
      const payload = [];

      _.forEach(data?.records, (item) => {
        payload.push(<Menu.Item key={item}>1st menu item</Menu.Item>);
      });

      setItems(payload);
    }
  }, [data]);

  const onFinish = (payload) => {
    axios
      .post(AUTH.UPDATE_SETUP, payload)
      .then(() => {
        revalidate();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  const onFavourite = () => {
    try {
      const decoded = JwtDecode(token);

      const payload = [...data?.records];

      const paths = generatePaths(t);

      const entry = _.find(paths, ['path', current]);

      if (entry) {
        const record = {
          per_code: decoded?.per_code,
          config_key: current,
          config_value: entry.name,
        };

        payload.push(record);

        onFinish(payload);
      }
    } catch (error) {
      return;
    }
  };

  const onMenuEvent = (event) => {
    if (event?.key === '9999') {
      onFavourite();
    }
  };

  const menu = (
    <Menu onClick={onMenuEvent}>
      {items}

      <Menu.Divider />

      <Menu.Item key="9999">Add To Favourites</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
      <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
        <StarOutlined style={{ transform: 'scale(1.5)' }} />
      </Button>
    </Dropdown>
  );
};

export default auth(Favourites);
