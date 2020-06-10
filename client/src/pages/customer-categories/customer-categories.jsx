import React, { useState } from 'react';

import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download, FormModal } from '../../components';
import { CUSTOMER_CATEGORIES } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth } from '../../hooks';
import Forms from './forms';

const CustomerCategories = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const auth = useAuth('M_CUSTOMERCATEGORIES');

  const { data: payload, isValidating, revalidate } = useSWR(CUSTOMER_CATEGORIES.READ);

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

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
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.customers')} name={t('pageNames.customerCategories')} modifiers={modifiers}>
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

export default auth(CustomerCategories);
