import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Tag } from 'antd';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

const Page = ({ name, page, children, modifiers, icon }) => {
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
          subTitle="This is a subtitle"
          tags={<Tag color="blue">Running</Tag>}
          avatar={{
            icon,
            style: { color: '#68a4ec', backgroundColor: '#d1e3f9' }
          }}
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
