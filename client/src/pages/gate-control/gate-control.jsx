import React, { useState } from 'react';

import { SyncOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

import { Page, DataTable } from '../../components';
import { GATE_CONTROL } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useTranslation } from 'react-i18next';

const GateControl = () => {
  const { t } = useTranslation();
  const { data: payload, isValidating, revalidate } = useSWR(GATE_CONTROL.READ);

  const [selected, setSelected] = useState([]);

  const fields = columns(t);

  const handleGateOpening = () => {
    axios
      .post(GATE_CONTROL.OPEN_ALL_GATES, selected)
      .then(
        axios.spread(response => {
          mutate(GATE_CONTROL.READ);

          notification.success({
            message: t('messages.unlockSuccess')
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: t('descriptions.unlockFailed')
        });
      });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Button
        type="primary"
        icon={<UnlockOutlined />}
        loading={isValidating}
        disabled={selected.length === 0}
        onClick={handleGateOpening}
      >
        {payload?.records.length === selected.length
          ? t('operations.openAllGates')
          : t('operations.openGate')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.gateControl')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        handleSelect={setSelected}
      />
    </Page>
  );
};

export default auth(GateControl);
