import React from 'react';
import auth from '../../auth';

import { Page } from '../../components';

const Dashboard = ({ configuration, t }) => {
  return (
    <Page
      page={t('pageMenu.schedules')}
      name={t('pageNames.baseProducts')}
      isLoading={false}
      block={true}
    ></Page>
  );
};

export default auth(Dashboard);
