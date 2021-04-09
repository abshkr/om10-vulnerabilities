import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';
import columns from './columns';
import { DataTable } from 'components';
import { PRODUCT_MOVEMENTS } from 'api';

const ProgressTable = ({ value, config }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(
    `${PRODUCT_MOVEMENTS.PROGRESS_TABLE}?pmv_batchcode=${value?.pmv_batchcode}`
  );
  const data = payload?.records;
  const fields = columns(t, config);

  return (
    <DataTable
      columns={fields}
      data={data}
      isLoading={isValidating}
      footer={[
        {
          pmv_number: t('fields.totalSum') + ': ',
          pmv_moved_qty: _.sumBy(data, (object) => {
            return _.toNumber(object?.pmv_moved_qty) || 0;
          }),
          // sum_amb: _.sumBy(data?.folio_loads, (object) => {
          //   return _.toNumber(object?.sum_amb) || 0;
          // }),
          // avgamb_per_load: null,
        },
      ]}
      // autoColWidth
    />
  );
};

export default ProgressTable;
