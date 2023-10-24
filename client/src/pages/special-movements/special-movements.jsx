import React, { useState, useEffect } from 'react';

import useSWR, { mutate } from 'swr';
import moment from 'moment';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, PowerTable as DataTable, Download, DateTimeRangePicker, WindowSearch } from '../../components';
import api, { SPECIAL_MOVEMENTS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig } from 'hooks';
import Forms from './forms';

const SpecialMovements = () => {
  const config = useConfig();
  const rangeSetting = config.nominationDateRange;
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const access = useAuth('M_SPECIALMOVEMENTS');

  const [refreshed, setRefreshed] = useState(false);
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
    // revalidate();
  };

  const locateSpecialMv = (value) => {
    setSearch({
      mlitm_id: value,
    });
  };

  const setSearch = (values) => {
    if (
      !values.mlitm_id &&
      !values.mlitm_status &&
      !values.mlitm_type &&
      !values.mlitm_prodcmpy &&
      !values.mlitm_reason_code &&
      !values.use_date_range
    ) {
      return;
    }

    api
      .get(SPECIAL_MOVEMENTS.SEARCH, {
        params: {
          mlitm_prodcmpy: values.mlitm_prodcmpy,
          mlitm_id: values.mlitm_id,
          mlitm_status: values.mlitm_status,
          mlitm_type: values.mlitm_type,
          mlitm_reason_code: values.mlitm_reason_code,
          start_date: values.use_date_range ? values.start_date : null,
          end_date: values.use_date_range ? values.end_date : null,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
      });
  };

  const onRefresh = () => {
    setRefreshed(true);
    mutate(url);

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload]);

  const modifiers = (
    <>
      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={rangeSetting}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={1000}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isValidating} columns={fields} />

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(setSearch, t('operations.search'), {
            mlitm_prodcmpy: true,
            mlitm_id: true,
            mlitm_status: true,
            mlitm_type: true,
            mlitm_reason_code: true,
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
        clearFilterPlus={revalidate}
        columnAdjustable={config?.siteCustomColumnSpecMove}
        pageModule={'M_SPECIALMOVEMENTS'}
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
