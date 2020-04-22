import React from 'react';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download, FormModal } from '../../components';
import { PRODUCT_MOVEMENTS } from '../../api';
import generator from './generator';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const ProductMovements = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(PRODUCT_MOVEMENTS.READ);
  const fields = columns(t);
  const data = generator(payload?.records);

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.pmv_number,
      name: value?.pmv_prdctlnk,
      t,
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
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
        onClick={handleClick}
      />
    </Page>
  );
};

export default auth(ProductMovements);
