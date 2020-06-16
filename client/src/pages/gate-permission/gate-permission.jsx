import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { GATE_PERMISSION } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import _ from 'lodash';

const GatePermission = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_GATEPERMISSION');

  const { data: payload, isValidating, revalidate } = useSWR(GATE_PERMISSION.READ);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);
  const data = payload?.records;

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload?.records} isLoading={isValidating} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!access?.canCreate}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.security')}
      name={t('pageNames.gatePermission')}
      modifiers={modifiers}
      avatar="gatePermission"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </Page>
  );
};

export default auth(GatePermission);
