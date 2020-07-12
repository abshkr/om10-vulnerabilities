import React from 'react';

import { useTranslation } from 'react-i18next';

import useSWR from 'swr';

import Forms from './forms';
import { DataTable } from 'components';
import columns from './columns';
import { SITE_CONFIGURATION } from 'api';

const Locations = ({ handleFormState, visible, selected, access }) => {
  const { data: payload, isValidating, revalidate } = useSWR(SITE_CONFIGURATION.TERMINALS);

  const { t } = useTranslation();

  const fields = columns(t);
  const data = payload?.records;

  return (
    <div style={{ padding: 10, background: 'white' }}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        parentHeight="calc(100vh - 400px)"
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />

      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </div>
  );
};

export default Locations;
