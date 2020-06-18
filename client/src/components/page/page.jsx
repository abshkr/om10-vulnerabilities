import React from 'react';

import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import _ from 'lodash';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

import { Loading, Locked } from '..';

const Page = ({ name, page, children, modifiers, minimal, transparent, access, avatar, standalone }) => {
  // const IS_LOCKED = !access?.isLoading && access?.isProtected;
  const CAN_VIEW = !access?.isLoading && access?.canView;
  const IS_LOADING = access?.isLoading;

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

  if (standalone) {
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

  if (IS_LOADING) {
    return <Loading />;
  }

  if (!CAN_VIEW) {
    return <Locked />;
  }

  // if (IS_LOCKED && CAN_VIEW) {
  //   return <div> type in ur password </div>;
  // }

  if (CAN_VIEW) {
    return (
      <PageContainer>
        <div>
          {!minimal && (
            <PageHeaderContainer>
              <PageHeader
                title={name || page}
                style={{ width: '30vw' }}
                breadcrumb={{ routes: filtered }}
                // avatar={avatar ? { icon: <Icons type={avatar} size={32} /> } : null}
              />

              <PageHeaderExtras>{modifiers}</PageHeaderExtras>
            </PageHeaderContainer>
          )}

          <Helmet>
            <title>{name ? `${name} ─ ${page} ─ OMEGA 5000` : `${page} ─ OMEGA 5000`}</title>
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
