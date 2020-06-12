import React, { useState } from 'react';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download, FormModal } from '../../components';
import { PRODUCT_MOVEMENTS } from '../../api';
import generator from './generator';
import columns from './columns';
import auth from '../../auth';
import { useAuth } from '../../hooks';

import Forms from './forms';

const ProductMovements = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const auth = useAuth('M_PRODUCTMOVEMENT');

  const { data: payload, isValidating, revalidate } = useSWR(PRODUCT_MOVEMENTS.READ);
  const fields = columns(t);
  const data = generator(payload?.records);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

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
        loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.productMovements')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(ProductMovements);
