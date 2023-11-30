import React, { useState, useEffect, useRef } from 'react';

import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Switch, notification } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

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
import api, { EQUIPMENT_LIST, SITE_CONFIGURATION } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig, useQuery } from 'hooks';
import usePagination from 'hooks/use-pagination';
import Forms from './forms';

const EquipmentList = () => {
  const query = useQuery();
  const config = useConfig();
  const {
    expiryDateMode,
    siteUseAxleWeightLimit,
    siteEnabledCOPS,
    siteEqptPaging,
    siteUseDownloader,
    siteCustomColumnEqptList,
  } = useConfig();

  let equipment = query.get('equipment') || '';

  const { t } = useTranslation();
  const [maskFlag, setMaskFlag] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [parentEqpt, setParentEqpt] = useState(equipment);
  const [eqptId, setEqptId] = useState('');
  const [eqptCode, setEqptCode] = useState('');
  const [eqptTitle, setEqptTitle] = useState('');
  const [eqptOwner, setEqptOwner] = useState('');
  const [eqptEtyp, setEqptEtyp] = useState('');
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const access = useAuth('M_EQUIPMENTLIST');

  const [mainUrl, setMainUrl] = useState(
    parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${pagingFlag ? 'Y' : 'N'}`
      : `${EQUIPMENT_LIST.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&eqpt_id=${eqptId}&eqpt_code=${encodeURIComponent(eqptCode)}&eqpt_title=${encodeURIComponent(
          eqptTitle
        )}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url =
    !pagingFlag && siteUseDownloader
      ? null
      : mainUrl.replace('pgflag=N', 'pgflag=Y') + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  /* const baseUrl =
    parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${
          pagingFlag ? 'Y' : 'N'
        }`
      : `${EQUIPMENT_LIST.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&eqpt_id=${eqptId}&eqpt_code=${encodeURIComponent(eqptCode)}&eqpt_title=${encodeURIComponent(eqptTitle)}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`;

  const url =
    parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&start_num=${take}&end_num=${offset}`
      : `${EQUIPMENT_LIST.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&start_num=${take}&end_num=${offset}&eqpt_id=${eqptId}&eqpt_code=${encodeURIComponent(eqptCode)}&eqpt_title=${encodeURIComponent(eqptTitle)}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`; */

  const {
    data: payload,
    isValidating,
    mutate: revalidate,
  } = useSWR(pagingFlag === undefined ? null : url, {
    revalidateOnFocus: false,
  });
  const { data: expiryTypes } = useSWR(EQUIPMENT_LIST.EXPIRY, { revalidateOnFocus: false });

  const [data, setData] = useState(payload?.records);
  const [fields, setFields] = useState(
    columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit, siteEnabledCOPS)
  );

  // const [filterValue, setFilterValue] = useState(equipment);
  const [filterValue, setFilterValue] = useState('');

  const page = t('pageMenu.operations');
  const name = t(config?.siteLabelUser + 'pageNames.equipmentList');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl =
      parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
        ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${v ? 'Y' : 'N'}`
        : `${EQUIPMENT_LIST.READ}?pgflag=${v ? 'Y' : 'N'}&eqpt_id=${eqptId}&eqpt_code=${encodeURIComponent(
            eqptCode
          )}&eqpt_title=${encodeURIComponent(eqptTitle)}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_EQPT_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const onRefresh = () => {
    setData([]);
    setFilterValue(' ');
    setParentEqpt('');
    setEqptId('');
    setEqptCode('');
    setEqptTitle('');
    setEqptOwner('');
    setEqptEtyp('');

    const parentEqpt = '';
    // const tempUrl = (parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
    // ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${
    //     pagingFlag ? 'Y' : 'N'
    //   }`
    // : `${EQUIPMENT_LIST.READ}?pgflag=${
    //     pagingFlag ? 'Y' : 'N'
    //   }&eqpt_id=${eqptId}&eqpt_code=${encodeURIComponent(eqptCode)}&eqpt_title=${encodeURIComponent(eqptTitle)}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`);
    const tempUrl =
      parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
        ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${pagingFlag ? 'Y' : 'N'}`
        : `${EQUIPMENT_LIST.READ}?pgflag=${
            pagingFlag ? 'Y' : 'N'
          }&eqpt_id=${''}&eqpt_code=${''}&eqpt_title=${''}&eqpt_owner=${''}&eqpt_etyp=${''}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
  };

  const onLocate = (value) => {
    if (siteEqptPaging) {
      setSearch({
        eqpt_code: value,
      });
    } else {
      setFilterValue(' ');
      setSearch({
        eqpt_code: '',
      });
      setFilterValue(value === '' ? ' ' : value);
    }
  };

  const setSearch = (values) => {
    /* if (!values.eqpt_id && !values.eqpt_code && !values.eqpt_title && !values.eqpt_owner && !values.eqpt_etp) {
      return;
    } */

    setData([]);

    setFilterValue(' ');
    setSearching(true);
    setParentEqpt('');
    setEqptId(!values.eqpt_id ? '' : values.eqpt_id);
    setEqptCode(!values.eqpt_code ? '' : values.eqpt_code);
    setEqptTitle(!values.eqpt_title ? '' : values.eqpt_title);
    setEqptOwner(!values.eqpt_owner ? '' : values.eqpt_owner);
    setEqptEtyp(!values.eqpt_etp ? '' : values.eqpt_etp);

    // useState variables may be async, so use local variables here.
    const parentEqpt = '';
    const eqptId = !values.eqpt_id ? '' : values.eqpt_id;
    const eqptCode = !values.eqpt_code ? '' : values.eqpt_code;
    const eqptTitle = !values.eqpt_title ? '' : values.eqpt_title;
    const eqptOwner = !values.eqpt_owner ? '' : values.eqpt_owner;
    const eqptEtyp = !values.eqpt_etp ? '' : values.eqpt_etp;
    const tempUrl =
      parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
        ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${pagingFlag ? 'Y' : 'N'}`
        : `${EQUIPMENT_LIST.READ}?pgflag=${
            pagingFlag ? 'Y' : 'N'
          }&eqpt_id=${eqptId}&eqpt_code=${encodeURIComponent(eqptCode)}&eqpt_title=${encodeURIComponent(
            eqptTitle
          )}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
    setSearching(false);

    /* api
      .get(EQUIPMENT_LIST.READ, {
        params: {
          eqpt_id: values.eqpt_id,
          eqpt_code: values.eqpt_code,
          eqpt_title: values.eqpt_title,
          eqpt_owner: values.eqpt_owner,
          eqpt_etyp: values.eqpt_etp,
          pgflag: pagingFlag ? 'Y' : 'N',
          start_num: take,
          end_num: offset,
        },
      })
      .then((res) => {
        setData(res.data.records);
        setCount(res.data.count || 0);
        setSearching(false);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setSearching(false);
      }); */
  };

  useEffect(() => {
    if (payload && parentEqpt && parentEqpt?.length > 0) {
      if (parentEqpt?.indexOf(',') >= 0) setFilterValue(' ');
    }
  }, [payload, parentEqpt]);

  useEffect(() => {
    if (expiryTypes) {
      setFields(columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit, siteEnabledCOPS));
    }
  }, [expiryTypes, t, expiryDateMode, siteUseAxleWeightLimit, siteEnabledCOPS]);

  useEffect(() => {
    if (siteEqptPaging !== undefined) {
      console.log('................paging flag:', siteEqptPaging);
      setPagingFlag(siteEqptPaging);
    }
  }, [siteEqptPaging]);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
      setCount(payload?.count || 0);
    }
  }, [payload]);

  useEffect(() => {
    if (isValidating !== undefined) {
      setDownloading(isValidating);
    }
  }, [isValidating]);

  useEffect(() => {
    if (
      columns &&
      setFields &&
      expiryTypes?.records &&
      t &&
      expiryDateMode !== undefined &&
      siteUseAxleWeightLimit !== undefined &&
      siteEnabledCOPS !== undefined
    ) {
      const newFields = columns(
        expiryTypes?.records,
        t,
        expiryDateMode,
        siteUseAxleWeightLimit,
        siteEnabledCOPS
      );
      setFields(newFields);
    }
  }, [expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit, siteEnabledCOPS]);

  /* useEffect(() => {
    console.log('...................... filter', filterValue);
  }, [filterValue]); */

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
              eqpt_id: true,
              eqpt_code: true,
              eqpt_title: true,
              eqpt_owner: true,
              eqpt_etyp: true,
            },
            {
              eqpt_id: eqptId,
              eqpt_code: eqptCode,
              eqpt_title: eqptTitle,
              eqpt_owner: eqptOwner,
              eqpt_etp: eqptEtyp,
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
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="equipmentList">
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
        clearFilterPlus={onRefresh}
        columnAdjustable={siteCustomColumnEqptList}
        //columnAdjustable={false}
        pageModule={'M_EQUIPMENTLIST'}
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
          onLocate={onLocate}
          revalidate={revalidate}
          expiryDateMode={expiryDateMode}
          expiryTypes={expiryTypes?.records}
          config={config}
          setPage={setPage}
          maskFlag={maskFlag}
        />
      )}
    </Page>
  );
};

export default auth(EquipmentList);
