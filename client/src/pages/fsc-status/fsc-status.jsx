import React from 'react';
import useSWR from 'swr';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';

import auth from '../../auth';
import columns from './columns';
import { FSC_STATUS } from '../../api';
import { Page, DataTable } from '../../components';
import generator from './generator';
import useAuth from 'hooks/use-auth';

const FSCStatus = () => {
  const { t } = useTranslation();

  const access = useAuth('M_FSCSTATUS');

  const { data: heartbeat, isValidating } = useSWR(FSC_STATUS.HEARTBEAT, { refreshInterval: 1000 });
  const { data: batch } = useSWR(FSC_STATUS.BATCH, { refreshInterval: 1000 });
  const { data: which } = useSWR(FSC_STATUS.WHICH, { refreshInterval: 1000 });

  const data = generator(heartbeat?.records, batch?.records);
  const fields = columns(t);

  const modifiers = (
    <>
      <Badge
        count={`Current Mode: ${which?.isMaster ? 'Master' : 'Slave'}`}
        style={{ backgroundColor: which?.isMaster ? '#52c41a' : '#fbb120', marginTop: -3 }}
      />
    </>
  );

  return (
    <Page
      page={t('pageMenu.modules')}
      name={t('pageNames.fscStatus')}
      modifiers={modifiers}
      access={access}
      avatar="fscStatus"
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} />
    </Page>
  );
};

export default auth(FSCStatus);
