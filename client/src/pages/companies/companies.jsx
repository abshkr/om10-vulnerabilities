import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FormOutlined, ApiOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { COMPANIES } from '../../api';
import columns from './columns';
import auth from '../../auth';
import { Forms } from './forms';
import { useAuth } from '../../hooks';
import { SpecialActionForm } from './specials';
import { RelationsForm } from './relations';

const Companies = () => {
  const { t } = useTranslation();
  const auth = useAuth('M_COMPANIES');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentCmpy, setCurrentCmpy] = useState(null);

  const { data: payload, isValidating, revalidate } = useSWR(COMPANIES.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleFormState = (visibility, value) => {
    if (value) {
      setCurrentCmpy(value)
    }
    setVisible(visibility);
    setSelected(value);
  };

  const specialActions = () => {
    FormModal({
      value: currentCmpy,
      width: "120vh",
      form: <SpecialActionForm value={currentCmpy} handleFormState={handleFormState}/>,
      id: currentCmpy.cmpy_code,
      name: currentCmpy.cmpy_name,
      t
    });
  }

  const companyRelations = () => {
    FormModal({
      value: currentCmpy,
      width: "120vh",
      form: <RelationsForm value={currentCmpy} handleFormState={handleFormState}/>,
      id: currentCmpy.cmpy_code,
      name: currentCmpy.cmpy_name,
      t
    });
  }

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button 
        type="primary" 
        icon={<FormOutlined />}  
        loading={isValidating}
        // style={{float:"left", marginRight:500}}
        onClick={() => specialActions()}
        disabled={!currentCmpy || !auth.canUpdate}
      >
        {t('operations.specialAction')}
      </Button>
      <Button 
        type="primary" 
        icon={<ApiOutlined />}  
        loading={isValidating}
        // style={{float:"left", marginRight:500}}
        onClick={() => companyRelations()}
        disabled={!currentCmpy || !auth.canUpdate}
      >
        {t('operations.companyRelation')}
      </Button>
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
    <Page page={t('pageMenu.gantry')} name={t('pageNames.companies')} modifiers={modifiers}>
      <DataTable 
        columns={fields} 
        data={data} 
        isLoading={isValidating} 
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(Companies);
