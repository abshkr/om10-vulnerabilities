import React, { useState, useCallback } from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { ADDRESSES } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import axios from 'axios';

import Forms from './forms';

const Addresses = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [lines, setLines] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_ADDRESSES');

  const { data: payload, isValidating, revalidate } = useSWR(ADDRESSES.READ);

  const fetchAddressLines = useCallback(
    (code) => {
      axios.get(`${ADDRESSES.LINES}?address_code=${code}`).then((response) => {
        let addrRecord = selected;
        console.log("addrRecord");
        console.log(addrRecord);
        console.log("selected");
        console.log(selected);
        //addrRecord.addr_lines = response.data.records;
        setSelected(addrRecord);
      });
    }
  );

  const handleFormState = (visibility, value) => {
    console.log("handleFormState.value");
    console.log(value);
    setVisible(visibility);
    setSelected(value);
    console.log("handleFormState.selected");
    console.log(selected);
    fetchAddressLines(value?.db_address_key);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.customers');
  const name = t('pageNames.addresses');

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
    <Page page={page} name={name} modifiers={modifiers} access={access}>
      <DataTable
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

export default auth(Addresses);
