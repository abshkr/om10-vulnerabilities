import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, CaretLeftOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal, Calendar } from '../../components';
import { LOAD_SCHEDULES, MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS, ROUTES } from '../../constants';
import { useQuery } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

const LoadSchedules = () => {
  let history = useHistory();

  const { params } = useQuery(['mv_key']);
  const { t } = useTranslation();

  const [start, setStart] = useState(
    moment()
      .subtract(5, 'years')
      .format(SETTINGS.DATE_TIME_FORMAT)
  );

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));
  const [data, setData] = useState([]);

  const { data: schedules, isValidating, revalidate } = useSWR(`${LOAD_SCHEDULES.READ}`);

  const isFromNomination = params?.mv_key;

  const fields = columns(isFromNomination, t);

  const handleClick = value => {
    FormModal({
      value,
      form: <div value={value} />,
      width: '90vw',
      t
    });
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  useEffect(() => {
    if (params?.mv_key) {
      axios.get(MOVEMENT_NOMIATIONS.SCHEDULES, { params }).then(response => setData(response.data.records));
    } else {
      setData(schedules?.records);
    }
  }, [schedules, params]);

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />

      {!isFromNomination && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleClick(null)}
          loading={isValidating}
        >
          {t('operations.create')}
        </Button>
      )}

      {isFromNomination && (
        <Button icon={<CaretLeftOutlined />} onClick={() => history.push(ROUTES.TRANSACTION_LIST)}>
          {t('operations.returnToLoadSchedules')}
        </Button>
      )}
    </>
  );

  return (
    <Page
      page={t('pageMenu.schedules')}
      name={isFromNomination ? t('pageNames.loadSchedulesFromNomination') : t('pageNames.loadSchedules')}
      modifiers={modifiers}
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(LoadSchedules);
