import React from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { MOVEMENT_NOMIATIONS } from '../../../../api';
import { DataTable } from '../../../../components';
import columns from './columns';

const Nomination = ({ value }) => {
  const { t } = useTranslation();

  const { data: schedules } = useSWR(
    `${MOVEMENT_NOMIATIONS.SCHEDULE_ITEMS}?supplier=${value?.supplier_code}&trip_no=${value?.shls_trip_no}`
  );

  const fields = columns(t);

  return <DataTable data={schedules?.records} columns={fields} height="35vh" />;
};

export default Nomination;
