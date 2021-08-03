import React, { useState, useEffect } from 'react';

import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Switch, notification } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { Page, DataTable, Download, WindowSearch } from '../../components';
import api, { EQUIPMENT_LIST, SITE_CONFIGURATION } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig, useQuery } from 'hooks';
import usePagination from 'hooks/use-pagination';
import Forms from './forms';

const EquipmentList = () => {
  const query = useQuery();
  const config = useConfig();
  const { expiryDateMode, siteUseAxleWeightLimit, siteEqptPaging } = useConfig();

  let equipment = query.get('equipment') || '';

  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [parentEqpt, setParentEqpt] = useState(equipment);
  const [eqptId, setEqptId] = useState('');
  const [eqptCode, setEqptCode] = useState('');
  const [eqptOwner, setEqptOwner] = useState('');
  const [eqptEtyp, setEqptEtyp] = useState('');
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [isSearching, setSearching] = useState(false);
  const { setCount, take, offset, paginator, setPage, count } = usePagination(250);

  const access = useAuth('M_EQUIPMENTLIST');

  const url =
    parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&start_num=${take}&end_num=${offset}`
      : `${EQUIPMENT_LIST.READ}?pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&start_num=${take}&end_num=${offset}&eqpt_id=${eqptId}&eqpt_code=${eqptCode}&eqpt_owner=${eqptOwner}&eqpt_etyp=${eqptEtyp}`;
  const { data: payload, isValidating, revalidate } = useSWR(pagingFlag == undefined ? null : url);
  const { data: expiryTypes } = useSWR(EQUIPMENT_LIST.EXPIRY);

  const [data, setData] = useState(payload?.records);
  const [fields, setFields] = useState(
    columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit)
  );

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const [filterValue, setFilterValue] = useState(equipment);

  const page = t('pageMenu.operations');
  const name = t(config?.siteLabelUser + 'pageNames.equipmentList');

  const onChangePagination = async (v) => {
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
    // setFilterValue(' ');
    setParentEqpt('');
    setEqptId('');
    setEqptCode('');
    setEqptOwner('');
    setEqptEtyp('');
    setPage(1);
    revalidate();
  };

  const setSearch = (values) => {
    if (!values.eqpt_id && !values.eqpt_code && !values.eqpt_owner && !values.eqpt_etp) {
      return;
    }

    setSearching(true);
    setEqptId(!values.eqpt_id ? '' : values.eqpt_id);
    setEqptCode(!values.eqpt_code ? '' : values.eqpt_code);
    setEqptOwner(!values.eqpt_owner ? '' : values.eqpt_owner);
    setEqptEtyp(!values.eqpt_etp ? '' : values.eqpt_etp);
    setPage(1);
    revalidate();
    setSearching(false);

    /* api
      .get(EQUIPMENT_LIST.READ, {
        params: {
          eqpt_id: values.eqpt_id,
          eqpt_code: values.eqpt_code,
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
      setFields(columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit));
    }
  }, [expiryTypes, t, expiryDateMode, siteUseAxleWeightLimit]);

  useEffect(() => {
    if (siteEqptPaging !== undefined) {
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

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isValidating || isSearching} columns={fields} />

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(
            setSearch,
            t('operations.search'),
            {
              eqpt_id: true,
              eqpt_code: true,
              eqpt_owner: true,
              eqpt_etyp: true,
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
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="equipmentList">
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
          expiryDateMode={expiryDateMode}
          expiryTypes={expiryTypes?.records}
          config={config}
        />
      )}
    </Page>
  );
};

export default auth(EquipmentList);
