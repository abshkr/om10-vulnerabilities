import React from 'react';

import useSWR from 'swr';

import { useTranslation } from 'react-i18next';

import { Page } from '../../components';
import { LOGICAL_PRINTERS } from '../../api';
import { useAuth } from '../../hooks';

import auth from '../../auth';

const Settings = () => {
  const { t } = useTranslation();
  const auth = useAuth('M_LOGICALPRINTERS');

  const { data: payload, isValidating, revalidate } = useSWR(LOGICAL_PRINTERS.READ);

  const page = t('pageMenu.settings');

  return <Page page={page} auth={auth}></Page>;
};

export default auth(Settings);
