import React, { useState } from 'react';

import { DataTable } from '../../../../../components';
import { useTranslation } from 'react-i18next';
import { MOVEMENT_NOMIATIONS } from '../../../../../api';
import useSWR from 'swr';
import { Tabs } from 'antd';
import columns from './columns';
import { useAuth, useConfig } from '../../../../../hooks';

import Forms from '../../../../load-schedules/forms/nomforms';

const Schedules = ({ selected, cbFunction, closeForm }) => {
  const url = selected
    ? `${MOVEMENT_NOMIATIONS.SCHEDULES}?mv_key=${selected?.mvitm_key}&mvitm_item_id=${selected?.mvitm_item_id}`
    : `${MOVEMENT_NOMIATIONS.SCHEDULES}`;

  const [visible, setVisible] = useState(false);
  const [picked, setPicked] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const config = useConfig();

  const access = useAuth('M_LOADSCHEDULES');
  const { data } = useSWR(url);
  const { t } = useTranslation();

  const fields = columns(true, t, config);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setPicked(value);
  };

  const locateTrip = (value) => {
    if (value?.shls_trip_no) {
      setFilterValue('' + value?.shls_trip_no);
    } else {
      setFilterValue(' ');
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="1" animated={false}>
        <Tabs.TabPane tab={t('tabColumns.loadSchedulesForNomination')} forceRender={true} key="1">
          <DataTable
            data={data?.records}
            columns={fields}
            selectionMode="single"
            onClick={(payload) => handleFormState(true, payload)}
            handleSelect={(payload) => handleFormState(true, payload[0])}
            filterValue={filterValue}
          />
        </Tabs.TabPane>
      </Tabs>

      <Forms
        value={picked}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        url={url}
        locateTrip={locateTrip}
        cbFunction={cbFunction}
        closeForm={closeForm}
      />
    </>
  );
};

export default Schedules;
