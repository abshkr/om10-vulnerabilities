import React, { useEffect, useRef } from 'react';
import { Button, Tooltip, notification, Image, Modal, Input, Tag } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import api, { SITE_CONFIGURATION } from '../../api';
import { useConfig } from '../../hooks';
import { hash } from '../../utils';
import jwtDecode from 'jwt-decode';

const FastTrack = () => {
  const { t } = useTranslation();
  const config = useConfig();

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const FASTTRACK_ENABLED = decoded?.per_code === '9999' && config?.fasttrackEnabled;

  const pageURL = useRef(undefined);
  let win = undefined;

  const setPageURL = (v) => {
    pageURL.current = v;
  };

  const onChangeURL = async (v) => {
    // setPageURL(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_FASTTRACK_URL',
        config_value: v,
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const gotoFasttrack = (target) => {
    if (target?.length === 0) {
      notification.error({
        message: t('messages.linkFailed'),
        description: t('descriptions.linkNotExist'),
      });
    } else {
      const omegaLoginCode = sessionStorage.getItem('user');
      // const omegaLoginPass = sessionStorage.getItem('password');
      const omegaLoginPass = 'Om5000';
      const omegaLoginLang = sessionStorage.getItem('language');
      console.log('..........loginObject', omegaLoginCode, omegaLoginPass, omegaLoginLang);
      const payload = hash(omegaLoginLang, omegaLoginCode, omegaLoginPass);

      if (win) win.close();
      win = window.open(`${target}/?email=${omegaLoginCode}&password=${payload.psw}`, '_blank');
    }
  };
  const onConfirm = () => {
    Modal.confirm({
      title: t('operations.gotoFT'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      width: '36vw',
      centered: true,
      content: (
        <>
          <Tag color={'green'}>
            <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'red' }}>
              {t('descriptions.fasttrackNote')}
            </div>
          </Tag>
          <Input
            style={{ marginTop: 20, marginBottom: 20 }}
            defaultValue={config?.fasttrackURL}
            onChange={(event) => setPageURL(event.target.value)}
          />
        </>
      ),
      onOk: async () => {
        gotoFasttrack(pageURL.current);
        if (pageURL.current !== config?.fasttrackURL) {
          await onChangeURL(pageURL.current);
          config.fasttrackURL = pageURL.current;
        }
        Modal.destroyAll();
      },
    });
  };

  useEffect(() => {
    if (config) {
      setPageURL(config?.fasttrackURL);
    }
  }, [config]);

  return FASTTRACK_ENABLED ? (
    <Tooltip placement="topLeft" title={t('operations.gotoFT')}>
      <Button
        type="primary"
        size="large"
        shape="round"
        style={{ marginRight: 7, heigth: 50 }}
        onClick={onConfirm}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <OrderedListOutlined style={{ transform: 'scale(1.5)' }} /> */}
          <Image
            preview={false}
            src="/images/FT_Logo.png"
            alt="Fast Track Logo"
            width={60}
            height={30}
          ></Image>
        </div>
      </Button>
    </Tooltip>
  ) : (
    ''
  );
};

export default FastTrack;
