import React, { useState } from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import useSWR from 'swr';
import { useAuth } from 'hooks';

import { Page, DataTable } from '../../components';
import { TANK_STRAPPING } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const TankStrapping = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const auth = useAuth('M_TANKSTATUS');

  const { data: payload, isValidating, revalidate } = useSWR(TANK_STRAPPING.READ);

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <div style={{ display: 'flex' }}>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </div>
  );

  return (
    <Page page={t('pageMenu.gantry')} name={t('pageNames.tankStrapping')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(TankStrapping);
