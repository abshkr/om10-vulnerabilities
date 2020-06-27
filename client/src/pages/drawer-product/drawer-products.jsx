import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, ReconciliationOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from 'components';
import { DRAWER_PRODUCTS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import Assets from './assets/assets'
import ManageImgForm from './assets/manage-images'

const DrawerProduct = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  
  const { t } = useTranslation();

  const access = useAuth('M_DRAWERPRODUCTS');
  
  const { data: payload, isValidating, revalidate } = useSWR(DRAWER_PRODUCTS.ASSETS);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const manageImages = () => {
    FormModal({
      // value: currentCmpy,
      width: '90vh',
      form: <ManageImgForm />,
      // id: currentCmpy.cmpy_code,
      // name: currentCmpy.cmpy_name,
      t,
    });
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.products');
  const name = t('pageNames.drawerProducts');

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<ReconciliationOutlined />}
        onClick={manageImages}
        // style={{ float: 'right', marginRight: 5 }}
        disabled={!access?.canUpdate}
      >
        {t('operations.manageImage')}
      </Button>

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
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="drawerProducts">
      <Tabs 
        // defaultActiveKey={PRODUCT_GROUPS.READ_GROUPS} 
        // onChange={setEndpoint} 
        animated={false}
      >
        <Tabs.TabPane tab={t('tabColumns.general')} key="1">
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
          <Forms 
            value={selected} 
            visible={visible} 
            handleFormState={handleFormState} 
            auth={access}
            setFilterValue={setFilterValue}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('tabColumns.drawerProductAssets')} key="2">
          <Assets access={access}/>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(DrawerProduct);
