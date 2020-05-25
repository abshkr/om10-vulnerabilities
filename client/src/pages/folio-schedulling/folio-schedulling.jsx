import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { notification, Button, Tabs, Divider } from 'antd';
import { SafetyCertificateOutlined, ReconciliationOutlined } from '@ant-design/icons';

import Forms from './forms';
import Settings from './settings'
import FolioCalendar from './calendar';
import auth from '../../auth';
import columns from './columns';
import overrideCols from './override_cols';
import { FOLIO_SCHEDULING } from '../../api';
import { Page, DataTable, FormModal } from '../../components';
import { authLevel } from '../../utils';
import { useAuth } from '../../hooks';
import _ from 'lodash';

import './folio-schedulling.css';

const TabPane = Tabs.TabPane;

const FolioSummary = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const access = useAuth('M_FOLIOSCHEDULING');

  const { data: payload, isValidating } = useSWR(FOLIO_SCHEDULING.READ);
  const {data, setData} = useState(payload?.records)
  // const { data: overrides } = useSWR(FOLIO_SCHEDULING.OVERRIDES);

  const fields = columns(t);
  const overrideFileds = overrideCols(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

   // useEffect(() => {
  //   setData(data)
  // }, [data]);

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.folioScheduling')}>
      <Tabs 
        defaultActiveKey="1" 
        // style={{ height: '72vh' }}
      >
          <TabPane 
            tab={t('tabColumns.closetException')} 
            key="1" 
            // style={{ height: '72vh' }} 
          >
            <div>
              {t("descriptions.exceptionRules")}
              <DataTable 
                height="37vh"
                parentHeight="40vh"
                // minimal
                columns={fields} 
                // data={payload?.records.filter((item)=>{item.window_name != 'OVERRIDE'})}
                data={payload? _.filter(payload.records, function(item) {
                  return item.window_name !== 'OVERRIDE'}) : null}
                isLoading={isValidating} 
                onClick={(payload) => handleFormState(true, payload)}
                handleSelect={(payload) => handleFormState(true, payload[0])} /> 
            </div>
            <Button
              type="primary"
              icon={<SafetyCertificateOutlined />}
              onClick={() => handleFormState(true, null)}
              style={{ float: 'right', marginRight: 5, marginTop: 5 }}
            >
              {t('operations.createFolioException')}
            </Button>
            <br></br>
            <div>
              {t("descriptions.overrideRules")}
              <DataTable 
                height="17vh"
                parentHeight="20vh"
                columns={overrideFileds} 
                // data={payload?.records.filter((item)=>{item.window_name === 'OVERRIDE'})}
                data={payload? _.filter(payload.records, function(item) {
                  return item.window_name === 'OVERRIDE'}) : null}
                isLoading={isValidating} 
                minimal /> 
            </div>
            <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
          </TabPane>

          <TabPane tab={t('tabColumns.closetCalendar')} key="2" style={{ height: '72vh' }}>
            <FolioCalendar access={access} value={payload?.records}/>
          </TabPane>

          <TabPane tab={t('tabColumns.closetSettings')} key="3" style={{ height: '72vh' }}>
            <Settings access={access}></Settings>
          </TabPane>
        </Tabs>
    </Page>
  );
};

export default auth(FolioSummary);
