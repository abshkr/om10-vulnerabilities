import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import Forms from './forms';
import { Page, DataTable, Download, IButton, FormModal } from '../../components';
import { ID_ASSIGNMENT } from '../../api';

import columns from './columns';
import auth from '../../auth';

const IdAssignment = () => {
  const [search, setSearch] = useState('');

  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(ID_ASSIGNMENT.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.kya_key_no,
      name: value?.kya_key_issuer,
      t
    });
  };

  const handleTagLookUp = () => {
    IButton({
      setSearch,
      t
    });
  };

  const modifiers = (
    <>
      <Button icon="security-scan" onClick={() => handleTagLookUp()}>
        {t('operations.tagLookUp')}
      </Button>

      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.idAssignment')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={handleClick}
        search={search}
      />
    </Page>
  );
};

export default auth(IdAssignment);
