import React from 'react';

import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../components';
import columns from './columns';

const TransferDetails = ({ form }) => {
  const { t } = useTranslation();

  const fields = columns(t);

  return (
    <>
      <DataTable data={[]} height="80vh" columns={fields} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <div style={{ marginRight: 20 }}>
          <strong>Base Obsered Total: {500}</strong>
        </div>
      </div>
    </>
  );
};

export default TransferDetails;
