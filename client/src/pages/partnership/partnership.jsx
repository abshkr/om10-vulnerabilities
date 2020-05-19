import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { PARTNERSHIP } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth } from '../../hooks';

const Partnership = () => {
  const { t } = useTranslation();
  const access = useAuth('M_PARTNERSHIP');

  const { data: payload, isValidating, revalidate } = useSWR(PARTNERSHIP.READ);

  const fields = columns(t);
  const data = payload?.records;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const handleClick = (value) => {
    // FormModal({
    //   value,
    //   form: <Forms value={value} length={payload?.records?.length} />,
    //   id: value?.partner_cmpy_code,
    //   name: value?.partner_cmpy_name,
    //   t,
    // });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleFormState(true, null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.customers')} name={t('pageNames.partnership')} modifiers={modifiers}>
      <DataTable 
        columns={fields} 
        data={data} 
        isLoading={isValidating} 
        onClick={(payload) => handleFormState(true, payload)} 
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access}/>
    </Page>
  );
};

export default auth(Partnership);
