import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

const Page = ({ name, page, children, modifiers, icon, description }) => {
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

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader
          title={name}
          style={{ width: '30vw' }}
          avatar={{
            icon,
            style: { color: '#68a4ec', backgroundColor: '#d1e3f9' }
          }}
          subTitle={description}
          breadcrumb={{ routes }}
        ></PageHeader>

        <PageHeaderExtras>{modifiers}</PageHeaderExtras>
      </PageHeaderContainer>

      <Helmet>
        <title>
          {name} ─ {page} ─ OMEGA 5000
        </title>
      </Helmet>

      <PageInjector>{children}</PageInjector>
    </PageContainer>
  );
};

export default Page;
