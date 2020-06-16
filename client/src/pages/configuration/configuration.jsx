import React, { useState, useEffect } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { Tabs, List, Switch, InputNumber, Button, Modal, notification, Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { ConfigurationContainer } from './styles';
import { SITE_CONFIGURATION } from '../../api';
import { Page } from '../../components';
import auth from '../../auth';

const { TabPane } = Tabs;
const { Option } = Select;

const FormSwitch = ({ config, onChange }) => {
  if (config.config_value === 'N' || config.config_value === 'Y') {
    return null;
  }

  switch (config.config_key) {
    case 'URBAC_PWD_COMPLEXITY':
      return (
        <Select defaultValue="1" style={{ width: 260 }} onChange={(value) => onChange(config, value)}>
          <Option value="1">Simple (Alpha and Numeric)</Option>
          <Option value="2">Medium (Upper, Lower and Numeric)</Option>
          <Option value="3">Complex (Upper, Lower, Numberic and Symbol)</Option>
        </Select>
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

    default:
      return <InputNumber value={config.config_value} onChange={(value) => onChange(config, value)} />;
  }
};

const ConfigurationItems = ({ data, onChange }) => (
  <List
    style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}
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
                disabled={item.config_value !== 'N' && item.config_value !== 'Y'}
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

const FeatureItems = ({ data, onChange }) => (
  <List
    style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}
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
                checked={item.feature_gui}
                checkedChildren={<span>On</span>}
                unCheckedChildren={<span>Off</span>}
                onChange={(value) => onChange(item, value)}
              />
            }
            // eslint-disable-next-line
            title={<a>{item.feature_name}</a>}
          />
        </List.Item>
      );
    }}
  />
);

const Configuration = () => {
  const { data: configPayload } = useSWR(SITE_CONFIGURATION.READ, { revalidateOnFocus: false });
  const { data: featuresPayload } = useSWR(SITE_CONFIGURATION.FEATURES, { revalidateOnFocus: false });

  const [configuration, setConfiguration] = useState([]);
  const [features, setFeatures] = useState([]);
  const [tab, setTab] = useState('1');

  const { t } = useTranslation();

  const UPDATING_FEATURES = tab === '6';

  const onConfigurationEdit = (object, value) => {
    let payload = [...configuration];

    object.config_value = value;

    const index = _.findIndex(payload, ['config_key', object.config_key]);

    payload[index] = object;

    setConfiguration(payload);
  };

  const onFeatureEdit = (object, value) => {
    let payload = [...features];

    object.feature_gui = value;

    const index = _.findIndex(payload, ['feature_code', object.feature_code]);

    payload[index] = object;

    setFeatures(payload);
  };

  const onFeatureSelectAll = () => {
    let payload = [...features];

    _.map(payload, (object) => {
      return (object.feature_gui = true);
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
    const values = UPDATING_FEATURES ? features : configuration;

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(UPDATING_FEATURES ? SITE_CONFIGURATION.UPDATE_FEATURES : SITE_CONFIGURATION.UPDATE, values)
          .then(
            axios.spread((response) => {
              Modal.destroyAll();
              mutate(UPDATING_FEATURES ? SITE_CONFIGURATION.FEATURES : SITE_CONFIGURATION.READ);

              notification.success({
                message: t('messages.updateSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  const modifiers = (
    <>
      <Button icon={<EditOutlined />} type="primary" onClick={onUpdate}>
        {t('operations.update')}
      </Button>

      {UPDATING_FEATURES && (
        <Button icon={<PlusOutlined />} onClick={onFeatureSelectAll} type="primary">
          {t('operations.selectAll')}
        </Button>
      )}
    </>
  );

  const page = t('pageMenu.configuration');

  return (
    <ConfigurationContainer>
      <Page page={page} auth={auth} minimal modifiers={modifiers}>
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
            <ConfigurationItems data={_.filter(configuration, ['config_required_by_gui', ''])} />
          </TabPane>

          <TabPane tab={t('tabColumns.seals')} key="5">
            <ConfigurationItems
              data={_.filter(configuration, ['config_required_by_gui', 'S'])}
              onChange={onConfigurationEdit}
            />
          </TabPane>

          <TabPane tab={t('tabColumns.features')} key="6">
            <FeatureItems data={features} onChange={onFeatureEdit} />
          </TabPane>
        </Tabs>
      </Page>
    </ConfigurationContainer>
  );
};

export default auth(Configuration);
