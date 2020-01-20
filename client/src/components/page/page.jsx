import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Tag } from 'antd';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

const Page = ({ name, page, children, modifiers }) => {
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
          avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
          breadcrumb={{ routes }}
        ></PageHeader>

        <PageHeaderExtras>{modifiers}</PageHeaderExtras>
      </PageHeaderContainer>

      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {name} ─ {page} ─ OMEGA 5000
        </title>
      </Helmet>

      <PageInjector>{children}</PageInjector>
    </PageContainer>
  );
};

export default Page;
