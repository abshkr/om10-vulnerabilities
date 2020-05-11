import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'antd';

import { LOGICAL_PRINTERS } from '../../api';
import { Page } from '../../components';
import { useAuth } from '../../hooks';

import auth from '../../auth';

const Settings = () => {
  const { t } = useTranslation();
  const auth = useAuth('M_LOGICALPRINTERS');

  const { data: payload, isValidating, revalidate } = useSWR(LOGICAL_PRINTERS.READ);

  const page = t('pageMenu.settings');

  return (
    <Page page={page} auth={auth} minimal>
      <Card
        title="Change Your Password"
        size="small"
        hoverable
        style={{ borderColor: '1px solid #0054a43b' }}
        bordered
      >
        <p>Please enter your new password</p>
      </Card>
    </Page>
  );
};

export default auth(Settings);
