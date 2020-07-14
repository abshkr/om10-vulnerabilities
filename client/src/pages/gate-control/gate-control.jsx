import React, { useState } from 'react';

import { SyncOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { Page, DataTable } from '../../components';
import api, { GATE_CONTROL } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useTranslation } from 'react-i18next';
import useAuth from 'hooks/use-auth';

const GateControl = () => {
  const { t } = useTranslation();
  const { data: payload, isValidating, revalidate } = useSWR(GATE_CONTROL.READ);
  const access = useAuth('M_GATECONTROL');

  const [selected, setSelected] = useState([]);

  const fields = columns(t);

  const handleGateOpening = () => {
    const values = {
      gates: selected,
    }
    api
      .post(GATE_CONTROL.OPEN_ALL_GATES, values)
      .then((response) => {
        mutate(GATE_CONTROL.READ);

        notification.success({
          message: t('messages.unlockSuccess'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
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
        disabled={selected.length === 0 || !access?.canUpdate}
        onClick={handleGateOpening}
      >
        {payload?.records.length === selected.length
          ? t('operations.openAllGates')
          : t('operations.openGate')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.gateControl')}
      modifiers={modifiers}
      avatar="gateControl"
      access={access}
    >
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
