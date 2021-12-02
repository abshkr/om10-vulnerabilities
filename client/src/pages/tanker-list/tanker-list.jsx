import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, Switch, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Page, DataTable, Download, PageDownloader, PageExporter, WindowSearch } from '../../components';
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

  const { expiryDateMode, siteUseAxleWeightLimit, siteTnkrPaging } = useConfig();

  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState(tanker);
  const [tnkrCode, setTnkrCode] = useState('');
  const [tnkrCarrier, setTnkrCarrier] = useState('');
  const [tnkrOwner, setTnkrOwner] = useState('');
  const [tnkrEtyp, setTnkrEtyp] = useState('');
  const [tnkrLock, setTnkrLock] = useState('');
  const [tnkrActive, setTnkrActive] = useState('');
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const { setCount, take, offset, paginator, setPage, count } = usePagination();

  const access = useAuth('M_TANKERS');

  const baseUrl = `${TANKER_LIST.READ}?pgflag=${
    pagingFlag ? 'Y' : 'N'
  }&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`;

  const url = `${TANKER_LIST.READ}?pgflag=${
    pagingFlag ? 'Y' : 'N'
  }&start_num=${take}&end_num=${offset}&tnkr_code=${tnkrCode}&tnkr_carrier=${tnkrCarrier}&tnkr_owner=${tnkrOwner}&tnkr_etyp=${tnkrEtyp}&tnkr_lock=${tnkrLock}&tnkr_active=${tnkrActive}`;
  const { data: payload, isValidating, revalidate } = useSWR(pagingFlag === undefined ? null : url, { revalidateOnFocus: false });

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
  };

  const onRefresh = () => {
    // setFilterValue(' ');
    setTnkrCode('');
    setTnkrCarrier('');
    setTnkrOwner('');
    setTnkrEtyp('');
    setTnkrLock('');
    setTnkrActive('');
    setPage(1);
    revalidate();
  };

  const setSearch = (values) => {
    if (
      !values.tnkr_code &&
      !values.tnkr_carrier &&
      !values.tnkr_owner &&
      !values.tnkr_etp &&
      !values.tnkr_lock &&
      !values.tnkr_active
    ) {
      return;
    }

    setSearching(true);
    setTnkrCode(!values.tnkr_code ? '' : values.tnkr_code);
    setTnkrCarrier(!values.tnkr_carrier ? '' : values.tnkr_carrier);
    setTnkrOwner(!values.tnkr_owner ? '' : values.tnkr_owner);
    setTnkrEtyp(!values.tnkr_etp ? '' : values.tnkr_etp);
    setTnkrLock(values.tnkr_lock === undefined ? '' : values.tnkr_lock);
    setTnkrActive(values.tnkr_active === undefined ? '' : values.tnkr_active);
    setPage(1);
    revalidate();
    setSearching(false);

    /* api
      .get(EQUIPMENT_LIST.READ, {
        params: {
          tnkr_code: values.tnkr_code,
          tnkr_carrier: values.tnkr_carrier,
          tnkr_owner: values.tnkr_owner,
          tnkr_etyp: values.tnkr_etp,
          tnkr_lock: values.tnkr_lock,
          tnkr_active: values.tnkr_active,
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

  const modifiers = (
    <>
      <Switch
        checked={pagingFlag}
        checkedChildren={<span>{t('operations.paginationOn')}</span>}
        unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
        onChange={(value) => onChangePagination(value)}
      />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && (
        <Download data={data} isLoading={isValidating || isSearching} columns={fields} />
      )}
      
      {pagingFlag && (
        // <PageExporter baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} columns={fields} />
        <PageDownloader baseUrl={baseUrl} startVar={'start_num'} endVar={'end_num'} pageSize={500} columns={fields} />
      )}

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(
            setSearch,
            t('operations.search'),
            {
              tnkr_code_input: true,
              tnkr_carrier: true,
              tnkr_owner: true,
              tnkr_etyp: true,
              tnkr_flags: true,
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
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
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
        isLoading={isValidating || isSearching}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
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
        {pagingFlag ? paginator : t('fields.totalCount') + ': ' + count}
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
          setTnkrCode={setTnkrCode}
          setPage={setPage}
        />
      )}
    </Page>
  );
};

export default auth(TankerList);
