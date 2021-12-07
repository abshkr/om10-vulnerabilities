import React, { useState, useEffect } from 'react';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { DataTable, Download, PageDownloader, PageExporter, WindowSearch } from '../../../../../components';
import { useTranslation } from 'react-i18next';
import { MOVEMENT_NOMIATIONS, MOVEMENT_SCHEDULES } from '../../../../../api';
import useSWR from 'swr';
import { Button, Tabs, notification,Space } from 'antd';
import columns from './columns';
import { useAuth, useConfig } from '../../../../../hooks';
import usePagination from 'hooks/use-pagination';

import Forms from '../../../../load-schedules/forms/nomforms';

const Schedules = ({ selected, cbFunction, closeForm }) => {
  // const url = selected
  //   ? `${MOVEMENT_NOMIATIONS.SCHEDULES}?mv_key=${selected?.mvitm_key}&mvitm_item_id=${selected?.mvitm_item_id}`
  //   : `${MOVEMENT_NOMIATIONS.SCHEDULES}`;

  const [pagingFlag, setPagingFlag] = useState(true);
  const [visible, setVisible] = useState(false);
  const [picked, setPicked] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [isSearching, setSearching] = useState(false);

  const [tripNumber, setTripNumber] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [carrierCode, setCarrierCode] = useState('');
  const [terminalCode, setTerminalCode] = useState('');
  const [tankerCode, setTankerCode] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const [movKey, setMovKey] = useState(selected ? selected?.mvitm_key : '');

  const config = useConfig();

  const { t } = useTranslation();
  const access = useAuth('M_LOADSCHEDULES');
  
  const { setCount, take, offset, paginator, setPage, count } = usePagination(200);

  const baseUrl = selected
    ? `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&mvitm_item_id=${selected?.mvitm_item_id}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
    : `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`;
  const url = selected
    ? `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&mvitm_item_id=${selected?.mvitm_item_id}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}&start_num=${take}&end_num=${offset}`
    : `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}&start_num=${take}&end_num=${offset}`;
  const { data: payload, isValidating, revalidate } = useSWR(url);

  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;

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

  const onRefresh = () => {
    setMovKey(selected ? selected?.mvitm_key : '');
    setTripNumber('');
    setSupplierCode('');
    setCarrierCode('');
    setTerminalCode('');
    setTankerCode('');
    setTripStatus('');
    setPage(1);
    revalidate();
  };

  const setSearch = (values) => {
    if (
      !values.shls_trip_no &&
      !values.supplier_code &&
      !values.tnkr_code &&
      !values.carrier_code &&
      !values.trip_status &&
      !values.terminal &&
      (!selected && !values.mv_key)
    ) {
      return;
    }

    setSearching(true);
    setMovKey(selected ? selected?.mvitm_key : !values.mv_key ? '' : values.mv_key);
    setTripNumber(!values.shls_trip_no ? '' : values.shls_trip_no);
    setSupplierCode(!values.supplier_code ? '' : values.supplier_code);
    setCarrierCode(!values.carrier_code ? '' : values.carrier_code);
    setTerminalCode(!values.terminal ? '' : values.terminal);
    setTankerCode(!values.tnkr_code ? '' : values.tnkr_code);
    setTripStatus(!values.trip_status ? '' : values.trip_status);
    setPage(1);
    if (revalidate) revalidate();
    setSearching(false);

  };

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
      setCount(payload?.count || 0);
    }
  }, [payload]);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && (
        <Download data={data} isLoading={isLoading} columns={fields} />
      )}
      
      {pagingFlag && (
        // <PageExporter baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} columns={fields} />
        <PageDownloader baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} pageSize={500} columns={fields} />
      )}

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(setSearch, t('operations.search'), {
            terminal: true,
            mv_key: !selected ? true : false,
            shls_trip_no: true,
            supplier_code: true,
            trip_status: true,
            tnkr_code: true,
            carrier_code: true,
          }, false)
        }
      >
        {t('operations.search')}
      </Button>

      <Space size={160}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Space>
    </>
  );

  return (
    <>
      <Tabs defaultActiveKey="1" animated={false} tabBarExtraContent={modifiers}>
        <Tabs.TabPane tab={t('tabColumns.loadSchedulesForNomination')} forceRender={true} key="1">
          <DataTable
            data={data}
            isLoading={isLoading}
            columns={fields}
            selectionMode="single"
            onClick={(payload) => handleFormState(true, payload)}
            handleSelect={(payload) => handleFormState(true, payload[0])}
            filterValue={filterValue}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            {pagingFlag ? paginator : t('fields.totalCount') + ': ' + count }
          </div>
        </Tabs.TabPane>
      </Tabs>

      {visible && (
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
      )}
    </>
  );
};

export default Schedules;
