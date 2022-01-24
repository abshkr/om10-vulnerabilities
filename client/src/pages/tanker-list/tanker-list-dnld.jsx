import React, { useState, useEffect, useRef } from 'react';

import useSWR from 'swr';
import { Button, Switch, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import _ from 'lodash';

import {
  Page,
  DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  PageExporter,
  WindowSearch,
  WindowSearchForm,
} from '../../components';
import api, { TANKER_LIST, SITE_CONFIGURATION } from '../../api';
import columns from './columns';
import { useAuth, useConfig, useQuery } from '../../hooks';
import usePagination from 'hooks/use-pagination';
import auth from '../../auth';
import Forms from './forms';

const TankerList = () => {
  const query = useQuery();
  const config = useConfig();

  const tanker = query.get('tanker') || '';

  const { expiryDateMode, siteUseAxleWeightLimit, siteTnkrPaging, siteUseDownloader } = useConfig();

  const { t } = useTranslation();

  const [maskFlag, setMaskFlag] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState(tanker);
  const [tnkrCode, setTnkrCode] = useState(tanker);
  const [tnkrCarrier, setTnkrCarrier] = useState('');
  const [tnkrOwner, setTnkrOwner] = useState('');
  const [tnkrEtyp, setTnkrEtyp] = useState('');
  const [tnkrLock, setTnkrLock] = useState('');
  const [tnkrActive, setTnkrActive] = useState('');
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const access = useAuth('M_TANKERS');

  const [mainUrl, setMainUrl] = useState(
    `${TANKER_LIST.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url = !pagingFlag && siteUseDownloader ? null : mainUrl + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  // const baseUrl = `${TANKER_LIST.READ}?pgflag=${
  //   pagingFlag ? 'Y' : 'N'
  // }&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`;
  // const url = `${TANKER_LIST.READ}?pgflag=${
  //   pagingFlag ? 'Y' : 'N'
  // }&start_num=${take}&end_num=${offset}&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`;

  const { data: payload, isValidating, revalidate } = useSWR(pagingFlag === undefined ? null : url, {
    revalidateOnFocus: false,
  });

  const { data: expiryTypes } = useSWR(TANKER_LIST.EXPIRY, { revalidateOnFocus: false });

  const [data, setData] = useState(payload?.records);
  const [fields, setFields] = useState(
    columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit, config?.carrcode_tankernum_tag)
  );

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const onChangePagination = async (v) => {
    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_TNKR_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);

    setData([]);

    const tempUrl = `${TANKER_LIST.READ}?pgflag=${
      v ? 'Y' : 'N'
    }&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
  };

  const onRefresh = () => {
    setData([]);
    // setFilterValue(' ');
    setTnkrCode('');
    setTnkrCarrier('');
    setTnkrOwner('');
    setTnkrEtyp('');
    setTnkrLock('');
    setTnkrActive('');

    // const tempUrl = (`${TANKER_LIST.READ}?pgflag=${
    //   pagingFlag ? 'Y' : 'N'
    // }&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`);
    const tempUrl = `${TANKER_LIST.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&tnkr_code=${''}&tnkr_carrier=${''}&tnkr_owner=${''}&tnkr_etyp=${''}&tnkr_lock=${''}&tnkr_active=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
  };

  const onLocate = (value) => {
    setSearch({
      tnkr_code: value,
    });
  };

  const setSearch = (values) => {
    /* if (
      !values.tnkr_code &&
      !values.tnkr_carrier &&
      !values.tnkr_owner &&
      !values.tnkr_etp &&
      !values.tnkr_lock &&
      !values.tnkr_active
    ) {
      return;
    } */

    setData([]);

    setSearching(true);
    setTnkrCode(!values.tnkr_code ? '' : values.tnkr_code);
    setTnkrCarrier(!values.tnkr_carrier ? '' : values.tnkr_carrier);
    setTnkrOwner(!values.tnkr_owner ? '' : values.tnkr_owner);
    setTnkrEtyp(!values.tnkr_etp ? '' : values.tnkr_etp);
    setTnkrLock(values.tnkr_lock === undefined ? '' : values.tnkr_lock);
    setTnkrActive(values.tnkr_active === undefined ? '' : values.tnkr_active);

    // useState variables may be async, so use local variables here.
    const tnkrCode = !values.tnkr_code ? '' : values.tnkr_code;
    const tnkrCarrier = !values.tnkr_carrier ? '' : values.tnkr_carrier;
    const tnkrOwner = !values.tnkr_owner ? '' : values.tnkr_owner;
    const tnkrEtyp = !values.tnkr_etp ? '' : values.tnkr_etp;
    const tnkrLock = values.tnkr_lock === undefined ? '' : values.tnkr_lock;
    const tnkrActive = values.tnkr_active === undefined ? '' : values.tnkr_active;
    const tempUrl = `${TANKER_LIST.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
    setSearching(false);
  };

  useEffect(() => {
    if (expiryTypes) {
      setFields(
        columns(
          expiryTypes?.records,
          t,
          expiryDateMode,
          siteUseAxleWeightLimit,
          config?.carrcode_tankernum_tag
        )
      );
    }
  }, [expiryTypes, t, expiryDateMode, siteUseAxleWeightLimit]);

  useEffect(() => {
    if (siteTnkrPaging !== undefined) {
      setPagingFlag(siteTnkrPaging);
    }
  }, [siteTnkrPaging]);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      payload.records = null;
      setCount(payload?.count || 0);
    }
  }, [payload]);

  useEffect(() => {
    if (isValidating !== undefined) {
      setDownloading(isValidating);
    }
  }, [isValidating]);

  const modifiers = (
    <>
      <Switch
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
              tnkr_code_input: true,
              tnkr_carrier: true,
              tnkr_owner: true,
              tnkr_etyp: true,
              tnkr_flags: true,
            },
            {
              tnkr_code: tnkrCode,
              tnkr_carrier: tnkrCarrier,
              tnkr_owner: tnkrOwner,
              tnkr_etp: tnkrEtyp,
              tnkr_lock: tnkrLock,
              tnkr_active: tnkrActive,
            },
            false
          )
        }
      >
        {t('operations.search')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setMaskFlag(true);
          handleFormState(true, null);
        }}
        loading={isDownloading || isSearching}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.tankerList')}
      modifiers={modifiers}
      access={access}
      avatar="tankerList"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isDownloading || isSearching}
        onClick={(payload) => {
          setMaskFlag(false);
          handleFormState(true, payload);
        }}
        handleSelect={(payload) => {
          setMaskFlag(false);
          handleFormState(true, payload[0]);
        }}
        selectionMode="single"
        autoColWidth
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
            pageSize={100}
            setData={setData}
            setDownloading={setDownloading}
            runUrl={runUrlFlag.current}
            setRunUrl={setRunUrlFlag}
          />
        )}
      </div>
      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          setFilterValue={setFilterValue}
          revalidate={revalidate}
          expiryDateMode={expiryDateMode}
          expiryTypes={expiryTypes}
          config={config}
          tankers={data}
          onLocate={onLocate}
          setPage={setPage}
          maskFlag={maskFlag}
        />
      )}
    </Page>
  );
};

export default auth(TankerList);
