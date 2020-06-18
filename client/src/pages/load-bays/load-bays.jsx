import React from 'react';
import { useTranslation } from 'react-i18next';
import Iframe from 'react-iframe';
import useSWR from 'swr';

import { Page, ListView } from 'components';
import auth from 'auth';

import useAuth from 'hooks/use-auth';
import * as LOAD_BAYS from 'api/load-bays';
import * as SETTINGS from 'constants/settings';

const LoadBays = () => {
  const { t } = useTranslation();

  const { data: payload, revalidate } = useSWR(LOAD_BAYS.READ);

  const access = useAuth('M_LOADBAYS');

  const page = t('pageMenu.config');
  const name = t('pageNames.loadBays');

  const isLoading = !payload;

  const description = [
    {
      field: t('fields.tank'),
      key: 'pn_tank',
    },
    {
      field: t('fields.arm'),
      key: 'baa_code',
    },
  ];

  if (!SETTINGS.IS_DEVELOPMENT) {
    return (
      <Page page={page} name={name}>
        <div style={{ height: 'calc(100vh - 200px)' }}>
          <Iframe
            url={`https://${window.location.hostname}/phpwrapper/load_bays.php`}
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
  }

  return (
    <Page page={page} name={name} transparent avatar="loadBays" access={access}>
      <ListView
        data={payload?.records}
        id="ba_code"
        name="bad_name"
        description={description}
        isLoading={isLoading}
      ></ListView>
    </Page>
  );
};

export default auth(LoadBays);
