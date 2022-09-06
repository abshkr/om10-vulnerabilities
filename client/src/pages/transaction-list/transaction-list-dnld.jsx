import React, { useState, useEffect, useRef } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, notification, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import {
  Page,
  FormModal,
  DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  PageExporter,
  DateTimeRangePicker,
  WindowSearch,
  WindowSearchForm,
} from '../../components';
import api, { TRANSACTION_LIST, SITE_CONFIGURATION } from '../../api';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig } from 'hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import NewForms from './new-forms';
import _ from 'lodash';
import usePagination from 'hooks/use-pagination';

const TransactionList = () => {
  const config = useConfig();
  const { siteTrsaPaging, siteUseDownloader } = config;

  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_TRANSACTIONLIST');

  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [useDateRange, setUseDateRange] = useState('N');

  const [startTimeSearch, setStartTimeSearch] = useState(null);
  const [endTimeSearch, setEndTimeSearch] = useState(null);
  const [useSearch, setUseSearch] = useState(false);

  const [trsaStatus, setTrsaStatus] = useState('B');
  const [trsaTerminal, setTrsaTerminal] = useState('');
  const [trsaBay, setTrsaBay] = useState('');
  const [trsaTrip, setTrsaTrip] = useState('');
  const [trsaSupplier, setTrsaSupplier] = useState('');
  const [trsaCarrier, setTrsaCarrier] = useState('');
  const [trsaTanker, setTrsaTanker] = useState('');
  const [trsaId, setTrsaId] = useState('');
  const [trsaLoad, setTrsaLoad] = useState('');

  const [mainUrl, setMainUrl] = useState(
    `${TRANSACTION_LIST.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${!start ? '-1' : start}&end_date=${
      !end ? '-1' : end
    }`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url = !pagingFlag && siteUseDownloader ? null : mainUrl + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const fields = columns(t, config);

  // const data = payload?.records;
  const [data, setData] = useState(payload?.records);
  const isLoading = isValidating || !data;
  // const [isLoading, setLoading] = useState(isValidating || !data);

  const page = t('pageMenu.operations');
  const name = t('pageNames.transactionList');

  const handleFormState = (visibility, value) => {
    setSelected(value);
    setVisible(visibility);
    // handleClick(value);
  };

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} start={start} end={end} access={access} config={config} />,
      id: value?.trsa_id,
      name: value?.trsa_trip,
      t,
      width: '90vw',
    });
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${TRANSACTION_LIST.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${
      !end ? '-1' : end
    }&trsa_status=${trsaStatus}&trsa_terminal=${trsaTerminal}&trsa_bay=${trsaBay}&trsa_trip=${trsaTrip}&trsa_supplier=${trsaSupplier}&trsa_carrier=${trsaCarrier}&trsa_tanker=${trsaTanker}&trsa_id=${trsaId}&load_id=${trsaLoad}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_TRSA_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const setRange = (start, end) => {
    // revalidate();
    const tempUrl = `${TRANSACTION_LIST.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&trsa_status=${trsaStatus}&trsa_terminal=${trsaTerminal}&trsa_bay=${trsaBay}&trsa_trip=${trsaTrip}&trsa_supplier=${trsaSupplier}&trsa_carrier=${trsaCarrier}&trsa_tanker=${trsaTanker}&trsa_id=${trsaId}&load_id=${trsaLoad}`;
    setMainUrl(tempUrl);
    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setStart(start);
    setEnd(end);
  };

  const onRefresh = () => {
    if (!pagingFlag) {
      setData([]);
    }

    setStartTimeSearch(null);
    setEndTimeSearch(null);
    setUseDateRange('N');

    setUseSearch(false);

    setTrsaStatus('B');
    setTrsaTerminal('');
    setTrsaBay('');
    setTrsaTrip('');
    setTrsaSupplier('');
    setTrsaCarrier('');
    setTrsaTanker('');
    setTrsaId('');
    setTrsaLoad('');
    /* // const tempUrl = (
    //   `${TRANSACTION_LIST.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${!start?'-1':start}&end_date=${!end?'-1':end}&trsa_status=${trsaStatus}&trsa_terminal=${trsaTerminal}&trsa_bay=${trsaBay}&trsa_trip=${trsaTrip}&trsa_supplier=${trsaSupplier}&trsa_carrier=${trsaCarrier}&trsa_tanker=${trsaTanker}&trsa_id=${trsaId}&load_id=${trsaLoad}`
    // );
    const tempUrl = `${TRANSACTION_LIST.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${
      !end ? '-1' : end
    }&trsa_terminal=${''}&trsa_bay=${''}&trsa_trip=${''}&trsa_supplier=${''}&trsa_carrier=${''}&trsa_tanker=${''}&trsa_id=${''}&load_id=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate(); */

    // this will trigger setRange so the above lines are not needed
    setRefreshed(true);
  };

  const locateTrip = (value) => {
    setSearch({
      shls_trip_no: value.shls_trip_no,
      supplier_code: value.supplier_code,
    });
  };

  const setSearch = (values) => {
    if (!pagingFlag) {
      setData([]);
    }

    setSearching(true);

    setTrsaStatus(!values?.trsa_status ? 'B' : values?.trsa_status);
    setTrsaTerminal(!values?.terminal ? '' : values?.terminal);
    setTrsaBay(!values?.bay_code ? '' : values?.bay_code);
    setTrsaTrip(!values?.shls_trip_no ? '' : values?.shls_trip_no);
    setTrsaSupplier(!values?.supplier_code ? '' : values?.supplier_code);
    setTrsaCarrier(!values?.carrier_code ? '' : values?.carrier_code);
    setTrsaTanker(!values?.tnkr_code ? '' : values?.tnkr_code);
    setTrsaId(!values?.trsa_id ? '' : values?.trsa_id);
    setTrsaLoad(!values?.load_id ? '' : values?.load_id);
    setUseDateRange(!values.use_date_range ? 'N' : 'Y');
    setStartTimeSearch(values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1');
    setEndTimeSearch(values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1');
    setUseSearch(true);

    const trsaStatus = !values?.trsa_status ? 'B' : values?.trsa_status;
    const trsaTerminal = !values?.terminal ? '' : values?.terminal;
    const trsaBay = !values?.bay_code ? '' : values?.bay_code;
    const trsaTrip = !values?.shls_trip_no ? '' : values?.shls_trip_no;
    const trsaSupplier = !values?.supplier_code ? '' : values?.supplier_code;
    const trsaCarrier = !values?.carrier_code ? '' : values?.carrier_code;
    const trsaTanker = !values?.tnkr_code ? '' : values?.tnkr_code;
    const trsaId = !values?.trsa_id ? '' : values?.trsa_id;
    const trsaLoad = !values?.load_id ? '' : values?.load_id;
    const useDateRange = !values.use_date_range ? 'N' : 'Y';
    const startTimeSearch = values.use_date_range ? (!values.start_date ? '-1' : values.start_date) : '-1';
    const endTimeSearch = values.use_date_range ? (!values.end_date ? '-1' : values.end_date) : '-1';
    // const tempUrl = (
    //   `${TRANSACTION_LIST.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${useSearch?startTimeSearch:start}&end_date=${useSearch?endTimeSearch:end}&trsa_status=${trsaStatus}&trsa_terminal=${trsaTerminal}&trsa_trip=${trsaTrip}&trsa_supplier=${trsaSupplier}&trsa_carrier=${trsaCarrier}&trsa_tanker=${trsaTanker}&trsa_id=${trsaId}&load_id=${trsaLoad}`
    // );
    const tempUrl = `${TRANSACTION_LIST.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${startTimeSearch}&end_date=${endTimeSearch}&trsa_status=${trsaStatus}&trsa_terminal=${trsaTerminal}&trsa_bay=${trsaBay}&trsa_trip=${trsaTrip}&trsa_supplier=${trsaSupplier}&trsa_carrier=${trsaCarrier}&trsa_tanker=${trsaTanker}&trsa_id=${trsaId}&load_id=${trsaLoad}`;
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
    if (siteTrsaPaging !== undefined) {
      setPagingFlag(siteTrsaPaging);
    }
  }, [siteTrsaPaging]);

  const modifiers = (
    <>
      <Switch
        style={{ marginRight: 5 }}
        checked={pagingFlag}
        checkedChildren={<span>{t('operations.paginationOn')}</span>}
        unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
        onChange={(value) => onChangePagination(value)}
      />
      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={config?.transactionsDateRange}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={1500}
        // localBased={true}
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
              trsa_status: true,
              terminal: true,
              bay_code: true,
              supplier_code: true,
              shls_trip_no: true,
              trsa_id: true,
              load_id: true,
              carrier_code: true,
              tnkr_code: true,
            },
            {
              trsa_status: trsaStatus,
              terminal: trsaTerminal,
              bay_code: trsaBay,
              supplier_code: trsaSupplier,
              shls_trip_no: trsaTrip,
              trsa_id: trsaId,
              load_id: trsaLoad,
              carrier_code: trsaCarrier,
              tnkr_code: trsaTanker,
              start_date: startTimeSearch,
              end_date: endTimeSearch,
              use_date_range: useDateRange === 'Y' ? true : false,
            }
          )
        }
      >
        {t('operations.search')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access}>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isDownloading || isSearching}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
        clearFilterPlus={revalidate}
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
      {visible && (
        <NewForms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          config={config}
        />
      )}
    </Page>
  );
};

export default auth(TransactionList);
