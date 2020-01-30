import React from 'react';
import { useTranslation } from 'react-i18next';
import auth from '../../auth';
import { Page } from '../../components';

const Dashboard = () => {
  const { t } = useTranslation();

  return <Page page={t('pageMenu.dashboard')} name={t('pageMenu.dashboard')}></Page>;
};

export default auth(Dashboard);
