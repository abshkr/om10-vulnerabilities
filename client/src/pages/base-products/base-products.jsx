import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Drawer, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { BASE_PRODUCTS } from '../../api';
import { useAuth, useConfig, useQuery } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import TankProductOwners from '../product-inventory/owners';
import BaseProductOwners from '../product-inventory/base-owners';

const { TabPane } = Tabs;

const BaseProducts = () => {
  const query = useQuery();

  const product = query.get('product') || '';

  const { t } = useTranslation();

  const config = useConfig();
  const access = useAuth('M_BASEPRODUCTS');

  const { data: payload, isValidating, revalidate } = useSWR(BASE_PRODUCTS.READ);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState(product);
  const [ownershipOpen, setOwnershipOpen] = useState(false);

  const units = [
    { code: 'Litres', title: t('units.litres') },
    { code: 'Cubic Metre', title: t('units.cubicMetre') },
    { code: 'Imperial Gallon', title: t('units.imperialGallon') },
    { code: 'U.S Gallon', title: t('units.usGallon') },
    { code: 'Imperial Barrel', title: t('units.imperialBarrel') },
    { code: 'U.S Barrel', title: t('units.usBarrel') },
  ];

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t, config);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.products');
  const name = t('pageNames.baseProducts');

  const modifiers = (
    <>
      {config?.siteUseProdOwnership && (
        <Button type="primary" icon={<EyeOutlined />} disabled={false} onClick={() => setOwnershipOpen(true)}>
          {config?.siteProdOwnershipLevel === 'TANK'
            ? t('tabColumns.tankOwnersSummary')
            : t('tabColumns.baseOwners')}
        </Button>
      )}

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
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
    <>
      {ownershipOpen && (
        <Drawer
          bodyStyle={{ paddingTop: 5 }}
          onClose={() => setOwnershipOpen(false)}
          maskClosable={false}
          destroyOnClose={true}
          mask={false}
          placement="right"
          width={config?.siteUseProdOwnership && config?.siteProdOwnershipLevel === 'TANK' ? '70vw' : '80vw'}
          visible={ownershipOpen}
          footer={
            <>
              <Button
                htmlType="button"
                icon={<CloseOutlined />}
                style={{ float: 'right' }}
                onClick={() => setOwnershipOpen(false)}
              >
                {t('operations.cancel')}
              </Button>
            </>
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                config?.siteProdOwnershipLevel === 'TANK'
                  ? t('tabColumns.tankOwnersSummary')
                  : t('tabColumns.baseOwners')
              }
              key="1"
            >
              {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel === 'TANK' && (
                <TankProductOwners
                  access={access}
                  value={undefined}
                  config={config}
                  unit={'Litres'}
                  units={units}
                />
              )}
              {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel !== 'TANK' && (
                <BaseProductOwners
                  access={access}
                  value={undefined}
                  config={config}
                  unit={'Litres'}
                  units={units}
                />
              )}
            </TabPane>
          </Tabs>
        </Drawer>
      )}
      <Page page={page} name={name} modifiers={modifiers} access={access} avatar="baseProducts">
        <DataTable
          data={data}
          columns={fields}
          isLoading={isLoading}
          selectionMode="single"
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
          autoColWidth
          filterValue={filterValue}
        />

        {visible && (
          <Forms
            value={selected}
            visible={visible}
            handleFormState={handleFormState}
            access={access}
            config={config}
            setFilterValue={setFilterValue}
          />
        )}
      </Page>
    </>
  );
};

export default auth(BaseProducts);
