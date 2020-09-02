import React, { useState, useEffect } from 'react';

import { EditOutlined, PlusOutlined, MinusOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { Tabs, List, Switch, InputNumber, Button, Modal, notification, Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import Locations from './locations';
import { useAuth } from '../../hooks';
import { ConfigurationContainer } from './styles';
import api, { SITE_CONFIGURATION } from '../../api';
import { Page } from '../../components';
import auth from '../../auth';
import { complexityDesc } from 'utils'

const { TabPane } = Tabs;
const { Option } = Select;

const FormSwitch = ({ config, onChange }) => {
  const { t } = useTranslation();

  if (config.config_value === 'N' || config.config_value === 'Y') {
    return null;
  }

  switch (config.config_key) {
    case 'URBAC_PWD_COMPLEXITY':
      return (
        <Select 
          dropdownMatchSelectWidth={false}
          defaultValue={config.config_value} 
          style={{ width: 280 }} 
          onChange={(value) => onChange(config, value)}
        >
          <Option value="6">{complexityDesc('6', t)}</Option>
          <Option value="7">{complexityDesc('7', t)}</Option>
          <Option value="15">{complexityDesc('15', t)}</Option>
        </Select>
      );

    case 'SHLS_SEAL_FMT':
      return (
        <Select 
          // dropdownMatchSelectWidth={false}
          defaultValue={config.config_value} 
          style={{ width: 280 }} 
          onChange={(value) => onChange(config, value)}
        >
          <Option value="RANGE">RANGE</Option>
          <Option value="COMMA">COMMA-SEPERATED</Option>
        </Select>
      );

    case 'SITE_SEAL_MODE':
      return (
        <Select 
          // dropdownMatchSelectWidth={false}
          defaultValue={config.config_value} 
          style={{ width: 280 }} 
          onChange={(value) => onChange(config, value)}
        >
          <Option value="0">No-auto Mode</Option>
          <Option value="1">Allocate With DLI</Option>
          <Option value="2">Allocate With BOL</Option>
        </Select>
      );

    case 'URBAC_PWD_LEN_MIN':
      return (
        <InputNumber
          min={0}
          max={40}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_PWD_LEN_MAX':
      return (
        <InputNumber
          min={0}
          max={40}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_PWD_AUTO_LOCK':
      return (
        <InputNumber
          min={0}
          max={99}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_PWD_AUTO_EXPIRE':
      return (
        <InputNumber
          min={0}
          max={365}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_PWD_UPD_INTERVAL':
      return (
        <InputNumber
          min={0}
          max={365}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_PWD_REUSE':
      return (
        <InputNumber
          min={0}
          max={99}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_AUTO_LOGOFF':
      return (
        <InputNumber
          min={0}
          max={2000}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_SESSION_PER_USER':
      return (
        <InputNumber
          min={0}
          max={99}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_USER_AUTO_LOCK':
      return (
        <InputNumber
          min={0}
          max={365}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'URBAC_USER_AUTO_DELETE':
      return (
        <InputNumber
          min={0}
          max={365}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_2FA_DOMAINS':
      return (
        <Input
          style={{ width: '40vw' }}
          onChange={(query) => onChange(config, query.target.value)}
          value={config.config_value}
        />
      );

    case 'HOT_LITRE_SFL_FACTOR':
      return (
        <InputNumber
          min={0}
          max={1}
          step={0.1}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SAFEFILL_TOLERANCE_PERCENT':
      return (
        <InputNumber
          min={0}
          max={100}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SAFEFILL_TOLERANCE_QTY':
      return (
        <InputNumber
          min={0}
          max={10000}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case ('SITE_LD_RETNPRD', 'SITE_LD_RETNPRD_NEW_MOV', 'SITE_LD_RETNPRD_USED_MOV'):
      return (
        <InputNumber
          min={60}
          max={1830}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_EXP_MONTHS':
      return (
        <InputNumber
          min={0}
          max={12}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'DRIVER_PIN_AUTO_EXPIRE':
      return (
        <InputNumber
          min={0}
          max={365}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'DRIVER_PIN_AUTO_LOCK':
      return (
        <InputNumber
          min={0}
          max={99}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_LD_RETNPRD':
      return (
        <InputNumber
          min={60}
          max={1830}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_EXP_MONTHS':
      return (
        <InputNumber
          min={0}
          max={12}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_LD_RETN_NEWLDS':
      return (
        <InputNumber
          min={1}
          max={365}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_LD_RETNPRD_NEW_MOV':
      return (
        <InputNumber
          min={60}
          max={1830}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_LD_RETNPRD_USED_MOV':
      return (
        <InputNumber
          min={60}
          max={1830}
          onChange={(value) => onChange(config, value)}
          value={config.config_value}
        />
      );

    case 'SITE_DATETIME_FORMAT':
      return (
        <Input
          disabled={true}
          style={{ width: '200px' }}
          onChange={(event) => onChange(config, event.target.value)}
          value={config.config_value}
        />
      );

    default:
      return (
        // it is more reasonable to use Input instead of InputNumber as default
        // because the data type of config_value is VARCHAR2.
        <Input
          style={{ width: '10vw' }}
          value={config.config_value}
          onChange={(event) => onChange(config, event.target.value)}
        />
        /* <InputNumber
          value={config.config_value}
          min={0}
          max={999999}
          onChange={(value) => onChange(config, value)}
        /> */
      );
  }
};

const ConfigurationItems = ({ data, onChange }) => (
  <List
    style={{ height: 'calc(100vh - 300px)', overflowY: 'auto', minHeight: 720 }}
    itemLayout="horizontal"
    size="small"
    dataSource={data}
    renderItem={(item) => {
      return (
        <List.Item style={{ background: 'white', marginBottom: 10, marginRight: 10, borderRadius: 5 }}>
          <List.Item.Meta
            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
            avatar={
              <Switch
                checked={item.config_value === 'Y'}
                // disabled={item.config_value !== 'N' && item.config_value !== 'Y'}
                style={{
                  visibility: item.config_value === 'N' || item.config_value === 'Y' ? 'visible' : 'hidden',
                }}
                checkedChildren={<span>On</span>}
                unCheckedChildren={<span>Off</span>}
                onChange={(value) => onChange(item, value ? 'Y' : 'N')}
              />
            }
            // eslint-disable-next-line
            title={<a>{item.config_comment}</a>}
          />
          <FormSwitch config={item} onChange={onChange} />
        </List.Item>
      );
    }}
  />
);

const FeatureItems = ({ data, onChange, t }) => (
  <List
    style={{ height: 'calc(100vh - 300px)', overflowY: 'auto', minHeight: 720 }}
    itemLayout="horizontal"
    size="small"
    dataSource={data.filter((item) => item.feature_gui === true)}
    renderItem={(item) => {
      return (
        <List.Item style={{ background: 'white', marginBottom: 10, marginRight: 10, borderRadius: 5 }}>
          <List.Item.Meta
            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
            avatar={
              <Switch
                checked={item.feature_flag}
                checkedChildren={<span>On</span>}
                unCheckedChildren={<span>Off</span>}
                onChange={(value) => onChange(item, value)}
              />
            }
            // eslint-disable-next-line
            title={<a>{t('features.'+item.feature_code)}</a>}
          />
        </List.Item>
      );
    }}
  />
);

const HostMessagingItems = ({ data, onChange }) => (
  <List
    style={{ height: 'calc(100vh - 300px)', overflowY: 'auto', minHeight: 720 }}
    itemLayout="horizontal"
    size="small"
    dataSource={data}
    renderItem={(item) => {
      return (
        <List.Item style={{ background: '#f1f1f1', marginBottom: 0, marginRight: 0, borderRadius: 5 }}>
          <List.Item.Meta
            style={{ justifyContent: 'left', alignContent: 'left', alignItems: 'left' }}
            avatar={
              <Switch
                checked={item.config_value === 'Y'}
                style={{
                  visibility: item.config_value === 'N' || item.config_value === 'Y' ? 'visible' : 'hidden',
                }}
                checkedChildren={<span>On</span>}
                unCheckedChildren={<span>Off</span>}
                onChange={(value) => onChange(item, value ? 'Y' : 'N')}
              />
            }
            // eslint-disable-next-line
            title={<a>{item.config_comment}</a>}
          />
          <FormSwitch config={item} onChange={onChange} />
        </List.Item>
      );
    }}
  />
);



const Configuration = ({ user, config }) => {
  const { data: configPayload } = useSWR(SITE_CONFIGURATION.READ, { revalidateOnFocus: false });
  const { data: featuresPayload } = useSWR(SITE_CONFIGURATION.FEATURES, { revalidateOnFocus: false });

  const access = useAuth('M_SITECONFIG');

  const [configuration, setConfiguration] = useState([]);
  const [features, setFeatures] = useState([]);
  const [tab, setTab] = useState('1');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const UPDATING_FEATURES = tab === '7';

  const UPDATING_TERMINALS = tab === '5';

  const onConfigurationEdit = (object, value) => {
    let payload = [...configuration];

    object.config_value = value;

    const index = _.findIndex(payload, ['config_key', object.config_key]);

    payload[index] = object;

    setConfiguration(payload);
  };

  const onFeatureEdit = (object, value) => {
    let payload = [...features];

    object.feature_flag = value;

    const index = _.findIndex(payload, ['feature_code', object.feature_code]);

    payload[index] = object;

    setFeatures(payload);
  };

  const onFeatureSelectAll = () => {
    let payload = [...features];

    _.map(payload, (object) => {
      return (object.feature_flag = true);
    });

    setFeatures(payload);
  };

  const onFeatureDeselectAll = () => {
    let payload = [...features];

    _.map(payload, (object) => {
      return (object.feature_flag = false);
    });

    setFeatures(payload);
  };

  useEffect(() => {
    if (configPayload?.records) {
      setConfiguration(configPayload.records);
    }

    if (featuresPayload?.records) {
      setFeatures(featuresPayload.records);
    }
  }, [configPayload, featuresPayload]);

  const onUpdate = () => {
    const values = UPDATING_FEATURES ? features : _.filter(configuration, (item) => {
      return item.config_required_by_gui !== "";
    });

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(UPDATING_FEATURES ? SITE_CONFIGURATION.UPDATE_FEATURES : SITE_CONFIGURATION.UPDATE, values)
          .then((response) => {
            Modal.destroyAll();
            config.revalidate();

            mutate(UPDATING_FEATURES ? SITE_CONFIGURATION.FEATURES : SITE_CONFIGURATION.READ);

            notification.success({
              message: t('messages.updateSuccess'),
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      {!UPDATING_TERMINALS && (
        <Button icon={<EditOutlined />} type="primary" onClick={onUpdate} disabled={!access?.canUpdate}>
          {t('operations.update')}
        </Button>
      )}

      {UPDATING_FEATURES && (
        <Button
          icon={<PlusOutlined />}
          onClick={onFeatureSelectAll}
          type="primary"
          disabled={!access?.canUpdate}
        >
          {t('operations.selectAll')}
        </Button>
      )}

      {UPDATING_FEATURES && (
        <Button
          icon={<MinusOutlined />}
          onClick={onFeatureDeselectAll}
          type="primary"
          disabled={!access?.canUpdate}
        >
          {t('operations.deselectAll')}
        </Button>
      )}

      {UPDATING_TERMINALS && (
        <Button
          icon={<PlusOutlined />}
          onClick={onFeatureDeselectAll}
          type="primary"
          disabled={!access?.canUpdate}
          onClick={() => handleFormState(true, null)}
        >
          {t('operations.create')}
        </Button>
      )}
    </>
  );

  const page = t('pageMenu.configuration');

  return (
    <ConfigurationContainer>
      <Page page={page} auth={auth} transparent modifiers={modifiers} access={access}>
        <Tabs defaultActiveKey={tab} type="card" onChange={setTab}>
          <TabPane tab={t('tabColumns.screenAccess')} key="1">
            <ConfigurationItems
              data={_.filter(configuration, ['config_required_by_gui', 'Y'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.general')} key="2">
            <ConfigurationItems
              data={_.filter(configuration, ['config_required_by_gui', 'R'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.driverPin')} key="3">
            <ConfigurationItems
              data={_.filter(configuration, ['config_required_by_gui', 'P'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.closeoutOptions')} key="4">
            <ConfigurationItems
              data={_.filter(configuration, ['config_required_by_gui', 'M'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.terminalLocations')} key="5">
            <Locations
              handleFormState={handleFormState}
              visible={visible}
              selected={selected}
              access={access}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.seals')} key="6">
            <ConfigurationItems
              data={_.sortBy(_.filter(configuration, ['config_required_by_gui', 'S']), ['config_key', 'config_comment'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>

          {user?.per_code === '9999' && (
            <TabPane tab={t('tabColumns.features')} key="7">
              <FeatureItems data={features} onChange={onFeatureEdit} t={t} />
            </TabPane>
          )}

          <TabPane tab={t('tabColumns.hostMessaging')} key="8">
            <HostMessagingItems
              data={_.filter(configuration, ['config_required_by_gui', 'H'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>
        </Tabs>
      </Page>
    </ConfigurationContainer>
  );
};

export default auth(Configuration);
