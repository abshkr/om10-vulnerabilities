import React, { useState, useEffect } from 'react';

import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Switch } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download } from '../../components';
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
  const [pagingFlag, setPagingFlag] = useState(false);
  const { setCount, take, offset, paginator } = usePagination(500);

  const access = useAuth('M_EQUIPMENTLIST');

  const url =
    parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}&pgflag=${
          pagingFlag ? 'Y' : 'N'
        }&start_num=${take}&end_num=${offset}`
      : `${EQUIPMENT_LIST.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_num=${take}&end_num=${offset}`;
  const { data: payload, isValidating, revalidate } = useSWR(url);
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
    revalidate();
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
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
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
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
        autoColWidth
        filterValue={filterValue}
      />
      {pagingFlag && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          {paginator}
        </div>
      )}
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
