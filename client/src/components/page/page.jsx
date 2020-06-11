import React from 'react';

import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import _ from 'lodash';

import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from './style';

import { Footer, Icons } from '..';

const Page = ({
  name,
  page,
  children,
  modifiers,
  description,
  minimal,
  noHeader,
  access,
  avatar,
  standalone,
}) => {
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

  return (
    <PageContainer>
      <div>
        {!noHeader && (
          <PageHeaderContainer>
            <PageHeader
              title={name || page}
              style={{ width: '30vw' }}
              subTitle={description}
              breadcrumb={{ routes: filtered }}
              avatar={avatar ? { icon: <Icons type={avatar} size={32} /> } : null}
            />

            <PageHeaderExtras>{modifiers}</PageHeaderExtras>
          </PageHeaderContainer>
        )}

        <Helmet>
          <title>{name ? `${name} ─ ${page} ─ OMEGA 5000` : `${page} ─ OMEGA 5000`}</title>
        </Helmet>

        <PageInjector minimal={minimal}>
          <div className="main-container">{children}</div>
        </PageInjector>
      </div>

      <Footer />
    </PageContainer>
  );
};

export default Page;

// const Page = ({ name, page, children, modifiers, description, minimal, noHeader, access }) => {
//   const IS_LOCKED = !access?.isLoading && access?.isProtected;
//   const CAN_VIEW = !access?.isLoading && access?.canView;
//   const IS_LOADING = access?.isLoading;

//   const routes = [
//     {
//       path: 'index',
//       breadcrumbName: 'OMEGA 5000',
//     },
//     {
//       path: 'first',
//       breadcrumbName: page,
//     },
//     {
//       path: 'second',
//       breadcrumbName: name,
//     },
//   ];

//   const filtered = name ? routes : _.reject(routes, ['path', 'second']);

//   if (IS_LOADING) {
//     return <Loading />;
//   }

//   if (!CAN_VIEW) {
//     return <div> missing access </div>;
//   }

//   if (IS_LOCKED && CAN_VIEW) {
//     return <div> type in ur password </div>;
//   }

//   if (CAN_VIEW) {
//     return (
//       <PageContainer>
//         {!noHeader && (
//           <PageHeaderContainer>
//             <PageHeader
//               title={name || page}
//               style={{ width: '30vw' }}
//               subTitle={description}
//               breadcrumb={{ routes: filtered }}
//             />

//             <PageHeaderExtras>{modifiers}</PageHeaderExtras>
//           </PageHeaderContainer>
//         )}

//         <Helmet>
//           <title>{name ? `${name} ─ ${page} ─ OMEGA 5000` : `${page} ─ OMEGA 5000`}</title>
//         </Helmet>

//         <PageInjector minimal={minimal}>
//           <div className="main-container">{children}</div>
//         </PageInjector>
//         <Footer />
//       </PageContainer>
//     );
//   }

//   return null;
// };

// export default Page;
