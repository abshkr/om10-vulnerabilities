import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { EQUIPMENT_TYPES } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const EquipmentTypes = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCombination, setCombination] = useState(false);

  const { t } = useTranslation();

  const auth = useAuth('M_LOGICALPRINTERS');

  const { data: payload, isValidating, revalidate } = useSWR(EQUIPMENT_TYPES.READ);

  const handleFormState = (visibility, value) => {
    if (visibility && !value) {
      Modal.confirm({
        title: 'Is it a combination?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        cancelText: 'No',
        centered: true,
        onOk() {
          setCombination(true);

          setVisible(visibility);
          setSelected(value);
        },
        onCancel() {
          setCombination(false);

          setVisible(visibility);
          setSelected(value);
        },
      });
    } else {
      setVisible(visibility);
      setSelected(value);
    }
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.schedules');
  const name = t('pageNames.equipmentTypes');

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
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} auth={auth}>
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
        auth={auth}
        isCombination={isCombination}
      />
    </Page>
  );
};

export default auth(EquipmentTypes);
