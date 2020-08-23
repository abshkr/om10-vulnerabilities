import React, { useState, useEffect } from 'react';

import { PageHeader, Modal, Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';
import { Loading, Locked } from '..';

import * as ROUTES from 'constants/routes';
import api, { AUTH } from 'api';
import hash from 'utils/hash';

const Page = ({ name, page, children, modifiers, minimal, transparent, access, avatar, standalone }) => {
  const [form] = Form.useForm();

  const { t } = useTranslation();
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isViewable, setViewable] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLocked, setLocked] = useState(false);

  const routes = [
    {
      path: 'index',
      breadcrumbName: 'OMEGA 5000',
    },
    {
      path: 'first',
      breadcrumbName: page,
    },
    {
      path: 'second',
      breadcrumbName: name,
    },
  ];

  const filtered = name ? routes : _.reject(routes, ['path', 'second']);

  const onCancel = async () => {
    setViewable(false);
    setAuthenticated(true);
  }

  const onFinish = async () => {
    const values = await form.validateFields();
    if (!values.password) {
      return;
    }
    const token = sessionStorage.getItem('token');

    setFetching(true);

    try {
      const decoded = jwtDecode(token);

      const hashed = hash('en', decoded?.per_code, values?.password);

      await api
        .post(AUTH.CHECK_PASSWORD, {
          password: hashed.psw,
          per_code: '9999',
        })
        .then(() => {
          setViewable(access?.canView);
          setAuthenticated(true);
          setFetching(false);
          setLocked(false);

          Modal.destroyAll();
        })
        .catch((errors) => {
          setFetching(false);

          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    } catch (error) {
      history.push(ROUTES.LOG_OUT);
    }
  };

  useEffect(() => {
    setLoading(access && access?.isLoading);
    setViewable(access?.canView);
    setLocked(authenticated ? false : access?.isProtected);
  }, [access]);

  if (standalone && isViewable && !isLocked) {
    return (
      <>
        <PageHeaderContainer>
          <PageHeader style={{ width: '30vw', marginBottom: 15 }} />

          <PageHeaderExtras>{modifiers}</PageHeaderExtras>
        </PageHeaderContainer>
        <div className="main-container">{children}</div>
      </>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isLocked && !authenticated) {
    return (
      <Modal
        title={t('generic.pleaseAuthenticate')}
        visible={isLocked}
        closable={false}
        centered
        // cancelButtonProps={{ style: { display: 'none' } }}
        okText={t('operations.authenticate')}
        onOk={onFinish}
        onCancel={onCancel}
        confirmLoading={isFetching}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="password" label={t('fields.password')}>
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  if (!isLoading && !isViewable) {
    return <Locked />;
  }

  if (isViewable && !isLocked) {
    return (
      <PageContainer>
        <div>
          {!minimal && (
            <PageHeaderContainer>
              <PageHeader title={name || page} style={{ width: '30vw' }} breadcrumb={{ routes: filtered }} />

              <PageHeaderExtras>{modifiers}</PageHeaderExtras>
            </PageHeaderContainer>
          )}

          <Helmet>
            <title>{name ? `${name} ─ ${page} ─ ${t('descriptions.applicationName')}` : `${page} ─ ${t('descriptions.applicationName')}`}</title>
          </Helmet>

          <PageInjector minimal={minimal} transparent={transparent}>
            <div className="main-container">{children}</div>
          </PageInjector>
        </div>
      </PageContainer>
    );
  }

  return null;
};

export default Page;
