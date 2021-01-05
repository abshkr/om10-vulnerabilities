import React from 'react';

import { useTranslation } from 'react-i18next';

import useSWR from 'swr';

import Forms from './forms';
import { SiteAxleLimitTypes } from './forms/fields';
import { DataTable } from 'components';
import columns from './columns';
import { AXLE_WEIGHTS } from 'api';

const AxleWeightLimit = ({ handleFormState, visible, selected, access }) => {
  const { data: payload, isValidating, revalidate } = useSWR(AXLE_WEIGHTS.READ);

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
        extra={<SiteAxleLimitTypes />}
      />

      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </div>
  );
};

export default AxleWeightLimit;
