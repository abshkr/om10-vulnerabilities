import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, List, Avatar, Card, Tabs, Descriptions, Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { TankContainer } from './style';
import { Page, Download, DataTable, ListView } from '../../components';
import { TANKS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import { search } from '../../utils';
import _ from 'lodash';

import TankStrapping from './strapping';
import { General, Levels, Gauging, Calculation } from './forms/fields';

const { TabPane } = Tabs;

const Tanks = () => {
  const [selected, setSelected] = useState(null);
  const [payload, setPayload] = useState([]);
  const [mode, setMode] = useState('1');

  const [form] = Form.useForm();
  const { t } = useTranslation();

  const access = useAuth('M_TANKSTATUS');

  const { data: read, isValidating, revalidate } = useSWR(TANKS.READ);

  const simple = mode === '1';
  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.gantry');
  const name = t('pageNames.tanks');

  const onSelect = (value) => {
    setSelected(value);
  };

  const onViewChange = () => {
    const payload = simple ? '2' : '1';

    setMode(payload);
  };

  const modifiers = (
    <>
      <Button shape="round" type="primary" onClick={onViewChange}>
        {simple ? t('operations.list') : t('operations.simple')}
      </Button>

      <Button type="primary" shape="round" onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download round data={data} isLoading={isLoading} columns={fields} />

      <Button type="primary" shape="round" loading={isLoading} disabled={!access.canCreate}>
        {t('operations.create')}
      </Button>
    </>
  );

  useEffect(() => {
    if (read) {
      setSelected(read?.records[0]);
      setPayload(read);
    }
  }, [read]);

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} minimal={simple}>
      {simple ? (
        <ListView
          data={data}
          id="tank_code"
          name="tank_name"
          onSelect={onSelect}
          selected={selected?.tank_code}
          form={form}
        ></ListView>
      ) : (
        <DataTable columns={fields} data={data} isLoading={isValidating} />
      )}
    </Page>
  );
};

export default auth(Tanks);
