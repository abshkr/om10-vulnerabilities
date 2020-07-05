import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, WindowSearch } from '../../components';
import api, { SPECIAL_MOVEMENTS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig } from 'hooks';
import Forms from './forms';

const SpecialMovements = () => {
  const config = useConfig();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const access = useAuth('M_SPECIALMOVEMENTS');

  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const url = `${SPECIAL_MOVEMENTS.READ}?start_date=${start}&end_date=${end}`;
  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const fields = columns(t);
  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const locateSpecialMv = (value) => {
    setSearch({
      mlitm_id: value,
    })
  }

  const setSearch = (values) => {
    if (!values.mlitm_id && !values.mlitm_status) {
      return;
    }

    api
      .get(SPECIAL_MOVEMENTS.SEARCH, {
        params: {
          mlitm_id: values.mlitm_id,
          mlitm_status: values.mlitm_status,
          start_date: values.use_date_range ? values.start_date : null,
          end_date: values.use_date_range ? values.end_date : null,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
      });
  };

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload]);

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(setSearch, t('operations.search'), {
            mlitm_id: true,
            mlitm_status: true,
          })
        }
      >
        {t('operations.search')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access?.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.specialMovements')}
      modifiers={modifiers}
      access={access}
      avatar="specialMovements"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms 
        value={selected} 
        visible={visible} 
        handleFormState={handleFormState} 
        access={access} 
        url={url} 
        locateSpecialMv={locateSpecialMv}
        config={config}
      />
    </Page>
  );
};

export default auth(SpecialMovements);
