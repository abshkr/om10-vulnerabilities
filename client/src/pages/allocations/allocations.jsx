import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { ALLOCATIONS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import { stubFalse } from 'lodash';

const Allocations = ({popup, params}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [alloctype, setAlloctype] = useState(null);
  const [company, setCompany] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_ALLOCATIONS');

  const [start, setStart] = useState('-1');
  const [end, setEnd] = useState('-1');

  const url =
    popup && alloctype && company
      ? (
        start && end
        ? `${ALLOCATIONS.READ}?start_date=${start}&end_date=${end}&alloc_type=${alloctype}&alloc_cmpycode=${company}`
        : null // `${ALLOCATIONS.READ}?alloc_type=${alloctype}&alloc_cmpycode=${company}`
      )
      : (
        start && end
        ? `${ALLOCATIONS.READ}?start_date=${start}&end_date=${end}`
        : null
      );

  const { data: payload, isValidating, revalidate } = useSWR(url);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.companies');
  const name = t('pageNames.allocations');

  useEffect(() => {
    if (popup && params) {
      setAlloctype(params?.alloc_type);
      setCompany(params?.alloc_cmpycode);
    }
  }, [popup, params]);

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
    <Page page={page} name={name} modifiers={modifiers} access={access} standalone={popup} >
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

export default Allocations;
// export default auth(Allocations);
