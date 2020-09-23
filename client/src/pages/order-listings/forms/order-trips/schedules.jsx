import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
// import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable } from '../../../../components';
import { LOAD_SCHEDULES } from '../../../../api';
import { SETTINGS } from '../../../../constants';
import { useAuth, useConfig } from 'hooks';
// import { getDateRangeOffset } from 'utils';
import columns from '../../../../pages/load-schedules/columns';
// import auth from '../../../../auth';

import Forms from '../../../../pages/load-schedules/forms';

import api from 'api';
import SourceRender from '../../../../pages/load-schedules/source-render';

const Schedules = ({popup, params}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_LOADSCHEDULES');
  
  const [start, setStart] = useState(moment().subtract(1, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(1, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const url = `${LOAD_SCHEDULES.READ}?start_date=${start}&end_date=${end}`;

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const locateTrip = (value) => {
    setSearch({
      shls_trip_no: value.shls_trip_no,
      supplier_code: value.supplier_code,
    })
  }

  const setSearch = (values) => {
    if (!values.shls_trip_no && 
      !values.supplier_code &&
      !values.tnkr_code && 
      !values.carrier_code && 
      !values.trip_status &&
      !values.use_date_range) {
      return;
    }

    api
      .get(LOAD_SCHEDULES.SEARCH, {
        params: {
          shls_terminal: values.terminal,
          shls_trip_no: values.shls_trip_no,
          supplier_code: values.supplier_code,
          carrier_code: values.carrier_code,
          tnkr_code: values.tnkr_code,
          status: values.trip_status,
          start_date: values.use_date_range ? values.start_date : null,
          end_date: values.use_date_range ? values.end_date : null,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
      });
  };

  const fields = columns(false, t);

  const components = {
    SourceRender,
  };
  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;

  const page = t('pageMenu.operations');
  const name = t('pageNames.loadSchedules');

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      payload.records = null;
    } 
    
  }, [payload]);

  useEffect(() => {
    if (params) {
      locateTrip(params);
    } 
    
  }, [params]);

  return (
    <Page page={page} name={name} access={access} standalone={popup}>
      <DataTable
        minimal={true}
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        components={components}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
      />

      <Forms 
        value={selected} 
        visible={visible} 
        handleFormState={handleFormState} 
        access={access} url={url}
        locateTrip={locateTrip} />
    </Page>
  );
};

export default Schedules;
