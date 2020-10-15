import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Page, DataTable, Download } from '../../components';
import { ROLE_ACCESS_MANAGEMENT } from '../../api';
import columns from './columns';
import auth from '../../auth';
import { useAuth } from '../../hooks';

import Forms from './forms';

const RoleAccessManagement = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [data, setData] = useState([]);

  const access = useAuth('M_ROLEACCESS');

  const { data: payload, isValidating, revalidate } = useSWR(ROLE_ACCESS_MANAGEMENT.READ);

  const fields = columns(t);
  // const data = payload?.records;

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  useEffect(() => {
    if (payload?.records) {
      _.forEach(payload?.records, (o) => {
        o.role_note_org = o.role_note;
        o.role_note = o.role_id<10 ? t('fields.roleDefault') : o.role_note;
      });

      setData(payload?.records);
    }
  }, [payload, setData, t]);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isValidating} columns={fields} />

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
      page={t('pageMenu.security')}
      name={t('pageNames.roleAccessManagement')}
      modifiers={modifiers}
      access={access}
      avatar="roleAccessManagement"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
        filterValue={filterValue}
      />

      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        data={data}
        setFilterValue={setFilterValue}
      />
    </Page>
  );
};

export default auth(RoleAccessManagement);
