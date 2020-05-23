import React, { useCallback, useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { notification, Button, Tabs } from 'antd';
import { SafetyCertificateOutlined, ReconciliationOutlined } from '@ant-design/icons';

import Forms from './forms';
import FolioCalendar from './calendar';
import auth from '../../auth';
import columns from './columns';
import { FOLIO_SCHEDULING } from '../../api';
import { Page, DataTable, FormModal } from '../../components';
import { authLevel } from '../../utils';
import { useAuth } from '../../hooks';

import './folio-schedulling.css';

const TabPane = Tabs.TabPane;

const FolioSummary = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const access = useAuth('M_FOLIOSCHEDULING');

  const { data: payload, isValidating } = useSWR(FOLIO_SCHEDULING.READ);

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      <Button
        type="primary"
        icon={<SafetyCertificateOutlined />}
        onClick={() => handleFormState(true, null)}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.createFolioException')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.folioScheduling')} modifiers={modifiers}>
      
      <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.closetException')} key="1" style={{ height: '72vh' }} >
            <DataTable 
              columns={fields} 
              data={payload?.records}
              isLoading={isValidating} 
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])} /> />
            <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
          </TabPane>

          <TabPane tab={t('tabColumns.closetCalendar')} key="2" style={{ height: '72vh' }}>
            <FolioCalendar />
          </TabPane>

          <TabPane tab={t('tabColumns.closetSettings')} key="3" style={{ height: '72vh' }}>
            {/* <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} /> */}
          </TabPane>
        </Tabs>
    </Page>
  );
};

export default auth(FolioSummary);
