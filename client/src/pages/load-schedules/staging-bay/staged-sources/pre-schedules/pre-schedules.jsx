import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import api, { STAGING_BAY } from 'api';
import _ from 'lodash';

import { DataTable } from '../../../../../components';
import columns from '../../../columns';
import compartmentColumns from './compartment-columns';
import SourceRender from '../../../source-render';
import ConvertTraceRender from '../../../convert-trace-render';
import TripStatusRender from '../../../trip-status-render';
import PickupModeRender from '../../../pickup-mode-render';

const PreSchedules = ({ value, form, supplier, config }) => {
  const { t } = useTranslation();

  const [trips, setTrips] = useState([]);
  const [compartments, setCompartments] = useState([]);
  const [selected, setSelected] = useState(null);

  const { data: payload, isValidating, revalidate } = useSWR(
    `${STAGING_BAY.PRE_SCHEDULES}?supplier=${supplier}`,
    {
      refreshInterval: 0,
    }
  );

  const { data: pickup, isValidatingPickup, revalidatePickup } = useSWR(
    `${STAGING_BAY.PICKUP_SPECS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`,
    {
      refreshInterval: 0,
    }
  );

  const { data: compartmentsPayload } = useSWR(
    selected
      ? `${STAGING_BAY.TRIP_COMPARTMENTS}?shls_trip_no=${selected?.shls_trip_no}&supplier_code=${selected?.supplier_code}`
      : null
  );

  const { setFieldsValue } = form;

  const fields = columns(false, t, config);
  const compartmentFields = compartmentColumns(t, form, config);

  const components = {
    SourceRender,
    ConvertTraceRender,
    TripStatusRender,
    PickupModeRender,
  };

  const handleSelection = (option) => {
    console.log('..........option1...', option, selected);
    setSelected(option);
  };

  const handleDoubleSelection = (option) => {
    console.log('..........option2...', option, selected);
    if (selected && selected?.shls_trip_no === option?.shls_trip_no) {
      setSelected(undefined);
    } else {
      setSelected(option);
    }
  };

  useEffect(() => {
    if (payload && pickup) {
      const trips = _.filter(payload?.records, (o) => {
        if (o?.shls_pickup_mode === '0') {
          return true;
        }
        if (o?.shls_pickup_mode === '2') {
          const item = _.find(
            pickup?.records,
            (p) => p?.plss_staged_trip === o?.shls_trip_no && p?.plss_staged_supp === o?.supplier_code
          );
          return !item ? false : true;
        }
      });
      setTrips(trips);
    }
  }, [payload, pickup]);

  useEffect(() => {
    if (selected && compartmentsPayload) {
      const list = _.filter(
        compartmentsPayload.records,
        (o) => o?.prod_cmpy !== '' && o?.prod_code !== '' && o?.qty_scheduled !== undefined
      );
      setCompartments(list);
      setFieldsValue({
        stage_compartments: list,
      });
    }
  }, [selected, compartmentsPayload, setFieldsValue]);

  return (
    <>
      <Form.Item name="pre_schedules" noStyle>
        <DataTable
          data={trips}
          isLoading={isValidating}
          columns={fields}
          components={components}
          selectionMode="single"
          // parentHeight={trips?.length > 0 ? `${trips?.length * 25 + 90}px` : '135px'}
          parentHeight={'135px'}
          minimal
          onClick={(payload) => handleDoubleSelection(payload)}
          handleSelect={(payload) => handleSelection(payload[0])}
        />
      </Form.Item>
      {selected && (
        <Form.Item name="stage_compartments" style={{ marginTop: 10 }}>
          <DataTable
            data={compartments}
            // isLoading={isValidating}
            columns={compartmentFields}
            // components={components}
            // parentHeight={trips?.length > 0 ? `${trips?.length * 25 + 90}px` : '135px'}
            parentHeight={'135px'}
            minimal
            //onClick={(payload) => handleSelection(payload)}
            //handleSelect={(payload) => handleSelection(payload[0])}
          />
        </Form.Item>
      )}
    </>
  );
};

export default PreSchedules;
