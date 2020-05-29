import React from 'react';
import { useTranslation } from 'react-i18next';
import Iframe from 'react-iframe';

import { Page } from '../../components';

import auth from '../../auth';

const LoadBays = () => {
  const { t } = useTranslation();

  const page = t('pageMenu.gantry');
  const name = t('pageNames.loadBays');

  return (
    <Page page={page} name={name}>
      <div style={{ height: 'calc(100vh - 200px)' }}>
        <Iframe
          url="/api/pages/product_group/read.php"
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

export default auth(LoadBays);
