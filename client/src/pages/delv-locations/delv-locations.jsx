import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { DELV_LOCATIONS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const DelvLocations = ({popup, params}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [data, setData] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_DELIVERYLOCATIONS');

  const url =
    popup && customer
      ? `${DELV_LOCATIONS.READ}?delv_cust_acct=${customer}`
      : DELV_LOCATIONS.READ;

  const { data: payload, isValidating, revalidate } = useSWR(url);
  //const { data: payload, isValidating, revalidate } = useSWR(DELV_LOCATIONS.READ);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  //const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.companies');
  const name = t('pageNames.deliveryLocations');

  useEffect(() => {
    if (popup && params) {
      setCustomer(params?.delv_cust_acct);
    }
  }, [popup, params]);

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
    }
  }, [payload]);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} standalone={popup} avatar="deliveryLocations">
      <DataTable
        minimal={false}
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </Page>
  );
};

//export default auth(DelvLocations);
export default DelvLocations;
