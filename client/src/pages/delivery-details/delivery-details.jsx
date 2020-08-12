import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { DELIVERY_DETAILS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';

import Forms from './forms';

const DeliveryDetails = ({ access, params }) => {

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pageState, setPageState] = useState('view');
  const [supplier, setSupplier] = useState(undefined);
  const [loadNumber, setLoadNumber] = useState(undefined);
  const [loadType, setLoadType] = useState(undefined);

  const { t } = useTranslation();

  const url = supplier && loadNumber && loadType
    ? `${DELIVERY_DETAILS.READ}?dd_supp_code=${supplier}&dd_tripord_no=${loadNumber}&dd_ld_type=${loadType}`
    : null;
  const { data: payload, isValidating, revalidate } = useSWR(url);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.operations');
  const name = t('pageNames.deliveryDetails');

  useEffect(() => {
    if (visible) {
      if (!selected) {
        setPageState('create');
      } else {
        setPageState('edit');
      }
    } else {
      setPageState('view');
    }
  }, [visible, selected]);

  useEffect(() => {
    if (params) {
      setSupplier(params?.dd_supp_code);
      setLoadNumber(params?.dd_tripord_no);
      setLoadType(params?.dd_ld_type);
    }
  }, [params, setSupplier, setLoadNumber, setLoadType]);

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
        disabled={!access?.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} standalone>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        minimal={true}
        autoColWidth
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        pageState={pageState}
        revalidate={revalidate}
        supplier={supplier}
        loadNumber={loadNumber}
        loadType={loadType}
      />
    </Page>
  );
};

export default DeliveryDetails;
