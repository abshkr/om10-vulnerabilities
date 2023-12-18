import React, { useState, useEffect } from 'react';

import { Button, Dropdown, Menu, message, notification, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import _ from 'lodash';

import { ROUTES } from '../../constants';
import { useConfig } from '../../hooks';
import { generatePaths } from '../../utils';
import api, { AUTH } from '../../api';

const Favourites = () => {
  const config = useConfig();
  // const { data, mutate: revalidate } = useSWR(AUTH.SETUP);
  // these two parameters have no effects on URL itself, but will trigger the refresh when features change
  const { data, mutate: revalidate } = useSWR(
    `${AUTH.SETUP}?audit=${config.manageAuditing}&partner=${config.managePartnersAndPartnership}`
  );

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);

  const current = location?.pathname;
  console.log('...............current', current, location);
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
      // const paths = generatePaths(t, config);
      const pathData = generatePaths(t, config);
      const paths = [];
      // auditing, partner, and partnership pages may be turned off by features
      _.forEach(pathData, (o) => {
        if (o.path !== ROUTES.AUDITING_DATA && o.path !== ROUTES.PARTNERS && o.path !== ROUTES.PARTNERSHIP) {
          paths.push(o);
        } else {
          if (o.path === ROUTES.AUDITING_DATA && config.manageAuditing) {
            paths.push(o);
          }
          if (o.path === ROUTES.PARTNERS && config.managePartnersAndPartnership) {
            paths.push(o);
          }
          if (o.path === ROUTES.PARTNERSHIP && config.managePartnersAndPartnership) {
            paths.push(o);
          }
        }
      });

      const payload = [...data?.records];

      const entry = _.find(paths, ['path', current]);

      if (exists) {
        const filtered = _.reject(payload, ['config_key', current]);

        onFinish('remove', filtered);
      }

      if (!exists && entry) {
        const record = {
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
      navigate(event?.key);
    }
  };

  useEffect(() => {
    if (data?.records) {
      const payload = [];
      const pathData = generatePaths(t, config);

      _.forEach(data?.records, (item) => {
        // get the name in current language for menu item
        const entry = _.find(pathData, ['path', item.config_key]);
        if (entry) {
          item.config_value = entry?.name;
        }

        // auditing, partner, and partnership pages may be turned off by features
        if (
          item.config_key !== ROUTES.AUDITING_DATA &&
          item.config_key !== ROUTES.PARTNERS &&
          item.config_key !== ROUTES.PARTNERSHIP
        ) {
          // payload.push(<Menu.Item key={item.config_key}>{item.config_value}</Menu.Item>);
          payload.push({ key: item.config_key, label: item.config_value });
        } else {
          if (item.config_key === ROUTES.AUDITING_DATA && config.manageAuditing) {
            // payload.push(<Menu.Item key={item.config_key}>{item.config_value}</Menu.Item>);
            payload.push({ key: item.config_key, label: item.config_value });
          }
          if (item.config_key === ROUTES.PARTNERS && config.managePartnersAndPartnership) {
            // payload.push(<Menu.Item key={item.config_key}>{item.config_value}</Menu.Item>);
            payload.push({ key: item.config_key, label: item.config_value });
          }
          if (item.config_key === ROUTES.PARTNERSHIP && config.managePartnersAndPartnership) {
            // payload.push(<Menu.Item key={item.config_key}>{item.config_value}</Menu.Item>);
            payload.push({ key: item.config_key, label: item.config_value });
          }
        }
        // payload.push(<Menu.Item key={item.config_key}>{item.config_value}</Menu.Item>);
      });

      setItems(payload);
    }
  }, [data]);

  const menuItems = [
    ...items,
    { type: 'divider' },
    {
      key: '9999',
      disabled: disabled,
      label: exists ? t('operations.removeFromFavourites') : t('operations.addToFavourites'),
    },
  ];
  const menu = <Menu onClick={onMenuEvent} items={menuItems} />;

  return (
    <Dropdown menu={{ items: menuItems, onClick: onMenuEvent }} trigger={['click']}>
      <Tooltip placement="topLeft" title={t('messages.favourites')}>
        <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StarOutlined style={{ transform: 'scale(1.5)' }} />
          </div>
        </Button>
      </Tooltip>
    </Dropdown>
  );
};

export default Favourites;
