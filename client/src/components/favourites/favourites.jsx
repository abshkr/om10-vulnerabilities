import React, { useState, useEffect } from 'react';

import { Button, Dropdown, Menu, message, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import _ from 'lodash';

import { useAuth } from '../../hooks';
import { generatePaths } from '../../utils';
import api, { AUTH } from '../../api';
import auth from '../../auth';

const Favourites = ({ user }) => {
  const { data, revalidate } = useSWR(AUTH.SETUP);
  const { t } = useTranslation();
  const history = useHistory();

  const [items, setItems] = useState([]);

  const current = history?.location?.pathname;
  const disabled = ['/home', '/configuration', '/settings'].includes(current);
  const exists = _.find(data?.records, ['config_key', current]);

  const onFinish = (type, payload) => {
    api
      .post(AUTH.UPDATE_SETUP, payload)
      .then(() => {
        revalidate();

        message.success(type === 'add' ? t('messages.favouriteAddded') : t('messages.favouriteRemoved'));
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
      const paths = generatePaths(t);

      const payload = [...data?.records];

      const entry = _.find(paths, ['path', current]);

      if (exists) {
        const filtered = _.reject(payload, ['config_key', current]);

        onFinish('remove', filtered);
      }

      if (!exists && entry) {
        const record = {
          per_code: user?.per_code,
          config_key: current,
          config_value: entry.name,
        };

        payload.push(record);

        onFinish('add', payload);
      }
    } catch (error) {
      return;
    }
  };

  const onMenuEvent = (event) => {
    if (event?.key === '9999') {
      onFavourite();
    }

    if (event?.key?.startsWith('/')) {
      history.push(event?.key);
    }
  };

  useEffect(() => {
    if (data?.records) {
      const payload = [];

      _.forEach(data?.records, (item) => {
        payload.push(<Menu.Item key={item.config_key}>{item.config_value}</Menu.Item>);
      });

      setItems(payload);
    }
  }, [data]);

  const menu = (
    <Menu onClick={onMenuEvent}>
      {items}

      <Menu.Divider />

      <Menu.Item key="9999" disabled={disabled}>
        {exists ? t('operations.removeFromFavourites') : t('operations.addToFavourites')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StarOutlined style={{ transform: 'scale(1.5)' }} />
        </div>
      </Button>
    </Dropdown>
  );
};

export default auth(Favourites);
