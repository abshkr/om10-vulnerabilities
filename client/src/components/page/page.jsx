import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import _ from 'lodash';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

const Page = ({ name, page, children, modifiers, icon, description, isBlank }) => {
  const routes = [
    {
      path: 'index',
      breadcrumbName: 'OMEGA 5000'
    },
    {
      path: 'first',
      breadcrumbName: page
    },
    {
      path: 'second',
      breadcrumbName: name
    }
  ];

  const filtered = name ? routes : _.reject(routes, ['path', 'second']);

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader
          title={name || page}
          style={{ width: '30vw' }}
          avatar={{
            icon,
            style: { color: '#68a4ec', backgroundColor: '#d1e3f9' }
          }}
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
