import React, { useState } from 'react';

import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable } from '../../components';
import { GATE_CONTROL } from '../../api';

import columns from './columns';
import auth from '../../auth';

const GateControl = ({ t }) => {
  const [selected, setSelected] = useState([]);

  const { data: payload, isValidating, revalidate } = useSWR(GATE_CONTROL.READ);

  const fields = columns(t);

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Button type="primary" icon="unlock" loading={isValidating} disabled={selected.length === 0}>
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
