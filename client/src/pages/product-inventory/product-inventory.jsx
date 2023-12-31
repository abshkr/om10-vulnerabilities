import React, { useState, useEffect } from 'react';

import { SyncOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Select, Button, Tabs, Form, Drawer } from 'antd';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import { Page, PowerTable as DataTable, Download } from 'components';
import { TerminalList } from 'components/fields';
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
  const config = useConfig();
  const { t } = useTranslation();
  const access = useAuth('M_PRODUCTINVENTORY');

  const [unit, setUnit] = useState('Litres');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [payload, setPayload] = useState([]);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;
  // const [terminal, setTerminal] = useState(site_code);
  const [terminal, setTerminal] = useState('');

  const {
    data: payloadBases,
    mutate: revalidateBases,
    isValidating: isValidatingBases,
  } = useSWR(`${STOCK_MANAGEMENT.PRODUCT_INVENTORY}?terminal=${terminal}`);

  const {
    data: payloadTanks,
    mutate: revalidateTanks,
    isValidating: isValidatingTanks,
  } = useSWR(`${STOCK_MANAGEMENT.TANK_INVENTORY}?terminal=${terminal}`);

  const fields = columns(t, config);
  const isLoading = isValidatingBases && isValidatingTanks;
  // const payload = transform(data?.records, unit);

  // const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];
  const units = [
    { code: 'Litres', title: t(config?.siteLabelUser + 'units.litresGeneric') },
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

  const refresh = () => {
    if (revalidateBases) {
      revalidateBases();
    }
    if (revalidateTanks) {
      revalidateTanks();
    }
  };

  useEffect(() => {
    if (payloadBases && payloadTanks) {
      const records = transform(payloadBases?.records, payloadTanks?.records, unit);

      setPayload(records);
    }
  }, [payloadBases, payloadTanks, unit]);

  const modifiers = (
    <>
      {config?.siteUseMultiTerminals && (
        <TerminalList
          value={terminal}
          listOptions={[]}
          itemCode={'tank_terminal'}
          itemTitle={'terminal'}
          itemRequired={false}
          itemDisabled={false}
          onChange={setTerminal}
        />
      )}

      <Select
        popupMatchSelectWidth={false}
        allowClear
        key="1"
        style={{ width: 200, marginLeft: 5 }}
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

      <Button icon={<SyncOutlined />} onClick={() => refresh()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload} isLoading={isLoading} columns={fields} />
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
        isLoading={isLoading}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        columnAdjustable={config?.siteCustomColumnProdStock}
        pageModule={'M_PRODUCTINVENTORY'}
      />

      <Drawer
        styles={{ body: { paddingTop: 5 } }}
        onClose={() => handleFormState(false, null)}
        maskClosable={false}
        destroyOnClose={true}
        mask={false}
        placement="right"
        width={config?.siteUseProdOwnership && config?.siteProdOwnershipLevel === 'TANK' ? '55vw' : '80vw'}
        open={visible}
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
