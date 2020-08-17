import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, Drawer, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import _ from  'lodash';

import { Page, DataTable, Download } from '../../components';
import { DELIVERY_DETAILS } from '../../api';
import { useAuth } from '../../hooks';
import columns from './columns';

import Forms from './forms';
import DeliveryBolTemplates from './forms/dlv-bol-templates/delivery-bol-templates';

const DeliveryDetails = ({ access, params }) => {

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pageState, setPageState] = useState('view');
  const [supplier, setSupplier] = useState(undefined);
  const [loadNumber, setLoadNumber] = useState(undefined);
  const [loadType, setLoadType] = useState(undefined);
  const [supplierName, setSupplierName] = useState(undefined);
  const [loadTypeName, setLoadTypeName] = useState(undefined);
  const [delvBolVisible, setDelvBolVisible] = useState(false);

  const { t } = useTranslation();

  const { data: suppliers } = useSWR(DELIVERY_DETAILS.SUPPLIERS);

  const { data: loadTypes } = useSWR(DELIVERY_DETAILS.LOAD_TYPES);

  const url = supplier && loadNumber && loadType
    ? `${DELIVERY_DETAILS.READ}?dd_supp_code=${supplier}&dd_tripord_no=${loadNumber}&dd_ld_type=${loadType}`
    : null;
  const { data: payload, isValidating, revalidate } = useSWR(url);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.operations');
  const name = t('pageNames.deliveryDetails');

  useEffect(() => {
    if (visible) {
      if (!selected) {
        setPageState('create');
      } else {
        setPageState('edit');
      }
    } else {
      setPageState('view');
    }
  }, [visible, selected]);

  useEffect(() => {
    if (params) {
      setSupplier(params?.dd_supp_code);
      setLoadNumber(params?.dd_tripord_no);
      setLoadType(params?.dd_ld_type);
      if (suppliers) {
        const item = _.find(suppliers?.records, (o) => (o.cmpy_code === params?.dd_supp_code));
        if (item !== undefined) {
          setSupplierName(item.cmpy_name);
        }
      }
      if (loadTypes) {
        const item = _.find(loadTypes?.records, (o) => (o.load_type_id === params?.dd_ld_type));
        if (item !== undefined) {
          setLoadTypeName(item.load_type_name);
        }
      }
    }
  }, [params, setSupplier, setLoadNumber, setLoadType, suppliers, loadTypes, setSupplierName, setLoadTypeName]);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Tooltip 
        placement="topLeft" 
        title={t('tabColumns.delvBolTemplate')}
      >
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ float: 'left', marginRight: 5 }}
          disabled={false}
          onClick={() => setDelvBolVisible(true)}
        >
          {t('operations.delvBolTemplate')}
        </Button>
      </Tooltip>

      {delvBolVisible && (
        <Drawer
          title={t('tabColumns.delvBolTemplate')}
          placement="right"
          bodyStyle={{ paddingTop: 40, paddingRight: 30 }}
          onClose={() => setDelvBolVisible(false)}
          visible={delvBolVisible}
          width="60vw"
        >
          <DeliveryBolTemplates
            // form={form}
            // value={selected?.[0]}
            pageState={pageState}
            supplier={supplier}
            loadNumber={loadNumber}
            loadType={loadType}
            supplierName={supplierName}
            loadTypeName={loadTypeName}
          />
        </Drawer>
      )}

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access?.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} standalone>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        minimal={true}
        autoColWidth
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        pageState={pageState}
        revalidate={revalidate}
        supplier={supplier}
        loadNumber={loadNumber}
        loadType={loadType}
        supplierName={supplierName}
        loadTypeName={loadTypeName}
      />
    </Page>
  );
};

export default DeliveryDetails;
