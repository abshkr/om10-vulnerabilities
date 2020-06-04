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

const DeliveryDetails = ({ params }) => {
  const access = useAuth('M_DELIVERYLOCATIONS');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pageState, setPageState] = useState('view');

  const { t } = useTranslation();

  const supplier = params?.dd_supp_code;
  const trip = params?.dd_tripord_no;
  const type = params?.dd_ld_type;

  const { data: payload, isValidating, revalidate } = useSWR(
    `${DELIVERY_DETAILS.READ}?dd_supp_code=${supplier}&dd_tripord_no=${trip}&dd_ld_type=${type}`
  );

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.customers');
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
    <Page page={page} name={name} modifiers={modifiers} access={access}>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        pageState={pageState}
        revalidate={revalidate}
        params={params}
      />
    </Page>
  );
};

export default DeliveryDetails;
