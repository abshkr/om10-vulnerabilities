import React from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from '../../components';
import Interface from './interface';
import auth from '../../auth';

const HostMessagingInterface = () => {
  const { t } = useTranslation();

  const page = t('pageMenu.reports');
  const name = t('pageNames.hostMessagingInterface');

  return (
    <Page page={page} name={name}>
      <Interface t={t} />
    </Page>
  );
};

export default auth(HostMessagingInterface);
