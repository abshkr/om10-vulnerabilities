import React, { useState } from 'react';

import { SyncOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Select, Button, Tabs, Form, Drawer } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download } from 'components';
import { STOCK_MANAGEMENT } from 'api';
import useAuth from 'hooks/use-auth';
import auth from 'auth';
import { useConfig } from '../../hooks';

import transform from './transform';
import columns from './columns';
import TankProductOwners from './owners';
import BaseProductOwners from './base-owners';

const { TabPane } = Tabs;

const ProductInventory = () => {
  const [unit, setUnit] = useState('Litres');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const config = useConfig();

  const { t } = useTranslation();
  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.PRODUCT_INVENTORY);

  const access = useAuth('M_PRODUCTINVENTORY');

  const fields = columns(t, config);
  const payload = transform(data?.records, unit);

  // const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];
  const units = [
    { code: 'Litres', title: t('units.litres') },
    { code: 'Cubic Metre', title: t('units.cubicMetre') },
    { code: 'Imperial Gallon', title: t('units.imperialGallon') },
    { code: 'U.S Gallon', title: t('units.usGallon') },
    { code: 'Imperial Barrel', title: t('units.imperialBarrel') },
    { code: 'U.S Barrel', title: t('units.usBarrel') },
  ];

  const handleFormState = (visibility, value) => {
    /* if (!visibility) {
      setFieldsValue({
        tkcmpy_link: null,
        tko_percentage: null,
        tkowner_qty: null,
        tko_std_ltr: null,
        tko_kg: null,
      });
    }
    if (value) {
      value.tko_percentage = _.round(value.tko_percentage, 4);
    } */
    setSelected(value);
    if (config?.siteUseProdOwnership) {
      setVisible(visibility);
    } else {
      setVisible(false);
    }
  };

  const modifiers = (
    <>
      <Select
        dropdownMatchSelectWidth={false}
        key="1"
        style={{ width: 200 }}
        defaultValue={unit}
        onChange={setUnit}
      >
        {units.map((item) => {
          return (
            <Select.Option key={item.code} value={item.code}>
              {item.title}
            </Select.Option>
          );
        })}
      </Select>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page
      page={t('pageMenu.stock')}
      name={t('pageNames.productInventory')}
      avatar="productInventory"
      modifiers={modifiers}
      access={access}
    >
      <DataTable
        columns={fields}
        data={payload}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        onClose={() => handleFormState(false, null)}
        maskClosable={false}
        destroyOnClose={true}
        mask={false}
        placement="right"
        width={config?.siteUseProdOwnership && config?.siteProdOwnershipLevel === 'TANK' ? '55vw' : '80vw'}
        visible={visible}
        footer={
          <>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              style={{ float: 'right' }}
              onClick={() => handleFormState(false, null)}
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
              <TankProductOwners access={access} value={selected} config={config} unit={unit} units={units} />
            )}
            {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel !== 'TANK' && (
              <BaseProductOwners access={access} value={selected} config={config} unit={unit} units={units} />
            )}
          </TabPane>
        </Tabs>
      </Drawer>
    </Page>
  );
};

export default auth(ProductInventory);
