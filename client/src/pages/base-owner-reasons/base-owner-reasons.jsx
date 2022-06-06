import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Page, DataTable, Download } from '../../components';
import { OWNER_TRSA_REASONS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
// import { useAuth } from 'hooks';

const BaseOwnerReasons = ({ access }) => {
  const { t } = useTranslation();

  // const access = useAuth('M_MOVEMENTREASON');

  const { data: payload, isValidating, revalidate } = useSWR(OWNER_TRSA_REASONS.READ);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  const fields = columns(t);
  // const data = payload?.records;

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  useEffect(() => {
    if (payload?.records) {
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
      page={t('pageMenu.config')}
      name={t('pageNames.movementReasons')}
      modifiers={modifiers}
      access={access}
      standalone={true}
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
        access={access}
      />
    </Page>
  );
};

export default BaseOwnerReasons;
