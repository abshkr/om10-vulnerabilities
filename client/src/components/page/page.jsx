import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';
import { AUTH } from '../../api';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

const Page = ({ name, page, children, modifiers, description, isBlank }) => {
  const { data: payload } = useSWR(AUTH.PERMISSIONS);

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

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader
          title={name || page}
          style={{ width: '30vw' }}
          subTitle={description}
          breadcrumb={{ routes: filtered }}
        ></PageHeader>

        <PageHeaderExtras>{modifiers}</PageHeaderExtras>
      </PageHeaderContainer>

      <Helmet>
        <title>{name ? `${name} ─ ${page} ─ OMEGA 5000` : `${page} ─ OMEGA 5000`}</title>
      </Helmet>

      <PageInjector isBlank={isBlank}>{children}</PageInjector>
    </PageContainer>
  );
};

export default Page;
