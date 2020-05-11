import React from 'react';

import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import _ from 'lodash';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

import { Footer } from '..';

const Page = ({ name, page, children, modifiers, description, isBlank, noHeader, isLoading }) => {
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
      {!noHeader && (
        <PageHeaderContainer>
          <PageHeader
            title={name || page}
            style={{ width: '30vw' }}
            subTitle={description}
            breadcrumb={{ routes: filtered }}
          ></PageHeader>

          <PageHeaderExtras>{modifiers}</PageHeaderExtras>
        </PageHeaderContainer>
      )}

      <Helmet>
        <title>{name ? `${name} ─ ${page} ─ OMEGA 5000` : `${page} ─ OMEGA 5000`}</title>
      </Helmet>

      <PageInjector isBlank={isBlank}>{children}</PageInjector>
      <Footer />
    </PageContainer>
  );
};

export default Page;
