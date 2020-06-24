import React from 'react';
import { useTranslation } from 'react-i18next';
import Iframe from 'react-iframe';

import { Page } from 'components';
import auth from 'auth';

import useAuth from 'hooks/use-auth';

const BayView = () => {
  const { t } = useTranslation();

  const access = useAuth('M_BAYVIEW');

  const page = t('pageMenu.modules');
  const name = t('pageNames.bayView');

  return (
    <Page page={page} name={name} access={access}>
      <div style={{ height: 'calc(100vh - 200px)' }}>
        <Iframe
          url={`https://${window.location.hostname}/scadaviews/bayview/index.html`}
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          height="100%"
          width="100%"
        />
      </div>
    </Page>
  );
};

export default auth(BayView);
