import React, { useState, useEffect, useRef } from 'react';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import {
  DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  PageExporter,
  WindowSearch,
  WindowSearchForm,
} from '../../../../../components';
import { useTranslation } from 'react-i18next';
import api, { MOVEMENT_NOMIATIONS, MOVEMENT_SCHEDULES, SITE_CONFIGURATION } from '../../../../../api';
import useSWR from 'swr';
import { Button, Tabs, notification, Space, Switch } from 'antd';
import columns from './columns';
import { useAuth, useConfig } from '../../../../../hooks';
import usePagination from 'hooks/use-pagination';

import Forms from '../../../../load-schedules/forms/nomforms';

const Schedules = ({ selected, cbFunction, closeForm }) => {
  // const url = selected
  //   ? `${MOVEMENT_NOMIATIONS.SCHEDULES}?mv_key=${selected?.mvitm_key}&mvitm_item_id=${selected?.mvitm_item_id}`
  //   : `${MOVEMENT_NOMIATIONS.SCHEDULES}`;

  const config = useConfig();
  const { siteNomSchdPaging, siteUseDownloader } = config;

  const [pagingFlag, setPagingFlag] = useState(undefined);
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

  const { t } = useTranslation();
  const access = useAuth('M_LOADSCHEDULES');

  const { setCount, take, offset, paginator, setPage, count } = usePagination(200);

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const [mainUrl, setMainUrl] = useState(
    selected
      ? `${MOVEMENT_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&mv_key=${movKey}&mvitm_item_id=${
          selected?.mvitm_item_id
        }&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
      : `${MOVEMENT_SCHEDULES.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url = !pagingFlag && siteUseDownloader ? null : mainUrl + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  // const baseUrl = selected
  //   ? `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&mvitm_item_id=${selected?.mvitm_item_id}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
  //   : `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`;
  // const url = selected
  //   ? `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&mvitm_item_id=${selected?.mvitm_item_id}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}&start_num=${take}&end_num=${offset}`
  //   : `${MOVEMENT_SCHEDULES.READ}?mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}&start_num=${take}&end_num=${offset}`;

  const { data: payload, isValidating, revalidate } = useSWR(url);

  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;

  const fields = columns(true, t, config);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setPicked(value);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = selected
      ? `${MOVEMENT_SCHEDULES.READ}?pgflag=${v ? 'Y' : 'N'}&mv_key=${movKey}&mvitm_item_id=${
          selected?.mvitm_item_id
        }&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
      : `${MOVEMENT_SCHEDULES.READ}?pgflag=${
          v ? 'Y' : 'N'
        }&mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_NOMSCHD_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
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

    // const tempUrl = (selected
    //   ? `${MOVEMENT_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&mv_key=${movKey}&mvitm_item_id=${selected?.mvitm_item_id}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
    //   : `${MOVEMENT_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
    // );
    const tempUrl = selected
      ? `${MOVEMENT_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&mv_key=${
          selected?.mvitm_key
        }&mvitm_item_id=${
          selected?.mvitm_item_id
        }&shls_trip_no=${''}&supplier_code=${''}&carrier_code=${''}&shls_terminal=${''}&tnkr_code=${''}&status=${''}`
      : `${MOVEMENT_SCHEDULES.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&mv_key=${''}&shls_trip_no=${''}&supplier_code=${''}&carrier_code=${''}&shls_terminal=${''}&tnkr_code=${''}&status=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    revalidate();
  };

  const setSearch = (values) => {
    /* if (
      !values.shls_trip_no &&
      !values.supplier_code &&
      !values.tnkr_code &&
      !values.carrier_code &&
      !values.trip_status &&
      !values.terminal &&
      (!selected && !values.mv_key)
    ) {
      return;
    } */

    if (!pagingFlag) {
      setData([]);
    }

    setSearching(true);
    setMovKey(selected ? selected?.mvitm_key : !values.mv_key ? '' : values.mv_key);
    setTripNumber(!values.shls_trip_no ? '' : values.shls_trip_no);
    setSupplierCode(!values.supplier_code ? '' : values.supplier_code);
    setCarrierCode(!values.carrier_code ? '' : values.carrier_code);
    setTerminalCode(!values.terminal ? '' : values.terminal);
    setTankerCode(!values.tnkr_code ? '' : values.tnkr_code);
    setTripStatus(!values.trip_status ? '' : values.trip_status);

    // useState variables may be async, so use local variables here.
    const movKey = selected ? selected?.mvitm_key : !values.mv_key ? '' : values.mv_key;
    const tripNumber = !values.shls_trip_no ? '' : values.shls_trip_no;
    const supplierCode = !values.supplier_code ? '' : values.supplier_code;
    const carrierCode = !values.carrier_code ? '' : values.carrier_code;
    const terminalCode = !values.terminal ? '' : values.terminal;
    const tankerCode = !values.tnkr_code ? '' : values.tnkr_code;
    const tripStatus = !values.trip_status ? '' : values.trip_status;
    const tempUrl = selected
      ? `${MOVEMENT_SCHEDULES.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&mv_key=${movKey}&mvitm_item_id=${
          selected?.mvitm_item_id
        }&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`
      : `${MOVEMENT_SCHEDULES.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&mv_key=${movKey}&shls_trip_no=${tripNumber}&supplier_code=${supplierCode}&carrier_code=${carrierCode}&shls_terminal=${terminalCode}&tnkr_code=${tankerCode}&status=${tripStatus}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
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

  useEffect(() => {
    if (siteNomSchdPaging !== undefined) {
      setPagingFlag(siteNomSchdPaging);
    }
  }, [siteNomSchdPaging]);

  const modifiers = (
    <>
      <Switch
        style={{ marginRight: 5 }}
        checked={pagingFlag}
        checkedChildren={<span>{t('operations.paginationOn')}</span>}
        unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
        onChange={(value) => onChangePagination(value)}
      />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isDownloading || isSearching}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && <Download data={data} isLoading={isDownloading || isSearching} columns={fields} />}

      {pagingFlag && (
        // <PageExporter baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} columns={fields} />
        <PageDownloader
          baseUrl={baseUrl}
          startVar={'start_num'}
          endVar={'end_num'}
          pageSize={500}
          columns={fields}
        />
      )}

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearchForm(
            setSearch,
            t('operations.search'),
            {
              terminal: true,
              mv_key: !selected ? true : false,
              shls_trip_no: true,
              supplier_code: true,
              trip_status: true,
              tnkr_code: true,
              carrier_code: true,
            },
            {
              terminal: terminalCode,
              mv_key: movKey,
              shls_trip_no: tripNumber,
              supplier_code: supplierCode,
              trip_status: tripStatus,
              tnkr_code: tankerCode,
              carrier_code: carrierCode,
            },
            false
          )
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
            isLoading={isDownloading || isSearching}
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
            {/* pagingFlag ? paginator : t('fields.totalCount') + ': ' + count */}
            {pagingFlag ? (
              paginator
            ) : siteUseDownloader === false ? (
              t('fields.totalCount') + ': ' + count
            ) : (
              <DataDownloader
                baseUrl={pageUrl}
                startVar={'start_num'}
                endVar={'end_num'}
                pageSize={500}
                setData={setData}
                setDownloading={setDownloading}
                runUrl={runUrlFlag.current}
                setRunUrl={setRunUrlFlag}
              />
            )}
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
