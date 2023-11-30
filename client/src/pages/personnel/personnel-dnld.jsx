import React, { useState, useEffect, useRef } from 'react';

import useSWR from 'swr';
import { Button, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import {
  Page,
  PowerTable as DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  PageExporter,
  WindowSearch,
  WindowSearchForm,
} from '../../components';
import api, { PERSONNEL, SITE_CONFIGURATION } from 'api';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth, useConfig } from 'hooks';
import usePagination from 'hooks/use-pagination';

const Personnel = () => {
  const config = useConfig();

  const { expiryDateMode, sitePsnlPaging, siteUseDownloader } = config;

  const { t } = useTranslation();

  const [maskFlag, setMaskFlag] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [psnlCode, setPsnlCode] = useState('');
  const [psnlEmployer, setPsnlEmployer] = useState('');
  const [psnlName, setPsnlName] = useState('');
  const [psnlRole, setPsnlRole] = useState('');
  const [psnlLock, setPsnlLock] = useState('');
  const [psnlStatus, setPsnlStatus] = useState('');
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const access = useAuth('M_PERSONNEL');

  const [mainUrl, setMainUrl] = useState(
    `${PERSONNEL.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&psnl_code=${psnlCode}&psnl_employer=${psnlEmployer}&psnl_name=${psnlName}&psnl_role=${psnlRole}&psnl_lock=${psnlLock}&psnl_status=${psnlStatus}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url =
    !pagingFlag && siteUseDownloader
      ? null
      : mainUrl.replace('pgflag=N', 'pgflag=Y') + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  const {
    data: payload,
    isValidating,
    mutate: revalidate,
  } = useSWR(pagingFlag === undefined ? null : url, {
    revalidateOnFocus: false,
  });

  const { data: expiryTypes } = useSWR(PERSONNEL.EXPIRY_TYPES, { revalidateOnFocus: false });

  const [data, setData] = useState(payload?.records);
  const [fields, setFields] = useState(columns(expiryTypes?.records, t, expiryDateMode));

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${PERSONNEL.READ}?pgflag=${
      v ? 'Y' : 'N'
    }&psnl_code=${psnlCode}&psnl_employer=${psnlEmployer}&psnl_name=${psnlName}&psnl_role=${psnlRole}&psnl_lock=${psnlLock}&psnl_status=${psnlStatus}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_PSNL_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const onRefresh = () => {
    console.log('.....onRefresh...11111111.........');
    setData([]);
    // setFilterValue(' ');
    setPsnlCode('');
    setPsnlEmployer('');
    setPsnlName('');
    setPsnlRole('');
    setPsnlLock('');
    setPsnlStatus('');

    // const tempUrl = (`${PERSONNEL.READ}?pgflag=${
    //   pagingFlag ? 'Y' : 'N'
    // }&psnl_code=${psnlCode}&psnl_employer=${psnlEmployer}&psnl_name=${psnlName}&psnl_role=${psnlRole}&psnl_lock=${psnlLock}&psnl_status=${psnlStatus}`);
    const tempUrl = `${PERSONNEL.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&psnl_code=${''}&psnl_employer=${''}&psnl_name=${''}&psnl_role=${''}&psnl_lock=${''}&psnl_status=${''}`;
    console.log('.....onRefresh...tempUrl.........', tempUrl);
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
  };

  const onLocate = (value) => {
    console.log('..................onLocate....', value);
    if (sitePsnlPaging) {
      setSearch({
        psnl_code: value,
      });
    } else {
      setFilterValue(' ');
      setSearch({
        psnl_code: '',
      });
      setFilterValue(value === '' ? ' ' : value);
    }
  };

  const setSearch = (values) => {
    /* if (
      !values.psnl_code &&
      !values.psnl_employer &&
      !values.psnl_name &&
      !values.psnl_role &&
      !values.psnl_lock &&
      !values.psnl_status
    ) {
      return;
    } */

    if (!pagingFlag) {
      setData([]);
    }
    // setData([]);

    setSearching(true);
    setPsnlCode(!values.psnl_code ? '' : values.psnl_code);
    setPsnlEmployer(!values.psnl_employer ? '' : values.psnl_employer);
    setPsnlName(!values.psnl_name ? '' : values.psnl_name);
    setPsnlRole(!values.psnl_role ? '' : values.psnl_role);
    setPsnlLock(values.psnl_lock === undefined ? '' : values.psnl_lock);
    setPsnlStatus(values.psnl_status === undefined ? '' : values.psnl_status);

    // useState variables may be async, so use local variables here.
    const psnlCode = !values.psnl_code ? '' : values.psnl_code;
    const psnlEmployer = !values.psnl_employer ? '' : values.psnl_employer;
    const psnlName = !values.psnl_name ? '' : values.psnl_name;
    const psnlRole = !values.psnl_role ? '' : values.psnl_role;
    const psnlLock = values.psnl_lock === undefined ? '' : values.psnl_lock;
    const psnlStatus = values.psnl_status === undefined ? '' : values.psnl_status;
    const tempUrl = `${PERSONNEL.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&psnl_code=${psnlCode}&psnl_employer=${psnlEmployer}&psnl_name=${psnlName}&psnl_role=${psnlRole}&psnl_lock=${psnlLock}&psnl_status=${psnlStatus}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
    setSearching(false);
  };

  useEffect(() => {
    if (expiryTypes) {
      setFields(columns(expiryTypes?.records, t, expiryDateMode));
    }
  }, [expiryTypes, t, expiryDateMode]);

  useEffect(() => {
    if (sitePsnlPaging !== undefined) {
      setPagingFlag(sitePsnlPaging);
    }
  }, [sitePsnlPaging]);

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
              psnl_code_input: true,
              psnl_employer: true,
              psnl_name: true,
              psnl_role: true,
              psnl_flags: true,
            },
            {
              psnl_code: psnlCode,
              psnl_employer: psnlEmployer,
              psnl_name: psnlName,
              psnl_role: psnlRole,
              psnl_lock: psnlLock,
              psnl_status: psnlStatus,
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
      page={t('pageMenu.security')}
      name={t('pageNames.personnel')}
      modifiers={modifiers}
      access={access}
      avatar="personnel"
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
        columnAdjustable={config?.siteCustomColumnPersonnel}
        pageModule={'M_PERSONNEL'}
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
          // setFilterValue={setFilterValue}
          revalidate={revalidate}
          expiryDateMode={expiryDateMode}
          expiryTypes={expiryTypes}
          config={config}
          onLocate={onLocate}
          setPage={setPage}
          maskFlag={maskFlag}
        />
      )}
      {/* <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        setFilterValue={setFilterValue}
        expiryDateMode={expiryDateMode}
        expiryTypes={expiryTypes?.records}
        config={config}
      /> */}
    </Page>
  );
};

export default auth(Personnel);
