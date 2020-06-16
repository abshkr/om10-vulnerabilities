import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { MOVEMENT_REASONS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth } from 'hooks';

const MovementReasons = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const access = useAuth('M_MOVEMENTREASON');

  const { data: payload, isValidating, revalidate } = useSWR(MOVEMENT_REASONS.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  // const handleClick = (value) => {
  //   FormModal({
  //     value,
  //     form: <Forms value={value} length={payload?.records?.length} />,
  //     id: value?.mr_id,
  //     name: value?.mr_type_name,
  //     t,
  //   });
  // };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
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
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.movementReasons')}
      modifiers={modifiers}
      access={access}
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms
        value={selected}
        length={payload?.records?.length}
        visible={visible}
        handleFormState={handleFormState}
        auth={access}
      />
    </Page>
  );
};

export default auth(MovementReasons);
