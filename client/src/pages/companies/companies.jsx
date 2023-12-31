import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FormOutlined, ApiOutlined } from '@ant-design/icons';

import { Page, PowerTable as DataTable, Download, FormModal } from '../../components';
import { COMPANIES } from '../../api';
import columns from './columns';
import auth from '../../auth';
import { Forms } from './forms';
import { useAuth, useConfig } from '../../hooks';
import { SpecialActionForm } from './specials';
import { RelationsForm } from './relations';

const Companies = () => {
  const { t } = useTranslation();
  const auth = useAuth('M_COMPANIES');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentCmpy, setCurrentCmpy] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const config = useConfig();
  const { siteCompanyRelationAllowed, siteCustomColumnCompany } = config;

  const { data: payload, isValidating, mutate: revalidate } = useSWR(COMPANIES.READ);

  const fields = columns(t, config);
  const data = payload?.records;

  const handleFormState = (visibility, value) => {
    if (value) {
      setCurrentCmpy(value);
    }
    setVisible(visibility);
    setSelected(value);
  };

  const specialActions = () => {
    FormModal({
      value: currentCmpy,
      width: '80vw',
      form: (
        <SpecialActionForm
          value={currentCmpy}
          handleFormState={handleFormState}
          setFilterValue={setFilterValue}
        />
      ),
      id: currentCmpy.cmpy_code,
      name: currentCmpy.cmpy_name,
      t,
    });
  };

  const companyRelations = () => {
    FormModal({
      value: currentCmpy,
      width: '80vw',
      form: <RelationsForm value={currentCmpy} handleFormState={handleFormState} />,
      id: currentCmpy.cmpy_code,
      name: currentCmpy.cmpy_name,
      t,
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      {/* <Button
        type="primary"
        icon={<FormOutlined />}
        loading={isValidating}
        // style={{float:"left", marginRight:500}}
        onClick={() => specialActions()}
        disabled={!currentCmpy || !auth.canUpdate}
      >
        {t('operations.specialAction')}
      </Button> */}
      {/* siteCompanyRelationAllowed ? (
        <Button
          type="primary"
          icon={<ApiOutlined />}
          loading={isValidating}
          // style={{float:"left", marginRight:500}}
          onClick={() => companyRelations()}
          disabled={!currentCmpy || currentCmpy?.supplier !== true || !auth.canUpdate}
        >
          {t('operations.companyRelation')}
        </Button>
      ) : null */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        loading={isValidating}
        onClick={() => handleFormState(true, null)}
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.companies')} name={t('pageNames.companies')} modifiers={modifiers} access={auth}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        filterValue={filterValue}
        columnAdjustable={siteCustomColumnCompany}
        pageModule={'M_COMPANIES'}
      />
      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          auth={auth}
          specialActions={specialActions}
          companyRelations={companyRelations}
          setFilterValue={setFilterValue}
          config={config}
        />
      )}
    </Page>
  );
};

export default auth(Companies);
