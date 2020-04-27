import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, ControlOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { TANK_STATUS } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

import { ROUTES } from '../../constants';

const TankStatus = () => {
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(TANK_STATUS.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.tank_code,
      name: value?.tank_name,
      width: '60vw',
      t,
    });
  };

  const modifiers = (
    <>
      <Button
        icon={<ControlOutlined />}
        disabled={!selected}
        onClick={() => window.open(`${ROUTES.TANK_STRAPPING}?tank_code=${selected[0]?.tank_code}`, '_blank')}
        loading={isValidating}
      >
        {t('operations.tankStrapping')}
      </Button>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
    </>
  );

  console.log(selected);
  return (
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.tankStatus')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={handleClick}
        selectionMode="single"
        handleSelect={setSelected}
      />
    </Page>
  );
};

export default auth(TankStatus);
