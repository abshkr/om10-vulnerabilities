import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Iframe from 'react-iframe';
import NotFound from '../../components/not-found';

import { Page } from 'components';
import auth from 'auth';
import api from 'api';

import useAuth from 'hooks/use-auth';

const BayView = () => {
  const { t } = useTranslation();

  const access = useAuth('M_BAYVIEW');

  const page = t('pageMenu.modules');
  const name = t('pageNames.bayView');
  const port = window.location.port ? window.location.port : 443;

  const [available, setAvailable] = useState(false);

  useEffect(() => {
    api
    .get(`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`)
    .then((res) => {
      if (res.data.includes("<title>OMEGA 5000</title>")){
        setAvailable(false);
      } else {
        setAvailable(true);
      }
      })
    .catch(function (error) {
      setAvailable(false);
    })
    
  }, []);

  if (!available) {
    return <NotFound target={`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html#/overview`}/>
  } else {
    return (
        <Page page={page} name={name} access={access}>
          <div style={{ height: 'calc(100vh - 200px)' }}>
            <Iframe
              url={`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html#/overview`}
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
              height="100%"
              width="100%"
            />
          </div>
        </Page> 
        // <NotFound />
      // }
    );
  }
};

export default auth(BayView);
