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
import Forms from './forms';

const LoadSchedules = () => {
  let history = useHistory();

  const { params } = useQuery(['mv_key']);
  const { t } = useTranslation();

  const [start, setStart] = useState(moment().subtract(5, 'years').format(SETTINGS.DATE_TIME_FORMAT));

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));
  const [data, setData] = useState([]);

  const { data: schedules, isValidating, revalidate } = useSWR(`${LOAD_SCHEDULES.READ}`);

  const IS_NOMINATION = params?.mv_key;

  const fields = columns(IS_NOMINATION, t);

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} IS_NOMINATION={IS_NOMINATION} />,
      width: '90vw',
      id: IS_NOMINATION || value?.shls_trip_no,
      name: value?.shlsload_load_id,
      t,
    });
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  useEffect(() => {
    if (params?.mv_key) {
      axios.get(MOVEMENT_NOMIATIONS.SCHEDULES, { params }).then((response) => setData(response.data.records));
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

      {!IS_NOMINATION && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleClick(null)}
          loading={isValidating}
        >
          {t('operations.create')}
        </Button>
      )}

      {IS_NOMINATION && (
        <Button icon={<CaretLeftOutlined />} onClick={() => history.push(ROUTES.LOAD_SCHEDULES)}>
          {t('operations.returnToLoadSchedules')}
        </Button>
      )}
    </>
  );

  return (
    <Page
      page={t('pageMenu.schedules')}
      name={IS_NOMINATION ? t('pageNames.loadSchedulesFromNomination') : t('pageNames.loadSchedules')}
      modifiers={modifiers}
    >
      <DataTable columns={fields} data={data} onClick={handleClick} />
    </Page>
  );
};

export default auth(LoadSchedules);
