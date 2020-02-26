import React, { useState } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Page, DataTable, Download, FormModal, Calendar } from '../../components';
import { MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const MovementNominations = () => {
  const { t } = useTranslation();

  const [start, setStart] = useState(
    moment()
      .subtract(60, 'days')
      .format(SETTINGS.DATE_TIME_FORMAT)
  );

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: payload, isValidating, revalidate } = useSWR(
    `${MOVEMENT_NOMIATIONS.READ}?start_date=${start}&end_date=${end}`
  );

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.mv_id,
      name: value?.mv_key,
      width: '80vw',
      t
    });
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.movementNominations')}
      modifiers={modifiers}
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(MovementNominations);
