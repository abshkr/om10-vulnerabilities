import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Page, DataTable, Download } from '../../components';
import { MOVEMENT_REASONS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth } from 'hooks';

const MovementReasons = () => {
  const { t } = useTranslation();

  const access = useAuth('M_MOVEMENTREASON');

  const { data: payload, isValidating, revalidate } = useSWR(MOVEMENT_REASONS.READ);

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
      _.forEach(payload?.records, (o) => {
        o.mr_flag = o.mr_flag>0? true : false;

        if (o.mr_flag_desc === 'Active, Do not send to host') { // 0
          o.mr_flag_desc = t('fields.movReasonStatusActiveNotSend');
        } else if (o.mr_flag_desc === 'Active, Send to host') { // 1
          o.mr_flag_desc = t('fields.movReasonStatusActiveSend');
        } else if (o.mr_flag_desc === 'Active, Read only, Send to host') { // 2
          o.mr_flag_desc = t('fields.movReasonStatusActiveReadSend');
        } else if (o.mr_flag_desc === 'Deleted') { // -1
          o.mr_flag_desc = t('fields.movReasonStatusDeleted');
        } else { // Unknown
          o.mr_flag_desc = t('fields.movReasonStatusUnknown');
        }
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
      page={t('pageMenu.config')}
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
        access={access}
      />
    </Page>
  );
};

export default auth(MovementReasons);
