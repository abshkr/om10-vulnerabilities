import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Drawer, Modal, Button, Card } from 'antd';
import {
  RedoOutlined,
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import Tanks from './tanks';
import Reports from './reports';
import Meters from './meters';
import api, { FOLIO_SUMMARY } from 'api';

const TabPane = Tabs.TabPane;

const Forms = ({ value, visible, handleFormState, closeoutIsIdle, access, config }) => {
  const { t } = useTranslation();
  const [reportTrigger, setReportTrigger] = useState(0);
  const [meterTrigger, setMeterTrigger] = useState(0);
  const [saveToMetersTrigger, setSaveToMetersTrigger] = useState(0);
  const [saveToFolioTrigger, setSaveToFolioTrigger] = useState(0);
  const [saveToTanksTrigger, setSaveToTanksTrigger] = useState(0);
  const [calculateTrigger, setCalculateTrigger] = useState(0);
  const [isRegenerating, setRegenerate] = useState(false);
  const [tab, setTab] = useState('1');

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      handleFormState(false, null);
      return;
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        handleFormState(false, null);
      },
    });
  };

  const showCloseoutStatus = () => {
    if (!closeoutIsIdle) {
      return t('descriptions.closeoutIsBusy');
    }
  };

  const onTabChange = (v) => {
    console.log(v);
    setTab(v);
  };

  useEffect(() => {
    setMeterTrigger(0);
    setSaveToFolioTrigger(0);
    setSaveToTanksTrigger(0);
    setCalculateTrigger(0);
  }, [value]);

  const enabled = value?.status === 0 || value?.status === 1;

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={config?.siteFormCloseAlert ? false : true}
      mask={config?.siteFormCloseAlert ? true : true}
      destroyOnClose={true}
      placement="right"
      width="90vw"
      open={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onExitClicked()}
          >
            {t('operations.cancel')}
          </Button>

          {tab === '1' && (
            <Button
              title={showCloseoutStatus()}
              type="primary"
              icon={<RedoOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              loading={isRegenerating}
              disabled={!enabled || !closeoutIsIdle}
              onClick={() => setReportTrigger(reportTrigger + 1)}
            >
              {t('operations.regenerate')}
            </Button>
          )}

          {tab === '2' && (
            <>
              {config.saveToMeter && (
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  style={{ float: 'right', marginRight: 5 }}
                  onClick={() => setSaveToMetersTrigger(saveToMetersTrigger + 1)}
                  disabled={!enabled || !access.canUpdate}
                >
                  {t('operations.saveToMeters')}
                </Button>
              )}

              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={() => setMeterTrigger(meterTrigger + 1)}
                disabled={!enabled || !access.canUpdate}
              >
                {t('operations.saveToFolio')}
              </Button>
            </>
          )}

          {tab === '3' && (
            <>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={() => setCalculateTrigger(calculateTrigger + 1)}
                disabled={!enabled}
              >
                {t('operations.calculate')}
              </Button>

              <Button
                type="primary"
                icon={<SaveOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={() => setSaveToTanksTrigger(saveToTanksTrigger + 1)}
                disabled={!enabled || !access.canUpdate}
              >
                {t('operations.saveToTanks')}
              </Button>

              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ float: 'right', marginRight: 5 }}
                onClick={() => setSaveToFolioTrigger(saveToFolioTrigger + 1)}
                disabled={!enabled || !access.canUpdate}
              >
                {t('operations.saveToFolio')}
              </Button>
            </>
          )}
        </>
      }
    >
      <Tabs defaultActiveKey="1" animated={false} activeKey={tab} onChange={onTabChange}>
        <TabPane style={{ paddingRight: 0 }} tab={t('tabColumns.reports')} key="1">
          <Reports
            id={value?.closeout_nr}
            enabled={enabled}
            access={access}
            handleFormState={handleFormState}
            reportTrigger={reportTrigger}
            setRegenerate={setRegenerate}
          />
        </TabPane>

        <TabPane style={{ paddingRight: 0 }} tab={t('tabColumns.meters')} key="2">
          <Meters
            id={value?.closeout_nr}
            folioLine={value}
            enabled={enabled}
            access={access}
            handleFormState={handleFormState}
            meterTrigger={meterTrigger}
            saveToMetersTrigger={saveToMetersTrigger}
            setMeterTrigger={setMeterTrigger}
          />
        </TabPane>

        <TabPane tab={t('tabColumns.tanks')} key="3">
          <Tanks
            id={value?.closeout_nr}
            folioLine={value}
            enabled={enabled}
            access={access}
            handleFormState={handleFormState}
            saveToFolioTrigger={saveToFolioTrigger}
            saveToTanksTrigger={saveToTanksTrigger}
            calculateTrigger={calculateTrigger}
            // setTankSelected={setTankSelected}
            nullToZero={config?.siteNullFolioQtyZero}
          />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default Forms;
