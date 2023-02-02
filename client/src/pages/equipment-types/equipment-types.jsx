import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Page, PowerTable as DataTable, Download } from '../../components';
import { EQUIPMENT_TYPES } from '../../api';
import { useAuth } from '../../hooks';
import { useConfig, useQuery } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const EquipmentTypes = () => {
  const query = useQuery();

  const config = useConfig();

  let equipment = query.get('equipment') || '';

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCombination, setCombination] = useState(false);
  const [filterValue, setFilterValue] = useState(equipment);
  const [parentEqpt, setParentEqpt] = useState(equipment);

  const { t } = useTranslation();

  const access = useAuth('M_EQUIPMENT');

  const url =
    parentEqpt && parentEqpt?.length > 0 && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_TYPES.READ}?etyp_id=${parentEqpt}`
      : `${EQUIPMENT_TYPES.READ}`;
  const { data: payload, isValidating, revalidate } = useSWR(url);

  const handleFormState = (visibility, value) => {
    if (visibility && !value) {
      Modal.confirm({
        title: t('prompts.isEqptCombo'),
        icon: <ExclamationCircleOutlined />,
        okText: t('operations.no'),
        cancelText: t('operations.yes'),
        centered: true,
        onOk() {
          setCombination(false);

          setVisible(visibility);
          setSelected(value);
        },
        onCancel() {
          setCombination(true);

          setVisible(visibility);
          setSelected(value);
        },
      });
    } else {
      setVisible(visibility);
      setSelected(value);
      setCombination(false);
    }
  };

  const fields = columns(t, config);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.operations');
  const name = t(config?.siteLabelUser + 'pageNames.equipmentTypes');

  const onRefresh = () => {
    setParentEqpt('');
    revalidate();
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isLoading}>
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
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="equipmentTypes">
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        rowHeight={60}
        filterValue={filterValue}
        columnAdjustable={config?.siteCustomColumnEqptType}
        pageModule={'M_EQUIPMENT'}
      />
      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          isCombination={isCombination}
          setFilterValue={setFilterValue}
          config={config}
        />
      )}
    </Page>
  );
};

export default auth(EquipmentTypes);
